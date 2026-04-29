'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { useToastStore } from '@/store/toast.store'
import { User } from 'lucide-react'

export default function ProfilePage() {
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', age: '', height_cm: '', weight_kg: '' })
  const { addToast } = useToastStore()

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(d => {
      setProfile(d.profile)
      setEmail(d.email ?? '')
      if (d.profile) {
        setForm({
          name: d.profile.name ?? '',
          age: d.profile.age ?? '',
          height_cm: d.profile.height_cm ?? '',
          weight_kg: d.profile.weight_kg ?? '',
        })
      }
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify({ name: form.name || null, age: form.age ? Number(form.age) : null, height_cm: form.height_cm ? Number(form.height_cm) : null, weight_kg: form.weight_kg ? Number(form.weight_kg) : null }),
      headers: { 'Content-Type': 'application/json' },
    })
    const d = await res.json()
    if (d.success) addToast('Profile updated!', 'success')
    else addToast(d.error ?? 'Failed', 'error')
    setSaving(false)
  }

  if (loading) return (
    <div className="space-y-6 max-w-lg">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-60 rounded-card" />
    </div>
  )

  return (
    <div className="space-y-6 max-w-lg">
      <PageHeader title="Profile" subtitle="Your personal details" eyebrow="Account" />

      <Card>
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-hairline">
          <div className="w-14 h-14 rounded-full bg-claySoft flex items-center justify-center">
            <User className="w-7 h-7 text-clay" />
          </div>
          <div>
            <p className="font-body text-base font-semibold text-ink">{form.name || 'Your name'}</p>
            <p className="font-mono text-[10px] text-muted uppercase tracking-widest">{email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
          />
          <Input
            label="Age"
            type="number"
            value={form.age}
            onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
            min={13} max={100}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Height (cm)"
              type="number"
              value={form.height_cm}
              onChange={e => setForm(f => ({ ...f, height_cm: e.target.value }))}
            />
            <Input
              label="Weight (kg)"
              type="number"
              value={form.weight_kg}
              onChange={e => setForm(f => ({ ...f, weight_kg: e.target.value }))}
            />
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-hairline">
          <Button variant="accent" onClick={handleSave} loading={saving}>Save changes</Button>
        </div>
      </Card>
    </div>
  )
}
