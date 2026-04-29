type BannerTone = 'info' | 'warn' | 'alert'

const tones = {
  info:  { bg: 'bg-[#EFE9DC]', border: 'border-[#D9CDB4]', text: 'text-ink2', bar: 'bg-clay' },
  warn:  { bg: 'bg-[#F4E4D5]', border: 'border-[#E2C9AB]', text: 'text-[#5A3A1F]', bar: 'bg-amber' },
  alert: { bg: 'bg-[#F2D7D5]', border: 'border-[#E2A9A4]', text: 'text-[#5C1F1C]', bar: 'bg-alert' },
}

interface SafetyBannerProps {
  tone?: BannerTone
  title: string
  body: string
  className?: string
}

export function SafetyBanner({ tone = 'info', title, body, className = '' }: SafetyBannerProps) {
  const t = tones[tone]
  return (
    <div className={`flex gap-3 rounded-2xl border p-3.5 ${t.bg} ${t.border} ${className}`}>
      <div className={`w-0.5 self-stretch rounded-full flex-shrink-0 ${t.bar}`} />
      <div>
        <p className={`font-body text-xs font-semibold mb-0.5 ${t.text}`}>{title}</p>
        <p className={`font-body text-xs leading-snug opacity-85 ${t.text}`}>{body}</p>
      </div>
    </div>
  )
}
