'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eyebrow, Icon } from '@karigai/ui';

const LOCATIONS = ['Home', 'Gym', 'Outdoors'] as const;
const EQUIPMENT = ['Dumbbells', 'Bands', 'Barbell', 'Machines', 'Treadmill', 'Kettlebells', 'Pull-up bar'] as const;
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;
const DURATIONS = ['15 min', '30 min', '45 min', '60 min'] as const;
const INJURIES = ['Knee', 'Back', 'Shoulder', 'Ankle', 'Hip', 'Wrist', 'Other'] as const;

/* Step 7 — Fitness */
export default function FitnessPage() {
  const router = useRouter();
  const [locations, setLocations] = useState<Set<string>>(new Set(['Gym']));
  const [equipment, setEquipment] = useState<Set<string>>(new Set());
  const [level, setLevel] = useState('Beginner');
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [sessionLength, setSessionLength] = useState('45 min');
  const [injuries, setInjuries] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, item: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(item) ? next.delete(item) : next.add(item);
    setter(next);
  };

  return (
    <div style={{ padding: '0 24px 100px' }}>
      <Eyebrow style={{ marginBottom: 8 }}>fitness</Eyebrow>

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
        How you like to<br />move.
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Location */}
        <div>
          <label style={labelStyle}>Where do you work out?</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {LOCATIONS.map(l => (
              <button
                key={l}
                onClick={() => toggle(locations, l, setLocations)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 99,
                  border: `1px solid ${locations.has(l) ? 'var(--kg-ink)' : 'var(--kg-hairline)'}`,
                  background: locations.has(l) ? 'var(--kg-ink)' : 'transparent',
                  color: locations.has(l) ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div>
          <label style={labelStyle}>Equipment available</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {EQUIPMENT.map(e => (
              <button
                key={e}
                onClick={() => toggle(equipment, e, setEquipment)}
                style={{
                  padding: '7px 12px',
                  borderRadius: 99,
                  border: `1px solid ${equipment.has(e) ? 'transparent' : 'var(--kg-hairline)'}`,
                  background: equipment.has(e) ? '#F4DCCD' : 'var(--kg-card)',
                  color: equipment.has(e) ? '#6E3D24' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Experience level */}
        <div>
          <label style={labelStyle}>Experience level</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {LEVELS.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 99,
                  border: `1px solid ${level === l ? 'var(--kg-ink)' : 'var(--kg-hairline)'}`,
                  background: level === l ? 'var(--kg-ink)' : 'transparent',
                  color: level === l ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Days per week */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={labelStyle}>Days per week</label>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--kg-clay)' }}>
              {daysPerWeek} days
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={7}
            value={daysPerWeek}
            onChange={e => setDaysPerWeek(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--kg-clay)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)' }}>1</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)' }}>7</span>
          </div>
        </div>

        {/* Session length */}
        <div>
          <label style={labelStyle}>Session length</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {DURATIONS.map(d => (
              <button
                key={d}
                onClick={() => setSessionLength(d)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 99,
                  border: `1px solid ${sessionLength === d ? 'var(--kg-ink)' : 'var(--kg-hairline)'}`,
                  background: sessionLength === d ? 'var(--kg-ink)' : 'transparent',
                  color: sessionLength === d ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 11.5,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Injuries */}
        <div>
          <label style={labelStyle}>Injuries or limitations (optional)</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {INJURIES.map(inj => (
              <button
                key={inj}
                onClick={() => toggle(injuries, inj, setInjuries)}
                style={{
                  padding: '7px 12px',
                  borderRadius: 99,
                  border: `1px solid ${injuries.has(inj) ? 'transparent' : 'var(--kg-hairline)'}`,
                  background: injuries.has(inj) ? 'var(--kg-ink)' : 'var(--kg-card)',
                  color: injuries.has(inj) ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {inj}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push('/onboarding/diet')}
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
