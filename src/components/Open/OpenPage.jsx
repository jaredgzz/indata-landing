import { Link } from 'react-router-dom'
import StatusBadge from '../StatusBadge/StatusBadge'
import Icon from '../Icon/Icon'
import { openConcepts } from './openData'
import { content } from '../../content'
import './Open.css'

const { open } = content

export default function OpenPage() {
  return (
    <main className="open-page">
      <section className="open-page__hero">
        <div className="open-page__inner">
          <p className="open-page__eyebrow">{open.eyebrow}</p>
          <h1 className="open-page__title">{open.title}</h1>
          <p className="open-page__subtitle">{open.subtitle}</p>
          <StatusBadge status="initiative" />
        </div>
      </section>

      <section className="open-page__section">
        <div className="open-page__inner">
          <blockquote className="open-page__philosophy">
            <span className="open-page__label">{open.philosophyLabel}</span>
            <p>{open.philosophy}</p>
          </blockquote>

          <h2 className="open-page__section-title">{open.conceptsTitle}</h2>
          <ul className="open-page__concepts">
            {openConcepts.map(({ id, icon, tone, status }) => (
              <li key={id} className={`open-page__concept tone-${tone}`}>
                <div className="open-page__concept-head">
                  <span className="open-page__concept-icon">
                    <Icon name={icon} size={22} />
                  </span>
                  <StatusBadge status={status} />
                </div>
                <h3 className="open-page__concept-title">{open.concepts[id].title}</h3>
                <p className="open-page__concept-desc">{open.concepts[id].desc}</p>
              </li>
            ))}
          </ul>

          <div className="open-page__status">
            <h2 className="open-page__status-title">{open.statusTitle}</h2>
            <p>{open.status}</p>
          </div>
        </div>
      </section>

      <section className="open-page__cta">
        <div className="open-page__cta-inner">
          <h2 className="open-page__cta-title">{open.ctaTitle}</h2>
          <p className="open-page__cta-text">{open.ctaText}</p>
          <Link to="/?interes=open#contacto" className="btn btn--primary">
            {open.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
