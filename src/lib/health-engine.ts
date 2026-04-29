export function calculateBMI(weightKg: number, heightCm: number): number {
  const h = heightCm / 100
  return parseFloat((weightKg / (h * h)).toFixed(1))
}

export function categorizeBMI(bmi: number): string {
  if (bmi < 18.5) return 'Underweight range'
  if (bmi < 25) return 'Healthy range'
  if (bmi < 30) return 'Above healthy range'
  return 'High range'
}

export function calculateWHR(waistCm: number, hipCm: number): number {
  return parseFloat((waistCm / hipCm).toFixed(2))
}

export function calculateBRI(waistCm: number, heightCm: number): number {
  const waistM = waistCm / 100
  const heightM = heightCm / 100
  return parseFloat((364.2 - 365.5 * Math.sqrt(1 - (waistM / (0.5 * heightM * Math.PI)) ** 2)).toFixed(2))
}

export function calculateBMR(params: { weightKg: number; heightCm: number; age: number }): number {
  return Math.round(10 * params.weightKg + 6.25 * params.heightCm - 5 * params.age - 161)
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  }
  return Math.round(bmr * (multipliers[activityLevel] ?? 1.375))
}

export function calculateCalorieTarget(params: {
  tdee: number
  goal: string
  hasThyroidCondition: boolean
}): number {
  const deficits: Record<string, number> = {
    lose_weight: -400,
    maintain: 0,
    gain_muscle: 300,
    toning: -200,
  }
  const base = params.tdee + (deficits[params.goal] ?? 0)
  if (params.hasThyroidCondition) return Math.max(1200, params.tdee - 300)
  return Math.max(1200, base)
}

export function calculateProteinTarget(weightKg: number, goal: string): number {
  const multipliers: Record<string, number> = {
    lose_weight: 1.6,
    maintain: 1.4,
    gain_muscle: 1.8,
    toning: 1.6,
  }
  return Math.round(weightKg * (multipliers[goal] ?? 1.4))
}

export function calculateWaterTarget(weightKg: number): number {
  return Math.round(weightKg * 33)
}

export function deriveActivityLevel(workoutDays?: number | null): string {
  if (!workoutDays) return 'light'
  if (workoutDays <= 1) return 'sedentary'
  if (workoutDays <= 2) return 'light'
  if (workoutDays <= 4) return 'moderate'
  if (workoutDays <= 5) return 'active'
  return 'very_active'
}
