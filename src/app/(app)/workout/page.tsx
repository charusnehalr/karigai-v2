'use client'
import { useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Skeleton } from '@/components/ui/Skeleton'
import { PageHeader } from '@/components/ui/PageHeader'
import { useToastStore } from '@/store/toast.store'
import { cn } from '@/lib/utils'
import { CheckCircle2, Dumbbell, RefreshCw, SkipForward, ChevronDown, ChevronUp, Zap } from 'lucide-react'

interface Exercise {
  name: string; sets?: number; reps?: string; duration?: string; notes?: string
}
interface WorkoutData {
  id?: string; workoutName?: string; duration?: number; intensity?: string; type?: string
  exercises?: Exercise[]; notes?: string; completed?: boolean
}

const intensityColor: Record<string, string> = { low: 'sage', moderate: 'clay', high: 'alert' }

export default function WorkoutPage() {
  const [workout, setWorkout] = useState<WorkoutData | null>(null)
  const [backup, setBackup] = useState<WorkoutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [useBackup, setUseBackup] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(0)
  const [generating, setGenerating] = useState(false)
  const { addToast } = useToastStore()

  const fetchWorkout = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/workout/today')
    const data = await res.json()
    setWorkout(data.workout)
    setBackup(data.backup)
    setLoading(false)
  }, [])

  useEffect(() => { fetchWorkout() }, [fetchWorkout])

  const handleComplete = async (completed: boolean) => {
    const w = useBackup ? backup : workout
    if (!w?.id && !workout?.id) {
      addToast('No workout to complete', 'error'); return
    }
    setCompleting(true)
    await fetch('/api/workout/complete', {
      method: 'POST',
      body: JSON.stringify({ id: workout?.id, completed, feedback: completed ? `${rating}/5 stars. ${feedback}` : feedback }),
      headers: { 'Content-Type': 'application/json' },
    })
    addToast(completed ? 'Workout completed! 🎉' : 'Skipped for today.', completed ? 'success' : 'info')
    await fetchWorkout()
    setCompleting(false)
  }

  const handleGenerate = async () => {
    setGenerating(true)
    const res = await fetch('/api/workout/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
    if (res.ok) { await fetchWorkout(); addToast('New workout generated!', 'success') }
    setGenerating(false)
  }

  if (loading) return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-80 rounded-card" />
    </div>
  )

  const activeWorkout = useBackup ? backup : workout
  const isCompleted = workout?.completed

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workout"
        subtitle="Today's personalised workout plan"
        eyebrow="Movement"
        action={
          <Button variant="ghost" size="sm" onClick={handleGenerate} loading={generating}>
            <RefreshCw className="w-3.5 h-3.5 mr-1" />Regenerate
          </Button>
        }
      />

      {isCompleted ? (
        <Card className="text-center py-10">
          <CheckCircle2 className="w-10 h-10 text-sage mx-auto mb-3" />
          <p className="font-display italic text-2xl text-ink mb-1">Well done!</p>
          <p className="font-body text-sm text-muted">Workout completed today.</p>
        </Card>
      ) : activeWorkout ? (
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <Eyebrow>Today&apos;s workout</Eyebrow>
              <h2 className="font-display italic text-2xl text-ink mt-1">{activeWorkout.workoutName ?? 'Custom Workout'}</h2>
              <div className="flex items-center gap-2 mt-2">
                {activeWorkout.duration && <Chip tone="neutral">{activeWorkout.duration} min</Chip>}
                {activeWorkout.intensity && <Chip tone={(intensityColor[activeWorkout.intensity] as 'sage' | 'clay' | 'alert') ?? 'neutral'}>{activeWorkout.intensity} intensity</Chip>}
                {activeWorkout.type && <Chip tone="bone">{activeWorkout.type}</Chip>}
              </div>
            </div>
            {backup && (
              <Button variant="ghost" size="sm" onClick={() => setUseBackup(!useBackup)}>
                {useBackup ? 'Main workout' : 'Low energy option'}
              </Button>
            )}
          </div>

          {activeWorkout.notes && (
            <p className="font-body text-sm text-ink2 mb-4 leading-relaxed bg-shell rounded-xl px-4 py-3">{activeWorkout.notes}</p>
          )}

          {activeWorkout.exercises && activeWorkout.exercises.length > 0 && (
            <div className="mb-4">
              <button
                className="flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-ink transition-colors"
                onClick={() => setExpanded(!expanded)}
              >
                Exercises ({activeWorkout.exercises?.length})
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {expanded && (
                <div className="space-y-2">
                  {activeWorkout.exercises.map((ex, i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 px-4 bg-shell rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-card border border-hairline flex items-center justify-center flex-shrink-0">
                        <span className="font-mono text-[10px] text-muted">{i + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-sm font-medium text-ink">{ex.name}</p>
                        <div className="flex gap-3 mt-0.5">
                          {ex.sets && ex.reps && <span className="font-mono text-[10px] text-muted">{ex.sets}×{ex.reps}</span>}
                          {ex.duration && <span className="font-mono text-[10px] text-muted">{ex.duration}</span>}
                          {ex.notes && <span className="font-mono text-[10px] text-muted italic">{ex.notes}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Feedback */}
          {!isCompleted && (
            <div className="pt-4 border-t border-hairline space-y-3">
              <div>
                <p className="font-body text-xs font-medium text-ink2 mb-2">How was it?</p>
                <div className="flex gap-1.5">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setRating(n)}
                      className={cn('w-8 h-8 rounded-lg font-body text-sm transition-all', rating >= n ? 'bg-clay text-cream' : 'bg-shell text-muted hover:bg-bone')}>
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <input
                value={feedback} onChange={e => setFeedback(e.target.value)}
                placeholder="Optional notes..."
                className="w-full h-9 rounded-xl border border-hairline bg-card px-3 font-body text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-clay/30"
              />
              <div className="flex gap-2">
                <Button variant="accent" onClick={() => handleComplete(true)} loading={completing} className="flex-1">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />Mark complete
                </Button>
                <Button variant="ghost" onClick={() => handleComplete(false)} loading={completing}>
                  <SkipForward className="w-3.5 h-3.5 mr-1" />Skip today
                </Button>
              </div>
            </div>
          )}
        </Card>
      ) : (
        <Card className="text-center py-12">
          <Dumbbell className="w-10 h-10 text-muted mx-auto mb-3 opacity-40" />
          <p className="font-body text-sm text-muted mb-4">No workout generated yet</p>
          <Button variant="accent" onClick={handleGenerate} loading={generating}>
            <Zap className="w-3.5 h-3.5 mr-1" />Generate workout
          </Button>
        </Card>
      )}

      {/* Backup option */}
      {backup && !useBackup && !isCompleted && (
        <Card className="bg-shell border-hairline">
          <Eyebrow>Low energy option</Eyebrow>
          <h3 className="font-body text-sm font-medium text-ink mt-1 mb-1">{backup.workoutName}</h3>
          {backup.duration && <p className="font-body text-xs text-muted mb-3">{backup.duration} min · gentle</p>}
          <Button variant="ghost" size="sm" onClick={() => setUseBackup(true)}>Use this instead →</Button>
        </Card>
      )}
    </div>
  )
}
