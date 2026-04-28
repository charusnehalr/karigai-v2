'use client';

import { useState } from 'react';
import { Card, Eyebrow, SafetyBanner, Icon } from '@karigai/ui';

const LOGGED_MEALS = [
  {
    time: 'Breakfast · 8:12 AM',
    name: 'Greek yoghurt with berries',
    calories: 310,
    protein: 22,
    carbs: 32,
    fat: 6,
  },
  {
    time: 'Morning snack · 10:45 AM',
    name: 'Handful of almonds',
    calories: 160,
    protein: 6,
    carbs: 6,
    fat: 14,
  },
];

const SUGGESTED_MEALS = [
  { type: 'Lunch', name: 'Lentil soup with brown rice', calories: 420, protein: 18 },
  { type: 'Dinner', name: 'Grilled salmon with roasted vegetables', calories: 520, protein: 40 },
];

const macros = [
  { label: 'Protein', value: 28, target: 130, color: 'var(--kg-sage)' },
  { label: 'Fiber', value: 8, target: 28, color: 'var(--kg-clay)' },
  { label: 'Carbs', value: 68, target: 200, color: '#A48B62' },
  { label: 'Fat', value: 20, target: 58, color: '#6B8AA8' },
];

/* S_Meals — meal log + nutrition overview */
export default function MealsPage() {
  const [water, setWater] = useState(3);
  const eaten = 470;
  const target = 1750;
  const remaining = target - eaten;

  return (
    <div style={{ padding: '0 0 8px' }}>
      {/* Header — dark calorie card */}
      <div
        style={{
          background: 'var(--kg-ink)',
          padding: '20px 20px 24px',
          color: 'var(--kg-cream)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <Eyebrow style={{ color: 'rgba(245,239,230,0.5)', marginBottom: 4 }}>Nutrition · Today</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 48,
                  fontStyle: 'italic',
                  color: 'var(--kg-clay)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {remaining}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(245,239,230,0.6)' }}>
                kcal remaining
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(245,239,230,0.5)', marginTop: 4 }}>
              {eaten} eaten · {target} target
            </div>
          </div>
          <button
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(245,239,230,0.1)',
              border: '1px solid rgba(245,239,230,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Icon name="plus" size={18} color="var(--kg-cream)" />
          </button>
        </div>

        {/* Macro bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
          {macros.map(m => (
            <div key={m.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(245,239,230,0.5)', letterSpacing: '0.12em' }}>
                  {m.label.toUpperCase()}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(245,239,230,0.5)' }}>
                  {m.value} / {m.target}{m.label === 'Protein' || m.label === 'Fiber' || m.label === 'Carbs' || m.label === 'Fat' ? 'g' : ''}
                </span>
              </div>
              <div style={{ height: 4, background: 'rgba(245,239,230,0.15)', borderRadius: 99, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${Math.min((m.value / m.target) * 100, 100)}%`,
                    height: '100%',
                    background: m.color,
                    borderRadius: 99,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Logged meals */}
        <div>
          <Eyebrow style={{ marginBottom: 10 }}>Logged today</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LOGGED_MEALS.map((m, i) => (
              <Card key={i} style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)', letterSpacing: '0.12em', marginBottom: 3 }}>
                      {m.time.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--kg-ink)', marginBottom: 4 }}>
                      {m.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--kg-muted)' }}>
                      {m.calories} kcal · {m.protein}g P · {m.carbs}g C · {m.fat}g F
                    </div>
                  </div>
                  <Icon name="more" size={18} color="var(--kg-muted)" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Suggested meals */}
        <div>
          <Eyebrow style={{ marginBottom: 10 }}>Suggested for you</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SUGGESTED_MEALS.map((m, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 14,
                  border: '1.5px dashed var(--kg-hairline)',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)', letterSpacing: '0.12em', marginBottom: 3 }}>
                    {m.type.toUpperCase()}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--kg-ink)', marginBottom: 4 }}>
                    {m.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--kg-muted)' }}>
                    {m.calories} kcal · {m.protein}g protein
                  </div>
                </div>
                <button
                  style={{
                    padding: '8px 12px',
                    borderRadius: 99,
                    border: '1px solid var(--kg-hairline)',
                    background: 'transparent',
                    fontFamily: 'var(--font-body)',
                    fontSize: 11.5,
                    color: 'var(--kg-ink2)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Log {m.type}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Water tracker */}
        <Card style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Eyebrow>Water</Eyebrow>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--kg-muted)' }}>
              {water * 250}ml / 2000ml
            </span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <button
                key={i}
                onClick={() => setWater(i < water ? i : i + 1)}
                style={{
                  flex: 1,
                  height: 28,
                  borderRadius: 8,
                  background: i < water ? '#6B8AA8' : 'var(--kg-shell)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
              />
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--kg-muted)', marginTop: 8 }}>
            Each block = 250ml
          </div>
        </Card>

        <SafetyBanner
          tone="info"
          title="Cycle-aware nutrition"
          body="These meals are suggested based on your luteal phase — higher magnesium and complex carbs help with energy and mood."
        />
      </div>
    </div>
  );
}
