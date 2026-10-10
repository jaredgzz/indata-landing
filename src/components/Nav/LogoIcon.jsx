import { useId } from 'react'

// Silueta de la D: stem recto + bowl semicircular
const D_OUTER = 'M14,10 L50,10 A40,40 0 0 1 50,90 L14,90 Z'

// Corte en flecha/"play" que entra desde el stem → sugiere "acción".
// Con fill-rule="evenodd" este subpath se resta de la D.
const D_ARROW = 'M14,42 Q32,50 48,60 Q32,68 14,76 Z'

export default function LogoIcon({ className }) {
  // El logo aparece en Nav y Footer: ids únicos para no colisionar gradientes
  const gradId = `logoGrad-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

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
        {/* Gradiente diagonal cian → azul → violeta */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#00E5FF" />
          <stop offset="50%"  stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      <path d={`${D_OUTER} ${D_ARROW}`} fill={`url(#${gradId})`} fillRule="evenodd" />
    </svg>
  )
}
