'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  maxWidth?: string
  className?: string
}

export function Modal({ open, onClose, children, title, maxWidth = 'max-w-md', className }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={cn(
        'relative w-full bg-card rounded-card border border-hairline shadow-2xl z-10',
        maxWidth, className
      )}>
        {title && (
          <div className="flex items-center justify-between p-5 border-b border-hairline">
            <h2 className="font-body text-base font-semibold text-ink">{title}</h2>
            <button onClick={onClose} className="w-7 h-7 rounded-full hover:bg-shell flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-muted" />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full hover:bg-shell flex items-center justify-center transition-colors z-10"
          >
            <X className="w-4 h-4 text-muted" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
