import { useState } from 'react'
import { ServiceIcon } from './servicesData.jsx'
import './ServiceCard.css'

export default function ServiceCard({ title, desc, color, bg, iconStroke, iconPath }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`service-card${hovered ? ' service-card--hovered' : ''}`}
      style={{
        borderColor: hovered ? color + '40' : undefined,
        boxShadow: hovered ? `0 0 32px ${color}28` : undefined,
      }}
    >
      <div
        className="service-card__icon"
        style={{ background: bg }}
      >
        <ServiceIcon stroke={iconStroke} path={iconPath} />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{desc}</p>
    </div>
  )
}
