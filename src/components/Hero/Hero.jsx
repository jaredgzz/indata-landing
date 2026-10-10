import { Link } from 'react-router-dom'
import WaveCanvas from './WaveCanvas'
import StatusBadge from '../StatusBadge/StatusBadge'
import { productsData } from '../Products/productsData'
import { content } from '../../content'
import { scrollTo } from '../../lib/scrollTo'
import './Hero.css'

const { hero, products } = content

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__canvas-wrap">
        <WaveCanvas />
      </div>
      <div className="hero__fade" />
      <div className="hero__content">
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-dot" aria-hidden="true" />
          {hero.eyebrow}
        </p>
        <h1 className="hero__headline">
          {hero.title.map(({ text, accent }) => (
            accent
              ? <span key={text} className={`hero__headline-gradient-${accent}`}>{text}</span>
              : text
          ))}
        </h1>
        <p className="hero__subheadline">{hero.description}</p>
        <div className="hero__ctas">
          <button className="btn btn--primary" onClick={() => scrollTo('productos')}>
            {hero.primaryCta} <span aria-hidden="true">→</span>
          </button>
          <button className="btn btn--secondary" onClick={() => scrollTo('contacto')}>
            {hero.secondaryCta}
          </button>
        </div>

        <div className="hero__products">
          <p className="hero__products-label">{hero.productsLabel}</p>
          <div className="hero__products-list">
            {productsData.map(({ id, path, tone, status }) => (
              <Link key={id} to={path} className={`hero__product tone-${tone}`}>
                <span className="hero__product-mark" aria-hidden="true" />
                <span className="hero__product-text">
                  <span className="hero__product-name">{products[id].name}</span>
                  <span className="hero__product-category">{products[id].shortCategory}</span>
                </span>
                <StatusBadge status={status} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
