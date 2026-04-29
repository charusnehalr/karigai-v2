'use client'
import { useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { SafetyBanner } from '@/components/ui/SafetyBanner'
import { Skeleton } from '@/components/ui/Skeleton'
import { PageHeader } from '@/components/ui/PageHeader'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Select } from '@/components/ui/Select'
import { useToastStore } from '@/store/toast.store'
import { cn } from '@/lib/utils'
import { Moon, CalendarDays, TrendingUp } from 'lucide-react'

const SYMPTOMS = ['Cramps','Bloating','Fatigue','Acne','Mood changes','Cravings','Spotting','Headaches','Back pain','Nausea']
const MOODS = ['Happy','Calm','Anxious','Sad','Irritable','Energetic','Tired']
const FLOW_OPTS = [{ value: 'light', label: 'Light' }, { value: 'moderate', label: 'Moderate' }, { value: 'heavy', label: 'Heavy' }]
const phaseColors: Record<string, { bg: string; text: string; ring: string }> = {
  Menstrual: { bg: '#FDF0EE', text: '#C25450', ring: '#E8B4A8' },
  Follicular: { bg: '#F0F3EE', text: '#5A7A4A', ring: '#CFD4C3' },
  Ovulation: { bg: '#FAF0E6', text: '#B8704F', ring: '#E9C8B5' },
  Luteal: { bg: '#FAF0E6', text: '#8B5E3C', ring: '#D4A574' },
  Unknown: { bg: '#F5EFE6', text: '#7A7066', ring: '#E8DCC8' },
}

export default function CyclePage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [logForm, setLogForm] = useState({ is_period_day: false, flow_level: '', pain_score: 0, energy_score: 5, mood: '', notes: '' })
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const { addToast } = useToastStore()

  const fetchCycle = useCallback(async () => {
    const res = await fetch('/api/cycle')
    const json = await res.json()
    setData(json)
    setLoading(false)
  }, [])

  useEffect(() => { fetchCycle() }, [fetchCycle])

  const handleSaveLog = async () => {
    setSaving(true)
    const res = await fetch('/api/cycle/log', {
      method: 'POST',
      body: JSON.stringify({ ...logForm, symptoms: selectedSymptoms }),
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await res.json()
    if (json.success) {
      addToast('Cycle log saved!', 'success')
      await fetchCycle()
    } else {
      addToast(json.error ?? 'Failed to save', 'error')
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Skeleton className="h-64 rounded-card" />
        <Skeleton className="h-64 rounded-card" />
      </div>
    </div>
  )

  const summary = (data as Record<string, Record<string, unknown>>)?.summary ?? {}
  const logs = ((data as Record<string, unknown[]>)?.logs ?? []) as Record<string, unknown>[]
  const phase = (summary.phase as string) ?? 'Unknown'
  const colors = phaseColors[phase] ?? phaseColors.Unknown
  const confidence = summary.confidence as string
  const cycleDay = summary.cycleDay as number | null
  const daysUntilNext = summary.daysUntilNextPeriod as number | null
  const desc = summary.phaseDescription as string

  const showPainAlert = logForm.pain_score >= 8
  const showBleedingAlert = logForm.is_period_day && logForm.flow_level === 'heavy' && selectedSymptoms.includes('Fatigue')

  return (
    <div className="space-y-6">
      <PageHeader title="Cycle Tracker" subtitle="Track your phases, symptoms, and patterns" eyebrow="Cycle health" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Phase summary */}
        <Card style={{ background: colors.bg, borderColor: colors.ring }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: colors.ring + '60' }}>
              <Moon className="w-6 h-6" style={{ color: colors.text }} />
            </div>
            <div className="flex-1">
              <Eyebrow>Current phase</Eyebrow>
              <h2 className="font-display italic text-2xl mt-1 mb-1" style={{ color: colors.text }}>{phase}</h2>
              <div className="flex items-center gap-2 mb-3">
                {cycleDay != null && <Chip tone="neutral">Day {cycleDay}</Chip>}
                <Chip tone="neutral">{confidence} confidence</Chip>
              </div>
              <p className="font-body text-sm text-ink2 leading-relaxed">{desc}</p>
            </div>
          </div>

          {daysUntilNext != null && (
            <div className="mt-4 pt-4 border-t border-hairline flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-muted" />
              <span className="font-body text-xs text-muted">
                {daysUntilNext === 0 ? 'Period may start today' : `Next period in ~${daysUntilNext} days`}
              </span>
            </div>
          )}

          {confidence === 'low' && (
            <SafetyBanner tone="info" title="Low confidence prediction" body="Your cycle is set to irregular. Predictions are estimates only — symptom tracking is especially useful." className="mt-3" />
          )}
        </Card>

        {/* Today's log form */}
        <Card>
          <Eyebrow>Log today</Eyebrow>
          <div className="mt-3 space-y-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLogForm(f => ({ ...f, is_period_day: !f.is_period_day }))}
                className={cn('px-4 py-2 rounded-xl border font-body text-sm font-medium transition-all', logForm.is_period_day ? 'bg-blush/40 border-blush text-ink2' : 'bg-shell border-hairline text-muted')}
              >
                {logForm.is_period_day ? '🔴 Period day' : 'Period day?'}
              </button>
            </div>

            {logForm.is_period_day && (
              <Select label="Flow level" value={logForm.flow_level} onChange={e => setLogForm(f => ({ ...f, flow_level: e.target.value }))} options={FLOW_OPTS} placeholder="Select…" />
            )}

            <div>
              <p className="font-body text-sm font-medium text-ink2 mb-2">Pain score: <span className="text-clay">{logForm.pain_score}/10</span></p>
              <input type="range" min={0} max={10} value={logForm.pain_score} onChange={e => setLogForm(f => ({ ...f, pain_score: Number(e.target.value) }))}
                className="w-full accent-clay" />
            </div>

            <div>
              <p className="font-body text-sm font-medium text-ink2 mb-2">Energy: <span className="text-clay">{logForm.energy_score}/10</span></p>
              <div className="flex gap-1">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <button key={n} onClick={() => setLogForm(f => ({ ...f, energy_score: n }))}
                    className={cn('flex-1 py-1.5 rounded-lg font-body text-xs font-medium transition-all', logForm.energy_score === n ? 'bg-clay text-cream' : 'bg-shell text-muted hover:bg-bone')}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-body text-sm font-medium text-ink2 mb-2">Symptoms</p>
              <div className="flex flex-wrap gap-2">
                {SYMPTOMS.map(s => (
                  <button key={s} type="button" onClick={() => setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                    className={cn('px-2.5 py-1 rounded-chip border font-body text-xs font-medium transition-all', selectedSymptoms.includes(s) ? 'bg-clay text-cream border-clay' : 'bg-shell text-ink2 border-hairline hover:border-clay/50')}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-body text-sm font-medium text-ink2 mb-2">Mood</p>
              <div className="flex flex-wrap gap-2">
                {MOODS.map(m => (
                  <button key={m} type="button" onClick={() => setLogForm(f => ({ ...f, mood: f.mood === m ? '' : m }))}
                    className={cn('px-2.5 py-1 rounded-chip border font-body text-xs font-medium transition-all', logForm.mood === m ? 'bg-sageSoft border-sage text-ink' : 'bg-shell text-ink2 border-hairline hover:border-sage/50')}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {showPainAlert && (
              <SafetyBanner tone="alert" title="Severe pain noted" body="Period pain at this level can sometimes indicate conditions worth discussing with a doctor. Consider speaking with a healthcare professional if this is recurring." />
            )}
            {showBleedingAlert && (
              <SafetyBanner tone="alert" title="Heavy flow with fatigue" body="Heavy bleeding combined with fatigue may need medical attention. Please consider speaking with a healthcare professional." />
            )}

            <Button variant="accent" onClick={handleSaveLog} loading={saving} className="w-full">
              Save today's log
            </Button>
          </div>
        </Card>
      </div>

      {/* History */}
      {logs.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-clay" />
            <Eyebrow>Recent logs</Eyebrow>
          </div>
          <div className="space-y-2">
            {logs.slice(0, 14).map((log) => (
              <div key={log.id as string} className="flex items-center gap-3 py-2 border-b border-hairline last:border-0">
                <div className={cn('w-2 h-2 rounded-full flex-shrink-0', log.is_period_day ? 'bg-alert' : 'bg-hairline')} />
                <span className="font-mono text-[10px] text-muted w-20 flex-shrink-0">{new Date(log.date as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                {log.pain_score != null && <Chip tone="blush">Pain {log.pain_score as number}/10</Chip>}
                {log.energy_score != null && <Chip tone="sage">Energy {log.energy_score as number}/10</Chip>}
                {log.mood != null && <Chip tone="neutral">{String(log.mood)}</Chip>}
                {(log.symptoms as string[])?.slice(0, 2).map((s: string) => <Chip key={s} tone="bone">{s}</Chip>)}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
