// Iconos de trazo (24×24) compartidos por las secciones. Decorativos: aria-hidden.
const paths = {
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
