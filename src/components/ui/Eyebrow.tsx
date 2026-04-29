import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('font-mono text-[10px] uppercase tracking-[0.2em] text-muted', className)}>
      {children}
    </span>
  )
}
