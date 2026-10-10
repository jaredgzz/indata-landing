// Iconos de trazo (24×24) compartidos por las secciones. Decorativos: aria-hidden.
const paths = {
  ai: (
    <>
      <path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6.5-6 7.4V20h-2v-3.6C7.5 15.5 5 12.5 5 9a7 7 0 0 1 7-7z" />
      <path d="M9 21h6" />
    </>
  ),
  db: (
    <>
      <ellipse cx={12} cy={5} rx={9} ry={3} />
      <path d="M3 5v4c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 9v4c0 1.66 4 3 9 3s9-1.34 9-3V9" />
      <path d="M3 13v4c0 1.66 4 3 9 3s9-1.34 9-3v-4" />
    </>
  ),
  auto: (
    <>
      <rect x={2} y={3} width={6} height={6} rx={1} />
      <rect x={16} y={3} width={6} height={6} rx={1} />
      <rect x={9} y={15} width={6} height={6} rx={1} />
      <path d="M5 9v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
      <line x1={12} y1={13} x2={12} y2={15} />
    </>
  ),
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  quote: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1={8} y1={13} x2={16} y2={13} />
      <line x1={8} y1={17} x2={13} y2={17} />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  video: (
    <>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x={1} y={5} width={15} height={14} rx={2} />
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
  sliders: (
    <>
      <line x1={4} y1={21} x2={4} y2={14} />
      <line x1={4} y1={10} x2={4} y2={3} />
      <line x1={12} y1={21} x2={12} y2={12} />
      <line x1={12} y1={8} x2={12} y2={3} />
      <line x1={20} y1={21} x2={20} y2={16} />
      <line x1={20} y1={12} x2={20} y2={3} />
      <line x1={1} y1={14} x2={7} y2={14} />
      <line x1={9} y1={8} x2={15} y2={8} />
      <line x1={17} y1={16} x2={23} y2={16} />
    </>
  ),
  book: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
  tool: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx={9} cy={7} r={4} />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  award: (
    <>
      <circle cx={12} cy={8} r={7} />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </>
  ),
  compass: (
    <>
      <circle cx={12} cy={12} r={10} />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  check: <polyline points="20 6 9 17 4 12" />,
  clock: (
    <>
      <circle cx={12} cy={12} r={10} />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  arrow: (
    <>
      <line x1={5} y1={12} x2={19} y2={12} />
      <polyline points="12 5 19 12 12 19" />
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
