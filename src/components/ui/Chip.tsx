import { cn } from '@/lib/utils'

type ChipTone = 'neutral' | 'sage' | 'clay' | 'blush' | 'bone' | 'alert' | 'ink' | 'amber'

const toneClasses: Record<ChipTone, string> = {
  neutral: 'bg-shell text-ink2 border-hairline',
  sage:    'bg-sageSoft text-ink border-sageSoft',
  clay:    'bg-claySoft text-ink2 border-claySoft',
  blush:   'bg-blush/30 text-ink2 border-blush/50',
  bone:    'bg-bone text-ink2 border-hairline',
  alert:   'bg-alert/10 text-alert border-alert/30',
  ink:     'bg-ink text-cream border-ink',
  amber:   'bg-amber/15 text-amber border-amber/30',
}

interface ChipProps {
  children: React.ReactNode
  tone?: ChipTone
  className?: string
  onClick?: () => void
  active?: boolean
}

export function Chip({ children, tone = 'neutral', className, onClick, active }: ChipProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-chip border px-2.5 py-1 font-body text-xs font-medium tracking-wide select-none',
        toneClasses[tone],
        onClick && 'cursor-pointer transition-opacity hover:opacity-80',
        active && 'ring-2 ring-clay ring-offset-1',
        className
      )}
    >
      {children}
    </span>
  )
}
