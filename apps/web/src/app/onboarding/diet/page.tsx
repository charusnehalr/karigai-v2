'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eyebrow, Icon } from '@karigai/ui';

const DIET_TYPES = [
  'Vegetarian', 'Vegan', 'Pescatarian', 'Eggetarian',
  'Non-veg', 'Jain', 'Halal', 'Kosher',
] as const;

const ALLERGIES = ['Nuts', 'Dairy', 'Gluten', 'Soy', 'Seafood', 'Eggs', 'Sesame'] as const;
const CUISINES = ['Indian', 'Mediterranean', 'East Asian', 'Mexican', 'Middle Eastern', 'Western', 'Japanese'] as const;
const MEAL_FREQ = ['2 meals', '3 meals', '4+ meals', 'Intermittent fasting'] as const;

/* Step 8 — Diet */
export default function DietPage() {
  const router = useRouter();
  const [dietType, setDietType] = useState('');
  const [allergies, setAllergies] = useState<Set<string>>(new Set());
  const [cuisines, setCuisines] = useState<Set<string>>(new Set());
  const [mealFreq, setMealFreq] = useState('3 meals');

  const toggle = (set: Set<string>, item: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(item) ? next.delete(item) : next.add(item);
    setter(next);
  };

  return (
    <div style={{ padding: '0 24px 100px' }}>
      <Eyebrow style={{ marginBottom: 8 }}>nutrition</Eyebrow>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 30,
          fontStyle: 'italic',
          lineHeight: 1.05,
          color: 'var(--kg-ink)',
          margin: '0 0 22px',
          letterSpacing: '-0.01em',
        }}
      >
        How you eat,<br />honestly.
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Diet type */}
        <div>
          <label style={labelStyle}>Diet type</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {DIET_TYPES.map(d => (
              <button
                key={d}
                onClick={() => setDietType(d)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: `1px solid ${dietType === d ? 'transparent' : 'var(--kg-hairline)'}`,
                  background: dietType === d ? '#F4DCCD' : 'var(--kg-card)',
                  color: dietType === d ? '#6E3D24' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{d}</span>
                {dietType === d && <Icon name="check" size={14} color="#6E3D24" />}
              </button>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div>
          <label style={labelStyle}>Allergies or intolerances</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {ALLERGIES.map(a => (
              <button
                key={a}
                onClick={() => toggle(allergies, a, setAllergies)}
                style={{
                  padding: '7px 12px',
                  borderRadius: 99,
                  border: `1px solid ${allergies.has(a) ? 'transparent' : 'var(--kg-hairline)'}`,
                  background: allergies.has(a) ? 'var(--kg-ink)' : 'var(--kg-card)',
                  color: allergies.has(a) ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Cuisine preferences */}
        <div>
          <label style={labelStyle}>Cuisine preferences</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CUISINES.map(c => (
              <button
                key={c}
                onClick={() => toggle(cuisines, c, setCuisines)}
                style={{
                  padding: '7px 12px',
                  borderRadius: 99,
                  border: `1px solid ${cuisines.has(c) ? 'transparent' : 'var(--kg-hairline)'}`,
                  background: cuisines.has(c) ? '#F4DCCD' : 'var(--kg-card)',
                  color: cuisines.has(c) ? '#6E3D24' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Meal frequency */}
        <div>
          <label style={labelStyle}>Meal frequency</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {MEAL_FREQ.map(f => (
              <button
                key={f}
                onClick={() => setMealFreq(f)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 99,
                  border: `1px solid ${mealFreq === f ? 'var(--kg-ink)' : 'var(--kg-hairline)'}`,
                  background: mealFreq === f ? 'var(--kg-ink)' : 'transparent',
                  color: mealFreq === f ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push('/onboarding/goals')}
        style={{
          width: '100%',
          height: 52,
          borderRadius: 16,
          background: 'var(--kg-ink)',
          color: 'var(--kg-cream)',
          border: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginTop: 24,
        }}
      >
        Continue
        <Icon name="arrow" size={16} color="var(--kg-cream)" />
      </button>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: 9,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--kg-muted)',
  marginBottom: 6,
};
