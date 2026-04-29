export interface CycleLog {
  id: string
  user_id: string
  date: string
  is_period_day: boolean
  flow_level: string | null
  pain_score: number | null
  symptoms: string[]
  mood: string | null
  energy_score: number | null
  notes: string | null
  created_at: string
}

export type CyclePhase = 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal' | 'Unknown'

export interface CycleSummary {
  phase: CyclePhase
  cycleDay: number | null
  confidence: 'low' | 'medium' | 'high'
  nextPeriodDate: string | null
  daysUntilNextPeriod: number | null
  lastPeriodStart: string | null
  averageCycleLength: number
  phaseDescription: string
}
