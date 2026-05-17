export default function LogoIcon({ className }) {
  // Píxeles dispersos: cluster orgánico a la izquierda de la D,
  // con tamaños y opacidades variadas para sugerir "data dissolve"
  const pixels = [
    { x: 4,  y: 38, s: 3, op: 0.40 },
    { x: 8,  y: 24, s: 2, op: 0.50 },
    { x: 11, y: 46, s: 4, op: 0.70 },
    { x: 16, y: 14, s: 3, op: 0.60 },
    { x: 18, y: 32, s: 5, op: 1.00 },
    { x: 23, y: 52, s: 3, op: 0.70 },
    { x: 27, y: 22, s: 4, op: 0.90 },
    { x: 32, y: 40, s: 5, op: 1.00 },
  ]

  // D como anillo (fill-rule="evenodd"):
  //  - Subpath exterior: silueta completa
  //  - Subpath interior: hueco (resta) → genera el efecto anillo
  const dPath =
    'M46,8 L60,8 Q110,8 110,40 Q110,72 60,72 L46,72 Z ' +
    'M54,16 L60,16 Q102,16 102,40 Q102,64 60,64 L54,64 Z'

  // Path solo del INTERIOR de la D — para clip del gráfico
  const dInnerPath =
    'M54,16 L60,16 Q102,16 102,40 Q102,64 60,64 L54,64 Z'

  // Polyline ascendente dentro de la cavidad de la D
  const chartPoints = [
    { x: 62, y: 58 },
    { x: 74, y: 46 },
    { x: 86, y: 36 },
    { x: 98, y: 24 },
  ]
  const chartPointsStr = chartPoints.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <svg
      className={className}
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="InDatA logo"
      fill="none"
    >
      <defs>
        {/* Gradiente diagonal índigo → azul → morado */}
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#4F46E5" />
          <stop offset="50%"  stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        {/* Clip path con el hueco interior de la D, para confinar el gráfico */}
        <clipPath id="dClip">
          <path d={dInnerPath} />
        </clipPath>
      </defs>

      {/* --- Píxeles dispersos (efecto dissolve a la izquierda) --- */}
      {pixels.map(({ x, y, s, op }, i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={s}
          height={s}
          rx={0.5}
          fill="url(#logoGrad)"
          opacity={op}
        />
      ))}

      {/* --- Punto sutil arriba del stem (sugiere la "i") --- */}
      <rect x={46} y={4} width={8} height={3} rx={0.5} fill="url(#logoGrad)" />

      {/* --- D como anillo (fill-rule evenodd) --- */}
      <path
        d={dPath}
        fill="url(#logoGrad)"
        fillRule="evenodd"
      />

      {/* --- Gráfico interior, clipeado al hueco de la D --- */}
      <g clipPath="url(#dClip)">
        <polyline
          points={chartPointsStr}
          fill="none"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {chartPoints.map(({ x, y }, i) => (
          <circle key={i} cx={x} cy={y} r={2.5} fill="white" />
        ))}
      </g>
    </svg>
  )
}
