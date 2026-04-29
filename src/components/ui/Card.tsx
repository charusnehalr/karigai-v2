import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  dark?: boolean
  hover?: boolean
}

const paddings = { none: '', sm: 'p-4', md: 'p-[18px]', lg: 'p-7' }

export function Card({ children, className, padding = 'md', dark, hover, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        'rounded-card border transition-shadow',
        dark ? 'bg-inkSurf border-inkLine' : 'bg-card border-hairline',
        hover && 'hover:shadow-sm cursor-pointer',
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
