import React from 'react';
import { KG } from './tokens';

export type SafetyBannerTone = 'info' | 'warn' | 'alert';

const palette: Record<SafetyBannerTone, { bg: string; bd: string; fg: string; accent: string }> = {
  info:  { bg: '#EFE9DC', bd: '#D9CDB4', fg: KG.ink2,   accent: KG.clay  },
  warn:  { bg: '#F4E4D5', bd: '#E2C9AB', fg: '#5A3A1F', accent: KG.amber },
  alert: { bg: '#F2D7D5', bd: '#E2A9A4', fg: '#5C1F1C', accent: KG.alert },
};

interface SafetyBannerProps {
  tone?: SafetyBannerTone;
  title: string;
  body: string;
  style?: React.CSSProperties;
  className?: string;
}

export function SafetyBanner({ tone = 'info', title, body, style, className }: SafetyBannerProps) {
  const p = palette[tone];
  return (
    <div
      className={className}
      style={{
        background: p.bg,
        border: `1px solid ${p.bd}`,
        borderRadius: 14,
        padding: 14,
        display: 'flex',
        gap: 12,
        ...style,
      }}
    >
      <div style={{ width: 3, alignSelf: 'stretch', background: p.accent, borderRadius: 99, flexShrink: 0 }} />
      <div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          fontWeight: 600,
          color: p.fg,
          marginBottom: 2,
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 11.5,
          color: p.fg,
          opacity: 0.85,
          lineHeight: 1.4,
        }}>
          {body}
        </div>
      </div>
    </div>
  );
}
