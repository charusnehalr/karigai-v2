import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'
import { runPersonalizationRules } from '@/lib/safety-rules'
import { buildWorkoutPrompt } from '@/lib/ai-prompt-engine'
import { getCycleDay, estimateCyclePhase } from '@/lib/cycle-engine'

function getWorkoutIntensity(ctx: { cyclePhase?: string; energyScore?: number; painScore?: number; thyroid?: boolean }): string {
  if ((ctx.painScore ?? 0) >= 7) return 'low'
  if ((ctx.energyScore ?? 5) <= 3) return 'low'
  if (ctx.thyroid && (ctx.energyScore ?? 5) <= 5) return 'low'
  if (ctx.cyclePhase === 'Menstrual') return 'low'
  if (ctx.cyclePhase === 'Luteal' && (ctx.energyScore ?? 5) <= 5) return 'moderate'
  if (ctx.cyclePhase === 'Ovulation' && (ctx.energyScore ?? 5) >= 7) return 'high'
  return 'moderate'
}

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const today = new Date().toISOString().split('T')[0]

  const [healthContext, fitnessPreferences, cycleProfile, dailyLog, cycleLog] = await Promise.all([
    supabase.from('health_context').select('*').eq('user_id', user.id).single(),
    supabase.from('fitness_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('cycle_profile').select('*').eq('user_id', user.id).single(),
    supabase.from('daily_logs').select('energy_score').eq('user_id', user.id).eq('date', today).single(),
    supabase.from('cycle_logs').select('pain_score, energy_score').eq('user_id', user.id).eq('date', today).single(),
  ])

  const cp = cycleProfile.data
  let cyclePhase: string | undefined
  if (cp?.last_period_start) {
    const day = getCycleDay(new Date(cp.last_period_start), new Date(), cp.average_cycle_length ?? 28)
    cyclePhase = estimateCyclePhase(day, cp.average_cycle_length ?? 28)
  }

  const ctx = {
    healthContext: healthContext.data,
    fitnessPreferences: fitnessPreferences.data,
    currentCyclePhase: cyclePhase,
    todayEnergyScore: dailyLog.data?.energy_score ?? cycleLog.data?.energy_score,
    todayPainScore: cycleLog.data?.pain_score,
  }

  const rules = runPersonalizationRules(ctx)
  const intensity = getWorkoutIntensity({
    cyclePhase,
    energyScore: ctx.todayEnergyScore ?? undefined,
    painScore: ctx.todayPainScore ?? undefined,
    thyroid: healthContext.data?.has_thyroid_condition,
  })

  const prompt = buildWorkoutPrompt(ctx, rules, intensity)

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const raw = (message.content[0] as { text: string }).text
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null

    if (parsed) {
      await supabase.from('workout_logs')
        .delete().eq('user_id', user.id).eq('date', today).eq('completed', false)

      const { data: inserted } = await supabase.from('workout_logs').insert({
        user_id: user.id,
        date: today,
        workout_name: parsed.workoutName,
        duration_minutes: parsed.duration,
        intensity: parsed.intensity,
        exercises: parsed.exercises,
        completed: false,
      }).select().single()

      return NextResponse.json({ workout: { ...parsed, id: inserted?.id, completed: false }, backup: parsed.backup })
    }
  } catch (e) {
    console.error('Workout generation error:', e)
  }

  return NextResponse.json({ error: 'Failed to generate workout' }, { status: 500 })
}
