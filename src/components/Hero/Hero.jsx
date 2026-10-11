import { Fragment } from 'react'
import ProductStage from '../ProductStage/ProductStage'
import { content } from '../../content'
import { scrollTo } from '../../lib/scrollTo'
import './Hero.css'

const { hero } = content

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
    </section>
  )
}
