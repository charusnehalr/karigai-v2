import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'
import { runPersonalizationRules } from '@/lib/safety-rules'
import { buildMealSuggestionPrompt } from '@/lib/ai-prompt-engine'
import { getCycleDay, estimateCyclePhase } from '@/lib/cycle-engine'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { mealType = 'meal' } = await req.json()
  const today = new Date().toISOString().split('T')[0]

  const [profile, healthContext, dietPreferences, fastingPreferences, fitnessPreferences, goals, cycleProfile, mealLogs] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', user.id).single(),
    supabase.from('health_context').select('*').eq('user_id', user.id).single(),
    supabase.from('diet_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('fasting_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('fitness_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('goals').select('*').eq('user_id', user.id).single(),
    supabase.from('cycle_profile').select('*').eq('user_id', user.id).single(),
    supabase.from('meal_logs').select('calories').eq('user_id', user.id).eq('date', today),
  ])

  let currentCyclePhase: string | undefined
  const cp = cycleProfile.data
  if (cp?.last_period_start) {
    const day = getCycleDay(new Date(cp.last_period_start), new Date(), cp.average_cycle_length ?? 28)
    currentCyclePhase = estimateCyclePhase(day, cp.average_cycle_length ?? 28)
  }

  const caloriesConsumed = (mealLogs.data ?? []).reduce((s: number, m: { calories?: number | null }) => s + (m.calories ?? 0), 0)

  const ctx = {
    profile: profile.data,
    healthContext: healthContext.data,
    dietPreferences: dietPreferences.data,
    fastingPreferences: fastingPreferences.data,
    fitnessPreferences: fitnessPreferences.data,
    goals: goals.data,
    currentCyclePhase,
    remainingCalories: caloriesConsumed > 0 ? Math.max(0, 2000 - caloriesConsumed) : undefined,
  }

  const rules = runPersonalizationRules(ctx)
  const prompt = buildMealSuggestionPrompt(ctx, rules, mealType)

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const message = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 512,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = (message.content[0] as { text: string }).text
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { mealName: 'Could not generate suggestion', reason: raw }
    return NextResponse.json(parsed)
  } catch {
    return NextResponse.json({ mealName: 'Suggestion unavailable', reason: raw })
  }
}
