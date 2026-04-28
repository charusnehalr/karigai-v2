'use client';

import { useRouter } from 'next/navigation';
import { Card, Ring, SafetyBanner, Eyebrow, Stat, Icon } from '@karigai/ui';

/* S_Analysis — body metrics result after completing onboarding */
export default function OnboardingCompletePage() {
  const router = useRouter();

  const metrics = [
    { label: 'BMI', value: '22.8', sub: 'Healthy range', color: 'var(--kg-sage)' },
    { label: 'Waist-to-hip', value: '0.77', sub: 'Within healthy range', color: 'var(--kg-sage)' },
    { label: 'Waist-to-height', value: '0.45', sub: 'Good', color: 'var(--kg-sage)' },
    { label: 'BMR', value: '1,398', sub: 'kcal at rest', color: 'var(--kg-clay)' },
    { label: 'TDEE', value: '1,748', sub: 'kcal with activity', color: 'var(--kg-clay)' },
    { label: 'BRI', value: '3.2', sub: 'Body roundness index', color: 'var(--kg-muted)' },
  ];

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--kg-cream)',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 24px 32px',
        maxWidth: 640,
        margin: '0 auto',
      }}
    >
      {/* Greeting */}
      <div style={{ marginBottom: 28 }}>
        <Eyebrow style={{ marginBottom: 8 }}>your baseline</Eyebrow>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            fontStyle: 'italic',
            color: 'var(--kg-ink)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          Hello, friend.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--kg-muted)',
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          Here's what we calculated from your answers. We'll use these as your starting point.
        </p>
      </div>

      {/* Grade card */}
      <Card
        style={{
          marginBottom: 16,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background: 'var(--kg-shell)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Eyebrow style={{ marginBottom: 4 }}>overall assessment</Eyebrow>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontStyle: 'italic',
                color: 'var(--kg-ink)',
              }}
            >
              Steady energy week ahead
            </span>
          </div>
          <Ring value={0.88} size={64} color="var(--kg-sage)" label="A" trackColor="var(--kg-sage-soft)" />
        </div>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {metrics.map((m, i) => (
            <div
              key={m.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: i < metrics.length - 1 ? '1px solid var(--kg-hairline)' : 'none',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--kg-ink)',
                    marginBottom: 2,
                  }}
                >
                  {m.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--kg-muted)' }}>
                  {m.sub}
                </div>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontStyle: 'italic',
                  color: m.color,
                }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <SafetyBanner
        tone="info"
        title="These are estimates"
        body="Body metrics are starting-point tools, not judgements. Your plan is built around your actual goals and how you feel."
        style={{ marginBottom: 24 }}
      />

      <button
        onClick={() => router.push('/dashboard')}
        style={{
          width: '100%',
          height: 56,
          borderRadius: 16,
          background: 'var(--kg-ink)',
          color: 'var(--kg-cream)',
          border: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginTop: 'auto',
        }}
      >
        See my plan
        <Icon name="arrow" size={18} color="var(--kg-cream)" />
      </button>
    </div>
  );
}
