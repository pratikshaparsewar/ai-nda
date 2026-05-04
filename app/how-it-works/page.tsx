import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";

const STEPS = [
  {
    title: "Upload your PDF",
    desc: "Drag and drop any NDA, employment agreement, vendor contract, or legal document. Your file is processed in memory and never stored permanently.",
    tag: "You",
    tagColor: "bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  },
  {
    title: "Text extraction",
    desc: "pdf-parse reads the entire document, pulling every clause, section, and paragraph into raw text — preserving structure without losing any content.",
    tag: "pdf-parse",
    tagColor: "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    title: "Smart chunking",
    desc: "LangChain's RecursiveCharacterTextSplitter divides the text into overlapping 1,000-character segments. Overlap ensures no clause is split across chunk boundaries.",
    tag: "LangChain",
    tagColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    title: "Embedding generation",
    desc: "OpenAI's text-embedding-3-small encodes each chunk as a 1,536-dimensional vector — capturing semantic meaning, not just keywords. All vectors are stored in Supabase pgvector.",
    tag: "OpenAI",
    tagColor: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/></svg>,
  },
  {
    title: "RAG retrieval",
    desc: "When you ask a question in the chat, your query is embedded and compared against all chunks using cosine similarity. The top 5 most relevant clauses are retrieved and injected as grounded context.",
    tag: "pgvector",
    tagColor: "bg-teal-500/10 border-teal-500/20 text-teal-600 dark:text-teal-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  },
  {
    title: "AI verdict with evidence",
    desc: "GPT-4o reads the full contract text and returns a structured JSON verdict: decision, risk score, severity, summary, red flags with exact clause quotes, consequences, negotiation advice, and questions to ask.",
    tag: "GPT-4o",
    tagColor: "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  },
];

const TECH = [
  { name: "Next.js 16",   sub: "App Router + API routes"               },
  { name: "Supabase",     sub: "Postgres + Storage + pgvector"          },
  { name: "LangChain.js", sub: "Text splitting pipeline"                },
  { name: "OpenAI",       sub: "GPT-4o + text-embedding-3-small"        },
  { name: "Tailwind CSS", sub: "Premium dark & light UI"                },
  { name: "Vercel",       sub: "Edge deployment"                        },
];

export default function HowItWorksPage() {
  return (
    <>
      <MarketingNav />
      <main className="relative min-h-screen overflow-hidden pt-14">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px]">
          <div className="w-full h-full rounded-full bg-violet-600/8 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 py-24 flex flex-col gap-24">

          {/* Hero */}
          <FadeIn>
            <div className="flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 w-fit">
                How It Works
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.05]">
                Six steps from PDF
                <br />
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">to verdict.</span>
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Under the hood, Should I Sign This? runs a full RAG pipeline — embedding every clause, storing vectors in pgvector, and grounding every AI answer in actual contract text.
              </p>
            </div>
          </FadeIn>

          {/* Steps */}
          <div className="relative flex flex-col gap-0">
            <div className="absolute left-[19px] top-10 bottom-10 w-px bg-gradient-to-b from-zinc-300 dark:from-zinc-800 via-zinc-200 dark:via-zinc-800 to-transparent" />
            {STEPS.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.08}>
                <div className="relative flex gap-5 pb-10 last:pb-0">
                  <div className="relative flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 z-10">
                    <span className="text-xs font-bold text-zinc-500">{i + 1}</span>
                  </div>
                  <div className="flex-1 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 flex flex-col gap-4 hover:border-zinc-300 dark:hover:border-white/[0.09] transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400">
                          {step.icon}
                        </div>
                        <h3 className="font-bold text-zinc-800 dark:text-zinc-100">{step.title}</h3>
                      </div>
                      <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${step.tagColor}`}>
                        {step.tag}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Tech stack */}
          <FadeIn>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">Tech stack</h2>
                <p className="text-zinc-500 text-sm">Built for production from day one.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TECH.map(t => (
                  <div key={t.name} className="rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] px-4 py-3 flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{t.name}</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-600">{t.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn>
            <div className="rounded-2xl border border-violet-500/20 bg-violet-50 dark:bg-violet-500/[0.05] p-10 flex flex-col items-center gap-5 text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">See it in action.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed text-sm">Upload any contract and watch the full pipeline run in real time.</p>
              <Link href="/upload" className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-500 hover:-translate-y-0.5 transition-all">
                Try it now →
              </Link>
            </div>
          </FadeIn>

        </div>
      </main>
      <Footer />
    </>
  );
}
