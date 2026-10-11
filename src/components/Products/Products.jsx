import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../SectionHeader/SectionHeader'
import StatusBadge from '../StatusBadge/StatusBadge'
import ProductStage from '../ProductStage/ProductStage'
import ProductIllustration from './ProductIllustration'
import { getProduct, govaScreens, govaTour, screenSrcSet } from './productsData'
import { content } from '../../content'
import './Products.css'

const { products, common } = content

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

/*
 * Gova paso a paso: en escritorio la escena queda fija y el paso que cruza
 * el centro de la pantalla lleva su captura al frente. En pantallas angostas
 * cada paso muestra su captura debajo del texto.
 */
function GovaTour() {
  const text = products.gova
  const [active, setActive] = useState(govaTour[0])
  const stepRefs = useRef([])

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(govaTour[i]) },
        { rootMargin: '-50% 0px -50% 0px' }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <article className="gova-tour tone-gova" aria-labelledby="gova-name">
      <ProductHead id="gova" headingId="gova-name" />

      <div className="gova-tour__body">
        <div className="gova-tour__steps-col">
          <p className="gova-tour__label">{text.tour.title}</p>
          <ol className="gova-tour__steps">
            {govaTour.map((id, i) => {
              const shot = govaScreens[id]
              const portrait = shot.height > shot.width
              return (
                <li
                  key={id}
                  ref={el => { stepRefs.current[i] = el }}
                  className={`gova-tour__step${active === id ? ' is-active' : ''}`}
                >
                  <span className="gova-tour__number">{i + 1}</span>
                  <h4 className="gova-tour__title">{text.tour.steps[id].title}</h4>
                  <p className="gova-tour__desc">{text.tour.steps[id].desc}</p>
                  <img
                    className={`gova-tour__shot${portrait ? ' gova-tour__shot--portrait' : ''}`}
                    src={shot.src}
                    srcSet={screenSrcSet(shot)}
                    width={shot.width}
                    height={shot.height}
                    alt={text.screens[id].alt}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              )
            })}
          </ol>
        </div>

        <div className="gova-tour__stage">
          <ProductStage variant="tour" active={active} caption={false} />
        </div>
      </div>

      <div className="gova-tour__foot">
        <Link to={getProduct('gova').path} className="btn btn--secondary">
          {text.cta}
        </Link>
        <p className="gova-tour__note">{common.screenshotsNote}</p>
      </div>
    </article>
  )
}

function MigaCard() {
  return (
    <article className="miga-card tone-miga" aria-labelledby="miga-name">
      <ProductIllustration id="miga" />
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
        <GovaTour />
        <MigaCard />
      </div>
    </section>
  )
}
