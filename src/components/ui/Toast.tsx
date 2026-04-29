'use client'
import { useToastStore } from '@/store/toast.store'
import { cn } from '@/lib/utils'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

const icons = {
  success: <CheckCircle2 className="w-4 h-4 text-sage" />,
  error: <AlertCircle className="w-4 h-4 text-alert" />,
  info: <Info className="w-4 h-4 text-clay" />,
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()
  if (!toasts.length) return null
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg bg-card border-hairline',
            'animate-in slide-in-from-bottom-2 duration-200 max-w-sm'
          )}
        >
          {icons[t.type]}
          <p className="font-body text-sm text-ink flex-1">{t.message}</p>
          <button onClick={() => removeToast(t.id)} className="text-muted hover:text-ink transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
