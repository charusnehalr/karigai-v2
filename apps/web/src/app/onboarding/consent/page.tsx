'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eyebrow, SafetyBanner, Icon } from '@karigai/ui';

const CONSENTS = [
  {
    id: 'HEALTH_DATA',
    label: 'Health data',
    sub: 'Store your body metrics, cycle data, and health context.',
    required: true,
  },
  {
    id: 'AI_PERSONALIZATION',
    label: 'AI personalization',
    sub: 'Use your data to generate personalized insights.',
    required: true,
  },
  {
    id: 'NUTRITION_TRACKING',
    label: 'Nutrition tracking',
    sub: 'Log meals, macros, and micronutrients.',
    required: false,
  },
  {
    id: 'CYCLE_TRACKING',
    label: 'Cycle tracking',
    sub: 'Record period dates, symptoms, and phase data.',
    required: false,
  },
  {
    id: 'DEVICE_SYNC',
    label: 'Device sync',
    sub: 'Optionally connect Apple Health or Google Health Connect.',
    required: false,
  },
  {
    id: 'ANONYMOUS_RESEARCH',
    label: 'Anonymous research',
    sub: 'Contribute anonymized data to improve the platform. Entirely optional.',
    required: false,
  },
] as const;

/* Step 1 — Consent screen: ref S_Onboarding + S_Privacy design */
export default function ConsentPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState<Set<string>>(
    new Set(CONSENTS.filter(c => c.required).map(c => c.id))
  );

  const toggle = (id: string, required: boolean) => {
    if (required) return;
    setAccepted(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allRequired = CONSENTS.filter(c => c.required).every(c => accepted.has(c.id));

  const handleContinue = async () => {
    // POST consent to API (wire up in Phase 2 full implementation)
    router.push('/onboarding/profile');
  };

  return (
    <div style={{ padding: '0 24px 100px' }}>
      <Eyebrow style={{ marginBottom: 8 }}>data & consent</Eyebrow>

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
        Your data,<br />your choices.
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'var(--kg-muted)',
          lineHeight: 1.5,
          margin: '0 0 24px',
        }}
      >
        Tell us what you're comfortable sharing. Required items enable core features.
      </p>

      {/* Consent toggles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {CONSENTS.map(c => {
          const on = accepted.has(c.id);
          return (
            <button
              key={c.id}
              onClick={() => toggle(c.id, c.required)}
              style={{
                padding: '14px 16px',
                borderRadius: 14,
                background: on ? 'var(--kg-ink)' : 'var(--kg-card)',
                border: `1px solid ${on ? 'transparent' : 'var(--kg-hairline)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                cursor: c.required ? 'default' : 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 500,
                    color: on ? 'var(--kg-cream)' : 'var(--kg-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {c.label}
                  {c.required && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 8,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: on ? 'rgba(245,239,230,0.6)' : 'var(--kg-muted)',
                      }}
                    >
                      required
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11.5,
                    color: on ? 'rgba(245,239,230,0.7)' : 'var(--kg-muted)',
                    marginTop: 3,
                    lineHeight: 1.4,
                  }}
                >
                  {c.sub}
                </div>
              </div>
              {on && <Icon name="check" size={16} color="var(--kg-cream)" strokeWidth={2.2} />}
            </button>
          );
        })}
      </div>

      <SafetyBanner
        tone="info"
        title="Wellness, not diagnosis"
        body="We provide fitness, nutrition and lifestyle support based on what you tell us. Please consult a clinician for diagnosis or treatment."
        style={{ marginBottom: 24 }}
      />

      {/* CTA */}
      <button
        onClick={handleContinue}
        disabled={!allRequired}
        style={{
          width: '100%',
          height: 52,
          borderRadius: 16,
          background: allRequired ? 'var(--kg-ink)' : 'var(--kg-hairline)',
          color: allRequired ? 'var(--kg-cream)' : 'var(--kg-muted)',
          border: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          fontWeight: 500,
          cursor: allRequired ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        Continue
        <Icon name="arrow" size={16} color={allRequired ? 'var(--kg-cream)' : 'var(--kg-muted)'} />
      </button>
    </div>
  );
}
