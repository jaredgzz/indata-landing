import { useState } from 'react'
import { chartBars } from './projectsData'

export default function ProjectCard({ title, desc, tag, tagColor, tagBg }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--card-bg)',
        border: `1px solid ${hov ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 'var(--card-radius)',
        overflow: 'hidden',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? '0 0 28px rgba(37,99,235,0.18)' : '0 2px 12px rgba(0,0,0,0.25)',
        transition: 'all 260ms ease-out',
        cursor: 'pointer',
      }}
    >
      <div style={{
        height: 140,
        background: 'linear-gradient(135deg, #0D1117, #1A2236)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, gap: 8, flexWrap: 'wrap',
      }}>
        {chartBars.map((h, i) => (
          <div key={i} style={{
            width: 14,
            height: h * 0.9 + 'px',
            background: i % 3 === 0
              ? 'linear-gradient(180deg,#2563EB,#7C3AED)'
              : i % 3 === 1
                ? 'rgba(0,209,178,0.6)'
                : 'rgba(37,99,235,0.4)',
            borderRadius: '3px 3px 0 0',
            alignSelf: 'flex-end',
          }} />
        ))}
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <span style={{
          fontSize: 11, fontWeight: 600, color: tagColor,
          background: tagBg, padding: '3px 10px',
          borderRadius: 100, border: `1px solid ${tagColor}25`,
        }}>{tag}</span>
        <h3 style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
        <p style={{ marginTop: 6, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  )
}
