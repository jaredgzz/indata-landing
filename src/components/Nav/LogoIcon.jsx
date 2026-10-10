import { useId } from 'react'

// Isotipo InDaxion (viewBox 100×100), reconstruido del brand board.
// Silueta exterior de la D
const D_OUTER = 'M10,6 H51 C72.5,6 90,25.7 90,50 C90,74.3 72.5,94 51,94 H10 Z'

// Espacio negativo en chevrón (transparente, se resta con evenodd)
const D_CHEVRON =
  'M10.8,27.6 H42.6 C47.4,27.6 50.8,29.2 53.2,31.6 L65.8,46.6 C67.6,48.9 67.7,52.9 66,55.2 ' +
  'L51.6,70 C48.6,72.8 44.6,73.6 40.6,73.6 H35.2 C38.8,68.4 40.4,62.4 40.4,56.2 ' +
  'C40.4,51 38.2,46.6 34.4,43.4 Z'

// Forma azul interior que nace del borde izquierdo
const D_INNER =
  'M10,27.6 H10.8 L34.4,43.4 C38.2,46.6 40.4,51 40.4,56.2 C40.4,62.4 38.8,68.4 35.2,73.6 ' +
  'C26,78 16,85 10,92 Z'

// Barrido inferior que sube hasta la punta del chevrón (se recorta con la silueta)
const D_SWEEP =
  'M10,92 C16,85 26,78 35.2,73.6 H40.6 C44.6,73.6 48.6,72.8 51.6,70 L66,55.2 ' +
  'C67.7,52.9 67.6,48.9 65.8,46.6 C72.6,54 78.6,63 78.6,73 C78.6,83 75,92 70,100 L10,100 Z'

export default function LogoIcon({ className }) {
  // El logo aparece en Nav y Footer: ids únicos para no colisionar defs
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ids = {
    clip: `ix-clip-${uid}`,
    body: `ix-body-${uid}`,
    inner: `ix-inner-${uid}`,
    sweep: `ix-sweep-${uid}`,
  }

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="InDaxion logo"
      fill="none"
    >
      <defs>
        <clipPath id={ids.clip}>
          <path d={D_OUTER} />
        </clipPath>
        <linearGradient id={ids.body} x1="0.05" y1="0" x2="1" y2="0.7">
          <stop offset="0"    stopColor="#00E5FF" />
          <stop offset="0.42" stopColor="#3B82F6" />
          <stop offset="0.8"  stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id={ids.inner} x1="0.8" y1="0.2" x2="0" y2="1">
          <stop offset="0"    stopColor="#3B82F6" />
          <stop offset="0.55" stopColor="#3B82F6" />
          <stop offset="1"    stopColor="#00E5FF" />
        </linearGradient>
        <linearGradient id={ids.sweep} x1="0" y1="1" x2="1" y2="0.4">
          <stop offset="0"    stopColor="#00E5FF" />
          <stop offset="0.45" stopColor="#3B82F6" />
          <stop offset="1"    stopColor="#4F5DF2" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${ids.clip})`}>
        <path d={`${D_OUTER} ${D_CHEVRON}`} fill={`url(#${ids.body})`} fillRule="evenodd" />
        <path d={D_INNER} fill={`url(#${ids.inner})`} />
        <path d={D_SWEEP} fill={`url(#${ids.sweep})`} />
      </g>
    </svg>
  )
}
