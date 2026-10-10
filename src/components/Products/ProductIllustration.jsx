import { useId } from 'react'
import { content } from '../../content'
import './ProductIllustration.css'

/*
 * Ilustración conceptual de un producto sin capturas reales (hoy, Miga),
 * rotulada como tal. Solo formas: sin texto dentro del SVG, para no depender
 * del idioma. Representa una pantalla de app, así que es oscura en ambos temas.
 */

// Barras de la forma de onda de audio (determinista)
const WAVE = Array.from({ length: 41 }, (_, i) =>
  6 + Math.round(Math.abs(Math.sin(i * 1.7) * 14 + Math.sin(i * 0.6) * 8)),
)

function MigaArt({ uid, label }) {
  const clip = `miga-clip-${uid}`

  return (
    <svg className="product-illustration__svg" viewBox="0 0 520 340" role="img" aria-label={label}>
      <defs>
        <clipPath id={clip}>
          <rect x="46" y="28" width="144" height="280" rx="14" />
        </clipPath>
      </defs>

      {/* Video vertical con subtítulos */}
      <rect x="36" y="18" width="164" height="300" rx="22" fill="#151B26" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      <g clipPath={`url(#${clip})`}>
        <rect x="46" y="28" width="144" height="280" fill="#3B2E7A" />
        <rect x="46" y="200" width="144" height="108" fill="#2A2160" />
        <circle cx="152" cy="92" r="34" fill="#FFFFFF" opacity="0.10" />
        <rect x="86" y="140" width="64" height="80" rx="12" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.40)" />
        <rect x="100" y="128" width="36" height="14" rx="7" fill="rgba(255,255,255,0.28)" />
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={56 + i * 32} y="38" width="28" height="3" rx="1.5" fill="#FFFFFF" opacity={i < 2 ? 0.85 : 0.3} />
        ))}
        <rect x="58" y="246" width="120" height="36" rx="8" fill="rgba(11,18,32,0.78)" />
        <rect x="68" y="256" width="100" height="6" rx="3" fill="#FFFFFF" />
        <rect x="68" y="268" width="68" height="6" rx="3" fill="#B8A4F5" />
      </g>

      {/* Editor: instrucción escrita y línea de tiempo */}
      <rect x="224" y="34" width="276" height="272" rx="14" fill="#151B26" stroke="rgba(255,255,255,0.10)" />
      <rect x="240" y="50" width="244" height="46" rx="10" fill="#1E2533" stroke="rgba(255,255,255,0.12)" />
      <path d="M254 66 l7 7 l-7 7" stroke="#B8A4F5" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="272" y="64" width="180" height="6" rx="3" fill="#E6E9F2" opacity="0.8" />
      <rect x="272" y="77" width="120" height="6" rx="3" fill="#8B97AB" />

      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={240 + i * 24} x2={240 + i * 24} y1="114" y2={i % 2 ? 118 : 121} stroke="rgba(255,255,255,0.18)" />
      ))}
      <rect x="240" y="130" width="70" height="40" rx="6" fill="#6E49D8" />
      <rect x="314" y="130" width="96" height="40" rx="6" fill="#6E49D8" opacity="0.8" />
      <rect x="414" y="130" width="70" height="40" rx="6" fill="#6E49D8" opacity="0.6" />
      <rect x="240" y="180" width="48" height="14" rx="4" fill="#4C5A73" />
      <rect x="292" y="180" width="60" height="14" rx="4" fill="#4C5A73" />
      <rect x="360" y="180" width="40" height="14" rx="4" fill="#4C5A73" />
      <rect x="406" y="180" width="70" height="14" rx="4" fill="#4C5A73" />
      {WAVE.map((h, i) => (
        <rect key={i} x={240 + i * 6} y={228 - h / 2} width="3" height={h} rx="1.5" fill="#8B97AB" opacity="0.7" />
      ))}

      {/* Cabezal de reproducción */}
      <line x1="352" x2="352" y1="112" y2="254" stroke="#E6E9F2" strokeWidth="2" />
      <circle cx="352" cy="112" r="5" fill="#E6E9F2" />

      {/* Exportar */}
      <rect x="404" y="266" width="80" height="26" rx="8" fill="#2D5BE3" />
      <path d="M424 273 v10 M419 279 l5 5 l5 -5" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="438" y="276" width="34" height="6" rx="3" fill="#FFFFFF" opacity="0.9" />
    </svg>
  )
}

export default function ProductIllustration({ id }) {
  // Varias ilustraciones pueden convivir en la página: ids únicos para los defs
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <figure className="product-illustration">
      <MigaArt uid={uid} label={content.products[id].illustrationAlt} />
      <figcaption className="product-illustration__note">{content.common.illustrationNote}</figcaption>
    </figure>
  )
}
