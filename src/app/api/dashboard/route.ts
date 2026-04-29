import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { calculateSetupProgress } from '@/lib/setup-progress'
import { getCycleDay, estimateCyclePhase, getCycleConfidence } from '@/lib/cycle-engine'
import { calculateBMR, calculateTDEE, calculateCalorieTarget, calculateProteinTarget, calculateWaterTarget, deriveActivityLevel } from '@/lib/health-engine'
import { runPersonalizationRules, getHealthContextChips } from '@/lib/safety-rules'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const today = new Date().toISOString().split('T')[0]

  const [profile, bodyMetrics, healthContext, cycleProfile, dietPreferences, fastingPreferences, fitnessPreferences, goals, dailyLog, mealLogs, workoutLog, cycleLog] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', user.id).single(),
    supabase.from('body_metrics').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
    supabase.from('health_context').select('*').eq('user_id', user.id).single(),
    supabase.from('cycle_profile').select('*').eq('user_id', user.id).single(),
    supabase.from('diet_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('fasting_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('fitness_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('goals').select('*').eq('user_id', user.id).single(),
    supabase.from('daily_logs').select('*').eq('user_id', user.id).eq('date', today).single(),
    supabase.from('meal_logs').select('*').eq('user_id', user.id).eq('date', today),
    supabase.from('workout_logs').select('*').eq('user_id', user.id).eq('date', today).single(),
    supabase.from('cycle_logs').select('*').eq('user_id', user.id).eq('date', today).single(),
  ])

  const p = profile.data
  const hc = healthContext.data
  const cp = cycleProfile.data
  const g = goals.data
  const fit = fitnessPreferences.data
  const dp = dietPreferences.data
  const fp = fastingPreferences.data

  const setupProgress = calculateSetupProgress({
    profile: p, bodyMetrics: bodyMetrics.data, healthContext: hc,
    cycleProfile: cp, dietPreferences: dp, fastingPreferences: fp,
    fitnessPreferences: fit, goals: g,
  })

  // Cycle
  let cyclePhase: string | undefined
  let cycleConfidence: 'low' | 'medium' | 'high' | undefined
  if (cp?.last_period_start) {
    const last = new Date(cp.last_period_start)
    const cycleLen = cp.average_cycle_length ?? 28
    const day = getCycleDay(last, new Date(), cycleLen)
    cyclePhase = estimateCyclePhase(day, cycleLen)
    cycleConfidence = getCycleConfidence(cp.cycle_regular)
  }

  // Nutrition targets
  let calorieTarget: number | undefined
  let proteinTarget: number | undefined
  let waterTargetMl: number | undefined
  if (p?.weight_kg && p?.height_cm && p?.age) {
    const bmr = calculateBMR({ weightKg: p.weight_kg, heightCm: p.height_cm, age: p.age })
    const tdee = calculateTDEE(bmr, deriveActivityLevel(fit?.workout_days_per_week))
    calorieTarget = calculateCalorieTarget({ tdee, goal: g?.primary_goal ?? 'maintain', hasThyroidCondition: hc?.has_thyroid_condition ?? false })
    proteinTarget = calculateProteinTarget(p.weight_kg, g?.primary_goal ?? 'maintain')
    waterTargetMl = calculateWaterTarget(p.weight_kg)
  }

  // Logs
  const meals = mealLogs.data ?? []
  const caloriesConsumed = meals.reduce((s: number, m: { calories?: number | null }) => s + (m.calories ?? 0), 0)
  const proteinConsumed = meals.reduce((s: number, m: { protein_g?: number | null }) => s + (m.protein_g ?? 0), 0)
  const waterMl = dailyLog.data?.water_ml ?? 0
  const workoutCompleted = workoutLog.data?.completed ?? false

  // Personalization factors
  const rules = runPersonalizationRules({ healthContext: hc, dietPreferences: dp, fastingPreferences: fp, fitnessPreferences: fit })
  const healthContextChips = getHealthContextChips(hc)
  const fitnessOptions: string[] = []
  if (fit?.gym_available) fitnessOptions.push('Gym')
  if (fit?.weights_available) fitnessOptions.push('Weights')
  if (fit?.swimming_available) fitnessOptions.push('Swimming')
  if (fit?.walking_preferred) fitnessOptions.push('Walking')
  if (fit?.yoga_pilates_preferred) fitnessOptions.push('Yoga/Pilates')
  if (fit?.home_workouts_available) fitnessOptions.push('Home')

  const symptomsToday: string[] = cycleLog.data?.symptoms ?? []

  // Condition notes
  const conditionNotes: string[] = []
  if (rules.showIronFoodReminder) conditionNotes.push('Include iron-rich foods today: lentils, spinach, or tofu.')
  if (rules.showB12FoodReminder) conditionNotes.push('B12 reminder: nutritional yeast, fortified foods, or eggs if not vegan.')
  if (rules.showVitaminDReminder) conditionNotes.push('Vitamin D reminder: sunlight and dietary sources support your levels.')
  if (rules.suggestWalkingAfterMeals) conditionNotes.push('A short walk after meals supports glucose management.')
  if (rules.avoidSugaryDrinks) conditionNotes.push('Avoid sugary drinks today.')

  // Fasting note
  let fastingNote: string | undefined
  if (fp?.fasting_type && fp.fasting_type !== 'none' && !rules.fastingDisabled) {
    fastingNote = `Eating window: ${fp.eating_window_start ?? '?'} – ${fp.eating_window_end ?? '?'} (${fp.fasting_type})`
  }

  // Checklist
  const checklist = [
    { id: 'water', label: 'Log water intake', done: waterMl > 0 },
    { id: 'meal', label: 'Log a meal', done: meals.length > 0 },
    { id: 'workout', label: 'Complete workout', done: workoutCompleted },
    { id: 'energy', label: 'Log energy & mood', done: dailyLog.data?.energy_score != null },
    { id: 'cycle', label: 'Log cycle info', done: cycleLog.data != null },
  ]

  // Insight
  const insightParts: string[] = []
  if (cyclePhase && cyclePhase !== 'Unknown') insightParts.push(`You're in your ${cyclePhase} phase today.`)
  if (caloriesConsumed > 0 && calorieTarget) {
    const remaining = calorieTarget - caloriesConsumed
    insightParts.push(`${remaining > 0 ? `${remaining} kcal remaining.` : 'Daily calorie target reached.'}`)
  }
  if (waterMl > 0 && waterTargetMl) {
    const pct = Math.round((waterMl / waterTargetMl) * 100)
    insightParts.push(`Water: ${pct}% of daily goal.`)
  }
  const insight = insightParts.length > 0 ? insightParts.join(' ') : 'Complete your setup to get personalised daily insights.'

  return NextResponse.json({
    setupProgress,
    personalizationFactors: {
      cyclePhase, cycleConfidence,
      goal: g?.primary_goal,
      dietType: dp?.diet_type,
      healthContext: healthContextChips,
      fasting: fp?.fasting_type !== 'none' ? fp?.fasting_type : undefined,
      fitnessOptions,
      symptomsToday,
      fastingWindow: fp?.eating_window_start && fp?.eating_window_end
        ? `${fp.eating_window_start} – ${fp.eating_window_end}` : undefined,
    },
    todayPlan: {
      calorieTarget, proteinTarget, waterTargetMl,
      mealFocus: rules.prioritizeProtein ? 'High protein' : rules.prioritizeFiber ? 'High fibre' : undefined,
      cycleNote: cyclePhase && cyclePhase !== 'Unknown' ? `${cyclePhase} phase` : undefined,
      fastingNote,
      conditionNotes,
    },
    logs: { caloriesConsumed, proteinConsumed, waterMl, workoutCompleted, energyScore: dailyLog.data?.energy_score },
    checklist,
    insight,
  })
}
