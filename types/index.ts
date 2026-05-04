export interface RedFlag {
  title: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  description: string
  evidence: string
}

export interface Analysis {
  id: string
  document_id: string
  decision: 'SIGN' | 'NEGOTIATE' | 'DO NOT SIGN'
  risk_score: number
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  summary: string
  red_flags: RedFlag[]
  consequences: string[]
  negotiation_advice: string[]
  questions_to_ask: string[]
  created_at: string
}

export interface DocumentRecord {
  id: string
  filename: string
  storage_path: string
  full_text: string
  chunk_count: number
  created_at: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
}
