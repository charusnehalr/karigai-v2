'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SafetyBanner } from '@/components/ui/SafetyBanner'
import { PageHeader } from '@/components/ui/PageHeader'
import { useToastStore } from '@/store/toast.store'
import { Shield, Download, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function PrivacyPage() {
  const [exporting, setExporting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { addToast } = useToastStore()
  const router = useRouter()

  const handleExport = async () => {
    setExporting(true)
    try {
      const res = await fetch('/api/setup')
      const data = await res.json()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `karigai-data-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      addToast('Data exported!', 'success')
    } finally {
      setExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account and all data? This cannot be undone.')) return
    setDeleting(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    addToast('Account deletion requested. Contact support to complete.', 'info')
    router.push('/')
    setDeleting(false)
  }

  return (
    <div className="space-y-6 max-w-lg">
      <PageHeader title="Privacy" subtitle="Your data, your control" eyebrow="Data & privacy" />

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-sage" />
          <h2 className="font-body text-sm font-semibold text-ink">Your data commitment</h2>
        </div>
        <div className="space-y-2">
          {[
            'Your health data is stored securely and never sold.',
            'You own your data and can export or delete it anytime.',
            'AI suggestions use your data only within your session.',
            'Karigai does not share your information with third parties.',
            'Row-level security ensures only you can access your data.',
          ].map((item, i) => (
            <div key={i} className="flex gap-2.5">
              <span className="text-sage flex-shrink-0 mt-0.5">✓</span>
              <p className="font-body text-sm text-ink2">{item}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-body text-sm font-semibold text-ink mb-4">Export your data</h2>
        <p className="font-body text-sm text-muted mb-4 leading-relaxed">Download a copy of all your Karigai data as a JSON file, including your profile, health context, cycle logs, meal logs, and workout history.</p>
        <Button variant="ghost" onClick={handleExport} loading={exporting}>
          <Download className="w-4 h-4 mr-2" />Export data
        </Button>
      </Card>

      <Card>
        <h2 className="font-body text-sm font-semibold text-ink mb-2">Delete account</h2>
        <SafetyBanner tone="alert" title="This is irreversible" body="Deleting your account will permanently remove all your data from Karigai, including logs, preferences, and history." className="mb-4" />
        <Button variant="danger" onClick={handleDeleteAccount} loading={deleting}>
          <Trash2 className="w-4 h-4 mr-2" />Delete my account
        </Button>
      </Card>

      <Card className="bg-shell border-hairline">
        <h2 className="font-body text-sm font-semibold text-ink mb-2">Medical disclaimer</h2>
        <p className="font-body text-xs text-muted leading-relaxed">
          Karigai is a wellness app, not a medical product. We do not diagnose, treat, or give medical advice. All metrics are estimates.
          Always consult a qualified healthcare professional for medical concerns.
          The information in this app is for general wellness purposes only.
        </p>
      </Card>
    </div>
  )
}
