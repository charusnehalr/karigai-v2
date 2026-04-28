/* karigai color tokens — mirrors design/brand.jsx KG object */
export const KG = {
  cream:    '#F5EFE6',
  paper:    '#FAF6EF',
  card:     '#FFFFFF',
  shell:    '#EFE7DA',
  ink:      '#1F1B16',
  ink2:     '#3A332B',
  muted:    '#7A7066',
  hairline: '#E5DCCB',
  clay:     '#B8704F',
  claySoft: '#E9C8B5',
  sage:     '#7A8B6F',
  sageSoft: '#CFD4C3',
  bone:     '#E8DCC8',
  blush:    '#E8B4A8',
  alert:    '#C25450',
  amber:    '#C99356',
  inkDeep:  '#0F0E0C',
  inkSurf:  '#1A1814',
  inkLine:  '#2A2620',
} as const;

export const KGFont = {
  display: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
  body:    '"Geist", "Inter", -apple-system, system-ui, sans-serif',
  mono:    '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
} as const;

export type KGColor = keyof typeof KG;
