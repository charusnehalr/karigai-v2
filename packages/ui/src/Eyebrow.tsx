import React from 'react';
import { KG } from './tokens';

interface EyebrowProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function Eyebrow({ children, color = KG.muted, className }: EyebrowProps) {
  return (
    <div
      className={className}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color,
      }}
    >
      {children}
    </div>
  );
}
