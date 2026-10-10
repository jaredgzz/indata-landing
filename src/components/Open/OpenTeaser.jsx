import { Link } from 'react-router-dom'
import { useAnimateIn } from '../../hooks/useAnimateIn'
import StatusBadge from '../StatusBadge/StatusBadge'
import { content } from '../../content'
import './Open.css'

const { openTeaser } = content

export default function OpenTeaser() {
  const [ref, visible] = useAnimateIn()

  return (
    <section id="open" className="open-teaser">
      <div ref={ref} className={`open-teaser__inner${visible ? ' animate-in' : ''}`}>
        <div className="open-teaser__text">
          <div className="open-teaser__top">
            <span className="open-teaser__eyebrow">{openTeaser.eyebrow}</span>
            <StatusBadge status="initiative" />
          </div>
          <h2 className="open-teaser__title">{openTeaser.title}</h2>
          <p className="open-teaser__desc">{openTeaser.text}</p>
          <Link to="/open" className="text-link">
            {openTeaser.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="open-teaser__points">
          {openTeaser.points.map(point => (
            <li key={point} className="open-teaser__point">{point}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
