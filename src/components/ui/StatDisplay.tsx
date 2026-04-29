import { Eyebrow } from './Eyebrow'
import { cn } from '@/lib/utils'

interface StatDisplayProps {
  value: string | number
  unit?: string
  label: string
  sublabel?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-5xl',
}

export function StatDisplay({ value, unit, label, sublabel, className, size = 'md' }: StatDisplayProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <Eyebrow>{label}</Eyebrow>
      <div className="mt-1 flex items-baseline gap-1">
        <span className={cn('font-display italic text-ink leading-none', sizes[size])}>{value}</span>
        {unit && <span className="font-body text-sm text-muted font-medium">{unit}</span>}
      </div>
      {sublabel && <p className="mt-0.5 font-body text-xs text-muted">{sublabel}</p>}
    </div>
  )
}
