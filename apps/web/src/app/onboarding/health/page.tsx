'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eyebrow, SafetyBanner, Icon } from '@karigai/ui';

const CONDITIONS = [
  { id: 'PCOS', label: 'PCOS' },
  { id: 'THYROID_HYPO', label: 'Thyroid (hypo)' },
  { id: 'THYROID_HYPER', label: 'Thyroid (hyper)' },
  { id: 'IRON_DEFICIENCY', label: 'Iron deficiency' },
  { id: 'PREDIABETES', label: 'Prediabetes' },
  { id: 'ENDOMETRIOSIS', label: 'Endometriosis' },
  { id: 'PCOD', label: 'PCOD' },
  { id: 'ANEMIA', label: 'Anemia' },
  { id: 'VITAMIN_D_DEFICIENCY', label: 'Vitamin D deficiency' },
  { id: 'VITAMIN_B12_DEFICIENCY', label: 'B12 deficiency' },
  { id: 'EATING_DISORDER', label: 'Eating disorder history' },
  { id: 'IBS', label: 'IBS / digestive issues' },
] as const;

const LIFE_STAGES = [
  'Cycling',
  'Trying',
  'Pregnant',
  'Postpartum',
  'Breastfeeding',
  'Perimenopause',
] as const;

type LifeStage = (typeof LIFE_STAGES)[number];
type ConditionId = (typeof CONDITIONS)[number]['id'];

/* Step 4 — Health context: ref S_Onboarding conditions grid + life stage chips */
export default function HealthPage() {
  const router = useRouter();
  const [selectedConditions, setSelectedConditions] = useState<Set<ConditionId>>(new Set());
  const [noneSelected, setNoneSelected] = useState(false);
  const [lifeStage, setLifeStage] = useState<LifeStage>('Cycling');

  const toggleCondition = (id: ConditionId) => {
    setNoneSelected(false);
    setSelectedConditions(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectNone = () => {
    setSelectedConditions(new Set());
    setNoneSelected(true);
  };

  return (
    <div style={{ padding: '0 24px 100px' }}>
      <Eyebrow style={{ marginBottom: 8 }}>health context</Eyebrow>

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
        Anything we should know,<br />so we plan more gently?
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
        Self-reported only. We use this to adjust workouts and meals — never to diagnose.
      </p>

      {/* Conditions grid — 2-col, clay when selected */}
      <Eyebrow style={{ marginBottom: 10 }}>self-reported conditions</Eyebrow>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginBottom: 22,
        }}
      >
        {CONDITIONS.map(c => {
          const on = selectedConditions.has(c.id);
          return (
            <button
              key={c.id}
              onClick={() => toggleCondition(c.id)}
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
              <span>{c.label}</span>
              {on && <Icon name="check" size={14} color="#6E3D24" />}
            </button>
          );
        })}

        {/* None of these */}
        <button
          onClick={selectNone}
          style={{
            padding: '12px 14px',
            borderRadius: 12,
            background: noneSelected ? 'var(--kg-ink)' : 'var(--kg-card)',
            color: noneSelected ? 'var(--kg-cream)' : 'var(--kg-ink2)',
            border: `1px solid ${noneSelected ? 'transparent' : 'var(--kg-hairline)'}`,
            fontFamily: 'var(--font-body)',
            fontSize: 12.5,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            gridColumn: '1 / -1',
            textAlign: 'left',
          }}
        >
          <span>None of these</span>
          {noneSelected && <Icon name="check" size={14} color="var(--kg-cream)" />}
        </button>
      </div>

      {/* Life stage — pill chips */}
      <Eyebrow style={{ marginBottom: 10 }}>life stage</Eyebrow>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
        {LIFE_STAGES.map(stage => {
          const on = lifeStage === stage;
          return (
            <button
              key={stage}
              onClick={() => setLifeStage(stage)}
              style={{
                padding: '8px 14px',
                borderRadius: 99,
                border: `1px solid ${on ? 'var(--kg-ink)' : 'var(--kg-hairline)'}`,
                background: on ? 'var(--kg-ink)' : 'transparent',
                color: on ? 'var(--kg-cream)' : 'var(--kg-ink2)',
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {stage}
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

      <button
        onClick={() => router.push('/onboarding/cycle')}
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
        }}
      >
        Continue
        <Icon name="arrow" size={16} color="var(--kg-cream)" />
      </button>
    </div>
  );
}
