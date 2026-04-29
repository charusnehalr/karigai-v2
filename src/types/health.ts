export interface DailyLog {
  id: string
  user_id: string
  date: string
  water_ml: number
  energy_score: number | null
  mood: string | null
  sleep_hours: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface MealLog {
  id: string
  user_id: string
  date: string
  meal_type: string
  meal_name: string
  calories: number | null
  protein_g: number | null
  carbs_g: number | null
  fat_g: number | null
  fiber_g: number | null
  notes: string | null
  created_at: string
}

export interface WorkoutLog {
  id: string
  user_id: string
  date: string
  workout_name: string | null
  duration_minutes: number | null
  intensity: string | null
  completed: boolean
  skipped_reason: string | null
  exercises: Exercise[] | null
  feedback: string | null
  created_at: string
}

export interface Exercise {
  name: string
  sets?: number
  reps?: string
  duration?: string
  notes?: string
}

export interface AnalysisResult {
  bmi: number
  bmiCategory: string
  whr: number | null
  bri: number | null
  bmr: number
  tdee: number
  calorieTarget: number
  proteinTarget: number
  waterTargetMl: number
  cyclePhase: string
  cycleDay: number | null
  cycleConfidence: 'low' | 'medium' | 'high'
  nextPeriodEstimate: string | null
  goalSummary: string
  setupProgress: number
}

export interface DashboardResponse {
  setupProgress: number
  personalizationFactors: {
    cyclePhase?: string
    cycleConfidence?: 'low' | 'medium' | 'high'
    goal?: string
    dietType?: string
    healthContext: string[]
    fasting?: string
    fitnessOptions: string[]
    symptomsToday: string[]
    fastingWindow?: string
  }
  todayPlan: {
    calorieTarget?: number
    proteinTarget?: number
    waterTargetMl?: number
    workoutName?: string
    backupWorkout?: string
    mealFocus?: string
    cycleNote?: string
    fastingNote?: string
    conditionNotes: string[]
  }
  logs: {
    caloriesConsumed: number
    proteinConsumed: number
    waterMl: number
    workoutCompleted: boolean
    energyScore?: number
  }
  checklist: { id: string; label: string; done: boolean }[]
  insight: string
}
