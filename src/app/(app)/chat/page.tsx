'use client'
import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SafetyBanner } from '@/components/ui/SafetyBanner'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils'
import { Send, MessageCircle } from 'lucide-react'
import { KarigaiMark } from '@/components/ui/KarigaiLogo'

interface Message { id: string; role: 'user' | 'assistant'; message: string; created_at: string }

const QUICK_PROMPTS = [
  "Why do I feel tired today?",
  "What should I eat for dinner?",
  "Should I work out today?",
  "Why am I craving sweets?",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/chat').then(r => r.json()).then(d => {
      setMessages(d.messages ?? [])
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || sending) return
    const optimisticMsg: Message = { id: Date.now().toString(), role: 'user', message: text, created_at: new Date().toISOString() }
    setMessages(prev => [...prev, optimisticMsg])
    setInput('')
    setSending(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: text }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', message: data.answer ?? 'I couldn\'t generate a response. Please try again.', created_at: new Date().toISOString() }
    setMessages(prev => [...prev, assistantMsg])
    setSending(false)
  }

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input) }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">AI assistant</p>
        <h1 className="font-display italic text-3xl text-ink mt-1">Chat</h1>
        <p className="font-body text-xs text-muted mt-0.5">Ask anything about your wellness, meals, or cycle.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {loading ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => <Skeleton key={i} className={cn('h-16 rounded-2xl', i % 2 === 0 ? 'ml-auto w-2/3' : 'w-3/4')} />)}
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <KarigaiMark size={36} color="#B8704F" />
              <p className="font-display italic text-2xl text-ink mt-4 mb-1">Hello</p>
              <p className="font-body text-sm text-muted max-w-xs mb-8">Ask me about your energy, meals, workouts, or cycle. I know your context.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {QUICK_PROMPTS.map(p => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="px-4 py-3 rounded-xl border border-hairline bg-paper hover:bg-shell text-left font-body text-sm text-ink2 transition-all"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map(msg => (
                <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-claySoft flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                      <KarigaiMark size={14} color="#B8704F" />
                    </div>
                  )}
                  <div className={cn(
                    'max-w-[75%] px-4 py-3 rounded-2xl font-body text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-clay text-cream rounded-br-sm'
                      : 'bg-card border border-hairline text-ink2 rounded-bl-sm'
                  )}>
                    {msg.message}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-claySoft flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                    <KarigaiMark size={14} color="#B8704F" />
                  </div>
                  <div className="bg-card border border-hairline rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0,1,2].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Safety disclaimer */}
        <div className="px-5 pb-2">
          <p className="font-body text-[10px] text-muted text-center">Karigai provides wellness guidance, not medical advice. Always consult a healthcare professional for medical concerns.</p>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-hairline">
          {messages.length > 0 && messages.length < 3 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {QUICK_PROMPTS.map(p => (
                <button key={p} onClick={() => sendMessage(p)}
                  className="px-3 py-1.5 rounded-xl border border-hairline bg-paper hover:bg-shell font-body text-xs text-muted transition-all">
                  {p}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about your wellness..."
              className="flex-1 h-10 rounded-xl border border-hairline bg-paper px-4 font-body text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-clay/30 focus:border-clay transition-all"
              disabled={sending}
            />
            <Button type="submit" variant="accent" size="md" loading={sending} disabled={!input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
