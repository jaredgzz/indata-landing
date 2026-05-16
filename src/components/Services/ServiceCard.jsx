import { useState } from 'react'
import { ServiceIcon } from './servicesData.jsx'

export default function ServiceCard({ title, desc, color, bg, iconStroke, iconPath }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--card-bg)',
        border: `1px solid ${hovered ? color + '40' : 'var(--card-border)'}`,
        borderRadius: 'var(--card-radius)',
        padding: '24px',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? `0 0 32px ${color}28` : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'all 280ms ease-out',
        cursor: 'default',
      }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <ServiceIcon stroke={iconStroke} path={iconPath} />
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{desc}</p>
    </div>
  )
}
