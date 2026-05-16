import LogoIcon from '../Nav/LogoIcon'
import './Footer.css'

const navLinks = [
  { label: 'Inicio',     href: '#inicio' },
  { label: 'Servicios',  href: '#servicios' },
  { label: 'Cursos',     href: '#cursos' },
  { label: 'Proyectos',  href: '#proyectos' },
  { label: 'Sobre mí',   href: '#sobre' },
  { label: 'Contacto',   href: '#contacto' },
]

const serviceLinks = [
  { label: 'Inteligencia Artificial', href: '#servicios' },
  { label: 'Ingeniería de Datos',     href: '#servicios' },
  { label: 'Automatización',          href: '#servicios' },
  { label: 'Dashboards y BI',         href: '#servicios' },
  { label: 'Desarrollo de Software',  href: '#servicios' },
  { label: 'Agentes IA',              href: '#servicios' },
]

const resourceLinks = [
  { label: 'Blog',           href: null },
  { label: 'Documentación',  href: null },
  { label: 'Casos de éxito', href: '#proyectos' },
]

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
                <LogoIcon width={22} height={22} />
              </div>
              <span className="footer__brand-name">InDat<span>A</span></span>
            </div>
            <p className="footer__brand-desc">
              Transformamos datos en decisiones inteligentes y llevamos tecnología e inteligencia artificial a tu negocio.
            </p>
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

          {/* NAVEGACIÓN */}
          <div>
            <div className="footer__col-title">NAVEGACIÓN</div>
            <div className="footer__links">
              {navLinks.map(({ label, href }) => (
                <a key={label} href={href} className="footer__link">{label}</a>
              ))}
            </div>
          </div>

          {/* SERVICIOS */}
          <div>
            <div className="footer__col-title">SERVICIOS</div>
            <div className="footer__links">
              {serviceLinks.map(({ label, href }) => (
                <a key={label} href={href} className="footer__link">{label}</a>
              ))}
            </div>
          </div>

          {/* RECURSOS */}
          <div>
            <div className="footer__col-title">RECURSOS</div>
            <div className="footer__links">
              {resourceLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href ?? '#'}
                  onClick={!href ? handleDisabled : undefined}
                  className={`footer__link${!href ? ' footer__link--disabled' : ''}`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">© 2025 InDatA — Inteligencia de Datos Aplicada. Todos los derechos reservados.</span>
          <button
            className="footer__cta"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contáctanos →
          </button>
        </div>
      </div>
    </footer>
  )
}
