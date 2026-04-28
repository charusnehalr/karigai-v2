// karigai — brand system, primitives, icons
// Aesthetic: clinical-soft warm. Editorial serif display + clean grotesque body.
// Palette: warm cream, deep ink, terracotta, sage. All accents share chroma ~0.07.

const KG = {
  // surfaces
  cream:    '#F5EFE6',
  paper:    '#FAF6EF',
  card:     '#FFFFFF',
  shell:    '#EFE7DA',
  ink:      '#1F1B16',
  ink2:     '#3A332B',
  muted:    '#7A7066',
  hairline: '#E5DCCB',
  // accents
  clay:     '#B8704F',   // primary warm
  claySoft: '#E9C8B5',
  sage:     '#7A8B6F',
  sageSoft: '#CFD4C3',
  bone:     '#E8DCC8',
  blush:    '#E8B4A8',
  // semantic
  alert:    '#C25450',
  amber:    '#C99356',
  // dark
  inkDeep:  '#0F0E0C',
  inkSurf:  '#1A1814',
  inkLine:  '#2A2620',
};

// Typography — using Google Fonts that aren't overused
// Display: "Instrument Serif" (italicized editorial feel)
// Body: "Geist" (clean grotesque)
// Mono: "Geist Mono"
const KGFont = {
  display: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
  body:    '"Geist", "Inter", -apple-system, system-ui, sans-serif',
  mono:    '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
};

// ── Logo / wordmark ──────────────────────────────────────────
function KarigaiMark({ size = 28, color = KG.ink }) {
  // Stylized 'k' — two strokes meeting like a crescent / cycle motif
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M7 4 V24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 14 C 14 14, 18 9, 21 4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M7 14 C 14 14, 18 19, 21 24" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="22.5" cy="4" r="1.4" fill={color}/>
    </svg>
  );
}

function KarigaiLogo({ size = 22, color = KG.ink, mark = true, tagline = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      {mark && <KarigaiMark size={size * 1.05} color={color} />}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{
          fontFamily: KGFont.display, fontSize: size * 1.45, fontWeight: 400,
          color, letterSpacing: '-0.01em', fontStyle: 'italic',
        }}>karigai</span>
        {tagline && (
          <span style={{
            fontFamily: KGFont.mono, fontSize: 9, color, opacity: 0.55,
            letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4,
          }}>wellness, attuned</span>
        )}
      </div>
    </div>
  );
}

// ── Tiny line icons (24×24) — keep thin, calm ────────────────
const Icon = ({ d, size = 20, color = 'currentColor', sw = 1.6, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {typeof d === 'string' ? <path d={d}/> : d}
  </svg>
);
const Icons = {
  home:    <><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z"/></>,
  cycle:   <><circle cx="12" cy="12" r="8"/><path d="M12 4v4M16 8l-2 2"/></>,
  meal:    <><path d="M5 3v8a3 3 0 003 3v7M8 3v6M11 3v6"/><path d="M16 3c2 0 3 2 3 5s-1 5-3 5v8"/></>,
  dumbbell:<><path d="M3 9v6M6 6v12M10 9v6M14 9v6M18 6v12M21 9v6M10 12h4"/></>,
  spark:   <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></>,
  user:    <><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></>,
  drop:    <><path d="M12 3c-4 5-6 8-6 11a6 6 0 0012 0c0-3-2-6-6-11z"/></>,
  bolt:    <><path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z"/></>,
  moon:    <><path d="M21 13a9 9 0 11-10-10 7 7 0 0010 10z"/></>,
  shield:  <><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"/></>,
  bell:    <><path d="M6 16V11a6 6 0 0112 0v5l2 2H4l2-2zM10 20a2 2 0 004 0"/></>,
  chat:    <><path d="M4 5h16v11H8l-4 4z"/></>,
  chart:   <><path d="M4 20V4M4 20h16M8 16V10M12 16V6M16 16V12M20 16V8"/></>,
  device:  <><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></>,
  check:   <><path d="M5 12l5 5L20 6"/></>,
  plus:    <><path d="M12 5v14M5 12h14"/></>,
  arrow:   <><path d="M5 12h14M13 5l7 7-7 7"/></>,
  back:    <><path d="M19 12H5M11 5l-7 7 7 7"/></>,
  search:  <><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></>,
  menu:    <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  alert:   <><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/></>,
  filter:  <><path d="M3 5h18M6 12h12M10 19h4"/></>,
  flag:    <><path d="M5 3v18M5 4h12l-2 4 2 4H5"/></>,
  lock:    <><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></>,
  download:<><path d="M12 4v12M7 11l5 5 5-5M5 20h14"/></>,
  trash:   <><path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13"/></>,
  close:   <><path d="M6 6l12 12M18 6L6 18"/></>,
  more:    <><circle cx="6" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="18" cy="12" r="1.2" fill="currentColor"/></>,
  history: <><path d="M3 12a9 9 0 109-9 9 9 0 00-7 4M3 4v4h4M12 7v5l3 2"/></>,
  edit:    <><path d="M4 20h4l11-11-4-4L4 16zM14 6l4 4"/></>,
  star:    <><path d="M12 3l3 6 6 1-4.5 4.5L18 21l-6-3-6 3 1.5-6.5L3 10l6-1z"/></>,
  flame:   <><path d="M12 3c2 4 6 6 6 11a6 6 0 01-12 0c0-3 2-4 3-6 1 2 2 3 3 0 0-2 0-3 0-5z"/></>,
};

// ── Primitive components ─────────────────────────────────────
function KCard({ children, style, pad = 18, dark, ...rest }) {
  return (
    <div {...rest} style={{
      background: dark ? KG.inkSurf : KG.card,
      border: `1px solid ${dark ? KG.inkLine : KG.hairline}`,
      borderRadius: 18, padding: pad, ...style,
    }}>{children}</div>
  );
}

function KChip({ children, tone = 'neutral', style }) {
  const tones = {
    neutral: { bg: KG.shell, fg: KG.ink2, bd: KG.hairline },
    sage:    { bg: '#E5EBDD', fg: '#3F4D38', bd: '#CFD4C3' },
    clay:    { bg: '#F4DCCD', fg: '#6E3D24', bd: '#E9C8B5' },
    blush:   { bg: '#F7DDD6', fg: '#7E3A30', bd: '#E8B4A8' },
    bone:    { bg: KG.bone, fg: KG.ink2, bd: '#D8C8AE' },
    alert:   { bg: '#F2D7D5', fg: '#7A2522', bd: '#E2A9A4' },
    ink:     { bg: KG.ink, fg: KG.cream, bd: KG.ink },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: t.bg, color: t.fg, border: `1px solid ${t.bd}`,
      borderRadius: 999, padding: '4px 10px',
      fontFamily: KGFont.body, fontSize: 11, fontWeight: 500,
      letterSpacing: '0.02em', ...style,
    }}>{children}</span>
  );
}

// Small ring/progress
function KRing({ value = 0.6, size = 56, stroke = 5, color = KG.clay, track = KG.shell, label, sublabel }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} strokeLinecap="round"
                fill="none" strokeDasharray={c} strokeDashoffset={c * (1 - value)} />
      </svg>
      {(label || sublabel) && (
        <div style={{ position: 'absolute', textAlign: 'center', lineHeight: 1.1 }}>
          {label && <div style={{ fontFamily: KGFont.body, fontSize: size > 80 ? 18 : 12, fontWeight: 600, color: KG.ink }}>{label}</div>}
          {sublabel && <div style={{ fontFamily: KGFont.mono, fontSize: 8, color: KG.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sublabel}</div>}
        </div>
      )}
    </div>
  );
}

// Striped placeholder for imagery
function KPlaceholder({ w = '100%', h = 120, label = 'image', dark, style }) {
  const stripe = dark ? 'rgba(255,255,255,0.04)' : 'rgba(31,27,22,0.05)';
  return (
    <div style={{
      width: w, height: h, borderRadius: 12,
      background: `repeating-linear-gradient(135deg, ${stripe} 0 6px, transparent 6px 12px), ${dark ? KG.inkSurf : KG.shell}`,
      border: `1px solid ${dark ? KG.inkLine : KG.hairline}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: dark ? '#9C9384' : KG.muted,
      fontFamily: KGFont.mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
      ...style,
    }}>{label}</div>
  );
}

// Section eyebrow
function KEyebrow({ children, color = KG.muted }) {
  return <div style={{
    fontFamily: KGFont.mono, fontSize: 10, letterSpacing: '0.2em',
    textTransform: 'uppercase', color,
  }}>{children}</div>;
}

// Big numeric stat (editorial)
function KStat({ value, unit, label, sub, color = KG.ink }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, color }}>
        <span style={{ fontFamily: KGFont.display, fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em' }}>{value}</span>
        {unit && <span style={{ fontFamily: KGFont.mono, fontSize: 11, color: KG.muted, letterSpacing: '0.1em' }}>{unit}</span>}
      </div>
      {label && <div style={{ fontFamily: KGFont.body, fontSize: 12, color: KG.ink2, marginTop: 2 }}>{label}</div>}
      {sub && <div style={{ fontFamily: KGFont.mono, fontSize: 9.5, color: KG.muted, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

// Safety banner — soft, not alarming
function KSafetyBanner({ tone = 'info', title, body, style }) {
  const palette = {
    info:   { bg: '#EFE9DC', bd: '#D9CDB4', fg: KG.ink2, accent: KG.clay },
    warn:   { bg: '#F4E4D5', bd: '#E2C9AB', fg: '#5A3A1F', accent: KG.amber },
    alert:  { bg: '#F2D7D5', bd: '#E2A9A4', fg: '#5C1F1C', accent: KG.alert },
  }[tone];
  return (
    <div style={{
      background: palette.bg, border: `1px solid ${palette.bd}`,
      borderRadius: 14, padding: 14, display: 'flex', gap: 12,
      ...style,
    }}>
      <div style={{ width: 3, alignSelf: 'stretch', background: palette.accent, borderRadius: 99 }}/>
      <div>
        <div style={{ fontFamily: KGFont.body, fontSize: 12, fontWeight: 600, color: palette.fg, marginBottom: 2 }}>{title}</div>
        <div style={{ fontFamily: KGFont.body, fontSize: 11.5, color: palette.fg, opacity: 0.85, lineHeight: 1.4 }}>{body}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  KG, KGFont, KarigaiMark, KarigaiLogo, Icon, Icons,
  KCard, KChip, KRing, KPlaceholder, KEyebrow, KStat, KSafetyBanner,
});
