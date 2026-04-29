import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="font-body text-sm font-medium text-ink2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-10 w-full rounded-xl border bg-card px-3.5 font-body text-sm text-ink placeholder:text-muted',
            'border-hairline focus:outline-none focus:ring-2 focus:ring-clay/30 focus:border-clay transition-all',
            error && 'border-alert focus:ring-alert/30 focus:border-alert',
            props.disabled && 'opacity-50 cursor-not-allowed bg-shell',
            className
          )}
          {...props}
        />
        {error && <p className="font-body text-xs text-alert">{error}</p>}
        {hint && !error && <p className="font-body text-xs text-muted">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
