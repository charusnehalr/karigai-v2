export interface ChatMessage {
  id: string
  user_id: string
  role: 'user' | 'assistant'
  message: string
  context_snapshot: Record<string, unknown> | null
  created_at: string
}

export interface ChatResponse {
  answer: string
  suggestions?: string[]
  safetyNote?: string
}
