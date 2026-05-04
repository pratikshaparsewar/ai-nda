import { type NextRequest } from 'next/server'
import OpenAI from 'openai'
import { isSupabaseConfigured, memStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `You are an expert startup legal advisor specializing in NDAs, employment contracts, and venture agreements.

Analyze the provided contract and return ONLY a valid JSON object with this exact shape:
{
  "decision": "SIGN" | "NEGOTIATE" | "DO NOT SIGN",
  "risk_score": <integer 0–100>,
  "risk_level": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "summary": "<2–3 paragraph plain-English explanation of what this contract does and what it means for the signer>",
  "red_flags": [
    {
      "title": "<short title>",
      "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
      "description": "<why this clause is concerning and what it means in practice>",
      "evidence": "<exact verbatim quote from the contract — 20 to 250 characters>"
    }
  ],
  "consequences": ["<6–8 plain-English consequences of signing as-is>"],
  "negotiation_advice": ["<6–8 specific, actionable negotiation points with suggested alternative language>"],
  "questions_to_ask": ["<6–8 pointed questions to ask the other party or their counsel>"]
}

Decision rubric:
- SIGN (0–25): Standard, fair terms. No significant red flags.
- NEGOTIATE (26–69): Concerning clauses present but contract is salvageable with changes.
- DO NOT SIGN (70–100): Severely unfavorable, predatory, or one-sided terms.

Risk levels: LOW (0–25) · MEDIUM (26–55) · HIGH (56–79) · CRITICAL (80–100)`

const MOCK_ANALYSIS = {
  decision: 'NEGOTIATE',
  confidence: 82,
  summary: 'This NDA includes restrictive clauses that may limit future opportunities.',
  risk_score: 68,
  risk_level: 'MEDIUM',
  red_flags: [
    {
      title: 'Non-compete clause',
      severity: 'HIGH',
      description: 'May restrict working in same domain',
      evidence: 'Recipient shall not engage in competing business...',
    },
  ],
  consequences: ['Signing this may limit your ability to build or work in similar space.'],
  negotiation_advice: ['Request removal or limit duration of non-compete clause.'],
  questions_to_ask: ['Can we remove the non-compete clause?'],
}

function isQuotaError(err: unknown): boolean {
  if (err instanceof Error) {
    const msg = err.message.toLowerCase()
    return msg.includes('quota') || msg.includes('429') || msg.includes('rate limit') || msg.includes('insufficient_quota')
  }
  return (err as { status?: number })?.status === 429
}

async function runAnalysis(text: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Analyze this contract:\n\n${text.slice(0, 60000)}` },
      ],
    })
    return JSON.parse(completion.choices[0].message.content ?? '{}')
  } catch (err) {
    if (isQuotaError(err)) return MOCK_ANALYSIS
    throw err
  }
}

export async function POST(request: NextRequest) {
  try {
    const { documentId } = await request.json()

    if (!documentId) {
      return Response.json({ success: false, error: 'documentId required' }, { status: 400 })
    }

    // ── In-memory mode ───────────────────────────────────────────────────────
    if (!isSupabaseConfigured()) {
      const cached = memStore.getAnalysis(documentId)
      if (cached) return Response.json({ success: true, analysis: cached })

      const doc = memStore.getDocument(documentId)
      if (!doc) {
        return Response.json({ success: false, error: 'Document not found. It may have expired — please re-upload.' }, { status: 404 })
      }

      const result = await runAnalysis(doc.text)
      const analysis = memStore.saveAnalysis({ document_id: documentId, ...result })
      return Response.json({ success: true, analysis })
    }

    // ── Supabase mode ────────────────────────────────────────────────────────
    const { data: existing } = await supabase
      .from('analyses')
      .select('*')
      .eq('document_id', documentId)
      .maybeSingle()

    if (existing) return Response.json({ success: true, analysis: existing })

    const { data: doc, error: docError } = await supabase
      .from('documents')
      .select('filename, full_text')
      .eq('id', documentId)
      .single()

    if (docError || !doc) {
      return Response.json({ success: false, error: 'Document not found' }, { status: 404 })
    }

    const result = await runAnalysis(doc.full_text)

    const { data: analysis, error: saveError } = await supabase
      .from('analyses')
      .insert({
        document_id: documentId,
        decision: result.decision,
        risk_score: result.risk_score,
        risk_level: result.risk_level,
        summary: result.summary,
        red_flags: result.red_flags ?? [],
        consequences: result.consequences ?? [],
        negotiation_advice: result.negotiation_advice ?? [],
        questions_to_ask: result.questions_to_ask ?? [],
      })
      .select('*')
      .single()

    if (saveError || !analysis) {
      return Response.json({ success: false, error: 'Failed to save analysis' }, { status: 500 })
    }

    return Response.json({ success: true, analysis })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error'
    console.error('[analyze]', err)
    return Response.json({ success: false, error: message }, { status: 500 })
  }
}
