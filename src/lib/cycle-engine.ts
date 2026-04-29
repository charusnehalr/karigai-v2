import type { CyclePhase } from '@/types/cycle'

export type { CyclePhase }

export function getCycleDay(lastPeriodStart: Date, today: Date, cycleLength = 28): number {
  const diff = Math.floor((today.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24))
  return (diff % cycleLength) + 1
}

export function estimateCyclePhase(cycleDay: number, cycleLength: number): CyclePhase {
  if (cycleDay <= 5) return 'Menstrual'
  if (cycleDay <= Math.round(cycleLength * 0.45)) return 'Follicular'
  if (cycleDay <= Math.round(cycleLength * 0.55)) return 'Ovulation'
  if (cycleDay <= cycleLength) return 'Luteal'
  return 'Unknown'
}

export function estimateNextPeriod(lastPeriodStart: Date, cycleLength: number): Date {
  const next = new Date(lastPeriodStart)
  next.setDate(next.getDate() + cycleLength)
  return next
}

export function getCycleConfidence(regularity: string): 'low' | 'medium' | 'high' {
  if (regularity === 'regular') return 'high'
  if (regularity === 'irregular') return 'low'
  return 'medium'
}

export const phaseDescriptions: Record<CyclePhase, string> = {
  Menstrual: 'Your period phase. Energy may be lower. Prioritise rest and gentle movement.',
  Follicular: 'Rising oestrogen. Energy and focus often improve. A good phase for strength training.',
  Ovulation: 'Peak energy for many women. Ideal for higher-intensity workouts.',
  Luteal: 'Progesterone rises. You may notice lower energy, cravings, or mood shifts in the second half.',
  Unknown: 'Add your last period date in Setup to see your estimated cycle phase.',
}
