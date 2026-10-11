import { productShots, screenSrcSet } from './productsData'
import { content } from '../../content'
import './ProductShot.css'

// Captura real de un producto, de frente, con su leyenda (hoy, Miga)
export default function ProductShot({ id, className = '' }) {
  const shot = productShots[id]
  const text = content.products[id]
  return (
    <figure className={`product-shot${className ? ` ${className}` : ''}`}>
      <img
        className="product-shot__img"
        src={shot.src}
        srcSet={screenSrcSet(shot)}
        width={shot.width}
        height={shot.height}
        alt={text.screenAlt}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="product-shot__note">{text.screenshotNote}</figcaption>
    </figure>
  )
}
