// Iconos de trazo (24×24) compartidos por las secciones. Decorativos: aria-hidden.
const paths = {
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  repeat: (
    <>
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </>
  ),
  cpu: (
    <>
      <rect x={4} y={4} width={16} height={16} rx={2} />
      <rect x={9} y={9} width={6} height={6} />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </>
  ),
  chart: (
    <>
      <line x1={18} y1={20} x2={18} y2={10} />
      <line x1={12} y1={20} x2={12} y2={4} />
      <line x1={6} y1={20} x2={6} y2={14} />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  clock: (
    <>
      <circle cx={12} cy={12} r={10} />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
}

export default function Icon({ name, size = 24, color = 'currentColor', strokeWidth = 1.75, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}
