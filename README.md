# Should I Sign This?

**Created by [Pratiksha Parsewar](https://github.com/pratikshaparsewar)**
**GitHub Repository: [https://github.com/pratikshaparsewar/ai-nda](https://github.com/pratikshaparsewar/ai-nda)**

A full-stack React/Next.js application — an AI-powered contract analysis tool that reads every clause of a PDF contract, flags hidden risks, scores legal exposure, and tells you what to negotiate — in plain English, in under 30 seconds.

---

## 1. What the Code Does

Users upload a PDF contract (NDA, employment agreement, vendor contract, etc.). The application:

1. **Extracts text** from the PDF using `pdf-parse`. If the PDF is a scanned image with no machine-readable text, it falls back to GPT-4o Vision OCR.
2. **Chunks and embeds** the extracted text using LangChain's `RecursiveCharacterTextSplitter` and OpenAI's `text-embedding-3-small` model, then stores the chunks in Supabase with `pgvector` (or in server memory when Supabase is not configured).
3. **Analyzes the contract** with GPT-4o, which returns a structured verdict:
   - **Decision**: `SIGN`, `NEGOTIATE`, or `DO NOT SIGN`
   - **Risk score**: 0–100 integer with a severity level (`LOW` / `MEDIUM` / `HIGH` / `CRITICAL`)
   - **Plain-English summary** of what the contract means for the signer
   - **Red flags**: every concerning clause with severity, description, and verbatim evidence quote
   - **Consequences**: what happens if you sign as-is
   - **Negotiation advice**: specific redline suggestions with alternative language
   - **Questions to ask**: pointed questions for the other party or their counsel
4. **RAG chat**: after analysis, users can ask free-form questions about the contract. The app retrieves the most relevant chunks (via `pgvector` semantic search or keyword fallback) and answers using GPT-4o, citing exact clauses.

The app works fully without Supabase — if no credentials are provided, all data is kept in server memory for the lifetime of the process.

---

## 2. Code Structure

```
ai-nda/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — font, ThemeProvider, metadata
│   ├── globals.css               # Tailwind v4 base styles and dark-mode variant
│   ├── page.tsx                  # Marketing homepage (hero, stats, features, CTA)
│   ├── upload/
│   │   └── page.tsx              # PDF upload UI (drag-and-drop + file picker)
│   ├── document/
│   │   └── [id]/
│   │       └── page.tsx          # Results page: verdict card + tabbed analysis + RAG chat
│   ├── about/page.tsx            # About page
│   ├── how-it-works/page.tsx     # Technical explainer page
│   ├── problem/page.tsx          # Problem statement page
│   ├── use-cases/page.tsx        # Use-cases page
│   └── api/
│       ├── upload/route.ts       # POST /api/upload  — parse PDF, chunk, embed, store
│       ├── analyze/route.ts      # POST /api/analyze — GPT-4o contract analysis
│       └── chat/route.ts         # POST /api/chat    — RAG question answering
│
├── components/
│   ├── MarketingNav.tsx          # Top navigation bar with theme toggle
│   ├── Footer.tsx                # Site-wide footer with links
│   ├── ThemeProvider.tsx         # next-themes wrapper (defaults to dark mode)
│   ├── ThemeToggle.tsx           # Light / dark toggle button
│   └── FadeIn.tsx                # Framer Motion scroll-triggered fade wrapper
│
├── lib/
│   ├── store.ts                  # In-memory document + analysis store; keyword chunk search
│   ├── supabase.ts               # Supabase client (gracefully null when unconfigured)
│   └── ocr.ts                    # GPT-4o Vision OCR for scanned / image-only PDFs
│
├── types/
│   └── index.ts                  # Shared TypeScript interfaces (Analysis, RedFlag, ChatMessage…)
│
├── .env.local                    # Local environment variables (not committed)
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS + Tailwind v4 plugin
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

### Data flow

```
Browser → POST /api/upload
            ├── pdf-parse (extract text)
            ├── OCR fallback (GPT-4o Vision) if no text found
            ├── LangChain splitter → chunks[]
            ├── OpenAI embeddings (text-embedding-3-small)
            └── Save to Supabase (documents + document_chunks) OR memStore

Browser → POST /api/analyze
            ├── Load full_text from Supabase / memStore
            ├── GPT-4o chat completion (JSON mode)
            └── Save analysis to Supabase / memStore

Browser → POST /api/chat
            ├── Embed user question (text-embedding-3-small)
            ├── pgvector match_document_chunks RPC  OR  keyword fallback
            └── GPT-4o chat completion with retrieved clauses as context
```

---

## 3. How to Prepare to Run

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9 or later
- An **OpenAI API key** with access to `gpt-4o` and `text-embedding-3-small`

### Step 1 — Install dependencies

```bash
npm install
```

### Step 2 — Create the environment file

Create a file named `.env.local` in the project root:

```env
# Required
OPENAI_API_KEY=sk-...

# Optional — omit to run in-memory with no persistence between restarts
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Step 3 — (Optional) Set up Supabase for persistent storage

If you want documents and analyses to survive server restarts, create a free project at [supabase.com](https://supabase.com) and run the following SQL in the Supabase SQL editor:

```sql
-- Enable pgvector
create extension if not exists vector;

-- Documents table
create table documents (
  id            uuid primary key default gen_random_uuid(),
  filename      text not null,
  storage_path  text,
  full_text     text,
  chunk_count   int default 0,
  created_at    timestamptz default now()
);

-- Chunks table with vector column
create table document_chunks (
  id            uuid primary key default gen_random_uuid(),
  document_id   uuid references documents(id) on delete cascade,
  chunk_index   int,
  content       text,
  embedding     vector(1536),
  created_at    timestamptz default now()
);

-- Analyses table
create table analyses (
  id                  uuid primary key default gen_random_uuid(),
  document_id         uuid references documents(id) on delete cascade,
  decision            text,
  risk_score          int,
  risk_level          text,
  summary             text,
  red_flags           jsonb default '[]',
  consequences        jsonb default '[]',
  negotiation_advice  jsonb default '[]',
  questions_to_ask    jsonb default '[]',
  created_at          timestamptz default now()
);

-- Vector similarity search function used by the chat API
create or replace function match_document_chunks(
  query_embedding    vector(1536),
  target_document_id uuid,
  match_count        int default 5
)
returns table (content text, similarity float)
language sql stable as $$
  select content,
         1 - (embedding <=> query_embedding) as similarity
  from   document_chunks
  where  document_id = target_document_id
  order  by embedding <=> query_embedding
  limit  match_count;
$$;
```

Then add your Supabase URL and service-role key to `.env.local`.

---

## 4. How to Run

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

### Usage

1. Navigate to **http://localhost:3000**
2. Click **"Upload your contract"** or go to `/upload`
3. Drag and drop a PDF contract, or click the drop zone to browse
4. Click **"Analyze Contract"** — the PDF is processed and you are redirected to the results page
5. Review the **verdict card** (SIGN / NEGOTIATE / DO NOT SIGN) and explore the four tabs:
   - **Overview** — plain-English summary and consequences of signing as-is
   - **Red Flags** — every concerning clause with severity badge and verbatim evidence
   - **Negotiation** — specific redline suggestions and questions to ask the other party
   - **Chat** — ask anything about the contract; answers cite exact source clauses

> **Note:** Without Supabase the app runs in in-memory mode. All data is lost when the server restarts — simply re-upload the contract to analyze it again.
