import { useState } from 'react'

export default function CourseCard({ title, desc, logoText, logoBg, logoColor, tag, tagColor }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--card-bg)',
        border: `1px solid ${hov ? tagColor + '40' : 'var(--card-border)'}`,
        borderRadius: 'var(--card-radius)',
        padding: '22px 22px 20px',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 0 28px ${tagColor}22` : '0 2px 12px rgba(0,0,0,0.25)',
        transition: 'all 260ms ease-out',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: logoBg, color: logoColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: logoText.length > 2 ? 11 : 16, fontWeight: 900,
        }}>
          {logoText}
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: '3px 10px',
          borderRadius: 100, color: tagColor,
          background: tagColor + '18', border: `1px solid ${tagColor}30`,
        }}>
          {tag}
        </span>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>{desc}</p>
      <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: tagColor }}>Ver curso →</div>
    </div>
  )
}
