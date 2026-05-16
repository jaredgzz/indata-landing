import { useState } from 'react'
import './CourseCard.css'

export default function CourseCard({ title, desc, logoText, logoBg, logoColor, tag, tagColor }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`course-card${hov ? ' course-card--hovered' : ''}`}
      style={{
        borderColor: hov ? tagColor + '40' : undefined,
        boxShadow: hov ? `0 0 28px ${tagColor}22` : undefined,
      }}
    >
      <div className="course-card__header">
        <div
          className={`course-card__logo${logoText.length > 2 ? ' course-card__logo--text-sm' : ' course-card__logo--text-lg'}`}
          style={{ background: logoBg, color: logoColor }}
        >
          {logoText}
        </div>
        <span
          className="course-card__badge"
          style={{ color: tagColor, background: tagColor + '18', borderColor: tagColor + '30' }}
        >
          {tag}
        </span>
      </div>
      <h3 className="course-card__title">{title}</h3>
      <p className="course-card__desc">{desc}</p>
      <div className="course-card__link" style={{ color: tagColor }}>Ver curso →</div>
    </div>
  )
}
