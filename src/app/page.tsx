'use client'
import { AuthModal } from '@/components/features/AuthModal'
import { KarigaiLogo } from '@/components/ui/KarigaiLogo'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { useAuthModalStore } from '@/store/auth-modal.store'
import { ToastContainer } from '@/components/ui/Toast'

const considerations = [
  { label: 'Cycle phase', tone: 'blush' as const },
  { label: 'PCOS / PCOD', tone: 'sage' as const },
  { label: 'Thyroid', tone: 'sage' as const },
  { label: 'Prediabetes', tone: 'sage' as const },
  { label: 'Iron deficiency', tone: 'amber' as const },
  { label: 'B12 deficiency', tone: 'amber' as const },
  { label: 'Vitamin D', tone: 'amber' as const },
  { label: 'Diet type', tone: 'clay' as const },
  { label: 'Fasting window', tone: 'clay' as const },
  { label: 'Fitness level', tone: 'neutral' as const },
  { label: 'Equipment access', tone: 'neutral' as const },
  { label: 'Injuries', tone: 'neutral' as const },
  { label: 'Goals', tone: 'ink' as const },
  { label: "Today's energy", tone: 'bone' as const },
]

const steps = [
  {
    num: '01',
    title: 'Tell us your context',
    body: 'Conditions, diet type, cycle history, fasting preferences, and fitness access. You set the terms.',
  },
  {
    num: '02',
    title: 'Get a personalised daily plan',
    body: 'Meals, workout, hydration, and cycle-aware guidance — built around you, every day.',
  },
  {
    num: '03',
    title: 'Track and refine',
    body: 'Log how you feel. The plan adapts as you do.',
  },
]

export default function LandingPage() {
  const { openModal } = useAuthModalStore()

  return (
    <div className="min-h-screen bg-paper">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <KarigaiLogo size={19} tagline />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => openModal('login')}>Sign in</Button>
          <Button variant="accent" size="sm" onClick={() => openModal('signup')}>Get started</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-6">wellness, attuned</p>
        <h1 className="font-display italic text-[clamp(52px,8vw,88px)] text-ink leading-[1.0] mb-6">
          karigai
        </h1>
        <p className="font-body text-xl text-ink2 font-medium mb-3 max-w-xl mx-auto">
          Wellness intelligence for women.
        </p>
        <p className="font-body text-base text-muted max-w-lg mx-auto leading-relaxed mb-10">
          Fitness, nutrition, cycle tracking, and daily guidance that adapts to your body — your conditions, your diet, your cycle.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="accent" size="lg" onClick={() => openModal('signup')}>
            Get started
          </Button>
          <Button variant="ghost" size="lg" onClick={() => openModal('login')}>
            Sign in
          </Button>
        </div>
      </section>

      {/* What Karigai considers */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-card rounded-card border border-hairline p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Personalised around</p>
          <h2 className="font-display italic text-2xl text-ink mb-6">What Karigai considers</h2>
          <div className="flex flex-wrap gap-2">
            {considerations.map((c) => (
              <Chip key={c.label} tone={c.tone}>{c.label}</Chip>
            ))}
          </div>
          <p className="font-body text-xs text-muted mt-5 leading-relaxed">
            Most wellness apps treat your body the same every day. Karigai connects your conditions, cycle, and choices into one adaptive plan.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Process</p>
        <h2 className="font-display italic text-2xl text-ink mb-8">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.num} className="bg-card rounded-card border border-hairline p-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-clay">{s.num}</span>
              <h3 className="font-body text-sm font-semibold text-ink mt-2 mb-2">{s.title}</h3>
              <p className="font-body text-xs text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety disclaimer */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="flex gap-3 rounded-2xl border border-[#D9CDB4] bg-[#EFE9DC] p-5">
          <div className="w-0.5 self-stretch rounded-full bg-clay flex-shrink-0" />
          <div>
            <p className="font-body text-xs font-semibold text-ink2 mb-1">A wellness app, not a medical product</p>
            <p className="font-body text-xs text-ink2 opacity-80 leading-relaxed">
              Karigai is a wellness app. We do not diagnose or treat medical conditions. All metrics are estimates. Always consult a healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <h2 className="font-display italic text-3xl text-ink mb-3">Start for free</h2>
        <p className="font-body text-sm text-muted mb-7">No credit card. No commitments.</p>
        <Button variant="accent" size="lg" onClick={() => openModal('signup')}>
          Create your account
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-hairline">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <KarigaiLogo size={15} />
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest">© 2026 Karigai</p>
        </div>
      </footer>

      <AuthModal />
      <ToastContainer />
    </div>
  )
}
