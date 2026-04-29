interface ProgressRingProps {
  value: number
  size?: number
  stroke?: number
  color?: string
  track?: string
  label?: string
  sublabel?: string
}

export function ProgressRing({
  value, size = 56, stroke = 5,
  color = '#B8704F', track = '#EFE7DA',
  label, sublabel
}: ProgressRingProps) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.min(1, Math.max(0, value))
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth={stroke}
          strokeLinecap="round" fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clamped)}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      {(label || sublabel) && (
        <div className="absolute text-center leading-none pointer-events-none">
          {label && <div className="font-body font-semibold text-ink" style={{ fontSize: size > 80 ? 18 : 12 }}>{label}</div>}
          {sublabel && <div className="font-mono text-muted uppercase tracking-widest" style={{ fontSize: 8 }}>{sublabel}</div>}
        </div>
      )}
    </div>
  )
}
