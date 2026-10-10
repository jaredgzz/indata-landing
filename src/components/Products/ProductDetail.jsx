import { Link, Navigate, useParams } from 'react-router-dom'
import StatusBadge from '../StatusBadge/StatusBadge'
import Icon from '../Icon/Icon'
import ProductIllustration from './ProductIllustration'
import { getProduct, productsData } from './productsData'
import { content } from '../../content'
import './ProductDetail.css'

const { products } = content

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <Navigate to="/#productos" replace />

  const text = products[product.id]
  const { detail } = text
  const other = productsData.find(p => p.id !== product.id)
  const contactPath = `/?interes=${product.id}#contacto`

  return (
    <main className={`product-detail tone-${product.tone}`}>
      <section className="product-detail__hero">
        <div className="product-detail__inner product-detail__hero-grid">
          <div className="product-detail__intro">
            <Link to="/#productos" className="product-detail__back">{products.backToProducts}</Link>
            <p className="product-detail__category">{text.category}</p>
            <h1 className="product-detail__name">{text.name}</h1>
            <p className="product-detail__lead">{detail.intro}</p>
            <div className="product-detail__status">
              <StatusBadge status={product.status} />
              <p className="product-detail__status-note">{detail.statusNote}</p>
            </div>
            <div className="product-detail__ctas">
              <Link to={contactPath} className="btn btn--primary">
                {detail.cta} <span aria-hidden="true">→</span>
              </Link>
              <Link to={other.path} className="btn btn--secondary">
                {products[other.id].cta}
              </Link>
            </div>
          </div>
          <ProductIllustration id={product.id} />
        </div>
      </section>

      <section className="product-detail__section">
        <div className="product-detail__inner product-detail__columns">
          <div className="product-detail__panel">
            <div className="product-detail__panel-head">
              <h2 className="product-detail__panel-title">{detail.todayTitle}</h2>
              <StatusBadge status={product.status} />
            </div>
            <ul className="product-detail__list">
              {detail.today.map(item => (
                <li key={item}>
                  <Icon name="check" size={18} strokeWidth={2.25} className="product-detail__list-icon" />
                  {item}
                </li>
              ))}
            </ul>
            {detail.todayExtra && <p className="product-detail__extra">{detail.todayExtra}</p>}
          </div>

          <div className="product-detail__panel product-detail__panel--next">
            <div className="product-detail__panel-head">
              <h2 className="product-detail__panel-title">{detail.nextTitle}</h2>
              <StatusBadge status={product.nextStatus} />
            </div>
            {detail.nextIntro && <p className="product-detail__next-intro">{detail.nextIntro}</p>}
            <ul className="product-detail__list product-detail__list--next">
              {detail.next.map(item => (
                <li key={item}>
                  <Icon name="clock" size={18} className="product-detail__list-icon" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="product-detail__next-note">{detail.nextNote}</p>
          </div>
        </div>
      </section>

      <section className="product-detail__section product-detail__section--alt">
        <div className="product-detail__inner">
          <h2 className="product-detail__section-title">{detail.benefitsTitle}</h2>
          <ul className="product-detail__benefits">
            {text.benefits.map(benefit => (
              <li key={benefit} className="product-detail__benefit">
                <span className="product-detail__benefit-icon">
                  <Icon name="check" size={18} strokeWidth={2.25} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <aside className="product-detail__tech">
            <span className="product-detail__tech-label">{detail.techLabel}</span>
            <p>{detail.techNote}</p>
          </aside>
        </div>
      </section>

      <section className="product-detail__cta">
        <div className="product-detail__cta-inner">
          <h2 className="product-detail__cta-title">{detail.ctaTitle}</h2>
          <p className="product-detail__cta-text">{detail.ctaText}</p>
          <Link to={contactPath} className="btn btn--primary">
            {detail.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
