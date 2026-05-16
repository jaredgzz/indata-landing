import WaveCanvas from './WaveCanvas'
import { scrollTo } from '../../lib/scrollTo'
import './Hero.css'

const stats = [
  {
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#00D1B2" strokeWidth={1.75} strokeLinecap="round">
        <line x1={18} y1={20} x2={18} y2={10} />
        <line x1={12} y1={20} x2={12} y2={4} />
        <line x1={6} y1={20} x2={6} y2={14} />
        <polyline points="3,17 6,14 9,17 12,14 15,17 18,10 21,13" />
      </svg>
    ),
    label: '+30 Proyectos', sub: 'Completados',
  },
  {
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={1.75} strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx={9} cy={7} r={4} />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: '+10 Empresas', sub: 'Acompañadas',
  },
  {
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth={1.75} strokeLinecap="round">
        <circle cx={12} cy={12} r={10} />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
    label: '+5 Años', sub: 'de Experiencia',
  },
  {
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#00D1B2" strokeWidth={1.75} strokeLinecap="round">
        <path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6.5-6 7.4V20h-2v-3.6C7.5 15.5 5 12.5 5 9a7 7 0 0 1 7-7z" />
        <path d="M9 21h6" />
      </svg>
    ),
    label: 'IA + Datos', sub: 'Automatización',
  },
]

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__canvas-wrap">
        <WaveCanvas />
      </div>
      <div className="hero__fade" />
      <div className="hero__content">
        <h1 className="hero__headline">
          Transformamos<br />
          datos en <span className="hero__headline-gradient-blue">decisiones</span><br />
          <span className="hero__headline-gradient-purple">inteligentes.</span>
        </h1>
        <p className="hero__subheadline">
          Soluciones de datos, inteligencia artificial y automatización para empresas modernas.
        </p>
        <div className="hero__ctas">
          <button className="hero__cta-primary" onClick={() => scrollTo('servicios')}>
            Explorar servicios →
          </button>
          <button className="hero__cta-secondary" onClick={() => scrollTo('proyectos')}>
            Ver proyectos
          </button>
        </div>
        <div className="hero__stats">
          {stats.map(s => (
            <div key={s.label} className="hero__stat">
              <div className="hero__stat-icon">{s.icon}</div>
              <div>
                <div className="hero__stat-label">{s.label}</div>
                <div className="hero__stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
