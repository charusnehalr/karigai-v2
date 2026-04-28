'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eyebrow, SafetyBanner, Icon, Stat } from '@karigai/ui';

/* Step 3 — Measurements with live BMI/WHR/WtH preview */
export default function MeasurementsPage() {
  const router = useRouter();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [bodyFat, setBodyFat] = useState('');

  const w = parseFloat(weight);
  const h = parseFloat(height) / 100; // cm → m
  const wa = parseFloat(waist);
  const hi = parseFloat(hip);

  const bmi = w > 0 && h > 0 ? (w / (h * h)).toFixed(1) : '—';
  const whr = wa > 0 && hi > 0 ? (wa / hi).toFixed(2) : '—';
  const wth = wa > 0 && h > 0 ? (wa / (h * 100)).toFixed(2) : '—';

  const canContinue = weight !== '' && height !== '';

  return (
    <div style={{ padding: '0 24px 100px' }}>
      <Eyebrow style={{ marginBottom: 8 }}>body metrics</Eyebrow>

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
        A few numbers to<br />start from.
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
        Used to calculate your baseline targets. Never shown to anyone else.
      </p>

      {/* Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        <MeasurementInput label="Weight (kg)" value={weight} onChange={setWeight} placeholder="e.g. 62" unit="kg" />
        <MeasurementInput label="Height (cm)" value={height} onChange={setHeight} placeholder="e.g. 165" unit="cm" />
        <MeasurementInput label="Waist (cm)" value={waist} onChange={setWaist} placeholder="e.g. 74" unit="cm" />
        <MeasurementInput label="Hip (cm)" value={hip} onChange={setHip} placeholder="e.g. 96" unit="cm" />
        <MeasurementInput
          label="Body fat % (optional)"
          value={bodyFat}
          onChange={setBodyFat}
          placeholder="e.g. 28"
          unit="%"
        />
      </div>

      {/* Live preview */}
      {(w > 0 && h > 0) && (
        <div
          style={{
            background: 'var(--kg-shell)',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 20,
          }}
        >
          <Eyebrow style={{ marginBottom: 10 }}>live estimates</Eyebrow>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Stat value={bmi} label="BMI" unit="" />
            <Stat value={whr !== '—' ? whr : '—'} label="WHR" unit="" />
            <Stat value={wth !== '—' ? wth : '—'} label="Wt/Ht" unit="" />
          </div>
        </div>
      )}

      <SafetyBanner
        tone="info"
        title="Estimates, not verdicts"
        body="These numbers help us tailor your plan. They don't define your health."
        style={{ marginBottom: 24 }}
      />

      <button
        onClick={() => router.push('/onboarding/health')}
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
        }}
      >
        Continue
        <Icon name="arrow" size={16} color={canContinue ? 'var(--kg-cream)' : 'var(--kg-muted)'} />
      </button>
    </div>
  );
}

function MeasurementInput({
  label,
  value,
  onChange,
  placeholder,
  unit,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  unit: string;
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--kg-muted)',
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            height: 48,
            borderRadius: 12,
            border: '1px solid var(--kg-hairline)',
            background: 'var(--kg-card)',
            padding: '0 40px 0 14px',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--kg-ink)',
            boxSizing: 'border-box',
            outline: 'none',
          }}
        />
        <span
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--kg-muted)',
          }}
        >
          {unit}
        </span>
      </div>
    </div>
  );
}
