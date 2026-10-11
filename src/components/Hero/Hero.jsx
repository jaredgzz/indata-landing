import { Fragment } from 'react'
import ProductStage from '../ProductStage/ProductStage'
import Icon from '../Icon/Icon'
import { content } from '../../content'
import { scrollTo } from '../../lib/scrollTo'
import './Hero.css'

const { hero } = content

// Lo que hacemos, en una línea; textos en content.hero.highlights[id]
const highlights = [
  { id: 'medida',         icon: 'code' },
  { id: 'automatizacion', icon: 'repeat' },
  { id: 'ia',             icon: 'cpu' },
  { id: 'datos',          icon: 'chart' },
  { id: 'integraciones',  icon: 'link' },
]

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__title">
            {hero.title.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && ' '}
                <span className="hero__title-line">{line}</span>
              </Fragment>
            ))}
          </h1>
          <p className="hero__lead">{hero.description}</p>
          <div className="hero__ctas">
            <button className="btn btn--primary" onClick={() => scrollTo('contacto')}>
              {hero.primaryCta} <span aria-hidden="true">→</span>
            </button>
            <button className="btn btn--secondary" onClick={() => scrollTo('productos')}>
              {hero.secondaryCta}
            </button>
          </div>
        </div>

        <ProductStage variant="hero" className="hero__stage" />
      </div>

      <ul className="hero__highlights" aria-label={hero.highlightsLabel}>
        {highlights.map(({ id, icon }) => (
          <li key={id} className="hero__highlight">
            <span className="hero__highlight-icon">
              <Icon name={icon} size={20} />
            </span>
            <span className="hero__highlight-label">{hero.highlights[id]}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
