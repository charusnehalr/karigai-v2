'use client'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface CheckboxProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
  disabled?: boolean
  className?: string
}

export function Checkbox({ checked, onChange, label, disabled, className }: CheckboxProps) {
  return (
    <label className={cn('inline-flex items-start gap-2.5 cursor-pointer select-none group', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'mt-0.5 w-4 h-4 rounded-md border flex-shrink-0 flex items-center justify-center transition-all',
          checked ? 'bg-clay border-clay' : 'bg-card border-hairline group-hover:border-clay/50'
        )}
      >
        {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
      </button>
      {label && <span className="font-body text-sm text-ink2 leading-snug">{label}</span>}
    </label>
  )
}
