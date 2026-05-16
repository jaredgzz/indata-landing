import { useState, useEffect } from 'react'
import LogoIcon from './LogoIcon'
import './Nav.css'

const links = [
  { label: 'Inicio',    id: 'inicio' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Cursos',    id: 'cursos' },
  { label: 'Proyectos', id: 'proyectos' },
  { label: 'Sobre mí',  id: 'sobre' },
  { label: 'Contacto',  id: 'contacto' },
]

export default function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__brand">
        <LogoIcon />
        <div className="nav__brand-text">
          <span className="nav__brand-name">InDat<span>A</span></span>
          <span className="nav__brand-tagline">Inteligencia de Datos Aplicada</span>
        </div>
      </div>

      <div className="nav__links">
        {links.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav__link${activeSection === id ? ' nav__link--active' : ''}`}
          >{label}</a>
        ))}
      </div>

      <button className="nav__cta" onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
        Hablemos
      </button>
    </nav>
  )
}
