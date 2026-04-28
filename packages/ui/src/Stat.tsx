import React from 'react';
import { KG } from './tokens';

interface StatProps {
  value: string | number;
  unit?: string;
  label?: string;
  sub?: string;
  color?: string;
  className?: string;
}

export function Stat({ value, unit, label, sub, color = KG.ink, className }: StatProps) {
  return (
    <div className={className}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, color }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 36,
          fontWeight: 400,
          letterSpacing: '-0.02em',
          fontStyle: 'italic',
        }}>
          {value}
        </span>
        {unit && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: KG.muted,
            letterSpacing: '0.1em',
          }}>
            {unit}
          </span>
        )}
      </div>
      {label && (
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          color: KG.ink2,
          marginTop: 2,
        }}>
          {label}
        </div>
      )}
      {sub && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9.5,
          color: KG.muted,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginTop: 3,
        }}>
          {sub}
        </div>
      )}
    </div>
  );
}
