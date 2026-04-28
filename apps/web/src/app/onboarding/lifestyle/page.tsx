'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eyebrow, Icon } from '@karigai/ui';

const WORK_TYPES = ['Desk', 'Standing', 'Active'] as const;

/* Step 6 — Lifestyle */
export default function LifestylePage() {
  const router = useRouter();
  const [sleepHours, setSleepHours] = useState('7');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [sleepTime, setSleepTime] = useState('23:00');
  const [stress, setStress] = useState(5);
  const [workType, setWorkType] = useState<string>('Desk');
  const [stepsEstimate, setStepsEstimate] = useState('5000');
  const [waterLitres, setWaterLitres] = useState('2');
  const [caffeineDaily, setCaffeineDaily] = useState('1');

  return (
    <div style={{ padding: '0 24px 100px' }}>
      <Eyebrow style={{ marginBottom: 8 }}>lifestyle</Eyebrow>

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
        Your days, in<br />a few words.
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Sleep */}
        <div>
          <label style={labelStyle}>Sleep duration (hours)</label>
          <input
            type="number"
            min={3}
            max={12}
            step={0.5}
            value={sleepHours}
            onChange={e => setSleepHours(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Wake time</label>
            <input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Sleep time</label>
            <input type="time" value={sleepTime} onChange={e => setSleepTime(e.target.value)} style={inputStyle} />
          </div>
        </div>

        {/* Stress */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={labelStyle}>Stress level</label>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--kg-clay)' }}>
              {stress} / 10
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={stress}
            onChange={e => setStress(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--kg-clay)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)' }}>Low</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)' }}>High</span>
          </div>
        </div>

        {/* Work type */}
        <div>
          <label style={labelStyle}>Work / daily movement type</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {WORK_TYPES.map(w => (
              <button
                key={w}
                onClick={() => setWorkType(w)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 99,
                  border: `1px solid ${workType === w ? 'var(--kg-ink)' : 'var(--kg-hairline)'}`,
                  background: workType === w ? 'var(--kg-ink)' : 'transparent',
                  color: workType === w ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Daily steps */}
        <div>
          <label style={labelStyle}>Typical daily steps</label>
          <input
            type="number"
            step={500}
            value={stepsEstimate}
            onChange={e => setStepsEstimate(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Water + caffeine */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Water (L/day)</label>
            <input
              type="number"
              step={0.25}
              value={waterLitres}
              onChange={e => setWaterLitres(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Caffeine (cups/day)</label>
            <input
              type="number"
              value={caffeineDaily}
              onChange={e => setCaffeineDaily(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push('/onboarding/fitness')}
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
