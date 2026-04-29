import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { calculateSetupProgress } from '@/lib/setup-progress'

const sectionToTable: Record<string, string> = {
  basic_profile: 'profiles',
  body_metrics: 'body_metrics',
  health_context: 'health_context',
  cycle_profile: 'cycle_profile',
  diet_preferences: 'diet_preferences',
  fasting_preferences: 'fasting_preferences',
  fitness_preferences: 'fitness_preferences',
  goals: 'goals',
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { section, data } = await req.json()
  const table = sectionToTable[section]
  if (!table) return NextResponse.json({ error: 'Unknown section' }, { status: 400 })

  const payload = { ...data, user_id: user.id, updated_at: new Date().toISOString() }

  const { error } = await supabase.from(table).upsert(payload, { onConflict: 'user_id' })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Calculate new progress
  const [profile, bodyMetrics, healthContext, cycleProfile, dietPreferences, fastingPreferences, fitnessPreferences, goals] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', user.id).single(),
    supabase.from('body_metrics').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
    supabase.from('health_context').select('*').eq('user_id', user.id).single(),
    supabase.from('cycle_profile').select('*').eq('user_id', user.id).single(),
    supabase.from('diet_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('fasting_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('fitness_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('goals').select('*').eq('user_id', user.id).single(),
  ])

  const setupProgress = calculateSetupProgress({
    profile: profile.data,
    bodyMetrics: bodyMetrics.data,
    healthContext: healthContext.data,
    cycleProfile: cycleProfile.data,
    dietPreferences: dietPreferences.data,
    fastingPreferences: fastingPreferences.data,
    fitnessPreferences: fitnessPreferences.data,
    goals: goals.data,
  })

  return NextResponse.json({ success: true, setupProgress })
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [profile, bodyMetrics, healthContext, cycleProfile, dietPreferences, fastingPreferences, fitnessPreferences, goals] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', user.id).single(),
    supabase.from('body_metrics').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
    supabase.from('health_context').select('*').eq('user_id', user.id).single(),
    supabase.from('cycle_profile').select('*').eq('user_id', user.id).single(),
    supabase.from('diet_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('fasting_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('fitness_preferences').select('*').eq('user_id', user.id).single(),
    supabase.from('goals').select('*').eq('user_id', user.id).single(),
  ])

  const setupData = {
    profile: profile.data,
    bodyMetrics: bodyMetrics.data,
    healthContext: healthContext.data,
    cycleProfile: cycleProfile.data,
    dietPreferences: dietPreferences.data,
    fastingPreferences: fastingPreferences.data,
    fitnessPreferences: fitnessPreferences.data,
    goals: goals.data,
  }

  return NextResponse.json({
    ...setupData,
    setupProgress: calculateSetupProgress(setupData),
  })
}
