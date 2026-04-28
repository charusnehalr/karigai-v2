import React from 'react';
import { KG } from './tokens';

export type ChipTone = 'neutral' | 'sage' | 'clay' | 'blush' | 'bone' | 'alert' | 'ink';

const tones: Record<ChipTone, { bg: string; fg: string; bd: string }> = {
  neutral: { bg: KG.shell,     fg: KG.ink2,   bd: KG.hairline },
  sage:    { bg: '#E5EBDD',    fg: '#3F4D38',  bd: KG.sageSoft },
  clay:    { bg: '#F4DCCD',    fg: '#6E3D24',  bd: KG.claySoft },
  blush:   { bg: '#F7DDD6',    fg: '#7E3A30',  bd: KG.blush    },
  bone:    { bg: KG.bone,      fg: KG.ink2,    bd: '#D8C8AE'   },
  alert:   { bg: '#F2D7D5',    fg: '#7A2522',  bd: '#E2A9A4'   },
  ink:     { bg: KG.ink,       fg: KG.cream,   bd: KG.ink      },
};

interface ChipProps {
  children: React.ReactNode;
  tone?: ChipTone;
  style?: React.CSSProperties;
  className?: string;
}

export function Chip({ children, tone = 'neutral', style, className }: ChipProps) {
  const t = tones[tone];
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        borderRadius: 999,
        padding: '4px 10px',
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
