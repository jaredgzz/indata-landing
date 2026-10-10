import { Link } from 'react-router-dom'
import ProductStage from '../ProductStage/ProductStage'
import StatusBadge from '../StatusBadge/StatusBadge'
import { productsData } from '../Products/productsData'
import { content } from '../../content'
import { scrollTo } from '../../lib/scrollTo'
import './Hero.css'

const { hero, products } = content

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__inner">
        <div className="hero__text">
          <h1 className="hero__title">{hero.title}</h1>
          <p className="hero__lead">{hero.description}</p>
          <div className="hero__ctas">
            <button className="btn btn--primary" onClick={() => scrollTo('productos')}>
              {hero.primaryCta}
            </button>
            <button className="text-link" onClick={() => scrollTo('contacto')}>
              {hero.secondaryCta} <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="hero__products">
          <p className="hero__products-label">{hero.productsLabel}</p>
          <ul className="hero__products-list">
            {productsData.map(({ id, path, status }) => (
              <li key={id}>
                <Link to={path} className={`hero__product tone-${id}`}>
                  <span className="hero__product-name">{products[id].name}</span>
                  <span className="hero__product-category">{products[id].shortCategory}</span>
                  <StatusBadge status={status} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ProductStage variant="hero" className="hero__stage" />
    </section>
  )
}
