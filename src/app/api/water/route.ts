import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { amount = 250 } = await req.json()
  const today = new Date().toISOString().split('T')[0]

  const { data: existing } = await supabase
    .from('daily_logs')
    .select('id, water_ml')
    .eq('user_id', user.id)
    .eq('date', today)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('daily_logs')
      .update({ water_ml: (existing.water_ml ?? 0) + amount, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  } else {
    const { error } = await supabase
      .from('daily_logs')
      .insert({ user_id: user.id, date: today, water_ml: amount })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data } = await supabase.from('daily_logs').select('water_ml').eq('user_id', user.id).eq('date', today).single()
  return NextResponse.json({ success: true, water_ml: data?.water_ml ?? amount })
}
