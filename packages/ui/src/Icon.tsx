import React from 'react';

/* All 30+ icon paths — ported exactly from design/brand.jsx Icons object */
const paths: Record<string, React.ReactNode> = {
  home:     <><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z"/></>,
  cycle:    <><circle cx="12" cy="12" r="8"/><path d="M12 4v4M16 8l-2 2"/></>,
  meal:     <><path d="M5 3v8a3 3 0 003 3v7M8 3v6M11 3v6"/><path d="M16 3c2 0 3 2 3 5s-1 5-3 5v8"/></>,
  dumbbell: <><path d="M3 9v6M6 6v12M10 9v6M14 9v6M18 6v12M21 9v6M10 12h4"/></>,
  spark:    <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></>,
  user:     <><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></>,
  drop:     <><path d="M12 3c-4 5-6 8-6 11a6 6 0 0012 0c0-3-2-6-6-11z"/></>,
  bolt:     <><path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z"/></>,
  moon:     <><path d="M21 13a9 9 0 11-10-10 7 7 0 0010 10z"/></>,
  shield:   <><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"/></>,
  bell:     <><path d="M6 16V11a6 6 0 0112 0v5l2 2H4l2-2zM10 20a2 2 0 004 0"/></>,
  chat:     <><path d="M4 5h16v11H8l-4 4z"/></>,
  chart:    <><path d="M4 20V4M4 20h16M8 16V10M12 16V6M16 16V12M20 16V8"/></>,
  device:   <><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></>,
  check:    <><path d="M5 12l5 5L20 6"/></>,
  plus:     <><path d="M12 5v14M5 12h14"/></>,
  arrow:    <><path d="M5 12h14M13 5l7 7-7 7"/></>,
  back:     <><path d="M19 12H5M11 5l-7 7 7 7"/></>,
  search:   <><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></>,
  menu:     <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  alert:    <><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/></>,
  filter:   <><path d="M3 5h18M6 12h12M10 19h4"/></>,
  flag:     <><path d="M5 3v18M5 4h12l-2 4 2 4H5"/></>,
  lock:     <><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></>,
  download: <><path d="M12 4v12M7 11l5 5 5-5M5 20h14"/></>,
  trash:    <><path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13"/></>,
  close:    <><path d="M6 6l12 12M18 6L6 18"/></>,
  more:     <><circle cx="6" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="18" cy="12" r="1.2" fill="currentColor"/></>,
  history:  <><path d="M3 12a9 9 0 109-9 9 9 0 00-7 4M3 4v4h4M12 7v5l3 2"/></>,
  edit:     <><path d="M4 20h4l11-11-4-4L4 16zM14 6l4 4"/></>,
  star:     <><path d="M12 3l3 6 6 1-4.5 4.5L18 21l-6-3-6 3 1.5-6.5L3 10l6-1z"/></>,
  flame:    <><path d="M12 3c2 4 6 6 6 11a6 6 0 01-12 0c0-3 2-4 3-6 1 2 2 3 3 0 0-2 0-3 0-5z"/></>,
};

export type IconName = keyof typeof paths;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.6, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
