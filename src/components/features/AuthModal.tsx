'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { KarigaiLogo } from '@/components/ui/KarigaiLogo'
import { useAuthModalStore } from '@/store/auth-modal.store'
import { createClient } from '@/lib/supabase/client'

export function AuthModal() {
  const { open, mode, closeModal, setMode } = useAuthModalStore()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const reset = () => { setEmail(''); setPassword(''); setError('') }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    try {
      if (mode === 'signup') {
        const { error: err } = await supabase.auth.signUp({ email, password })
        if (err) { setError(err.message); return }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) { setError(err.message); return }
      }
      closeModal()
      reset()
      router.push('/app/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleDemo = async () => {
    setLoading(true)
    setError('')
    const supabase = createClient()
    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: 'demo@karigai.app',
        password: 'demo1234',
      })
      if (err) { setError('Demo account unavailable. Please create an account.'); return }
      closeModal()
      reset()
      router.push('/app/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={() => { closeModal(); reset() }}>
      <div className="p-7">
        <div className="flex justify-center mb-6">
          <KarigaiLogo size={20} tagline />
        </div>

        <div className="flex gap-1 p-1 bg-shell rounded-xl mb-6">
          {(['login', 'signup'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              className={`flex-1 py-2 rounded-lg font-body text-sm font-medium transition-all ${
                mode === m ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink2'
              }`}
            >
              {m === 'login' ? 'Sign in' : 'Create account'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
          />

          {error && (
            <p className="font-body text-xs text-alert bg-alert/10 px-3 py-2 rounded-lg">{error}</p>
          )}

          <Button type="submit" variant="accent" className="w-full" loading={loading}>
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </Button>
        </form>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-hairline" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">or</span>
          <div className="flex-1 h-px bg-hairline" />
        </div>

        <Button
          variant="ghost"
          className="w-full mt-4"
          onClick={handleDemo}
          loading={loading}
        >
          Continue as demo
        </Button>

        <p className="font-body text-[11px] text-muted text-center mt-4 leading-relaxed">
          Karigai is a wellness app. We do not provide medical advice.
        </p>
      </div>
    </Modal>
  )
}
