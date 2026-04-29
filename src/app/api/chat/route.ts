import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'
import { runPersonalizationRules } from '@/lib/safety-rules'
import { buildChatSystemPrompt } from '@/lib/ai-prompt-engine'
import { getCycleDay, estimateCyclePhase } from '@/lib/cycle-engine'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { message } = await req.json()
  if (!message?.trim()) return NextResponse.json({ error: 'Empty message' }, { status: 400 })

  const today = new Date().toISOString().split('T')[0]

  const [profile, healthContext, dietPreferences, fastingPreferences, fitnessPreferences, goals, cycleProfile, dailyLog, cycleLog, mealLogs, workoutLog, history] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', user.id).single(),
    supabase.from('health_context').select('*').eq('user_id', user.id).single(),
    supabase.from('diet_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('fasting_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('fitness_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('goals').select('*').eq('user_id', user.id).single(),
    supabase.from('cycle_profile').select('*').eq('user_id', user.id).single(),
    supabase.from('daily_logs').select('*').eq('user_id', user.id).eq('date', today).single(),
    supabase.from('cycle_logs').select('*').eq('user_id', user.id).eq('date', today).single(),
    supabase.from('meal_logs').select('calories, protein_g').eq('user_id', user.id).eq('date', today),
    supabase.from('workout_logs').select('completed').eq('user_id', user.id).eq('date', today).single(),
    supabase.from('chat_messages').select('role, message').eq('user_id', user.id)
      .order('created_at', { ascending: false }).limit(8),
  ])

  const cp = cycleProfile.data
  let currentCyclePhase: string | undefined
  if (cp?.last_period_start) {
    const day = getCycleDay(new Date(cp.last_period_start), new Date(), cp.average_cycle_length ?? 28)
    currentCyclePhase = estimateCyclePhase(day, cp.average_cycle_length ?? 28)
  }

  const meals = mealLogs.data ?? []
  const ctx = {
    profile: profile.data,
    healthContext: healthContext.data,
    dietPreferences: dietPreferences.data,
    fastingPreferences: fastingPreferences.data,
    fitnessPreferences: fitnessPreferences.data,
    goals: goals.data,
    currentCyclePhase,
    todayCalories: meals.reduce((s: number, m: { calories?: number | null }) => s + (m.calories ?? 0), 0),
    todayProtein: meals.reduce((s: number, m: { protein_g?: number | null }) => s + (m.protein_g ?? 0), 0),
    todayWater: dailyLog.data?.water_ml ?? 0,
    todayEnergyScore: dailyLog.data?.energy_score ?? cycleLog.data?.energy_score,
    todaySymptoms: cycleLog.data?.symptoms ?? [],
    workoutCompleted: workoutLog.data?.completed ?? false,
  }

  const rules = runPersonalizationRules(ctx)
  const systemPrompt = buildChatSystemPrompt(ctx, rules)

  const previousMessages = (history.data ?? []).reverse().map((m: { role: string; message: string }) => ({
    role: m.role as 'user' | 'assistant',
    content: m.message,
  }))

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 512,
    system: systemPrompt,
    messages: [...previousMessages, { role: 'user', content: message }],
  })

  const answer = (response.content[0] as { text: string }).text

  await Promise.all([
    supabase.from('chat_messages').insert({ user_id: user.id, role: 'user', message }),
    supabase.from('chat_messages').insert({ user_id: user.id, role: 'assistant', message: answer }),
  ])

  return NextResponse.json({ answer })
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: messages } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })
    .limit(100)

  return NextResponse.json({ messages: messages ?? [] })
}
