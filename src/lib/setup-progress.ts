import type { UserSetupData } from '@/types/user'

export function calculateSetupProgress(data: Partial<UserSetupData>): number {
  let total = 0
  if (data.profile?.name && data.profile?.age && data.profile?.height_cm && data.profile?.weight_kg) total += 10
  if (data.bodyMetrics?.waist_cm && data.bodyMetrics?.hip_cm) total += 10
  if (data.healthContext != null) total += 20
  if (data.cycleProfile?.last_period_start) total += 15
  if (data.dietPreferences?.diet_type) total += 15
  if (data.fastingPreferences != null) total += 10
  if (data.fitnessPreferences?.workout_days_per_week) total += 10
  if (data.goals?.primary_goal) total += 10
  return total
}
