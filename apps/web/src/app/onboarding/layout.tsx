'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@karigai/ui';

const STEPS = [
  'consent',
  'profile',
  'measurements',
  'health',
  'cycle',
  'lifestyle',
  'fitness',
  'diet',
  'goals',
] as const;

type Step = (typeof STEPS)[number];

function getStepIndex(pathname: string): number {
  const segment = pathname.split('/').pop() as Step;
  return STEPS.indexOf(segment);
}

/* Shared wizard chrome — ref: S_Onboarding header in design/mobile-screens.jsx */
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const stepIndex = getStepIndex(pathname);
  const isStep = stepIndex >= 0;
  const stepNumber = stepIndex + 1;
  const totalSteps = STEPS.length;
  const progress = isStep ? (stepNumber / totalSteps) * 100 : 0;
  const prevStep = stepIndex > 0 ? `/onboarding/${STEPS[stepIndex - 1]}` : '/';

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--kg-paper)',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Wizard chrome */}
      {isStep && (
        <div
          style={{
            padding: '16px 24px 0',
            maxWidth: 640,
            width: '100%',
            margin: '0 auto',
          }}
        >
          {/* Top row: back + step counter + skip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <Link
              href={prevStep}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--kg-ink)',
                textDecoration: 'none',
              }}
            >
              <Icon name="back" size={22} />
            </Link>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--kg-muted)',
                letterSpacing: '0.18em',
              }}
            >
              {String(stepNumber).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
            </span>

            <Link
              href={`/onboarding/${STEPS[stepIndex + 1] ?? 'complete'}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: 'var(--kg-muted)',
                textDecoration: 'none',
              }}
            >
              Skip
            </Link>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 3,
              background: 'var(--kg-hairline)',
              borderRadius: 99,
              overflow: 'hidden',
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'var(--kg-clay)',
                borderRadius: 99,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* Page content */}
      <div style={{ flex: 1, maxWidth: 640, width: '100%', margin: '0 auto' }}>
        {children}
      </div>
    </div>
  );
}
