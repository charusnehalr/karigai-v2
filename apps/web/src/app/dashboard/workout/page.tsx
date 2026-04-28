'use client';

import { useState } from 'react';
import { Card, Eyebrow, SafetyBanner, Icon } from '@karigai/ui';

const EXERCISES = [
  { num: 1, name: 'Romanian Deadlift', sets: '3 × 10', note: 'Lighter than usual — luteal week', canSwap: true },
  { num: 2, name: 'Sumo Squat', sets: '3 × 12', note: null, canSwap: true },
  { num: 3, name: 'Hip Thrust', sets: '3 × 15', note: null, canSwap: false },
  { num: 4, name: 'Leg Press', sets: '3 × 10', note: null, canSwap: true },
  { num: 5, name: 'Seated Calf Raise', sets: '3 × 15', note: null, canSwap: false },
  { num: 6, name: 'Side-lying Clam', sets: '2 × 20/side', note: 'Glute activation', canSwap: false },
] as const;

/* S_Workout — today's workout detail */
export default function WorkoutPage() {
  const [started, setStarted] = useState(false);

  return (
    <div style={{ padding: '0 0 8px' }}>
      {/* Placeholder hero */}
      <div
        style={{
          background: 'linear-gradient(180deg, var(--kg-shell) 0%, var(--kg-hairline) 100%)',
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 0,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--kg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          <Icon name="dumbbell" size={28} color="var(--kg-ink2)" />
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Title + stats */}
        <div style={{ marginBottom: 16 }}>
          <Eyebrow style={{ marginBottom: 6 }}>Today · Move · Lower body</Eyebrow>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28,
              fontStyle: 'italic',
              color: 'var(--kg-ink)',
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
            }}
          >
            Lower body, gently.
          </h1>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { value: '6', label: 'exercises' },
              { value: '35', label: 'minutes' },
              { value: 'RPE 5', label: 'intensity' },
            ].map(s => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    fontStyle: 'italic',
                    color: 'var(--kg-ink)',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: 'var(--kg-muted)',
                    letterSpacing: '0.14em',
                    marginTop: 2,
                  }}
                >
                  {s.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button
            onClick={() => setStarted(true)}
            style={{
              flex: 2,
              height: 52,
              borderRadius: 14,
              background: started ? 'var(--kg-sage)' : 'var(--kg-ink)',
              color: 'var(--kg-cream)',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Icon name="bolt" size={16} color="var(--kg-cream)" />
            {started ? 'In progress…' : 'Start workout'}
          </button>
          <button
            style={{
              flex: 1,
              height: 52,
              borderRadius: 14,
              background: 'transparent',
              color: 'var(--kg-ink2)',
              border: '1px solid var(--kg-hairline)',
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Backup<br />25-min walk
          </button>
        </div>

        {/* Exercise list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
          {EXERCISES.map(ex => (
            <div
              key={ex.num}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
                borderBottom: '1px solid var(--kg-hairline)',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--kg-shell)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  fontStyle: 'italic',
                  color: 'var(--kg-ink)',
                  flexShrink: 0,
                }}
              >
                {ex.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 500, color: 'var(--kg-ink)', marginBottom: 2 }}>
                  {ex.name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--kg-muted)' }}>
                  {ex.sets}
                  {ex.note && (
                    <span style={{ color: 'var(--kg-clay)', marginLeft: 8 }}>{ex.note}</span>
                  )}
                </div>
              </div>
              {ex.canSwap && (
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--kg-muted)' }}>
                  Swap
                </span>
              )}
            </div>
          ))}
        </div>

        <SafetyBanner
          tone="warn"
          title="Listen to your body"
          body="Stop if you feel chest pain, dizziness, or severe discomfort. Your backup walk option is always there."
        />
      </div>
    </div>
  );
}
