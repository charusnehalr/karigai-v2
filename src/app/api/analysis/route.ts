import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { calculateBMI, categorizeBMI, calculateWHR, calculateBRI, calculateBMR, calculateTDEE, calculateCalorieTarget, calculateProteinTarget, calculateWaterTarget, deriveActivityLevel } from '@/lib/health-engine'
import { getCycleDay, estimateCyclePhase, estimateNextPeriod, getCycleConfidence } from '@/lib/cycle-engine'
import { calculateSetupProgress } from '@/lib/setup-progress'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [profile, bodyMetrics, healthContext, cycleProfile, fitnessPreferences, goals] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', user.id).single(),
    supabase.from('body_metrics').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
    supabase.from('health_context').select('*').eq('user_id', user.id).single(),
    supabase.from('cycle_profile').select('*').eq('user_id', user.id).single(),
    supabase.from('fitness_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('goals').select('*').eq('user_id', user.id).single(),
  ])

  const p = profile.data
  const bm = bodyMetrics.data
  const hc = healthContext.data
  const cp = cycleProfile.data
  const fit = fitnessPreferences.data
  const g = goals.data

  if (!p?.weight_kg || !p?.height_cm || !p?.age) {
    return NextResponse.json({
      setupProgress: calculateSetupProgress({ profile: p }),
      incomplete: true,
      message: 'Complete basic profile to see analysis.',
    })
  }

  const bmi = calculateBMI(p.weight_kg, p.height_cm)
  const bmiCategory = categorizeBMI(bmi)
  const whr = bm?.waist_cm && bm?.hip_cm ? calculateWHR(bm.waist_cm, bm.hip_cm) : null
  const bri = bm?.waist_cm ? calculateBRI(bm.waist_cm, p.height_cm) : null
  const bmr = calculateBMR({ weightKg: p.weight_kg, heightCm: p.height_cm, age: p.age })
  const activityLevel = deriveActivityLevel(fit?.workout_days_per_week)
  const tdee = calculateTDEE(bmr, activityLevel)
  const primaryGoal = g?.primary_goal ?? 'maintain'
  const calorieTarget = calculateCalorieTarget({
    tdee,
    goal: primaryGoal,
    hasThyroidCondition: hc?.has_thyroid_condition ?? false,
  })
  const proteinTarget = calculateProteinTarget(p.weight_kg, primaryGoal)
  const waterTargetMl = calculateWaterTarget(p.weight_kg)

  let cyclePhase = 'Unknown'
  let cycleDay: number | null = null
  let nextPeriodEstimate: string | null = null
  const cycleLength = cp?.average_cycle_length ?? 28

  if (cp?.last_period_start) {
    const lastPeriod = new Date(cp.last_period_start)
    const today = new Date()
    cycleDay = getCycleDay(lastPeriod, today, cycleLength)
    cyclePhase = estimateCyclePhase(cycleDay, cycleLength)
    const nextDate = estimateNextPeriod(lastPeriod, cycleLength)
    nextPeriodEstimate = nextDate.toISOString().split('T')[0]
  }

  const cycleConfidence = getCycleConfidence(cp?.cycle_regular ?? 'unsure')

  const goalLabels: Record<string, string> = {
    lose_weight: 'Moderate weight-loss pace',
    maintain: 'Weight maintenance',
    gain_muscle: 'Muscle-building phase',
    toning: 'Toning and definition',
    improve_energy: 'Energy optimisation',
  }
  const goalSummary = goalLabels[primaryGoal] ?? 'General wellness'

  const setupProgress = calculateSetupProgress({ profile: p, bodyMetrics: bm, healthContext: hc, cycleProfile: cp, fitnessPreferences: fit, goals: g })

  return NextResponse.json({
    bmi, bmiCategory, whr, bri, bmr, tdee, calorieTarget, proteinTarget, waterTargetMl,
    cyclePhase, cycleDay, cycleConfidence, nextPeriodEstimate, goalSummary, setupProgress,
  })
}
