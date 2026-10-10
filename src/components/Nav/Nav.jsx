import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoIcon from './LogoIcon'
import { navItems } from '../../lib/data'
import { productsData } from '../Products/productsData'
import { scrollTo } from '../../lib/scrollTo'
import { content } from '../../content'
import './Nav.css'

const { nav, brand } = content

// Link activo fuera del home, según la ruta (ninguno en la página 404)
function activeForPath(pathname) {
  const path = pathname.replace(/\/+$/, '')
  if (productsData.some(product => product.path === path)) return 'productos'
  if (path === '/open' || /^\/cursos\/[\w-]+$/.test(path)) return 'open'
  return ''
}

export default function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const active = isHome ? activeSection : activeForPath(location.pathname)

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

  const goToContact = () => {
    setMenuOpen(false)
    if (isHome) scrollTo('contacto')
    else navigate('/#contacto')
  }

  // Rutas propias con <Link>; secciones del home con ancla (en otras páginas, /#id)
  const renderLink = ({ id, to }, className, activeClassName) => {
    const isActive = active === id
    const props = {
      className: `${className}${isActive ? ` ${activeClassName}` : ''}`,
      'aria-current': isActive ? (to ? 'page' : 'true') : undefined,
      onClick: () => setMenuOpen(false),
    }
    if (to) return <Link key={id} {...props} to={to}>{nav.links[id]}</Link>
    if (isHome) return <a key={id} {...props} href={`#${id}`}>{nav.links[id]}</a>
    return <Link key={id} {...props} to={`/#${id}`}>{nav.links[id]}</Link>
  }

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} ref={menuRef} aria-label={nav.mainLabel}>
      <Link to="/" className="nav__brand" style={{ textDecoration: 'none' }}>
        <LogoIcon className="nav__logo-icon" />
        <div className="nav__brand-text">
          <span className="nav__brand-name brand-name">
            In<span className="brand-name__accent">D</span>axion
          </span>
          <span className="nav__brand-tagline">{brand.tagline}</span>
        </div>
      </Link>

      <div className="nav__links">
        {navItems.map(item => renderLink(item, 'nav__link', 'nav__link--active'))}
      </div>

      <button className="nav__cta nav__cta--desktop" onClick={goToContact}>
        {nav.cta}
      </button>

      {/* Hamburger toggle — mobile only */}
      <button
        className={`nav__hamburger${menuOpen ? ' nav__hamburger--open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
        aria-expanded={menuOpen}
        aria-controls="nav-mobile-menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div id="nav-mobile-menu" className="nav__mobile-menu">
          {navItems.map(item => renderLink(item, 'nav__mobile-link', 'nav__mobile-link--active'))}
          <button className="nav__cta nav__cta--mobile" onClick={goToContact}>
            {nav.cta}
          </button>
        </div>
      )}
    </nav>
  )
}
