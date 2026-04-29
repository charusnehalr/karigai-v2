'use client'
import { useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { SafetyBanner } from '@/components/ui/SafetyBanner'
import { Skeleton } from '@/components/ui/Skeleton'
import { PageHeader } from '@/components/ui/PageHeader'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Chip } from '@/components/ui/Chip'
import { useToastStore } from '@/store/toast.store'
import { Droplets, Plus, Sparkles, Trash2, UtensilsCrossed, Clock } from 'lucide-react'

interface MealLog {
  id: string; meal_type: string; meal_name: string; calories?: number
  protein_g?: number; carbs_g?: number; fat_g?: number; fiber_g?: number; created_at: string
}
interface Suggestion {
  mealName: string; ingredients?: string[]; estimatedCalories?: number
  estimatedMacros?: { proteinG?: number; carbsG?: number; fatG?: number; fiberG?: number }
  reason?: string; safetyNote?: string
}

const MEAL_TYPES = [{ value: 'breakfast', label: 'Breakfast' }, { value: 'snack', label: 'Snack' }, { value: 'lunch', label: 'Lunch' }, { value: 'dinner', label: 'Dinner' }, { value: 'other', label: 'Other' }]

export default function MealsPage() {
  const [meals, setMeals] = useState<MealLog[]>([])
  const [totals, setTotals] = useState({ calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0, fiber_g: 0 })
  const [targets, setTargets] = useState({ calorieTarget: 2000, proteinTarget: 100, waterTargetMl: 2200 })
  const [waterMl, setWaterMl] = useState(0)
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [suggestOpen, setSuggestOpen] = useState(false)
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null)
  const [suggestLoading, setSuggestLoading] = useState(false)
  const [suggestMealType, setSuggestMealType] = useState('dinner')
  const [form, setForm] = useState({ meal_type: 'lunch', meal_name: '', calories: '', protein_g: '', carbs_g: '', fat_g: '', fiber_g: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [waterLoading, setWaterLoading] = useState(false)
  const [deficiencies, setDeficiencies] = useState<{ iron: boolean; b12: boolean; vitD: boolean }>({ iron: false, b12: false, vitD: false })
  const { addToast } = useToastStore()

  const fetchData = useCallback(async () => {
    const [mealsRes, analysisRes, dashRes] = await Promise.all([
      fetch('/api/meals/today'),
      fetch('/api/analysis'),
      fetch('/api/dashboard'),
    ])
    const mealsData = await mealsRes.json()
    const analysisData = await analysisRes.json()
    const dashData = await dashRes.json()
    setMeals(mealsData.meals ?? [])
    setTotals(mealsData.totals ?? totals)
    if (analysisData.calorieTarget) setTargets({ calorieTarget: analysisData.calorieTarget, proteinTarget: analysisData.proteinTarget ?? 100, waterTargetMl: analysisData.waterTargetMl ?? 2200 })
    setWaterMl(dashData.logs?.waterMl ?? 0)
    const hc = dashData.personalizationFactors?.healthContext ?? []
    setDeficiencies({
      iron: hc.includes('Iron deficiency'),
      b12: hc.includes('B12 deficiency'),
      vitD: hc.includes('Vitamin D deficiency'),
    })
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleAddMeal = async () => {
    if (!form.meal_name.trim()) return addToast('Meal name required', 'error')
    setSaving(true)
    const res = await fetch('/api/meals', {
      method: 'POST',
      body: JSON.stringify({ ...form, calories: form.calories ? Number(form.calories) : null, protein_g: form.protein_g ? Number(form.protein_g) : null, carbs_g: form.carbs_g ? Number(form.carbs_g) : null, fat_g: form.fat_g ? Number(form.fat_g) : null, fiber_g: form.fiber_g ? Number(form.fiber_g) : null }),
      headers: { 'Content-Type': 'application/json' },
    })
    const d = await res.json()
    if (d.success) { addToast('Meal logged!', 'success'); setAddOpen(false); setForm({ meal_type: 'lunch', meal_name: '', calories: '', protein_g: '', carbs_g: '', fat_g: '', fiber_g: '', notes: '' }); fetchData() }
    else addToast(d.error ?? 'Failed', 'error')
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    await fetch('/api/meals', { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Content-Type': 'application/json' } })
    fetchData()
  }

  const handleWater = async (amount = 250) => {
    setWaterLoading(true)
    await fetch('/api/water', { method: 'POST', body: JSON.stringify({ amount }), headers: { 'Content-Type': 'application/json' } })
    await fetchData()
    setWaterLoading(false)
  }

  const handleSuggest = async () => {
    setSuggestLoading(true)
    setSuggestion(null)
    const res = await fetch('/api/meals/suggest', { method: 'POST', body: JSON.stringify({ mealType: suggestMealType }), headers: { 'Content-Type': 'application/json' } })
    const d = await res.json()
    setSuggestion(d)
    setSuggestLoading(false)
  }

  if (loading) return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-40 rounded-card" />)}
      </div>
    </div>
  )

  const calorieP = totals.calories / targets.calorieTarget
  const proteinP = totals.protein_g / targets.proteinTarget
  const waterP = waterMl / targets.waterTargetMl

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meals & Nutrition"
        eyebrow="Daily nutrition"
        action={
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setSuggestOpen(true)}>
              <Sparkles className="w-3.5 h-3.5 mr-1" />Suggest meal
            </Button>
            <Button variant="accent" size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="w-3.5 h-3.5 mr-1" />Add meal
            </Button>
          </div>
        }
      />

      {/* Progress row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <Eyebrow>Calories</Eyebrow>
          <div className="mt-3 flex items-center gap-4">
            <ProgressRing value={calorieP} size={64} stroke={6} label={String(totals.calories)} sublabel="kcal" color="#B8704F" track="#EFE7DA" />
            <div>
              <p className="font-body text-lg font-semibold text-ink">{totals.calories} <span className="text-sm font-normal text-muted">/ {targets.calorieTarget}</span></p>
              <p className="font-body text-xs text-muted">{Math.max(0, targets.calorieTarget - totals.calories)} remaining</p>
            </div>
          </div>
        </Card>

        <Card>
          <Eyebrow>Protein</Eyebrow>
          <div className="mt-3 flex items-center gap-4">
            <ProgressRing value={proteinP} size={64} stroke={6} label={`${Math.round(totals.protein_g)}g`} sublabel="protein" color="#7A8B6F" track="#CFD4C3" />
            <div>
              <p className="font-body text-lg font-semibold text-ink">{Math.round(totals.protein_g)}g <span className="text-sm font-normal text-muted">/ {targets.proteinTarget}g</span></p>
              <p className="font-body text-xs text-muted">{Math.max(0, targets.proteinTarget - Math.round(totals.protein_g))}g remaining</p>
            </div>
          </div>
        </Card>

        <Card>
          <Eyebrow>Water</Eyebrow>
          <div className="mt-3 flex items-center gap-4">
            <ProgressRing value={waterP} size={64} stroke={6} label={`${waterMl}ml`} sublabel="water" color="#89B4CC" track="#D6E8F0" />
            <div>
              <p className="font-body text-lg font-semibold text-ink">{waterMl}ml <span className="text-sm font-normal text-muted">/ {targets.waterTargetMl}ml</span></p>
              <div className="flex gap-1.5 mt-2">
                {[250, 500].map(amt => (
                  <Button key={amt} variant="soft" size="sm" onClick={() => handleWater(amt)} loading={waterLoading}>
                    <Droplets className="w-3 h-3 mr-0.5" />+{amt}ml
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Deficiency reminders */}
      {deficiencies.iron && <SafetyBanner tone="info" title="Iron reminder" body="Consider including iron-rich foods today: lentils, spinach, tofu, fortified cereals. Pairing with vitamin C can help absorption. Speak with a doctor about testing." />}
      {deficiencies.b12 && <SafetyBanner tone="info" title="B12 reminder" body="Vegan and plant-based diets can be low in B12. Consider B12-fortified foods like nutritional yeast, plant milks, or fortified cereals. Speak with a doctor about testing." />}
      {deficiencies.vitD && <SafetyBanner tone="info" title="Vitamin D reminder" body="Sunlight and dietary sources like eggs and fortified foods support vitamin D. Speak with a doctor about testing your levels." />}

      {/* Meal log */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <Eyebrow>Today&apos;s meals</Eyebrow>
          <Button variant="ghost" size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="w-3.5 h-3.5 mr-1" />Add
          </Button>
        </div>
        {meals.length === 0 ? (
          <div className="py-8 text-center">
            <UtensilsCrossed className="w-8 h-8 text-muted mx-auto mb-2 opacity-40" />
            <p className="font-body text-sm text-muted">No meals logged today</p>
          </div>
        ) : (
          <div className="space-y-2">
            {meals.map(meal => (
              <div key={meal.id} className="flex items-center gap-3 py-2.5 border-b border-hairline last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Chip tone="neutral">{meal.meal_type}</Chip>
                    <p className="font-body text-sm font-medium text-ink truncate">{meal.meal_name}</p>
                  </div>
                  <div className="flex gap-3">
                    {meal.calories && <span className="font-mono text-[10px] text-muted">{meal.calories} kcal</span>}
                    {meal.protein_g && <span className="font-mono text-[10px] text-muted">{meal.protein_g}g protein</span>}
                    {meal.carbs_g && <span className="font-mono text-[10px] text-muted">{meal.carbs_g}g carbs</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-mono text-[10px] text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(meal.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button onClick={() => handleDelete(meal.id)} className="w-6 h-6 rounded-lg hover:bg-alert/10 flex items-center justify-center transition-colors text-muted hover:text-alert">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Add Meal Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Log a meal">
        <div className="p-5 space-y-4">
          <Select label="Meal type" value={form.meal_type} onChange={e => setForm(f => ({ ...f, meal_type: e.target.value }))} options={MEAL_TYPES} />
          <Input label="Meal name" value={form.meal_name} onChange={e => setForm(f => ({ ...f, meal_name: e.target.value }))} placeholder="e.g. Dal khichdi" required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Calories" type="number" value={form.calories} onChange={e => setForm(f => ({ ...f, calories: e.target.value }))} placeholder="e.g. 380" />
            <Input label="Protein (g)" type="number" value={form.protein_g} onChange={e => setForm(f => ({ ...f, protein_g: e.target.value }))} placeholder="e.g. 18" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Input label="Carbs (g)" type="number" value={form.carbs_g} onChange={e => setForm(f => ({ ...f, carbs_g: e.target.value }))} placeholder="e.g. 52" />
            <Input label="Fat (g)" type="number" value={form.fat_g} onChange={e => setForm(f => ({ ...f, fat_g: e.target.value }))} placeholder="e.g. 8" />
            <Input label="Fiber (g)" type="number" value={form.fiber_g} onChange={e => setForm(f => ({ ...f, fiber_g: e.target.value }))} placeholder="e.g. 6" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="accent" onClick={handleAddMeal} loading={saving} className="flex-1">Log meal</Button>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Suggest Meal Modal */}
      <Modal open={suggestOpen} onClose={() => setSuggestOpen(false)} title="Meal suggestion">
        <div className="p-5 space-y-4">
          <Select label="What meal?" value={suggestMealType} onChange={e => setSuggestMealType(e.target.value)} options={MEAL_TYPES} />
          <Button variant="accent" onClick={handleSuggest} loading={suggestLoading} className="w-full">
            <Sparkles className="w-3.5 h-3.5 mr-2" />Get suggestion
          </Button>
          {suggestion && (
            <div className="space-y-3 pt-2 border-t border-hairline">
              <h3 className="font-body text-sm font-semibold text-ink">{suggestion.mealName}</h3>
              {suggestion.ingredients && (
                <div className="flex flex-wrap gap-1.5">
                  {suggestion.ingredients.map((ing, i) => <Chip key={i} tone="neutral">{ing}</Chip>)}
                </div>
              )}
              {suggestion.estimatedCalories && (
                <div className="flex gap-4">
                  <span className="font-mono text-[10px] text-muted">~{suggestion.estimatedCalories} kcal</span>
                  {suggestion.estimatedMacros?.proteinG && <span className="font-mono text-[10px] text-muted">{suggestion.estimatedMacros.proteinG}g protein</span>}
                </div>
              )}
              {suggestion.reason && <p className="font-body text-xs text-ink2 leading-relaxed">{suggestion.reason}</p>}
              {suggestion.safetyNote && <SafetyBanner tone="info" title="Note" body={suggestion.safetyNote} />}
              <Button variant="ghost" size="sm" onClick={() => {
                setForm(f => ({
                  ...f,
                  meal_name: suggestion.mealName,
                  meal_type: suggestMealType,
                  calories: suggestion.estimatedCalories ? String(suggestion.estimatedCalories) : '',
                  protein_g: suggestion.estimatedMacros?.proteinG ? String(suggestion.estimatedMacros.proteinG) : '',
                  carbs_g: suggestion.estimatedMacros?.carbsG ? String(suggestion.estimatedMacros.carbsG) : '',
                  fat_g: suggestion.estimatedMacros?.fatG ? String(suggestion.estimatedMacros.fatG) : '',
                }))
                setSuggestOpen(false)
                setAddOpen(true)
              }}>
                Use this suggestion →
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
