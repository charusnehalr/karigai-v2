import React from 'react';
import { KG } from './tokens';

interface RingProps {
  value: number;           // 0–1
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function Ring({
  value,
  size = 56,
  stroke = 5,
  color = KG.clay,
  track = KG.shell,
  label,
  sublabel,
  className,
}: RingProps) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, value));

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={track} strokeWidth={stroke} fill="none"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth={stroke}
          strokeLinecap="round" fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
        />
      </svg>
      {(label || sublabel) && (
        <div style={{ position: 'absolute', textAlign: 'center', lineHeight: 1.1 }}>
          {label && (
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: size > 80 ? 18 : 12,
              fontWeight: 600,
              color: KG.ink,
            }}>
              {label}
            </div>
          )}
          {sublabel && (
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 8,
              color: KG.muted,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {sublabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
