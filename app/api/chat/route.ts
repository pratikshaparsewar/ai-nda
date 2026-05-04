import { type NextRequest } from 'next/server'
import OpenAI from 'openai'
import { isSupabaseConfigured, memStore, findRelevantChunks } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import type { ChatMessage } from '@/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const { documentId, message, history = [] } = (await request.json()) as {
      documentId: string
      message: string
      history: ChatMessage[]
    }

    if (!documentId || !message) {
      return Response.json({ success: false, error: 'documentId and message required' }, { status: 400 })
    }

    let sources: string[] = []

    // ── In-memory mode: keyword search over stored chunks ────────────────────
    if (!isSupabaseConfigured()) {
      const chunks = memStore.getChunks(documentId)
      sources = findRelevantChunks(chunks, message, 5)
    } else {
      // ── Supabase mode: pgvector semantic search ────────────────────────────
      const embeddingRes = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: message,
      })
      const queryEmbedding = embeddingRes.data[0].embedding

      const { data: chunks, error: searchError } = await supabase.rpc('match_document_chunks', {
        query_embedding: queryEmbedding,
        target_document_id: documentId,
        match_count: 5,
      })

      if (searchError) console.error('Vector search error:', searchError)
      sources = (chunks ?? []).map((c: { content: string }) => c.content)
    }

    const context = sources.length ? sources.join('\n\n---\n\n') : 'No relevant clauses found.'

    const systemPrompt = `You are a legal assistant helping analyze a specific contract or NDA.
Answer questions using ONLY the contract clauses provided below.
Be specific, direct, and practical. Always cite the clause you are referencing.
If the answer cannot be found in the provided clauses, say so clearly rather than guessing.

RELEVANT CONTRACT CLAUSES:
${context}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history
          .slice(-6)
          .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
        { role: 'user', content: message },
      ],
    })

    return Response.json({
      success: true,
      answer: completion.choices[0].message.content ?? '',
      sources,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error'
    console.error('[chat]', err)
    return Response.json({ success: false, error: message }, { status: 500 })
  }
}
