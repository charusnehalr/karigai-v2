'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eyebrow, Icon } from '@karigai/ui';

const UNIT_OPTIONS = ['kg / cm', 'lb / in'] as const;
const SEX_OPTIONS = ['Female', 'Male', 'Intersex', 'Prefer not to say'] as const;
const PREGNANCY_OPTIONS = [
  'No',
  'Pregnant',
  'Trying',
  'Postpartum',
  'Breastfeeding',
  'Prefer not to say',
] as const;

/* Step 2 — Profile */
export default function ProfilePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [dob, setDob] = useState('');
  const [units, setUnits] = useState<(typeof UNIT_OPTIONS)[number]>('kg / cm');
  const [sex, setSex] = useState<string>('');
  const [pregnancy, setPregnancy] = useState<string>('No');

  const canContinue = nickname.trim().length > 0 && dob.length > 0;

  return (
    <div style={{ padding: '0 24px 100px' }}>
      <Eyebrow style={{ marginBottom: 8 }}>about you</Eyebrow>

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
        Let's get to know you<br />a little.
      </h1>

      {/* Name */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Name or nickname</label>
        <input
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="What should we call you?"
          style={inputStyle}
        />
      </div>

      {/* DOB */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Date of birth</label>
        <input
          type="date"
          value={dob}
          onChange={e => setDob(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Units */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Units</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {UNIT_OPTIONS.map(u => (
            <button
              key={u}
              onClick={() => setUnits(u)}
              style={{
                ...chipStyle,
                background: units === u ? 'var(--kg-ink)' : 'var(--kg-card)',
                color: units === u ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                border: `1px solid ${units === u ? 'transparent' : 'var(--kg-hairline)'}`,
              }}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Biological sex */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Biological sex <span style={{ color: 'var(--kg-muted)', fontWeight: 400 }}>(optional)</span></label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SEX_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setSex(s)}
              style={{
                ...chipStyle,
                background: sex === s ? 'var(--kg-ink)' : 'var(--kg-card)',
                color: sex === s ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                border: `1px solid ${sex === s ? 'transparent' : 'var(--kg-hairline)'}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Pregnancy status */}
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Pregnancy status <span style={{ color: 'var(--kg-muted)', fontWeight: 400 }}>(optional)</span></label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PREGNANCY_OPTIONS.map(p => (
            <button
              key={p}
              onClick={() => setPregnancy(p)}
              style={{
                ...chipStyle,
                background: pregnancy === p ? 'var(--kg-ink)' : 'var(--kg-card)',
                color: pregnancy === p ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                border: `1px solid ${pregnancy === p ? 'transparent' : 'var(--kg-hairline)'}`,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push('/onboarding/measurements')}
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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: 9,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--kg-muted)',
  marginBottom: 8,
  fontWeight: 500,
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

const chipStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 99,
  fontFamily: 'var(--font-body)',
  fontSize: 12.5,
  fontWeight: 500,
  cursor: 'pointer',
};
