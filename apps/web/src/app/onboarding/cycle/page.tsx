'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eyebrow, SafetyBanner, Icon } from '@karigai/ui';

const REGULARITY = ['Regular', 'Irregular', 'Unsure'] as const;
const FLOW = ['Light', 'Medium', 'Heavy'] as const;
const PMS_SYMPTOMS = [
  'Cramps', 'Bloating', 'Mood swings', 'Headache',
  'Fatigue', 'Cravings', 'Breast tenderness', 'Acne',
] as const;

/* Step 5 — Cycle */
export default function CyclePage() {
  const router = useRouter();
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [regularity, setRegularity] = useState<string>('Regular');
  const [flow, setFlow] = useState<string>('Medium');
  const [pain, setPain] = useState(3);
  const [pmsSymptoms, setPmsSymptoms] = useState<Set<string>>(new Set());
  const [onBirthControl, setOnBirthControl] = useState(false);
  const [ttc, setTtc] = useState(false);

  const togglePms = (s: string) => {
    setPmsSymptoms(prev => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  };

  return (
    <div style={{ padding: '0 24px 100px' }}>
      <Eyebrow style={{ marginBottom: 8 }}>cycle</Eyebrow>

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
        Tell us about<br />your cycle.
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Last period */}
        <div>
          <label style={labelStyle}>Last period start date</label>
          <input
            type="date"
            value={lastPeriod}
            onChange={e => setLastPeriod(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Cycle + period length */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Avg cycle length (days)</label>
            <input
              type="number"
              min={21}
              max={45}
              value={cycleLength}
              onChange={e => setCycleLength(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Avg period length (days)</label>
            <input
              type="number"
              min={2}
              max={10}
              value={periodLength}
              onChange={e => setPeriodLength(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Regularity */}
        <div>
          <label style={labelStyle}>Regularity</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {REGULARITY.map(r => (
              <button
                key={r}
                onClick={() => setRegularity(r)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 99,
                  border: `1px solid ${regularity === r ? 'var(--kg-ink)' : 'var(--kg-hairline)'}`,
                  background: regularity === r ? 'var(--kg-ink)' : 'transparent',
                  color: regularity === r ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Flow */}
        <div>
          <label style={labelStyle}>Typical flow</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {FLOW.map(f => (
              <button
                key={f}
                onClick={() => setFlow(f)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 99,
                  border: `1px solid ${flow === f ? 'var(--kg-ink)' : 'var(--kg-hairline)'}`,
                  background: flow === f ? 'var(--kg-ink)' : 'transparent',
                  color: flow === f ? 'var(--kg-cream)' : 'var(--kg-ink2)',
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

        {/* Pain slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={labelStyle}>Period pain</label>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--kg-clay)' }}>
              {pain} / 10
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            value={pain}
            onChange={e => setPain(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--kg-clay)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)' }}>None</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)' }}>Severe</span>
          </div>
        </div>

        {/* PMS symptoms */}
        <div>
          <label style={labelStyle}>PMS symptoms (select all that apply)</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PMS_SYMPTOMS.map(s => {
              const on = pmsSymptoms.has(s);
              return (
                <button
                  key={s}
                  onClick={() => togglePms(s)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: 99,
                    border: `1px solid ${on ? 'transparent' : 'var(--kg-hairline)'}`,
                    background: on ? '#F4DCCD' : 'var(--kg-card)',
                    color: on ? '#6E3D24' : 'var(--kg-ink2)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Toggles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ToggleRow
            label="On birth control"
            value={onBirthControl}
            onChange={setOnBirthControl}
          />
          <ToggleRow
            label="Trying to conceive (TTC)"
            value={ttc}
            onChange={setTtc}
          />
        </div>
      </div>

      {pain >= 8 && (
        <SafetyBanner
          tone="warn"
          title="High pain score"
          body="If you regularly experience severe pain, please speak with a clinician — it may be worth investigating."
          style={{ marginTop: 16 }}
        />
      )}

      <button
        onClick={() => router.push('/onboarding/lifestyle')}
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

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 14px',
        borderRadius: 12,
        background: value ? 'var(--kg-ink)' : 'var(--kg-card)',
        border: `1px solid ${value ? 'transparent' : 'var(--kg-hairline)'}`,
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 500,
          color: value ? 'var(--kg-cream)' : 'var(--kg-ink)',
        }}
      >
        {label}
      </span>
      {value && <Icon name="check" size={16} color="var(--kg-cream)" strokeWidth={2.2} />}
    </button>
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
