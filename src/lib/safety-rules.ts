import type { HealthContext, DietPreferences, FastingPreferences, FitnessPreferences } from '@/types/user'

export interface PersonalizationRules {
  prioritizeProtein: boolean
  prioritizeFiber: boolean
  avoidRefinedCarbOnlyMeals: boolean
  avoidSugaryDrinks: boolean
  suggestWalkingAfterMeals: boolean
  avoidExtremeDeficit: boolean
  showIronFoodReminder: boolean
  showB12FoodReminder: boolean
  showVitaminDReminder: boolean
  suggestStrengthTraining: boolean
  suggestModerateIntensity: boolean
  avoidHighImpactJumping: boolean
  cyclePredictionConfidence: 'low' | 'medium' | 'high'
  prioritizeSymptomTracking: boolean
  fastingDisabled: boolean
  fastingCautionNote?: string
  preferredProteinSources: string[]
  excludedFoodGroups: string[]
}

interface UserContext {
  healthContext?: HealthContext | null
  dietPreferences?: DietPreferences | null
  fastingPreferences?: FastingPreferences | null
  fitnessPreferences?: FitnessPreferences | null
}

export function runPersonalizationRules(ctx: UserContext): PersonalizationRules {
  const rules: PersonalizationRules = {
    prioritizeProtein: false,
    prioritizeFiber: false,
    avoidRefinedCarbOnlyMeals: false,
    avoidSugaryDrinks: false,
    suggestWalkingAfterMeals: false,
    avoidExtremeDeficit: false,
    showIronFoodReminder: false,
    showB12FoodReminder: false,
    showVitaminDReminder: false,
    suggestStrengthTraining: false,
    suggestModerateIntensity: false,
    avoidHighImpactJumping: false,
    cyclePredictionConfidence: 'medium',
    prioritizeSymptomTracking: false,
    fastingDisabled: false,
    preferredProteinSources: [],
    excludedFoodGroups: [],
  }

  const h = ctx.healthContext
  const d = ctx.dietPreferences
  const f = ctx.fastingPreferences
  const fit = ctx.fitnessPreferences

  if (h?.has_pcos || h?.has_pcod) {
    rules.prioritizeProtein = true
    rules.prioritizeFiber = true
    rules.avoidRefinedCarbOnlyMeals = true
    rules.suggestStrengthTraining = true
  }
  if (h?.has_prediabetes || h?.has_diabetes) {
    rules.avoidSugaryDrinks = true
    rules.suggestWalkingAfterMeals = true
    rules.prioritizeFiber = true
  }
  if (h?.has_thyroid_condition) {
    rules.avoidExtremeDeficit = true
    rules.suggestModerateIntensity = true
  }
  if (h?.has_iron_deficiency) rules.showIronFoodReminder = true
  if (h?.has_b12_deficiency || d?.is_vegan) rules.showB12FoodReminder = true
  if (h?.has_vitamin_d_deficiency) rules.showVitaminDReminder = true
  if (h?.has_irregular_periods) {
    rules.cyclePredictionConfidence = 'low'
    rules.prioritizeSymptomTracking = true
  }

  if (fit?.fitness_level === 'beginner') rules.avoidHighImpactJumping = true

  if (h?.has_eating_disorder_history || h?.is_pregnant || h?.is_breastfeeding) {
    rules.fastingDisabled = true
    rules.fastingCautionNote = 'Fasting suggestions are disabled based on your health context.'
  } else if (f?.feels_dizzy_when_fasting) {
    rules.fastingDisabled = true
    rules.fastingCautionNote = 'Fasting is not recommended as you experience dizziness when skipping meals.'
  }

  if (d?.is_vegan) {
    rules.excludedFoodGroups.push('meat', 'dairy', 'eggs', 'fish')
    rules.preferredProteinSources.push('tofu', 'tempeh', 'lentils', 'beans', 'edamame', 'seitan', 'soy milk')
  } else if (d?.is_vegetarian) {
    rules.excludedFoodGroups.push('meat', 'fish')
    rules.preferredProteinSources.push('paneer', 'Greek yogurt', 'lentils', 'beans', 'tofu', 'eggs', 'cottage cheese')
  } else if (d?.is_pescatarian) {
    rules.excludedFoodGroups.push('meat')
    rules.preferredProteinSources.push('salmon', 'tuna', 'shrimp', 'eggs', 'dairy', 'legumes')
  }
  if (d?.is_gluten_free) rules.excludedFoodGroups.push('wheat', 'barley', 'rye')
  if (d?.is_lactose_free || d?.is_dairy_free) rules.excludedFoodGroups.push('dairy')

  return rules
}

export function buildHealthContextString(h: HealthContext | null | undefined): string {
  if (!h) return 'none specified'
  const flags: string[] = []
  if (h.has_pcos) flags.push('PCOS')
  if (h.has_pcod) flags.push('PCOD')
  if (h.has_prediabetes) flags.push('Prediabetes')
  if (h.has_diabetes) flags.push('Diabetes')
  if (h.has_thyroid_condition) flags.push('Thyroid condition')
  if (h.has_irregular_periods) flags.push('Irregular periods')
  if (h.has_hormonal_concerns) flags.push('Hormonal concerns')
  if (h.has_iron_deficiency) flags.push('Iron deficiency')
  if (h.has_vitamin_d_deficiency) flags.push('Vitamin D deficiency')
  if (h.has_b12_deficiency) flags.push('B12 deficiency')
  if (h.has_high_cholesterol) flags.push('High cholesterol')
  if (h.has_high_blood_pressure) flags.push('High blood pressure')
  if (h.has_eating_disorder_history) flags.push('Eating disorder history')
  if (h.is_pregnant) flags.push('Pregnant')
  if (h.is_breastfeeding) flags.push('Breastfeeding')
  if (h.allergies) flags.push(`Allergies: ${h.allergies}`)
  return flags.length > 0 ? flags.join(', ') : 'none'
}

export function getHealthContextChips(h: HealthContext | null | undefined): string[] {
  if (!h) return []
  const flags: string[] = []
  if (h.has_pcos) flags.push('PCOS')
  if (h.has_pcod) flags.push('PCOD')
  if (h.has_prediabetes) flags.push('Prediabetes')
  if (h.has_diabetes) flags.push('Diabetes')
  if (h.has_thyroid_condition) flags.push('Thyroid')
  if (h.has_irregular_periods) flags.push('Irregular periods')
  if (h.has_iron_deficiency) flags.push('Iron deficiency')
  if (h.has_vitamin_d_deficiency) flags.push('Vitamin D deficiency')
  if (h.has_b12_deficiency) flags.push('B12 deficiency')
  if (h.is_pregnant) flags.push('Pregnant')
  if (h.is_breastfeeding) flags.push('Breastfeeding')
  return flags
}
