import { Link } from 'react-router-dom'
import { useAnimateIn } from '../../hooks/useAnimateIn'
import SectionHeader from '../SectionHeader/SectionHeader'
import StatusBadge from '../StatusBadge/StatusBadge'
import Icon from '../Icon/Icon'
import ProductIllustration from './ProductIllustration'
import { productsData } from './productsData'
import { content } from '../../content'
import './Products.css'

const { products } = content

function ProductCard({ id, path, status, tone }) {
  const product = products[id]

  return (
    <article className={`product-card tone-${tone}`}>
      <ProductIllustration id={id} />
      <div className="product-card__body">
        <div className="product-card__head">
          <h3 className="product-card__name">{product.name}</h3>
          <StatusBadge status={status} />
        </div>
        <p className="product-card__category">{product.category}</p>
        <p className="product-card__summary">{product.summary}</p>
        <ul className="product-card__benefits">
          {product.benefits.map(benefit => (
            <li key={benefit} className="product-card__benefit">
              <Icon name="check" size={16} strokeWidth={2.25} className="product-card__check" />
              {benefit}
            </li>
          ))}
        </ul>
        <Link to={path} className="btn btn--secondary product-card__cta">
          {product.cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

export default function Products() {
  const [headerRef, headerVisible] = useAnimateIn()
  const [gridRef, gridVisible] = useAnimateIn(0.1)

  return (
    <section id="productos" className="products">
      <div className="products__inner">
        <div
          ref={headerRef}
          className={`products__header${headerVisible ? ' animate-in' : ''}`}
        >
          <SectionHeader
            eyebrow={products.eyebrow}
            title={products.title}
            subtitle={products.subtitle}
            accentColor="var(--color-blue)"
          />
        </div>
        <div ref={gridRef} className="products__grid">
          {productsData.map((product, i) => (
            <div
              key={product.id}
              className={gridVisible ? `animate-in animate-in--delay-${i + 1}` : ''}
              style={{ opacity: gridVisible ? undefined : 0 }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
