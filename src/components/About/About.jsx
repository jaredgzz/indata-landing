import { useAnimateIn } from '../../hooks/useAnimateIn'
import SectionHeader from '../SectionHeader/SectionHeader'
import { statsData } from '../../lib/data'
import { scrollTo } from '../../lib/scrollTo'
import './About.css'

const skills = [
  'Ingeniería de Datos',
  'Inteligencia Artificial',
  'Especialista en datos y negocio',
  'Experiencia en proyectos sobre análisis',
  'Enfoque en resultados y negocio',
]

export default function About() {
  const [ref, visible] = useAnimateIn(0.1)

  return (
    <section id="sobre" className="about">
      <div ref={ref} className={`about__inner${visible ? ' animate-in' : ''}`}>
        <div className="about__avatar-wrap">
          <div className="about__avatar">
            <div className="about__avatar-initials">ID</div>
            <span className="about__avatar-label">Foto de perfil</span>
          </div>
        </div>
        <div>
          <SectionHeader
            eyebrow="SOBRE MÍ"
            title="Ingeniero. Analista. Constructor de soluciones."
            align="left"
            accentColor="var(--color-blue)"
            className="about__section-header"
          />
          <p className="about__bio">
            Apasionado por los datos, la inteligencia artificial y la automatización. Ayudo a empresas a transformar información en ventajas competitivas reales mediante soluciones tecnológicas modernas e innovadoras.
          </p>
          <ul className="about__skills">
            {skills.map(s => (
              <li key={s} className="about__skill">
                <span className="about__skill-arrow">›</span>
                {s}
              </li>
            ))}
          </ul>
          <div className="about__stats">
            {statsData.map(s => (
              <div key={s.label}>
                <div className="about__stat-value">{s.value}</div>
                <div className="about__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <button className="about__cta" onClick={() => scrollTo('contacto')}>
            Conoce más sobre mí →
          </button>
        </div>
      </div>
    </section>
  )
}
