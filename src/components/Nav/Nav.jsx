import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoIcon from './LogoIcon'
import { navLinks } from '../../lib/data'
import { scrollTo } from '../../lib/scrollTo'
import './Nav.css'

export default function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

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

  // On home: scroll to section. On detail pages: navigate to home anchor.
  const handleNavLink = (id) => {
    setMenuOpen(false)
    if (isHome) {
      scrollTo(id)
    }
  }

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} ref={menuRef}>
      <Link to="/" className="nav__brand" style={{ textDecoration: 'none' }}>
        <LogoIcon className="nav__logo-icon" />
        <div className="nav__brand-text">
          <span className="nav__brand-name brand-name">
            InDat<span className="brand-name__accent">A</span>
          </span>
          <span className="nav__brand-tagline">Inteligencia de Datos Aplicada</span>
        </div>
      </Link>

      <div className="nav__links">
        {navLinks.map(({ label, id, href }) => (
          isHome ? (
            <a
              key={id}
              href={`#${id}`}
              className={`nav__link${activeSection === id ? ' nav__link--active' : ''}`}
            >{label}</a>
          ) : (
            <a
              key={id}
              href={`/${href}`}
              className="nav__link"
            >{label}</a>
          )
        ))}
      </div>

      <button
        className="nav__cta nav__cta--desktop"
        onClick={() => {
          if (isHome) {
            scrollTo('contacto')
          } else {
            window.location.href = '/#contacto'
          }
        }}
      >
        Hablemos
      </button>

      {/* Hamburger toggle — mobile only */}
      <button
        className={`nav__hamburger${menuOpen ? ' nav__hamburger--open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="nav__mobile-menu">
          {navLinks.map(({ label, id, href }) => (
            isHome ? (
              <a
                key={id}
                href={`#${id}`}
                className={`nav__mobile-link${activeSection === id ? ' nav__mobile-link--active' : ''}`}
                onClick={handleLinkClick}
              >{label}</a>
            ) : (
              <a
                key={id}
                href={`/${href}`}
                className="nav__mobile-link"
                onClick={handleLinkClick}
              >{label}</a>
            )
          ))}
          <button
            className="nav__cta nav__cta--mobile"
            onClick={() => {
              setMenuOpen(false)
              if (isHome) {
                scrollTo('contacto')
              } else {
                window.location.href = '/#contacto'
              }
            }}
          >
            Hablemos
          </button>
        </div>
      )}
    </nav>
  )
}
