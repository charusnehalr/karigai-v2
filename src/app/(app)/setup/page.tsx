'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { SafetyBanner } from '@/components/ui/SafetyBanner'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { useToastStore } from '@/store/toast.store'
import { cn } from '@/lib/utils'

const SECTIONS = [
  { key: 'basic_profile', label: 'Basic Profile', icon: '👤' },
  { key: 'body_metrics', label: 'Body Metrics', icon: '📏' },
  { key: 'health_context', label: 'Health Context', icon: '🌿' },
  { key: 'cycle_profile', label: 'Cycle Details', icon: '🌙' },
  { key: 'diet_preferences', label: 'Diet & Food', icon: '🥗' },
  { key: 'fasting_preferences', label: 'Fasting', icon: '⏱️' },
  { key: 'fitness_preferences', label: 'Fitness', icon: '🏃' },
  { key: 'goals', label: 'Goals', icon: '🎯' },
]

const CONDITIONS = [
  { key: 'has_pcos', label: 'PCOS (Polycystic ovary syndrome)' },
  { key: 'has_pcod', label: 'PCOD (Polycystic ovarian disease)' },
  { key: 'has_prediabetes', label: 'Prediabetes' },
  { key: 'has_diabetes', label: 'Type 1 or Type 2 diabetes' },
  { key: 'has_thyroid_condition', label: 'Thyroid condition (hypo/hyperthyroid)' },
  { key: 'has_irregular_periods', label: 'Irregular periods' },
  { key: 'has_hormonal_concerns', label: 'Hormonal imbalance or concern' },
  { key: 'has_iron_deficiency', label: 'Iron deficiency / anaemia' },
  { key: 'has_vitamin_d_deficiency', label: 'Vitamin D deficiency' },
  { key: 'has_b12_deficiency', label: 'Vitamin B12 deficiency' },
  { key: 'has_high_cholesterol', label: 'High cholesterol' },
  { key: 'has_high_blood_pressure', label: 'High blood pressure' },
  { key: 'has_digestive_issues', label: 'Digestive issues' },
  { key: 'has_eating_disorder_history', label: 'Eating disorder history' },
  { key: 'is_pregnant', label: 'Currently pregnant' },
  { key: 'is_breastfeeding', label: 'Currently breastfeeding' },
]

const SYMPTOMS = ['Cramps', 'Bloating', 'Fatigue', 'Acne', 'Mood changes', 'Cravings', 'Spotting', 'Headaches']

const ACTIVITIES = [
  { key: 'gym_available', label: 'Gym' },
  { key: 'weights_available', label: 'Weight lifting equipment' },
  { key: 'swimming_available', label: 'Swimming pool' },
  { key: 'running_available', label: 'Running (outdoor/treadmill)' },
  { key: 'home_workouts_available', label: 'Home workouts' },
  { key: 'walking_preferred', label: 'Walking' },
  { key: 'cycling_available', label: 'Cycling' },
  { key: 'yoga_pilates_preferred', label: 'Yoga / Pilates studio' },
]

const GOALS_LIST = [
  { value: 'lose_weight', label: 'Lose weight' },
  { value: 'maintain', label: 'Maintain weight' },
  { value: 'gain_muscle', label: 'Gain muscle' },
  { value: 'toning', label: 'Tone body' },
  { value: 'improve_energy', label: 'Improve energy' },
  { value: 'improve_stamina', label: 'Improve stamina' },
  { value: 'cycle_awareness', label: 'Improve cycle awareness' },
  { value: 'improve_nutrition', label: 'Improve nutrition' },
  { value: 'support_pcos', label: 'Support PCOS/PCOD lifestyle' },
  { value: 'support_prediabetes', label: 'Support prediabetes lifestyle' },
  { value: 'support_thyroid', label: 'Support thyroid-friendly routine' },
]

export default function SetupPage() {
  const [activeSection, setActiveSection] = useState(0)
  const [progress, setProgress] = useState(0)
  const [saving, setSaving] = useState(false)
  const { addToast } = useToastStore()

  // Form states
  const [profile, setProfile] = useState({ name: '', age: '', height_cm: '', weight_kg: '' })
  const [bodyMetrics, setBodyMetrics] = useState({ waist_cm: '', hip_cm: '', body_fat_percent: '' })
  const [health, setHealth] = useState<Record<string, boolean | string>>({})
  const [injuries, setInjuries] = useState('')
  const [allergies, setAllergies] = useState('')
  const [cycle, setCycle] = useState({ last_period_start: '', average_cycle_length: '28', average_period_length: '5', cycle_regular: 'unsure', flow_level: '' })
  const [cycleSymptoms, setCycleSymptoms] = useState<string[]>([])
  const [diet, setDiet] = useState({ diet_type: '', cuisine_preference: '', meal_frequency: '3', foods_to_avoid: '' })
  const [dietFlags, setDietFlags] = useState<Record<string, boolean>>({})
  const [fasting, setFasting] = useState({ interested: false, fasting_type: 'none', start: '', end: '', dizzy: false })
  const [fitness, setFitness] = useState<Record<string, boolean>>({})
  const [fitnessExtra, setFitnessExtra] = useState({ fitness_level: '', workout_days_per_week: '3', workout_duration_minutes: '45', injuries: '', exercise_dislikes: '' })
  const [goals, setGoals] = useState({ primary_goal: '', target_weight_kg: '', timeline_weeks: '' })

  useEffect(() => {
    fetch('/api/setup').then(r => r.json()).then(d => {
      setProgress(d.setupProgress ?? 0)
      if (d.profile) setProfile({ name: d.profile.name ?? '', age: d.profile.age ?? '', height_cm: d.profile.height_cm ?? '', weight_kg: d.profile.weight_kg ?? '' })
      if (d.bodyMetrics) setBodyMetrics({ waist_cm: d.bodyMetrics.waist_cm ?? '', hip_cm: d.bodyMetrics.hip_cm ?? '', body_fat_percent: d.bodyMetrics.body_fat_percent ?? '' })
      if (d.healthContext) {
        const h: Record<string, boolean | string> = {}
        CONDITIONS.forEach(c => { h[c.key] = d.healthContext[c.key] ?? false })
        setHealth(h)
        setInjuries(d.healthContext.injuries ?? '')
        setAllergies(d.healthContext.allergies ?? '')
      }
      if (d.cycleProfile) {
        setCycle({ last_period_start: d.cycleProfile.last_period_start ?? '', average_cycle_length: d.cycleProfile.average_cycle_length ?? '28', average_period_length: d.cycleProfile.average_period_length ?? '5', cycle_regular: d.cycleProfile.cycle_regular ?? 'unsure', flow_level: d.cycleProfile.flow_level ?? '' })
        setCycleSymptoms(d.cycleProfile.common_symptoms ?? [])
      }
      if (d.dietPreferences) {
        setDiet({ diet_type: d.dietPreferences.diet_type ?? '', cuisine_preference: d.dietPreferences.cuisine_preference ?? '', meal_frequency: d.dietPreferences.meal_frequency ?? '3', foods_to_avoid: d.dietPreferences.foods_to_avoid ?? '' })
        const df: Record<string, boolean> = {}
        ;['is_kosher','is_halal','is_jain','is_gluten_free','is_lactose_free','is_dairy_free','is_nut_free','is_soy_free'].forEach(k => { df[k] = d.dietPreferences[k] ?? false })
        setDietFlags(df)
      }
      if (d.fastingPreferences) {
        setFasting({ interested: d.fastingPreferences.interested_in_fasting ?? false, fasting_type: d.fastingPreferences.fasting_type ?? 'none', start: d.fastingPreferences.eating_window_start ?? '', end: d.fastingPreferences.eating_window_end ?? '', dizzy: d.fastingPreferences.feels_dizzy_when_fasting ?? false })
      }
      if (d.fitnessPreferences) {
        const ff: Record<string, boolean> = {}
        ACTIVITIES.forEach(a => { ff[a.key] = d.fitnessPreferences[a.key] ?? false })
        setFitness(ff)
        setFitnessExtra({ fitness_level: d.fitnessPreferences.fitness_level ?? '', workout_days_per_week: d.fitnessPreferences.workout_days_per_week ?? '3', workout_duration_minutes: d.fitnessPreferences.workout_duration_minutes ?? '45', injuries: d.fitnessPreferences.injuries ?? '', exercise_dislikes: d.fitnessPreferences.exercise_dislikes ?? '' })
      }
      if (d.goals) setGoals({ primary_goal: d.goals.primary_goal ?? '', target_weight_kg: d.goals.target_weight_kg ?? '', timeline_weeks: d.goals.timeline_weeks ?? '' })
    })
  }, [])

  const getPayload = (section: string) => {
    switch (section) {
      case 'basic_profile': return { name: profile.name || null, age: profile.age ? Number(profile.age) : null, height_cm: profile.height_cm ? Number(profile.height_cm) : null, weight_kg: profile.weight_kg ? Number(profile.weight_kg) : null }
      case 'body_metrics': return { waist_cm: bodyMetrics.waist_cm ? Number(bodyMetrics.waist_cm) : null, hip_cm: bodyMetrics.hip_cm ? Number(bodyMetrics.hip_cm) : null, body_fat_percent: bodyMetrics.body_fat_percent ? Number(bodyMetrics.body_fat_percent) : null }
      case 'health_context': return { ...health, injuries: injuries || null, allergies: allergies || null }
      case 'cycle_profile': return { ...cycle, average_cycle_length: Number(cycle.average_cycle_length), average_period_length: Number(cycle.average_period_length), common_symptoms: cycleSymptoms }
      case 'diet_preferences': return { ...diet, ...dietFlags, diet_type: diet.diet_type || null, meal_frequency: Number(diet.meal_frequency), foods_to_avoid: diet.foods_to_avoid || null }
      case 'fasting_preferences': return { interested_in_fasting: fasting.interested, fasting_type: fasting.fasting_type, eating_window_start: fasting.start || null, eating_window_end: fasting.end || null, feels_dizzy_when_fasting: fasting.dizzy }
      case 'fitness_preferences': return { ...fitness, fitness_level: fitnessExtra.fitness_level || null, workout_days_per_week: fitnessExtra.workout_days_per_week ? Number(fitnessExtra.workout_days_per_week) : null, workout_duration_minutes: Number(fitnessExtra.workout_duration_minutes), injuries: fitnessExtra.injuries || null, exercise_dislikes: fitnessExtra.exercise_dislikes || null }
      case 'goals': return { primary_goal: goals.primary_goal || null, target_weight_kg: goals.target_weight_kg ? Number(goals.target_weight_kg) : null, timeline_weeks: goals.timeline_weeks ? Number(goals.timeline_weeks) : null }
      default: return {}
    }
  }

  const save = async (sectionIdx: number) => {
    setSaving(true)
    const section = SECTIONS[sectionIdx].key
    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        body: JSON.stringify({ section, data: getPayload(section) }),
        headers: { 'Content-Type': 'application/json' },
      })
      const d = await res.json()
      if (d.error) { addToast(d.error, 'error'); return }
      setProgress(d.setupProgress ?? progress)
      addToast('Saved!', 'success')
      if (sectionIdx < SECTIONS.length - 1) setActiveSection(sectionIdx + 1)
    } finally {
      setSaving(false)
    }
  }

  const fastingDisabled = (health.has_eating_disorder_history || health.is_pregnant || health.is_breastfeeding || fasting.dizzy) as boolean

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: section nav */}
      <div className="lg:w-64 flex-shrink-0">
        <Card className="sticky top-8">
          <div className="flex items-center gap-3 mb-5">
            <ProgressRing value={progress / 100} size={44} stroke={4} label={`${progress}%`} />
            <div>
              <p className="font-body text-sm font-medium text-ink">Setup progress</p>
              <p className="font-mono text-[9px] text-muted uppercase tracking-widest">{progress === 100 ? 'Complete' : `${8 - Math.ceil(progress / 12.5)} sections left`}</p>
            </div>
          </div>
          <nav className="space-y-0.5">
            {SECTIONS.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(i)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left font-body text-sm transition-all',
                  activeSection === i ? 'bg-claySoft text-clay font-medium' : 'text-muted hover:bg-shell hover:text-ink2'
                )}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </nav>
        </Card>
      </div>

      {/* Right: form */}
      <div className="flex-1 min-w-0">
        <Card>
          <div className="mb-6">
            <Eyebrow>{`Section ${activeSection + 1} of 8`}</Eyebrow>
            <h2 className="font-display italic text-2xl text-ink mt-1">{SECTIONS[activeSection].label}</h2>
          </div>

          {/* Section 1: Basic Profile */}
          {activeSection === 0 && (
            <div className="space-y-4">
              <Input label="Your name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Priya" />
              <Input label="Age" type="number" value={profile.age} onChange={e => setProfile(p => ({ ...p, age: e.target.value }))} placeholder="e.g. 28" min={13} max={100} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Height (cm)" type="number" value={profile.height_cm} onChange={e => setProfile(p => ({ ...p, height_cm: e.target.value }))} placeholder="e.g. 162" />
                <Input label="Weight (kg)" type="number" value={profile.weight_kg} onChange={e => setProfile(p => ({ ...p, weight_kg: e.target.value }))} placeholder="e.g. 65" />
              </div>
              <SafetyBanner tone="info" title="Why we ask" body="Height and weight are used to calculate your estimated calorie and protein targets. These are wellness estimates, not medical values." />
            </div>
          )}

          {/* Section 2: Body Metrics */}
          {activeSection === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Waist circumference (cm)" type="number" value={bodyMetrics.waist_cm} onChange={e => setBodyMetrics(b => ({ ...b, waist_cm: e.target.value }))} placeholder="e.g. 78" />
                <Input label="Hip circumference (cm)" type="number" value={bodyMetrics.hip_cm} onChange={e => setBodyMetrics(b => ({ ...b, hip_cm: e.target.value }))} placeholder="e.g. 94" />
              </div>
              <Input label="Body fat % (optional)" type="number" value={bodyMetrics.body_fat_percent} onChange={e => setBodyMetrics(b => ({ ...b, body_fat_percent: e.target.value }))} placeholder="e.g. 24" />
              <SafetyBanner tone="info" title="About these measurements" body="Used to calculate WHR and BRI — wellness estimates, not diagnosis. Optional but helpful for personalisation." />
            </div>
          )}

          {/* Section 3: Health Context */}
          {activeSection === 2 && (
            <div className="space-y-4">
              <SafetyBanner tone="info" title="This is personalisation context, not diagnosis" body="Karigai uses these inputs to adjust your wellness plan. We do not diagnose, treat, or give medical advice based on this information." />
              <p className="font-body text-sm text-muted">Have you been diagnosed with or are you personally tracking any of these?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CONDITIONS.map(c => (
                  <Checkbox
                    key={c.key}
                    label={c.label}
                    checked={!!health[c.key]}
                    onChange={v => setHealth(h => ({ ...h, [c.key]: v }))}
                  />
                ))}
              </div>
              <Input label="Injuries (optional)" value={injuries} onChange={e => setInjuries(e.target.value)} placeholder="e.g. lower back pain, knee injury" />
              <Input label="Food allergies (optional)" value={allergies} onChange={e => setAllergies(e.target.value)} placeholder="e.g. peanuts, shellfish" />
            </div>
          )}

          {/* Section 4: Cycle */}
          {activeSection === 3 && (
            <div className="space-y-4">
              <Input label="Last period start date" type="date" value={cycle.last_period_start} onChange={e => setCycle(c => ({ ...c, last_period_start: e.target.value }))} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Average cycle length (days)" type="number" value={cycle.average_cycle_length} onChange={e => setCycle(c => ({ ...c, average_cycle_length: e.target.value }))} min={21} max={45} />
                <Input label="Average period length (days)" type="number" value={cycle.average_period_length} onChange={e => setCycle(c => ({ ...c, average_period_length: e.target.value }))} min={2} max={10} />
              </div>
              <Select label="Cycle regularity" value={cycle.cycle_regular} onChange={e => setCycle(c => ({ ...c, cycle_regular: e.target.value }))} options={[{ value: 'regular', label: 'Regular' }, { value: 'irregular', label: 'Irregular' }, { value: 'unsure', label: 'Not sure' }]} />
              <Select label="Flow level (optional)" value={cycle.flow_level} onChange={e => setCycle(c => ({ ...c, flow_level: e.target.value }))} options={[{ value: '', label: 'Select…' }, { value: 'light', label: 'Light' }, { value: 'moderate', label: 'Moderate' }, { value: 'heavy', label: 'Heavy' }]} />
              <div>
                <p className="font-body text-sm font-medium text-ink2 mb-2">Common symptoms</p>
                <div className="flex flex-wrap gap-2">
                  {SYMPTOMS.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setCycleSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                      className={cn('px-2.5 py-1 rounded-chip border font-body text-xs font-medium transition-all', cycleSymptoms.includes(s) ? 'bg-clay text-cream border-clay' : 'bg-shell text-ink2 border-hairline hover:border-clay/50')}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {(cycle.cycle_regular === 'irregular' || cycle.cycle_regular === 'unsure') && (
                <SafetyBanner tone="info" title="Low confidence prediction" body="Karigai will rely more on symptom tracking when cycle prediction confidence is lower." />
              )}
            </div>
          )}

          {/* Section 5: Diet */}
          {activeSection === 4 && (
            <div className="space-y-4">
              <Select
                label="Diet type"
                value={diet.diet_type}
                onChange={e => setDiet(d => ({ ...d, diet_type: e.target.value }))}
                placeholder="Select your diet type"
                options={[
                  { value: 'Vegetarian', label: 'Vegetarian' },
                  { value: 'Vegan', label: 'Vegan' },
                  { value: 'Pescatarian', label: 'Pescatarian' },
                  { value: 'Eggetarian', label: 'Eggetarian' },
                  { value: 'Non-vegetarian', label: 'Non-vegetarian' },
                  { value: 'Other', label: 'Other' },
                ]}
              />
              <div>
                <p className="font-body text-sm font-medium text-ink2 mb-2">Additional restrictions</p>
                <div className="grid grid-cols-2 gap-2">
                  {[['is_kosher','Kosher'],['is_halal','Halal'],['is_jain','Jain'],['is_gluten_free','Gluten-free'],['is_lactose_free','Lactose-free'],['is_dairy_free','Dairy-free'],['is_nut_free','Nut-free'],['is_soy_free','Soy-free']].map(([key, label]) => (
                    <Checkbox key={key} label={label} checked={!!dietFlags[key]} onChange={v => setDietFlags(f => ({ ...f, [key]: v }))} />
                  ))}
                </div>
              </div>
              <Input label="Cuisine preference (optional)" value={diet.cuisine_preference} onChange={e => setDiet(d => ({ ...d, cuisine_preference: e.target.value }))} placeholder="e.g. Indian, Mediterranean, Mixed" />
              <Select label="Meals per day" value={diet.meal_frequency} onChange={e => setDiet(d => ({ ...d, meal_frequency: e.target.value }))} options={[2,3,4,5,6].map(n => ({ value: String(n), label: String(n) }))} />
              <Input label="Foods to avoid (optional)" value={diet.foods_to_avoid} onChange={e => setDiet(d => ({ ...d, foods_to_avoid: e.target.value }))} placeholder="e.g. onions, spicy food" />
            </div>
          )}

          {/* Section 6: Fasting */}
          {activeSection === 5 && (
            <div className="space-y-4">
              <div>
                <p className="font-body text-sm font-medium text-ink2 mb-2">Are you interested in intermittent fasting?</p>
                <div className="flex gap-2">
                  {[['false', 'No'], ['maybe', 'Maybe'], ['true', 'Yes']].map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFasting(f => ({ ...f, interested: val === 'true', fasting_type: val === 'false' ? 'none' : f.fasting_type }))}
                      className={cn('px-4 py-2 rounded-xl border font-body text-sm font-medium transition-all', (val === 'true' && fasting.interested) || (val === 'false' && !fasting.interested) ? 'bg-clay text-cream border-clay' : 'bg-shell text-ink2 border-hairline hover:border-clay/50')}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {fasting.interested && (
                <>
                  <Select label="Fasting style" value={fasting.fasting_type} onChange={e => setFasting(f => ({ ...f, fasting_type: e.target.value }))} options={[{ value: '12:12', label: '12:12' }, { value: '14:10', label: '14:10' }, { value: '16:8', label: '16:8' }, { value: 'custom', label: 'Custom' }]} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Eating window start" type="time" value={fasting.start} onChange={e => setFasting(f => ({ ...f, start: e.target.value }))} />
                    <Input label="Eating window end" type="time" value={fasting.end} onChange={e => setFasting(f => ({ ...f, end: e.target.value }))} />
                  </div>
                </>
              )}

              <div>
                <p className="font-body text-sm font-medium text-ink2 mb-2">Do you ever feel dizzy or weak when skipping meals?</p>
                <div className="flex gap-2">
                  {[['true', 'Yes'], ['false', 'No']].map(([val, label]) => (
                    <button key={val} type="button" onClick={() => setFasting(f => ({ ...f, dizzy: val === 'true' }))}
                      className={cn('px-4 py-2 rounded-xl border font-body text-sm font-medium transition-all', (val === 'true' && fasting.dizzy) || (val === 'false' && !fasting.dizzy) ? 'bg-clay text-cream border-clay' : 'bg-shell text-ink2 border-hairline')}
                    >{label}</button>
                  ))}
                </div>
              </div>

              {fastingDisabled && (
                <SafetyBanner tone="warn" title="Fasting not recommended" body="Based on your health context, fasting suggestions are disabled. This ensures your plan remains safe and supportive." />
              )}
            </div>
          )}

          {/* Section 7: Fitness */}
          {activeSection === 6 && (
            <div className="space-y-4">
              <div>
                <p className="font-body text-sm font-medium text-ink2 mb-2">Available equipment / activities</p>
                <div className="grid grid-cols-2 gap-2">
                  {ACTIVITIES.map(a => (
                    <Checkbox key={a.key} label={a.label} checked={!!fitness[a.key]} onChange={v => setFitness(f => ({ ...f, [a.key]: v }))} />
                  ))}
                </div>
              </div>
              <Select label="Fitness level" value={fitnessExtra.fitness_level} onChange={e => setFitnessExtra(f => ({ ...f, fitness_level: e.target.value }))} placeholder="Select…" options={[{ value: 'beginner', label: 'Beginner' }, { value: 'intermediate', label: 'Intermediate' }, { value: 'advanced', label: 'Advanced' }]} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Workout days per week" type="number" value={fitnessExtra.workout_days_per_week} onChange={e => setFitnessExtra(f => ({ ...f, workout_days_per_week: e.target.value }))} min={1} max={7} />
                <Select label="Workout duration" value={fitnessExtra.workout_duration_minutes} onChange={e => setFitnessExtra(f => ({ ...f, workout_duration_minutes: e.target.value }))} options={[{ value: '15', label: '15 min' }, { value: '30', label: '30 min' }, { value: '45', label: '45 min' }, { value: '60', label: '60 min' }, { value: '90', label: '90+ min' }]} />
              </div>
              <Input label="Injuries (optional)" value={fitnessExtra.injuries} onChange={e => setFitnessExtra(f => ({ ...f, injuries: e.target.value }))} placeholder="e.g. lower back pain" />
              <Input label="Exercise dislikes (optional)" value={fitnessExtra.exercise_dislikes} onChange={e => setFitnessExtra(f => ({ ...f, exercise_dislikes: e.target.value }))} placeholder="e.g. running, burpees" />
            </div>
          )}

          {/* Section 8: Goals */}
          {activeSection === 7 && (
            <div className="space-y-4">
              <div>
                <p className="font-body text-sm font-medium text-ink2 mb-2">Primary goal</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {GOALS_LIST.map(g => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => setGoals(prev => ({ ...prev, primary_goal: g.value }))}
                      className={cn('px-3 py-2.5 rounded-xl border font-body text-sm text-left transition-all', goals.primary_goal === g.value ? 'bg-claySoft border-clay text-clay font-medium' : 'bg-card border-hairline text-ink2 hover:border-clay/50')}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Target weight (kg, optional)" type="number" value={goals.target_weight_kg} onChange={e => setGoals(g => ({ ...g, target_weight_kg: e.target.value }))} placeholder="e.g. 58" />
                <Select label="Timeline (optional)" value={goals.timeline_weeks} onChange={e => setGoals(g => ({ ...g, timeline_weeks: e.target.value }))} placeholder="No rush" options={[{ value: '4', label: '4 weeks' }, { value: '8', label: '8 weeks' }, { value: '12', label: '12 weeks' }, { value: '24', label: '6 months' }]} />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex items-center gap-3 pt-5 border-t border-hairline">
            <Button variant="accent" onClick={() => save(activeSection)} loading={saving}>
              Save {SECTIONS[activeSection].label}
            </Button>
            {activeSection < SECTIONS.length - 1 && (
              <Button variant="ghost" onClick={() => setActiveSection(a => a + 1)}>
                Skip for now
              </Button>
            )}
            {activeSection > 0 && (
              <Button variant="ghost" onClick={() => setActiveSection(a => a - 1)} className="ml-auto">
                ← Back
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
