import { Link } from 'react-router-dom'
import LogoIcon from '../Nav/LogoIcon'
import { productsData } from '../Products/productsData'
import { servicesData } from '../Services/servicesData'
import { contactInfo } from '../../lib/contactInfo'
import { content, format } from '../../content'
import './Footer.css'

const { footer, products, services } = content

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <LogoIcon className="footer__logo-icon" />
              <span className="footer__brand-name brand-name">
                In<span className="brand-name__accent">D</span>axion
              </span>
            </div>
            <p className="footer__brand-desc">{footer.description}</p>
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
            <div className="footer__links">
              <a
                href={contactInfo.whatsappUrl}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${footer.whatsapp}: ${contactInfo.phone}`}
              >
                {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="footer__link"
                aria-label={`${footer.email}: ${contactInfo.email}`}
              >
                {contactInfo.email}
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">
            {format(footer.copyright, { year: new Date().getFullYear() })}
          </span>
          <Link to="/#contacto" className="footer__link footer__cta">
            {footer.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
