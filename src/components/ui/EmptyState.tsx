import { Button } from './Button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  body?: string
  cta?: string
  onCta?: () => void
  className?: string
}

export function EmptyState({ icon, title, body, cta, onCta, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-6 text-center', className)}>
      {icon && <div className="mb-3 text-muted opacity-60">{icon}</div>}
      <p className="font-body text-sm font-medium text-ink2 mb-1">{title}</p>
      {body && <p className="font-body text-xs text-muted max-w-xs leading-relaxed mb-4">{body}</p>}
      {cta && onCta && (
        <Button variant="ghost" size="sm" onClick={onCta}>{cta}</Button>
      )}
    </div>
  )
}
