'use client'
import { useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Skeleton } from '@/components/ui/Skeleton'
import { SafetyBanner } from '@/components/ui/SafetyBanner'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { CheckCircle2, Circle, Droplets, Dumbbell, UtensilsCrossed, Moon, ArrowRight, Zap } from 'lucide-react'
import type { DashboardResponse } from '@/types/health'

const phaseColors: Record<string, string> = {
  Menstrual: '#E8B4A8',
  Follicular: '#CFD4C3',
  Ovulation: '#E9C8B5',
  Luteal: '#B8704F',
  Unknown: '#7A7066',
}

const QUICK_CHIPS = ['Fatigue', 'Cramps', 'Bloating', 'Headache', 'Cravings', 'Good energy', 'Low mood']

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [energy, setEnergy] = useState<number | null>(null)
  const [chips, setChips] = useState<string[]>([])
  const [savingLog, setSavingLog] = useState(false)
  const [waterLoading, setWaterLoading] = useState(false)

  const fetchDashboard = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/dashboard')
      const json = await res.json()
      setData(json)
      if (json.logs?.energyScore) setEnergy(json.logs.energyScore)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchDashboard() }, [fetchDashboard])

  const handleWater = async () => {
    setWaterLoading(true)
    await fetch('/api/water', { method: 'POST', body: JSON.stringify({ amount: 250 }), headers: { 'Content-Type': 'application/json' } })
    await fetchDashboard()
    setWaterLoading(false)
  }

  const handleSaveLog = async () => {
    if (!energy) return
    setSavingLog(true)
    await fetch('/api/cycle/log', {
      method: 'POST',
      body: JSON.stringify({ energy_score: energy, symptoms: chips }),
      headers: { 'Content-Type': 'application/json' },
    })
    await fetchDashboard()
    setSavingLog(false)
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  if (loading) return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-40 rounded-card" />)}
      </div>
    </div>
  )

  const d = data!
  const pf = d.personalizationFactors
  const plan = d.todayPlan
  const logs = d.logs

  const caloriePercent = plan.calorieTarget ? logs.caloriesConsumed / plan.calorieTarget : 0
  const proteinPercent = plan.proteinTarget ? logs.proteinConsumed / plan.proteinTarget : 0
  const waterPercent = plan.waterTargetMl ? logs.waterMl / plan.waterTargetMl : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{today}</p>
          <h1 className="font-display italic text-3xl text-ink mt-1">Good day</h1>
          <p className="font-body text-sm text-muted mt-0.5">{d.insight}</p>
        </div>
        {d.setupProgress < 100 && (
          <Link href="/app/setup">
            <div className="flex items-center gap-2 bg-card border border-hairline rounded-xl px-3 py-2 hover:bg-shell transition-colors">
              <ProgressRing value={d.setupProgress / 100} size={32} stroke={3} />
              <div>
                <p className="font-body text-xs font-medium text-ink">{d.setupProgress}% setup</p>
                <p className="font-mono text-[9px] text-muted uppercase tracking-widest">Complete →</p>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Pregnancy / ED banner */}
      {d.personalizationFactors.healthContext?.includes('Pregnant') && (
        <SafetyBanner tone="warn" title="Pregnancy mode active" body="Fasting is disabled and workout intensity is reduced. Consult your healthcare provider before making changes." />
      )}

      {/* Row 1: Personalization factors + Cycle + Nutrition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Personalization factors */}
        <Card className="lg:col-span-1">
          <Eyebrow>What Karigai considered today</Eyebrow>
          <div className="mt-3 space-y-2.5">
            {pf.cyclePhase && (
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-muted w-24 flex-shrink-0">Cycle phase</span>
                <Chip tone="blush">{pf.cyclePhase}</Chip>
                {pf.cycleConfidence === 'low' && <span className="font-mono text-[9px] text-muted uppercase">low confidence</span>}
              </div>
            )}
            {pf.goal && (
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-muted w-24 flex-shrink-0">Goal</span>
                <Chip tone="ink">{pf.goal.replace(/_/g, ' ')}</Chip>
              </div>
            )}
            {pf.dietType && (
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-muted w-24 flex-shrink-0">Diet</span>
                <Chip tone="sage">{pf.dietType}</Chip>
              </div>
            )}
            {pf.healthContext.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="font-body text-xs text-muted w-24 flex-shrink-0 pt-0.5">Health context</span>
                <div className="flex flex-wrap gap-1.5">
                  {pf.healthContext.map((c) => <Chip key={c} tone="amber">{c}</Chip>)}
                </div>
              </div>
            )}
            {pf.fasting && (
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-muted w-24 flex-shrink-0">Fasting</span>
                <Chip tone="clay">{pf.fasting}</Chip>
              </div>
            )}
            {pf.fitnessOptions.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="font-body text-xs text-muted w-24 flex-shrink-0 pt-0.5">Workout access</span>
                <div className="flex flex-wrap gap-1.5">
                  {pf.fitnessOptions.slice(0, 3).map((f) => <Chip key={f} tone="neutral">{f}</Chip>)}
                </div>
              </div>
            )}
            {pf.symptomsToday.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="font-body text-xs text-muted w-24 flex-shrink-0 pt-0.5">Today symptoms</span>
                <div className="flex flex-wrap gap-1.5">
                  {pf.symptomsToday.map((s) => <Chip key={s} tone="blush">{s}</Chip>)}
                </div>
              </div>
            )}
            {!pf.cyclePhase && !pf.goal && (
              <p className="font-body text-xs text-muted">Complete setup to see your personalisation factors.</p>
            )}
          </div>
        </Card>

        {/* Cycle phase */}
        <Card>
          <Eyebrow>Cycle</Eyebrow>
          {pf.cyclePhase && pf.cyclePhase !== 'Unknown' ? (
            <div className="mt-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: phaseColors[pf.cyclePhase] + '30' }}>
                  <Moon className="w-5 h-5" style={{ color: phaseColors[pf.cyclePhase] }} />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-ink">{pf.cyclePhase}</p>
                  {pf.cycleConfidence && (
                    <p className="font-mono text-[9px] uppercase tracking-widest text-muted">{pf.cycleConfidence} confidence</p>
                  )}
                </div>
              </div>
              {plan.cycleNote && <p className="font-body text-xs text-muted leading-relaxed">{plan.cycleNote}</p>}
            </div>
          ) : (
            <div className="mt-3">
              <p className="font-body text-xs text-muted mb-3">Add your cycle info to see your current phase.</p>
              <Link href="/app/setup"><Button variant="ghost" size="sm">Set up cycle →</Button></Link>
            </div>
          )}
        </Card>

        {/* Nutrition summary */}
        <Card>
          <Eyebrow>Nutrition today</Eyebrow>
          <div className="mt-3 flex items-center gap-4">
            <ProgressRing value={caloriePercent} size={64} stroke={6}
              label={String(logs.caloriesConsumed)} sublabel="kcal"
              color="#B8704F" track="#EFE7DA" />
            <div className="flex-1 space-y-2">
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted">Protein</span>
                  <span className="font-body text-xs text-ink2">{Math.round(logs.proteinConsumed)}g / {plan.proteinTarget ?? '–'}g</span>
                </div>
                <div className="h-1 bg-shell rounded-full overflow-hidden">
                  <div className="h-full bg-sage rounded-full transition-all" style={{ width: `${Math.min(100, proteinPercent * 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted">Water</span>
                  <span className="font-body text-xs text-ink2">{logs.waterMl}ml / {plan.waterTargetMl ?? '–'}ml</span>
                </div>
                <div className="h-1 bg-shell rounded-full overflow-hidden">
                  <div className="h-full bg-[#89B4CC] rounded-full transition-all" style={{ width: `${Math.min(100, waterPercent * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Link href="/app/meals" className="flex-1">
              <Button variant="ghost" size="sm" className="w-full"><UtensilsCrossed className="w-3 h-3 mr-1" />Log meal</Button>
            </Link>
            <Button variant="soft" size="sm" onClick={handleWater} loading={waterLoading}>
              <Droplets className="w-3 h-3 mr-1" />+250ml
            </Button>
          </div>
        </Card>
      </div>

      {/* Row 2: Workout + Checklist + Condition notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Workout */}
        <Card>
          <Eyebrow>Workout today</Eyebrow>
          <div className="mt-3">
            {logs.workoutCompleted ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-sage" />
                <p className="font-body text-sm font-medium text-sage">Completed!</p>
              </div>
            ) : (
              <div>
                <p className="font-body text-sm text-ink2 mb-3">{plan.workoutName ?? 'No workout planned yet'}</p>
                <Link href="/app/workout">
                  <Button variant="accent" size="sm">
                    <Dumbbell className="w-3 h-3 mr-1" />View workout
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Card>

        {/* Daily checklist */}
        <Card>
          <Eyebrow>Today's checklist</Eyebrow>
          <ul className="mt-3 space-y-2">
            {d.checklist.map((item) => (
              <li key={item.id} className="flex items-center gap-2.5">
                {item.done
                  ? <CheckCircle2 className="w-4 h-4 text-sage flex-shrink-0" />
                  : <Circle className="w-4 h-4 text-muted flex-shrink-0" />
                }
                <span className={`font-body text-xs ${item.done ? 'text-muted line-through' : 'text-ink2'}`}>{item.label}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Condition notes */}
        <Card>
          <Eyebrow>Today's focus</Eyebrow>
          <div className="mt-3 space-y-2">
            {plan.conditionNotes.length > 0 ? (
              plan.conditionNotes.map((note, i) => (
                <p key={i} className="font-body text-xs text-ink2 leading-relaxed flex gap-2">
                  <span className="text-clay flex-shrink-0 mt-0.5">•</span>
                  {note}
                </p>
              ))
            ) : (
              <p className="font-body text-xs text-muted">Complete setup to get personalised daily notes.</p>
            )}
            {plan.fastingNote && (
              <div className="mt-2 pt-2 border-t border-hairline">
                <p className="font-body text-xs text-muted">{plan.fastingNote}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Energy check-in */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-amber" />
          <Eyebrow>How are you feeling today?</Eyebrow>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-body text-xs text-muted">Energy:</span>
          <div className="flex gap-1.5">
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <button
                key={n}
                onClick={() => setEnergy(n)}
                className={`w-7 h-7 rounded-full font-body text-xs font-medium transition-all ${
                  energy === n ? 'bg-clay text-cream' : 'bg-shell text-muted hover:bg-bone'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {QUICK_CHIPS.map((c) => (
            <button
              key={c}
              onClick={() => setChips((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c])}
              className={`px-2.5 py-1 rounded-chip border font-body text-xs font-medium transition-all ${
                chips.includes(c)
                  ? 'bg-clay text-cream border-clay'
                  : 'bg-shell text-ink2 border-hairline hover:border-clay/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {(energy || chips.length > 0) && (
          <Button variant="accent" size="sm" onClick={handleSaveLog} loading={savingLog}>
            Save check-in
          </Button>
        )}
      </Card>

      {/* Quick nav to chat */}
      <Link href="/app/chat">
        <Card hover className="flex items-center justify-between">
          <div>
            <p className="font-body text-sm font-medium text-ink">Ask Karigai anything</p>
            <p className="font-body text-xs text-muted mt-0.5">Why do I feel tired? What should I eat for lunch?</p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted flex-shrink-0" />
        </Card>
      </Link>
    </div>
  )
}
