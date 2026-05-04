import { randomUUID } from 'crypto'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StoredDocument {
  id: string
  filename: string
  text: string
  chunks: string[]
}

export interface StoredAnalysis {
  id: string
  document_id: string
  decision: string
  risk_score: number
  risk_level: string
  summary: string
  red_flags: object[]
  consequences: string[]
  negotiation_advice: string[]
  questions_to_ask: string[]
}

// ─── Config check ─────────────────────────────────────────────────────────────

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  return url.startsWith('https://') && url.includes('.supabase.')
}

// ─── In-memory store (used when Supabase is not configured) ──────────────────

const docMap = new Map<string, StoredDocument>()
const analysisMap = new Map<string, StoredAnalysis>()

export const memStore = {
  saveDocument(record: Omit<StoredDocument, 'id'>): StoredDocument {
    const doc: StoredDocument = { ...record, id: randomUUID() }
    docMap.set(doc.id, doc)
    return doc
  },

  getDocument(id: string): StoredDocument | null {
    return docMap.get(id) ?? null
  },

  saveAnalysis(record: Omit<StoredAnalysis, 'id'>): StoredAnalysis {
    const analysis: StoredAnalysis = { ...record, id: randomUUID() }
    analysisMap.set(record.document_id, analysis)
    return analysis
  },

  getAnalysis(documentId: string): StoredAnalysis | null {
    return analysisMap.get(documentId) ?? null
  },

  getChunks(documentId: string): string[] {
    return docMap.get(documentId)?.chunks ?? []
  },
}

// ─── Simple keyword relevance search (replaces pgvector when offline) ─────────

export function findRelevantChunks(chunks: string[], query: string, count = 5): string[] {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 3)
  if (words.length === 0) return chunks.slice(0, count)
  return chunks
    .map(chunk => ({
      chunk,
      score: words.reduce((s, w) => s + (chunk.toLowerCase().includes(w) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(x => x.chunk)
}
