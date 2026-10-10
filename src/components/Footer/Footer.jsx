import { Link } from 'react-router-dom'
import LogoIcon from '../Nav/LogoIcon'
import { productsData } from '../Products/productsData'
import { servicesData } from '../Services/servicesData'
import { content, format } from '../../content'
import './Footer.css'

const { footer, products, services } = content

const socialLinks = [
  { label: 'GH', title: 'GitHub',    href: null },
  { label: 'LI', title: 'LinkedIn',  href: null },
  { label: 'YT', title: 'YouTube',   href: null },
  { label: '@',  title: 'Instagram', href: null },
]

const handleDisabled = (e) => e.preventDefault()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <div className="footer__brand-icon">
                <LogoIcon className="footer__logo-icon" />
              </div>
              <span className="footer__brand-name brand-name">
                In<span className="brand-name__accent">D</span>axion
              </span>
            </div>
            <p className="footer__brand-desc">{footer.description}</p>
            <div className="footer__socials">
              {socialLinks.map(({ label, title, href }) => (
                <a
                  key={label}
                  href={href ?? '#'}
                  onClick={!href ? handleDisabled : undefined}
                  className="footer__social"
                  title={title}
                  aria-label={title}
                  {...(href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* PRODUCTOS */}
          <nav aria-label={footer.columns.products}>
            <div className="footer__col-title">{footer.columns.products}</div>
            <div className="footer__links">
              {productsData.map(({ id, path }) => (
                <Link key={id} to={path} className="footer__link">{products[id].name}</Link>
              ))}
            </div>
          </nav>

          {/* SOLUCIONES */}
          <nav aria-label={footer.columns.solutions}>
            <div className="footer__col-title">{footer.columns.solutions}</div>
            <div className="footer__links">
              {servicesData.map(({ id }) => (
                <Link key={id} to="/#soluciones" className="footer__link">{services.items[id].title}</Link>
              ))}
            </div>
          </nav>

          {/* INDAXION OPEN */}
          <nav aria-label={footer.columns.open}>
            <div className="footer__col-title">{footer.columns.open}</div>
            <div className="footer__links">
              <Link to="/open" className="footer__link">{footer.openLinks.initiative}</Link>
            </div>
          </nav>

          {/* CONTACTO */}
          <div>
            <div className="footer__col-title">{footer.columns.contact}</div>
            <div className="footer__contact">
              <a
                href="https://wa.me/528125670127"
                className="footer__contact-item"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={footer.whatsapp}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+52 81 2567 0127</span>
              </a>
              <a
                href="mailto:davidjared7@gmail.com"
                className="footer__contact-item"
                aria-label={footer.email}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>davidjared7@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">
            {format(footer.copyright, { year: new Date().getFullYear() })}
          </span>
          <Link to="/#contacto" className="footer__cta">
            {footer.cta}
          </Link>
        </div>
      </div>
    </footer>
  )
}
