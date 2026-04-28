import React from 'react';
import { KG } from './tokens';

interface MarkProps {
  size?: number;
  color?: string;
}

/* Stylized 'k' — two strokes meeting like a crescent / cycle motif */
export function KarigaiMark({ size = 28, color = KG.ink }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M7 4 V24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 14 C 14 14, 18 9, 21 4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M7 14 C 14 14, 18 19, 21 24" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="22.5" cy="4" r="1.4" fill={color}/>
    </svg>
  );
}

interface LogoProps {
  size?: number;
  color?: string;
  showMark?: boolean;
  showTagline?: boolean;
  className?: string;
}

export function KarigaiLogo({ size = 22, color = KG.ink, showMark = true, showTagline = false, className }: LogoProps) {
  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      {showMark && <KarigaiMark size={size * 1.05} color={color} />}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: size * 1.45,
          fontWeight: 400,
          color,
          letterSpacing: '-0.01em',
          fontStyle: 'italic',
        }}>
          karigai
        </span>
        {showTagline && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color,
            opacity: 0.55,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginTop: 4,
          }}>
            wellness, attuned
          </span>
        )}
      </div>
    </div>
  );
}
