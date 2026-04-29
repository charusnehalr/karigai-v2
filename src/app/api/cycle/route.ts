import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCycleDay, estimateCyclePhase, estimateNextPeriod, getCycleConfidence, phaseDescriptions } from '@/lib/cycle-engine'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [cycleProfile, recentLogs] = await Promise.all([
    supabase.from('cycle_profile').select('*').eq('user_id', user.id).single(),
    supabase.from('cycle_logs').select('*').eq('user_id', user.id)
      .order('date', { ascending: false }).limit(30),
  ])

  const cp = cycleProfile.data
  const today = new Date()

  let phase = 'Unknown'
  let cycleDay: number | null = null
  let nextPeriodDate: string | null = null
  let daysUntilNext: number | null = null
  const confidence = getCycleConfidence(cp?.cycle_regular ?? 'unsure')

  if (cp?.last_period_start) {
    const last = new Date(cp.last_period_start)
    const len = cp.average_cycle_length ?? 28
    cycleDay = getCycleDay(last, today, len)
    phase = estimateCyclePhase(cycleDay, len)
    const next = estimateNextPeriod(last, len)
    nextPeriodDate = next.toISOString().split('T')[0]
    daysUntilNext = Math.max(0, Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
  }

  return NextResponse.json({
    cycleProfile: cp,
    summary: {
      phase,
      cycleDay,
      confidence,
      nextPeriodDate,
      daysUntilNextPeriod: daysUntilNext,
      lastPeriodStart: cp?.last_period_start ?? null,
      averageCycleLength: cp?.average_cycle_length ?? 28,
      phaseDescription: phaseDescriptions[phase as keyof typeof phaseDescriptions] ?? phaseDescriptions.Unknown,
    },
    logs: recentLogs.data ?? [],
  })
}
