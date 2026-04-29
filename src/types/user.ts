export interface Profile {
  id: string
  user_id: string
  name: string | null
  age: number | null
  height_cm: number | null
  weight_kg: number | null
  unit_system: 'metric' | 'imperial'
  country: string | null
  created_at: string
  updated_at: string
}

export interface BodyMetrics {
  id: string
  user_id: string
  date: string
  weight_kg: number | null
  waist_cm: number | null
  hip_cm: number | null
  body_fat_percent: number | null
  created_at: string
}

export interface HealthContext {
  id: string
  user_id: string
  has_pcos: boolean
  has_pcod: boolean
  has_prediabetes: boolean
  has_diabetes: boolean
  has_thyroid_condition: boolean
  has_irregular_periods: boolean
  has_hormonal_concerns: boolean
  has_iron_deficiency: boolean
  has_vitamin_d_deficiency: boolean
  has_b12_deficiency: boolean
  has_high_cholesterol: boolean
  has_high_blood_pressure: boolean
  has_digestive_issues: boolean
  has_eating_disorder_history: boolean
  is_pregnant: boolean
  is_breastfeeding: boolean
  injuries: string | null
  allergies: string | null
  other_deficiencies: string | null
  other_conditions: string | null
  notes: string | null
  updated_at: string
}

export interface DietPreferences {
  id: string
  user_id: string
  diet_type: string | null
  is_vegetarian: boolean
  is_vegan: boolean
  is_pescatarian: boolean
  is_eggetarian: boolean
  is_non_veg: boolean
  is_kosher: boolean
  is_halal: boolean
  is_jain: boolean
  is_gluten_free: boolean
  is_lactose_free: boolean
  is_dairy_free: boolean
  is_nut_free: boolean
  is_soy_free: boolean
  cuisine_preference: string | null
  meal_frequency: number
  foods_to_avoid: string | null
  updated_at: string
}

export interface FastingPreferences {
  id: string
  user_id: string
  interested_in_fasting: boolean
  fasting_type: string
  eating_window_start: string | null
  eating_window_end: string | null
  feels_dizzy_when_fasting: boolean
  fasting_caution_flags: string[]
  updated_at: string
}

export interface FitnessPreferences {
  id: string
  user_id: string
  fitness_level: string | null
  gym_available: boolean
  weights_available: boolean
  swimming_available: boolean
  running_available: boolean
  home_workouts_available: boolean
  walking_preferred: boolean
  cycling_available: boolean
  yoga_pilates_preferred: boolean
  workout_days_per_week: number | null
  workout_duration_minutes: number
  preferred_activities: string[]
  injuries: string | null
  exercise_dislikes: string | null
  updated_at: string
}

export interface Goals {
  id: string
  user_id: string
  primary_goal: string | null
  target_weight_kg: number | null
  timeline_weeks: number | null
  wants_weight_loss: boolean
  wants_maintenance: boolean
  wants_muscle_gain: boolean
  wants_toning: boolean
  wants_energy_improvement: boolean
  wants_stamina: boolean
  wants_cycle_awareness: boolean
  wants_nutrition_improvement: boolean
  goal_notes: string | null
  updated_at: string
}

export interface UserSetupData {
  profile: Profile | null
  bodyMetrics: BodyMetrics | null
  healthContext: HealthContext | null
  cycleProfile: CycleProfile | null
  dietPreferences: DietPreferences | null
  fastingPreferences: FastingPreferences | null
  fitnessPreferences: FitnessPreferences | null
  goals: Goals | null
}

export interface CycleProfile {
  id: string
  user_id: string
  last_period_start: string | null
  average_cycle_length: number
  average_period_length: number
  cycle_regular: string
  flow_level: string | null
  common_symptoms: string[]
  birth_control_use: string | null
  updated_at: string
}
