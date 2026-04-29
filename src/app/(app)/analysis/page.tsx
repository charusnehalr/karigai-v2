'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { StatDisplay } from '@/components/ui/StatDisplay'
import { SafetyBanner } from '@/components/ui/SafetyBanner'
import { Chip } from '@/components/ui/Chip'
import { Skeleton } from '@/components/ui/Skeleton'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface Analysis {
  bmi?: number; bmiCategory?: string; whr?: number | null; bri?: number | null
  bmr?: number; tdee?: number; calorieTarget?: number; proteinTarget?: number
  waterTargetMl?: number; cyclePhase?: string; cycleDay?: number | null
  cycleConfidence?: string; nextPeriodEstimate?: string | null; goalSummary?: string
  setupProgress?: number; incomplete?: boolean; message?: string
}

const metricInfo: Record<string, { title: string; what: string; why: string }> = {
  bmi: {
    title: 'BMI',
    what: 'Body Mass Index is calculated from your height and weight.',
    why: 'A general population tool. Karigai shows it as context, not a health judgement.',
  },
  whr: {
    title: 'WHR',
    what: 'Waist-to-Hip Ratio compares waist and hip measurements.',
    why: 'Used as one of several wellness estimates. Not diagnostic.',
  },
  bri: {
    title: 'BRI',
    what: 'Body Roundness Index factors in waist circumference and height.',
    why: 'A newer wellness estimate that may better account for body shape.',
  },
  bmr: {
    title: 'BMR',
    what: 'Basal Metabolic Rate — calories your body needs at rest (Mifflin-St Jeor formula).',
    why: 'Base for calculating your daily calorie target.',
  },
  tdee: {
    title: 'TDEE',
    what: 'Total Daily Energy Expenditure — estimated calories you burn per day.',
    why: 'Estimated from BMR × activity multiplier based on your workout frequency.',
  },
}

export default function AnalysisPage() {
  const [data, setData] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analysis').then(r => r.json()).then(d => { setData(d); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-card" />)}
      </div>
    </div>
  )

  const d = data!

  if (d.incomplete) return (
    <div className="space-y-6">
      <PageHeader title="Analysis" subtitle="Your wellness metrics" />
      <Card className="text-center py-12">
        <p className="font-body text-sm text-ink2 mb-2">{d.message}</p>
        <Link href="/app/setup"><Button variant="accent">Complete setup →</Button></Link>
      </Card>
    </div>
  )

  const phaseChipTone = (phase?: string) => {
    if (phase === 'Menstrual') return 'blush' as const
    if (phase === 'Follicular') return 'sage' as const
    if (phase === 'Ovulation') return 'clay' as const
    if (phase === 'Luteal') return 'amber' as const
    return 'neutral' as const
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Analysis" subtitle="Your personalised wellness metrics" eyebrow="Health overview" />

      <SafetyBanner
        tone="info"
        title="Wellness estimates, not medical diagnosis"
        body="Numbers like BMI are general population tools and do not account for individual body composition. They are shown here as context for your personalised plan. Always consult a healthcare professional for medical concerns."
      />

      {/* Body metrics */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-3">Body metrics</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {d.bmi != null && (
            <Card>
              <StatDisplay value={d.bmi} label="BMI" sublabel={d.bmiCategory} size="md" />
              <p className="mt-2 font-body text-xs text-muted leading-relaxed">{metricInfo.bmi.what}</p>
            </Card>
          )}
          {d.whr != null && (
            <Card>
              <StatDisplay value={d.whr} label="Waist-Hip Ratio" size="md" />
              <p className="mt-2 font-body text-xs text-muted leading-relaxed">{metricInfo.whr.what}</p>
            </Card>
          )}
          {d.bri != null && (
            <Card>
              <StatDisplay value={d.bri} label="Body Roundness Index" size="md" />
              <p className="mt-2 font-body text-xs text-muted leading-relaxed">{metricInfo.bri.what}</p>
            </Card>
          )}
        </div>
      </div>

      {/* Energy targets */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-3">Daily targets</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {d.bmr != null && (
            <Card>
              <StatDisplay value={d.bmr} unit="kcal" label="BMR" sublabel="at rest" size="md" />
              <p className="mt-2 font-body text-xs text-muted">{metricInfo.bmr.what}</p>
            </Card>
          )}
          {d.tdee != null && (
            <Card>
              <StatDisplay value={d.tdee} unit="kcal" label="TDEE" sublabel="daily burn" size="md" />
              <p className="mt-2 font-body text-xs text-muted">{metricInfo.tdee.what}</p>
            </Card>
          )}
          {d.calorieTarget != null && (
            <Card>
              <StatDisplay value={d.calorieTarget} unit="kcal" label="Calorie target" sublabel={d.goalSummary} size="md" />
              <p className="mt-2 font-body text-xs text-muted">Adjusted for your goal and health context.</p>
            </Card>
          )}
          {d.proteinTarget != null && (
            <Card>
              <StatDisplay value={d.proteinTarget} unit="g" label="Protein target" sublabel="daily" size="md" />
              <p className="mt-2 font-body text-xs text-muted">Based on body weight and your goal.</p>
            </Card>
          )}
          {d.waterTargetMl != null && (
            <Card>
              <StatDisplay value={(d.waterTargetMl / 1000).toFixed(1)} unit="L" label="Water target" sublabel="daily" size="md" />
              <p className="mt-2 font-body text-xs text-muted">33ml per kg of body weight.</p>
            </Card>
          )}
        </div>
      </div>

      {/* Cycle */}
      {d.cyclePhase && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-3">Cycle estimate</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Card>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">Current phase</p>
              <div className="flex items-center gap-2">
                <Chip tone={phaseChipTone(d.cyclePhase)}>{d.cyclePhase}</Chip>
                {d.cycleConfidence && <Chip tone="neutral">{d.cycleConfidence} confidence</Chip>}
              </div>
              {d.cycleDay != null && <p className="mt-2 font-body text-xs text-muted">Day {d.cycleDay} of cycle</p>}
            </Card>
            {d.nextPeriodEstimate && (
              <Card>
                <StatDisplay value={new Date(d.nextPeriodEstimate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} label="Next period estimate" sublabel="approximate" />
                <p className="mt-2 font-body text-xs text-muted">Based on your last period start and average cycle length.</p>
              </Card>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Link href="/app/cycle"><Button variant="ghost">View cycle tracker →</Button></Link>
        <Link href="/app/setup"><Button variant="ghost">Update setup →</Button></Link>
      </div>
    </div>
  )
}
