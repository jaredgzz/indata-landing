import { useState, useEffect, useRef } from 'react'
import LogoIcon from './LogoIcon'
import { navLinks } from '../../lib/data'
import { scrollTo } from '../../lib/scrollTo'
import './Nav.css'

export default function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [menuOpen])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} ref={menuRef}>
      <div className="nav__brand">
        <LogoIcon />
        <div className="nav__brand-text">
          <span className="nav__brand-name">InDat<span>A</span></span>
          <span className="nav__brand-tagline">Inteligencia de Datos Aplicada</span>
        </div>
      </div>

      <div className="nav__links">
        {navLinks.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav__link${activeSection === id ? ' nav__link--active' : ''}`}
          >{label}</a>
        ))}
      </div>

      <button className="nav__cta nav__cta--desktop" onClick={() => scrollTo('contacto')}>
        Hablemos
      </button>

      {/* Hamburger toggle — mobile only */}
      <button
        className={`nav__hamburger${menuOpen ? ' nav__hamburger--open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="nav__mobile-menu">
          {navLinks.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav__mobile-link${activeSection === id ? ' nav__mobile-link--active' : ''}`}
              onClick={handleLinkClick}
            >{label}</a>
          ))}
          <button
            className="nav__cta nav__cta--mobile"
            onClick={() => {
              setMenuOpen(false)
              scrollTo('contacto')
            }}
          >
            Hablemos
          </button>
        </div>
      )}
    </nav>
  )
}
