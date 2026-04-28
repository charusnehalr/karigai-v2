import Link from 'next/link';
import { KarigaiLogo } from '@karigai/ui';

/* Welcome page — ref: design/mobile-screens.jsx S_Welcome
   Full-bleed cream hero with editorial display type.
   Clay-coloured "you." closes the headline.
*/
export default function WelcomePage() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        background: 'var(--kg-cream)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Top section — logo + hero */}
      <div
        style={{
          flex: 1,
          padding: 'clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px) 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          maxWidth: 720,
        }}
      >
        <KarigaiLogo size={20} showTagline />

        <div>
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--kg-muted)',
              marginBottom: 16,
            }}
          >
            est. 2026 · wellness, not medicine
          </div>

          {/* Hero headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(52px, 8vw, 88px)',
              fontStyle: 'italic',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--kg-ink)',
              margin: 0,
            }}
          >
            A quiet<br />plan, made<br />from{' '}
            <span style={{ color: 'var(--kg-clay)' }}>you.</span>
          </h1>

          {/* Sub copy */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'var(--kg-ink2)',
              lineHeight: 1.55,
              marginTop: 20,
              maxWidth: 380,
            }}
          >
            Cycle, fitness, nutrition and habits — gently personalized, never diagnostic.
          </p>
        </div>
      </div>

      {/* Bottom CTA section */}
      <div
        style={{
          padding: 'clamp(20px, 4vw, 40px) clamp(24px, 6vw, 80px) clamp(36px, 6vw, 60px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          maxWidth: 480,
        }}
      >
        <Link
          href="/onboarding/consent"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 52,
            borderRadius: 16,
            background: 'var(--kg-ink)',
            color: 'var(--kg-cream)',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 500,
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Begin
        </Link>

        <Link
          href="/sign-in"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 52,
            borderRadius: 16,
            background: 'transparent',
            color: 'var(--kg-ink)',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 400,
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          I already have an account
        </Link>

        {/* Privacy footer */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: 'var(--kg-muted)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            textAlign: 'center',
            margin: '4px 0 0',
          }}
        >
          private by default · data stays yours
        </p>
      </div>
    </main>
  );
}
