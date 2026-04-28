'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eyebrow, SafetyBanner, Icon } from '@karigai/ui';

const GOALS = [
  { id: 'LOSE_WEIGHT', label: 'Lose weight' },
  { id: 'GAIN_MUSCLE', label: 'Gain muscle' },
  { id: 'TONE_BODY', label: 'Tone body' },
  { id: 'IMPROVE_STAMINA', label: 'Improve stamina' },
  { id: 'PCOS_SUPPORT', label: 'PCOS-supportive plan' },
  { id: 'PREDIABETES_SUPPORT', label: 'Prediabetes-supportive' },
  { id: 'IMPROVE_ENERGY', label: 'Improve energy' },
  { id: 'REDUCE_CRAVINGS', label: 'Reduce cravings' },
  { id: 'IMPROVE_SLEEP', label: 'Better sleep' },
  { id: 'HORMONE_BALANCE', label: 'Hormone balance' },
] as const;

const TIMELINES = ['1 month', '3 months', '6 months', '1 year', 'No deadline'] as const;

/* Step 9 — Goals */
export default function GoalsPage() {
  const router = useRouter();
  const [goals, setGoals] = useState<Set<string>>(new Set());
  const [targetWeight, setTargetWeight] = useState('');
  const [timeline, setTimeline] = useState('3 months');
  const [priority, setPriority] = useState(5);

  const toggleGoal = (id: string) => {
    setGoals(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const canContinue = goals.size > 0;

  return (
    <div style={{ padding: '0 24px 100px' }}>
      <Eyebrow style={{ marginBottom: 8 }}>goals</Eyebrow>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 30,
          fontStyle: 'italic',
          lineHeight: 1.05,
          color: 'var(--kg-ink)',
          margin: '0 0 10px',
          letterSpacing: '-0.01em',
        }}
      >
        What matters most<br />to you right now?
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12.5,
          color: 'var(--kg-muted)',
          lineHeight: 1.45,
          margin: '0 0 22px',
        }}
      >
        Pick all that apply. We'll build a plan around your top priorities.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Goal chips grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {GOALS.map(g => {
            const on = goals.has(g.id);
            return (
              <button
                key={g.id}
                onClick={() => toggleGoal(g.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: on ? '#F4DCCD' : 'var(--kg-card)',
                  color: on ? '#6E3D24' : 'var(--kg-ink2)',
                  border: `1px solid ${on ? 'transparent' : 'var(--kg-hairline)'}`,
                  fontFamily: 'var(--font-body)',
                  fontSize: 12.5,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span>{g.label}</span>
                {on && <Icon name="check" size={14} color="#6E3D24" />}
              </button>
            );
          })}
        </div>

        {/* Target weight (optional) */}
        <div>
          <label style={labelStyle}>Target weight — optional (kg)</label>
          <input
            type="number"
            value={targetWeight}
            onChange={e => setTargetWeight(e.target.value)}
            placeholder="e.g. 58"
            style={inputStyle}
          />
        </div>

        {/* Timeline */}
        <div>
          <label style={labelStyle}>Timeline</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {TIMELINES.map(t => (
              <button
                key={t}
                onClick={() => setTimeline(t)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 99,
                  border: `1px solid ${timeline === t ? 'var(--kg-ink)' : 'var(--kg-hairline)'}`,
                  background: timeline === t ? 'var(--kg-ink)' : 'transparent',
                  color: timeline === t ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Priority slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={labelStyle}>Pace preference</label>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={priority}
            onChange={e => setPriority(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--kg-clay)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)' }}>Easier, sustainable</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)' }}>Faster progress</span>
          </div>
        </div>

        <SafetyBanner
          tone="info"
          title="Realistic goals only"
          body="We'll suggest a pace that's healthy and achievable. We won't push anything harmful."
        />
      </div>

      <button
        onClick={() => router.push('/onboarding/complete')}
        disabled={!canContinue}
        style={{
          width: '100%',
          height: 52,
          borderRadius: 16,
          background: canContinue ? 'var(--kg-ink)' : 'var(--kg-hairline)',
          color: canContinue ? 'var(--kg-cream)' : 'var(--kg-muted)',
          border: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          fontWeight: 500,
          cursor: canContinue ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginTop: 24,
        }}
      >
        See my analysis
        <Icon name="arrow" size={16} color={canContinue ? 'var(--kg-cream)' : 'var(--kg-muted)'} />
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

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 48,
  borderRadius: 12,
  border: '1px solid var(--kg-hairline)',
  background: 'var(--kg-card)',
  padding: '0 14px',
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  color: 'var(--kg-ink)',
  boxSizing: 'border-box',
  outline: 'none',
};
