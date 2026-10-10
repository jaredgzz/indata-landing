import { useId } from 'react'
import { getProduct } from './productsData'
import { content } from '../../content'
import './ProductIllustration.css'

/*
 * Imagen de cada producto: captura real del MVP o, si no la hay,
 * ilustración conceptual (rotulada como tal).
 * Solo formas: sin texto dentro del SVG, para no depender del idioma.
 */

// Barras de la forma de onda de audio (determinista)
const WAVE = Array.from({ length: 41 }, (_, i) =>
  6 + Math.round(Math.abs(Math.sin(i * 1.7) * 14 + Math.sin(i * 0.6) * 8)),
)

function MigaArt({ uid, label }) {
  const scene = `miga-scene-${uid}`
  const clip = `miga-clip-${uid}`
  const clipFill = `miga-clipfill-${uid}`
  const exportFill = `miga-export-${uid}`

  return (
    <svg className="product-illustration__svg" viewBox="0 0 520 340" role="img" aria-label={label}>
      <defs>
        <linearGradient id={scene} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="0.6" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#0B1220" />
        </linearGradient>
        <linearGradient id={clipFill} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.75" />
          <stop offset="1" stopColor="#3B82F6" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id={exportFill} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <clipPath id={clip}>
          <rect x="46" y="28" width="144" height="280" rx="14" />
        </clipPath>
      </defs>

      {/* Video vertical con subtítulos */}
      <rect x="36" y="18" width="164" height="300" rx="22" fill="#0F1A2E" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      <g clipPath={`url(#${clip})`}>
        <rect x="46" y="28" width="144" height="280" fill={`url(#${scene})`} />
        <circle cx="152" cy="92" r="34" fill="#FFFFFF" opacity="0.12" />
        <path d="M46 236 C 90 196, 130 214, 190 186 V308 H46 Z" fill="#0B1220" opacity="0.35" />
        <rect x="86" y="140" width="64" height="80" rx="12" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.40)" />
        <rect x="100" y="128" width="36" height="14" rx="7" fill="rgba(255,255,255,0.28)" />
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={56 + i * 32} y="38" width="28" height="3" rx="1.5" fill="#FFFFFF" opacity={i < 2 ? 0.85 : 0.3} />
        ))}
        <rect x="58" y="246" width="120" height="36" rx="8" fill="rgba(7,13,26,0.75)" />
        <rect x="68" y="256" width="100" height="6" rx="3" fill="#FFFFFF" />
        <rect x="68" y="268" width="68" height="6" rx="3" fill="#67EEFF" />
      </g>

      {/* Editor: instrucción y línea de tiempo */}
      <rect x="224" y="34" width="276" height="272" rx="14" fill="#121B2E" stroke="rgba(255,255,255,0.10)" />
      <rect x="240" y="50" width="244" height="46" rx="12" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.38)" />
      <path d="M258 63 L261 70 L268 73 L261 76 L258 83 L255 76 L248 73 L255 70 Z" fill="#B9A2FB" />
      <rect x="278" y="64" width="180" height="6" rx="3" fill="#E6E9F2" opacity="0.8" />
      <rect x="278" y="77" width="120" height="6" rx="3" fill="#8B9BB4" />

      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={240 + i * 24} x2={240 + i * 24} y1="114" y2={i % 2 ? 118 : 121} stroke="rgba(255,255,255,0.18)" />
      ))}
      <rect x="240" y="130" width="70" height="40" rx="6" fill={`url(#${clipFill})`} />
      <rect x="314" y="130" width="96" height="40" rx="6" fill={`url(#${clipFill})`} opacity="0.85" />
      <rect x="414" y="130" width="70" height="40" rx="6" fill={`url(#${clipFill})`} opacity="0.7" />
      <rect x="240" y="180" width="48" height="14" rx="4" fill="rgba(0,229,255,0.35)" />
      <rect x="292" y="180" width="60" height="14" rx="4" fill="rgba(0,229,255,0.35)" />
      <rect x="360" y="180" width="40" height="14" rx="4" fill="rgba(0,229,255,0.35)" />
      <rect x="406" y="180" width="70" height="14" rx="4" fill="rgba(0,229,255,0.35)" />
      {WAVE.map((h, i) => (
        <rect key={i} x={240 + i * 6} y={228 - h / 2} width="3" height={h} rx="1.5" fill="#3B82F6" opacity="0.6" />
      ))}

      {/* Cabezal de reproducción */}
      <line x1="352" x2="352" y1="112" y2="254" stroke="#00E5FF" strokeWidth="2" />
      <circle cx="352" cy="112" r="5" fill="#00E5FF" />

      {/* Exportar */}
      <rect x="404" y="266" width="80" height="26" rx="13" fill={`url(#${exportFill})`} />
      <path d="M424 273 v10 M419 279 l5 5 l5 -5" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="438" y="276" width="34" height="6" rx="3" fill="#FFFFFF" opacity="0.9" />
    </svg>
  )
}

export default function ProductIllustration({ id }) {
  // Varias ilustraciones pueden convivir en la página: ids únicos para los defs
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const { screenshot } = getProduct(id)
  const text = content.products[id]

  // Captura real del producto si existe; si no, ilustración conceptual
  if (screenshot) {
    return (
      <figure className="product-illustration product-illustration--screenshot">
        <img
          className="product-illustration__img"
          src={screenshot.src}
          width={screenshot.width}
          height={screenshot.height}
          alt={text.screenshotAlt}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="product-illustration__note">{content.common.screenshotNote}</figcaption>
      </figure>
    )
  }

  return (
    <figure className="product-illustration">
      <MigaArt uid={uid} label={text.illustrationAlt} />
      <figcaption className="product-illustration__note">{content.common.illustrationNote}</figcaption>
    </figure>
  )
}
