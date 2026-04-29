import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const today = body.date ?? new Date().toISOString().split('T')[0]

  const { error } = await supabase.from('cycle_logs').upsert({
    user_id: user.id,
    date: today,
    is_period_day: body.is_period_day ?? false,
    flow_level: body.flow_level ?? null,
    pain_score: body.pain_score ?? null,
    symptoms: body.symptoms ?? [],
    mood: body.mood ?? null,
    energy_score: body.energy_score ?? null,
    notes: body.notes ?? null,
  }, { onConflict: 'user_id,date' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Also update daily_log energy/mood
  if (body.energy_score != null || body.mood != null) {
    const { data: existing } = await supabase.from('daily_logs').select('id').eq('user_id', user.id).eq('date', today).single()
    if (existing) {
      await supabase.from('daily_logs').update({
        energy_score: body.energy_score,
        mood: body.mood,
        updated_at: new Date().toISOString(),
      }).eq('id', existing.id)
    } else {
      await supabase.from('daily_logs').insert({
        user_id: user.id,
        date: today,
        energy_score: body.energy_score,
        mood: body.mood,
      })
    }
  }

  return NextResponse.json({ success: true })
}
