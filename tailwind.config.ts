import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5EFE6',
        paper: '#FAF6EF',
        card: '#FFFFFF',
        shell: '#EFE7DA',
        bone: '#E8DCC8',
        hairline: '#E5DCCB',
        ink: '#1F1B16',
        ink2: '#3A332B',
        muted: '#7A7066',
        clay: '#B8704F',
        claySoft: '#E9C8B5',
        sage: '#7A8B6F',
        sageSoft: '#CFD4C3',
        blush: '#E8B4A8',
        amber: '#C99356',
        alert: '#C25450',
        inkDeep: '#0F0E0C',
        inkSurf: '#1A1814',
        inkLine: '#2A2620',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Geist"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '18px',
        chip: '999px',
      },
    },
  },
  plugins: [],
}

export default config
