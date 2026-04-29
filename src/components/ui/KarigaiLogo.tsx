export function KarigaiMark({ size = 28, color = '#1F1B16' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M7 4 V24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 14 C 14 14, 18 9, 21 4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M7 14 C 14 14, 18 19, 21 24" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="22.5" cy="4" r="1.4" fill={color} />
    </svg>
  )
}

interface KarigaiLogoProps {
  size?: number
  color?: string
  mark?: boolean
  tagline?: boolean
}

export function KarigaiLogo({ size = 22, color = '#1F1B16', mark = true, tagline = false }: KarigaiLogoProps) {
  return (
    <div className="inline-flex items-center gap-2.5">
      {mark && <KarigaiMark size={Math.round(size * 1.05)} color={color} />}
      <div className="flex flex-col leading-none">
        <span style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize: size * 1.45, color, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
          karigai
        </span>
        {tagline && (
          <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: 9, color, opacity: 0.55, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4 }}>
            wellness, attuned
          </span>
        )}
      </div>
    </div>
  )
}
