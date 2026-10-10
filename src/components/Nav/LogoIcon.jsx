import { useId } from 'react'

// Silueta exterior: stem con esquinas redondeadas + bowl amplio
const D_OUTER = 'M18,6 L50,6 C78,6 94,26 94,50 C94,74 78,94 50,94 L18,94 Q8,94 8,84 L8,16 Q8,6 18,6 Z'

// Contraforma interior (fill-rule="evenodd" la resta de la silueta)
const D_INNER = 'M34,30 L48,30 C60,30 70,39 70,50 C70,61 60,70 48,70 L34,70 Q30,70 30,66 L30,34 Q30,30 34,30 Z'

// Cuadrante inferior derecho del bowl: capa de luz para dar volumen
const D_SHEEN = 'M94,50 C94,74 78,94 50,94 L48,70 C60,70 70,61 70,50 Z'

export default function LogoIcon({ className }) {
  // El logo aparece en Nav y Footer: ids únicos para no colisionar gradientes
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const gradId = `logoGrad-${uid}`
  const sheenId = `logoSheen-${uid}`

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
          <stop offset="45%"  stopColor="#3B82F6" />
          <stop offset="85%"  stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id={sheenId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#8B5CF6" stopOpacity="0" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <path d={`${D_OUTER} ${D_INNER}`} fill={`url(#${gradId})`} fillRule="evenodd" />
      <path d={D_SHEEN} fill={`url(#${sheenId})`} />
    </svg>
  )
}
