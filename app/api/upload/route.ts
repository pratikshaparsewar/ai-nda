import { type NextRequest } from 'next/server'
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import OpenAI from 'openai'
import { isSupabaseConfigured, memStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import { extractTextViaOCR } from '@/lib/ocr'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return Response.json({ success: false, error: 'No file provided' }, { status: 400 })
    }
    if (file.type !== 'application/pdf') {
      return Response.json({ success: false, error: 'File must be a PDF' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Try fast text extraction first; fall back to GPT-4o Vision OCR for scanned PDFs
    let { text } = await pdfParse(buffer)
    if (!text || text.trim().length < 10) {
      text = await extractTextViaOCR(buffer, openai)
    }

    if (!text || text.trim().length < 10) {
      return Response.json({ success: false, error: 'Could not extract text from PDF.' }, { status: 422 })
    }

    // Chunk text
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 })
    const docs = await splitter.createDocuments([text])
    const chunks = docs.map(d => d.pageContent)

    // ── In-memory mode (no Supabase) ─────────────────────────────────────────
    if (!isSupabaseConfigured()) {
      const doc = memStore.saveDocument({ filename: file.name, text, chunks })
      return Response.json({ success: true, documentId: doc.id })
    }

    // ── Full Supabase mode ───────────────────────────────────────────────────
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const storagePath = `contracts/${Date.now()}-${safeName}`

    await supabase.storage.createBucket('contracts', { public: false }).catch(() => {})

    const { error: uploadError } = await supabase.storage
      .from('contracts')
      .upload(storagePath, buffer, { contentType: 'application/pdf' })

    if (uploadError) {
      return Response.json({ success: false, error: 'Storage upload failed: ' + uploadError.message }, { status: 500 })
    }

    const { data: savedDoc, error: docError } = await supabase
      .from('documents')
      .insert({ filename: file.name, storage_path: storagePath, full_text: text })
      .select('id')
      .single()

    if (docError || !savedDoc) {
      return Response.json({ success: false, error: 'Failed to save document: ' + (docError?.message ?? 'unknown') }, { status: 500 })
    }

    const embeddingRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunks,
    })
    const embeddings = embeddingRes.data.map(e => e.embedding)

    const { error: chunksError } = await supabase.from('document_chunks').insert(
      chunks.map((chunk, i) => ({
        document_id: savedDoc.id,
        chunk_index: i,
        content: chunk,
        embedding: embeddings[i],
      }))
    )

    if (!chunksError) {
      await supabase.from('documents').update({ chunk_count: chunks.length }).eq('id', savedDoc.id)
    }

    return Response.json({ success: true, documentId: savedDoc.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error'
    console.error('[upload]', err)
    return Response.json({ success: false, error: message }, { status: 500 })
  }
}
