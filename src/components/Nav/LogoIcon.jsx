export default function LogoIcon({ width = 38, height = 38 }) {
  const dots = [
    [2, 4], [2, 9], [2, 14], [2, 19],
    [7, 4], [7, 9],
    [12, 2], [12, 6],
    [17, 2],
  ]
  return (
    <svg width={width} height={height} viewBox="0 0 38 38" fill="none">
      {dots.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={3.5} height={3.5} rx={0.5} fill="#2563EB" opacity={i % 3 === 0 ? 1 : 0.6} />
      ))}
      <path
        d="M14 6 L22 6 Q32 6 32 19 Q32 32 22 32 L14 32 Z"
        fill="none" stroke="url(#dgrad)" strokeWidth={2.5} strokeLinejoin="round"
      />
      <polyline
        points="17,26 20,20 23,23 27,15"
        fill="none" stroke="#00D1B2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx={27} cy={15} r={2} fill="#00D1B2" />
      <defs>
        <linearGradient id="dgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  )
}
