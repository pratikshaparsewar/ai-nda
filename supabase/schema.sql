-- Run this in your Supabase SQL editor

-- 1. Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Documents
CREATE TABLE IF NOT EXISTS documents (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename      TEXT NOT NULL,
  storage_path  TEXT NOT NULL,
  full_text     TEXT,
  chunk_count   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- 3. Analyses
CREATE TABLE IF NOT EXISTS analyses (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id         UUID REFERENCES documents(id) ON DELETE CASCADE,
  decision            TEXT NOT NULL,
  risk_score          INTEGER NOT NULL,
  risk_level          TEXT NOT NULL,
  summary             TEXT NOT NULL,
  red_flags           JSONB    DEFAULT '[]',
  consequences        TEXT[]   DEFAULT '{}',
  negotiation_advice  TEXT[]   DEFAULT '{}',
  questions_to_ask    TEXT[]   DEFAULT '{}',
  created_at          TIMESTAMPTZ DEFAULT now()
);

-- 4. Document chunks + embeddings
CREATE TABLE IF NOT EXISTS document_chunks (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id  UUID REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index  INTEGER NOT NULL,
  content      TEXT NOT NULL,
  embedding    vector(1536),
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx
  ON document_chunks USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- 5. Similarity search function used by /api/chat
CREATE OR REPLACE FUNCTION match_document_chunks(
  query_embedding    vector(1536),
  target_document_id UUID,
  match_count        INT DEFAULT 5
)
RETURNS TABLE (
  id          UUID,
  content     TEXT,
  chunk_index INTEGER,
  similarity  FLOAT
)
LANGUAGE sql STABLE
AS $$
  SELECT
    id,
    content,
    chunk_index,
    1 - (embedding <=> query_embedding) AS similarity
  FROM document_chunks
  WHERE document_id = target_document_id
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- 6. Also create the storage bucket via dashboard:
--    Storage → New bucket → name: "contracts" → private
