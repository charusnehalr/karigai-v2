import { Button } from './Button'
import { AlertCircle } from 'lucide-react'

export function ErrorState({ title = 'Something went wrong', retry }: { title?: string; retry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="w-8 h-8 text-muted mb-3" />
      <div className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1">error</div>
      <p className="font-body text-sm text-ink2 mb-4">{title}</p>
      {retry && <Button variant="ghost" size="sm" onClick={retry}>Try again</Button>}
    </div>
  )
}
