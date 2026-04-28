'use client';

import { useState } from 'react';
import { Card, Chip, Eyebrow, SafetyBanner, Icon } from '@karigai/ui';

const SYMPTOM_BUTTONS = [
  { id: 'spotting', label: 'Spotting', icon: 'drop' as const },
  { id: 'cramps', label: 'Cramps', icon: 'flame' as const },
  { id: 'fatigue', label: 'Fatigue', icon: 'moon' as const },
  { id: 'cravings', label: 'Cravings', icon: 'bolt' as const },
  { id: 'bloating', label: 'Bloating', icon: 'spark' as const },
  { id: 'mood_low', label: 'Mood low', icon: 'star' as const },
  { id: 'headache', label: 'Headache', icon: 'bell' as const },
] as const;

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function buildCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth, today: today.getDate() };
}

/* S_Cycle — cycle calendar + log today */
export default function CyclePage() {
  const [symptoms, setSymptoms] = useState<Set<string>>(new Set());
  const [pain, setPain] = useState(2);
  const { firstDay, daysInMonth, today } = buildCalendar();

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Mock phase data: days 1-5 period, 6-13 follicular, 14-16 ovulation, 17+ luteal
  const getPhase = (day: number) => {
    if (day <= 5) return 'menstrual';
    if (day <= 13) return 'follicular';
    if (day <= 16) return 'ovulation';
    return 'luteal';
  };

  const phaseColors: Record<string, string> = {
    menstrual: 'var(--kg-alert)',
    follicular: 'var(--kg-clay-soft)',
    ovulation: 'var(--kg-sage-soft)',
    luteal: 'var(--kg-bone)',
  };

  return (
    <div style={{ padding: '0 0 8px' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 20px' }}>
        <Eyebrow style={{ marginBottom: 6 }}>Cycle</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              fontStyle: 'italic',
              color: 'var(--kg-ink)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            Day 24 · Luteal
          </h1>
          <Icon name="history" size={22} color="var(--kg-muted)" />
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'var(--kg-muted)',
            marginTop: 4,
          }}
        >
          Period likely in 4–6 days · 72% confidence
        </p>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Phase legend */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Chip tone="alert">Menstrual</Chip>
          <Chip tone="clay">Follicular</Chip>
          <Chip tone="sage">Ovulation</Chip>
          <Chip tone="bone">Luteal</Chip>
          <Chip tone="neutral">Predicted</Chip>
        </div>

        {/* Calendar */}
        <Card style={{ padding: '16px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 2,
              marginBottom: 8,
            }}
          >
            {DAYS.map((d, i) => (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  color: 'var(--kg-muted)',
                  letterSpacing: '0.1em',
                  paddingBottom: 8,
                }}
              >
                {d}
              </div>
            ))}
            {/* Empty cells for offset */}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {/* Day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const isToday = day === today;
              const phase = getPhase(day);
              const isLuteal = phase === 'luteal';
              const isPeriod = phase === 'menstrual';

              return (
                <div
                  key={day}
                  style={{
                    height: 44,
                    borderRadius: 12,
                    background: isToday ? 'var(--kg-ink)' : phaseColors[phase],
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontFamily: isToday ? 'var(--font-body)' : 'var(--font-mono)',
                      fontSize: isToday ? 13 : 12,
                      fontWeight: isToday ? 700 : 400,
                      color: isToday ? 'var(--kg-cream)' : 'var(--kg-ink)',
                    }}
                  >
                    {day}
                  </span>
                  {isPeriod && !isToday && (
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: 'var(--kg-alert)',
                        marginTop: 2,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Log today */}
        <Card style={{ padding: '16px' }}>
          <Eyebrow style={{ marginBottom: 12 }}>Log today · Day 24</Eyebrow>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
              marginBottom: 16,
            }}
          >
            {SYMPTOM_BUTTONS.map(s => {
              const on = symptoms.has(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSymptom(s.id)}
                  style={{
                    padding: '10px 6px',
                    borderRadius: 12,
                    background: on ? '#F4DCCD' : 'var(--kg-shell)',
                    border: `1px solid ${on ? 'transparent' : 'var(--kg-hairline)'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    cursor: 'pointer',
                  }}
                >
                  <Icon name={s.icon} size={18} color={on ? '#6E3D24' : 'var(--kg-muted)'} />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 10,
                      color: on ? '#6E3D24' : 'var(--kg-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
            <button
              style={{
                padding: '10px 6px',
                borderRadius: 12,
                background: 'var(--kg-shell)',
                border: '1px solid var(--kg-hairline)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
            >
              <Icon name="plus" size={18} color="var(--kg-muted)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--kg-muted)', fontWeight: 500 }}>
                Add+
              </span>
            </button>
          </div>

          {/* Pain slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--kg-muted)' }}>
                Pain level
              </span>
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
          </div>

          <button
            style={{
              width: '100%',
              height: 44,
              borderRadius: 12,
              background: 'var(--kg-ink)',
              color: 'var(--kg-cream)',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              marginTop: 14,
            }}
          >
            Save today's log
          </button>
        </Card>

        {pain >= 7 && (
          <SafetyBanner
            tone="warn"
            title="High pain score noted"
            body="If severe pain is recurring, please consult a clinician. It may be worth investigating."
          />
        )}
      </div>
    </div>
  );
}
