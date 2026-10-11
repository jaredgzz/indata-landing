import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../../content'
import './NotFound.css'

const { notFound } = content

export default function NotFound() {
  // La página de error no debe indexarse
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  return (
    <main className="not-found">
      <section className="not-found__inner">
        <p className="not-found__code" aria-hidden="true">404</p>
        <p className="not-found__eyebrow">{notFound.eyebrow}</p>
        <h1 className="not-found__title">{notFound.title}</h1>
        <p className="not-found__text">{notFound.text}</p>
        <div className="not-found__ctas">
          <Link to="/" className="btn btn--primary">
            {notFound.home}
          </Link>
          <Link to="/#productos" className="btn btn--secondary">
            {notFound.products}
          </Link>
        </div>
      </section>
    </main>
  )
}
