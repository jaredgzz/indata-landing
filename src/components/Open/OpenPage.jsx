import { Link } from 'react-router-dom'
import StatusBadge from '../StatusBadge/StatusBadge'
import { openConcepts } from './openData'
import { content } from '../../content'
import './Open.css'

const { open } = content

export default function OpenPage() {
  return (
    <main className="open-page">
      <section className="open-page__hero">
        <div className="open-page__inner">
          <StatusBadge status="initiative" />
          <h1 className="open-page__title">{open.title}</h1>
          <p className="open-page__subtitle">{open.subtitle}</p>
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
            {openConcepts.map(({ id, status }) => (
              <li key={id} className="open-page__concept">
                <div className="open-page__concept-head">
                  <h3 className="open-page__concept-title">{open.concepts[id].title}</h3>
                  <StatusBadge status={status} />
                </div>
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
        <div className="open-page__inner">
          <h2 className="open-page__cta-title">{open.ctaTitle}</h2>
          <p className="open-page__cta-text">{open.ctaText}</p>
          <Link to="/?interes=open#contacto" className="btn btn--primary">
            {open.cta}
          </Link>
        </div>
      </section>
    </main>
  )
}
