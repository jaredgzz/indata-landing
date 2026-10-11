import { Link } from 'react-router-dom'
import SectionHeader from '../SectionHeader/SectionHeader'
import StatusBadge from '../StatusBadge/StatusBadge'
import ProductShot from './ProductShot'
import GovaTour from './GovaTour'
import { getProduct } from './productsData'
import { content } from '../../content'
import './Products.css'

const { products } = content

function ProductHead({ id, headingId }) {
  const product = getProduct(id)
  const text = products[id]
  return (
    <>
      <div className="product-head">
        <h3 id={headingId} className="product-head__name">{text.name}</h3>
        <StatusBadge status={product.status} />
      </div>
      <p className="product-head__category">{text.category}</p>
      <p className="product-head__summary">{text.summary}</p>
    </>
  )
}

function GovaSection() {
  return (
    <article className="gova-tour tone-gova" aria-labelledby="gova-name">
      <ProductHead id="gova" headingId="gova-name" />
      <GovaTour />
    </article>
  )
}

function MigaCard() {
  return (
    <article className="miga-card tone-miga" aria-labelledby="miga-name">
      <ProductShot id="miga" />
      <div className="miga-card__body">
        <ProductHead id="miga" headingId="miga-name" />
        <ul className="miga-card__benefits">
          {products.miga.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}
        </ul>
        <Link to={getProduct('miga').path} className="text-link">
          {products.miga.cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

export default function Products() {
  return (
    <section id="productos" className="products">
      <div className="products__inner">
        <SectionHeader title={products.title} subtitle={products.subtitle} />
        <GovaSection />
        <MigaCard />
      </div>
    </section>
  )
}
