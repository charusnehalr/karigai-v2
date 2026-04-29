import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  eyebrow?: string
  className?: string
}

export function PageHeader({ title, subtitle, action, eyebrow, className }: PageHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between mb-6', className)}>
      <div>
        {eyebrow && <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">{eyebrow}</p>}
        <h1 className="font-display italic text-3xl text-ink">{title}</h1>
        {subtitle && <p className="font-body text-sm text-muted mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}
