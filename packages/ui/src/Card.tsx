import React from 'react';
import { KG } from './tokens';

interface CardProps {
  children: React.ReactNode;
  pad?: number;
  dark?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, pad = 18, dark = false, style, className, onClick }: CardProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: dark ? KG.inkSurf : KG.card,
        border: `1px solid ${dark ? KG.inkLine : KG.hairline}`,
        borderRadius: 18,
        padding: pad,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
