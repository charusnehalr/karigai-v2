'use client';

import { Card, Chip, Ring, Eyebrow, SafetyBanner, Icon } from '@karigai/ui';
import Link from 'next/link';

/* S_Today — main authenticated daily screen */
export default function DashboardPage() {
  return (
    <div style={{ padding: '0 0 8px' }}>
      {/* Top nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px 12px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontStyle: 'italic',
            color: 'var(--kg-ink)',
            letterSpacing: '-0.01em',
          }}
        >
          karigai
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="bell" size={22} color="var(--kg-ink2)" />
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'var(--kg-clay-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: 17,
              fontStyle: 'italic',
              color: 'var(--kg-clay)',
            }}
          >
            A
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: '0 20px 20px' }}>
        <Eyebrow style={{ marginBottom: 6 }}>Tuesday · 28 Apr</Eyebrow>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontStyle: 'italic',
            lineHeight: 1.05,
            color: 'var(--kg-ink)',
            margin: '0 0 6px',
            letterSpacing: '-0.01em',
          }}
        >
          Today, attuned.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'var(--kg-muted)',
            lineHeight: 1.45,
            margin: 0,
          }}
        >
          Day 24 — luteal phase estimate. Energy a little quieter than last week.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px' }}>
        {/* Cycle card */}
        <Link href="/dashboard/cycle" style={{ textDecoration: 'none' }}>
          <Card style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <Eyebrow style={{ marginBottom: 4 }}>Cycle</Eyebrow>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    fontStyle: 'italic',
                    color: 'var(--kg-ink)',
                    letterSpacing: '-0.01em',
                    marginBottom: 4,
                  }}
                >
                  Day 24 · Luteal
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11.5,
                    color: 'var(--kg-muted)',
                    lineHeight: 1.4,
                  }}
                >
                  Period likely in 4–6 days · 72% confidence
                </div>
              </div>
              <Ring value={24 / 28} size={70} color="var(--kg-clay)" trackColor="var(--kg-bone)" label="24" sublabel="OF 28" />
            </div>
            {/* Phase bar */}
            <div style={{ display: 'flex', gap: 2, height: 6, borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ flex: 5, background: 'var(--kg-alert)', opacity: 0.7, borderRadius: '99px 0 0 99px' }} />
              <div style={{ flex: 8, background: 'var(--kg-clay-soft)' }} />
              <div style={{ flex: 4, background: 'var(--kg-sage-soft)' }} />
              <div style={{ flex: 11, background: 'var(--kg-bone)', borderRadius: '0 99px 99px 0', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--kg-ink)',
                  }}
                />
              </div>
            </div>
          </Card>
        </Link>

        {/* Energy check-in card */}
        <Card style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <Eyebrow style={{ marginBottom: 4 }}>Energy Check-In</Eyebrow>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--kg-ink)',
                }}
              >
                How are you, really?
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 28,
                  fontStyle: 'italic',
                  color: 'var(--kg-clay)',
                }}
              >
                6
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--kg-muted)',
                }}
              >
                /10
              </span>
            </div>
          </div>
          {/* 10-bar energy display */}
          <div style={{ display: 'flex', gap: 3 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  background: i < 6 ? 'var(--kg-clay)' : 'var(--kg-shell)',
                  opacity: i < 6 ? (0.5 + (i / 6) * 0.5) : 1,
                }}
              />
            ))}
          </div>
        </Card>

        {/* Macro rings card */}
        <Card style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <Eyebrow>Nutrition · Target</Eyebrow>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--kg-muted)',
              }}
            >
              1,750 kcal
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <MacroRing value={665 / 1750} label="Calories" color="var(--kg-clay)" center="665" />
            <MacroRing value={48 / 130} label="Protein" color="var(--kg-sage)" center="48g" />
            <MacroRing value={12 / 28} label="Fiber" color="#A48B62" center="12g" />
            <MacroRing value={1.2 / 2.5} label="Water" color="#6B8AA8" center="1.2L" />
          </div>
        </Card>

        {/* Workout card — dark */}
        <Link href="/dashboard/workout" style={{ textDecoration: 'none' }}>
          <div
            style={{
              borderRadius: 18,
              background: 'var(--kg-ink)',
              padding: '16px',
            }}
          >
            <Eyebrow style={{ marginBottom: 6, color: 'rgba(245,239,230,0.5)' }}>Today · Move</Eyebrow>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 26,
                fontStyle: 'italic',
                color: 'var(--kg-cream)',
                letterSpacing: '-0.01em',
                marginBottom: 4,
              }}
            >
              Lower body, gently.
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: 'rgba(245,239,230,0.7)',
                marginBottom: 14,
              }}
            >
              35 min · strength · cycle-aware adjustment
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                style={{
                  flex: 2,
                  height: 44,
                  borderRadius: 12,
                  background: 'var(--kg-clay)',
                  color: 'var(--kg-cream)',
                  border: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Icon name="bolt" size={15} color="var(--kg-cream)" />
                Start workout
              </button>
              <button
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 12,
                  background: 'transparent',
                  color: 'rgba(245,239,230,0.8)',
                  border: '1px solid rgba(245,239,230,0.3)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                25-min walk
              </button>
            </div>
          </div>
        </Link>

        {/* AI insight card */}
        <Link href="/dashboard/chat" style={{ textDecoration: 'none' }}>
          <div
            style={{
              borderRadius: 18,
              background: 'var(--kg-cream)',
              border: '1px solid var(--kg-bone)',
              padding: '16px',
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--kg-ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon name="spark" size={18} color="var(--kg-cream)" />
            </div>
            <div style={{ flex: 1 }}>
              <Eyebrow style={{ marginBottom: 6 }}>Insight · 1 of Today</Eyebrow>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 17,
                  fontStyle: 'italic',
                  color: 'var(--kg-ink)',
                  lineHeight: 1.35,
                  margin: '0 0 8px',
                }}
              >
                "Lower energy in luteal is normal — protein at breakfast often helps."
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  color: 'var(--kg-muted)',
                }}
              >
                Tap to read why · 38s
              </span>
            </div>
          </div>
        </Link>

        {/* Checklist card */}
        <Card style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Eyebrow>Checklist</Eyebrow>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--kg-muted)' }}>2 / 5</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { label: 'Log breakfast', sub: 'meal', done: true },
              { label: 'Morning stretch', sub: 'move · 5 min', done: true },
              { label: 'Log lunch', sub: 'meal', done: false },
              { label: 'Lower body workout', sub: 'move · 35 min', done: false },
              { label: 'Log dinner', sub: 'meal', done: false },
            ].map((item, i) => (
              <ChecklistRow key={i} {...item} />
            ))}
          </div>
        </Card>

        <SafetyBanner
          tone="info"
          title="Wellness, not diagnosis"
          body="karigai provides fitness, nutrition and lifestyle support. Please consult a clinician for diagnosis or treatment."
          style={{ marginBottom: 4 }}
        />
      </div>
    </div>
  );
}

function MacroRing({
  value,
  label,
  color,
  center,
}: {
  value: number;
  label: string;
  color: string;
  center: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <Ring value={Math.min(value, 1)} size={62} color={color} label={center} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--kg-muted)', letterSpacing: '0.1em' }}>
        {label.toUpperCase()}
      </span>
    </div>
  );
}

function ChecklistRow({ label, sub, done }: { label: string; sub: string; done: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 0',
        borderBottom: '1px solid var(--kg-hairline)',
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 7,
          border: done ? 'none' : '1.5px solid var(--kg-hairline)',
          background: done ? 'var(--kg-sage)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {done && <Icon name="check" size={11} color="white" strokeWidth={2.5} />}
      </div>
      <div style={{ flex: 1 }}>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: done ? 'var(--kg-muted)' : 'var(--kg-ink)',
            textDecoration: done ? 'line-through' : 'none',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--kg-muted)',
            marginLeft: 8,
            letterSpacing: '0.08em',
          }}
        >
          {sub}
        </span>
      </div>
    </div>
  );
}
