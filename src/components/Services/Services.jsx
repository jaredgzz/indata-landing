import { useAnimateIn } from '../../hooks/useAnimateIn'
import ServiceCard from './ServiceCard'
import { servicesData } from './servicesData.jsx'
import './Services.css'

export default function Services() {
  const [headerRef, headerVisible] = useAnimateIn()
  const [gridRef, gridVisible] = useAnimateIn()

  return (
    <section id="servicios" className="services">
      <div
        ref={headerRef}
        className={`services__header${headerVisible ? ' animate-in' : ''}`}
      >
        <div className="services__eyebrow">SERVICIOS</div>
        <h2 className="services__title">Soluciones que impulsan tu negocio</h2>
        <p className="services__subtitle">
          Aplicamos tecnología, datos e inteligencia para resolver problemas reales y generar valor medible.
        </p>
      </div>
      <div ref={gridRef} className="services__grid">
        {servicesData.map((s, i) => (
          <div key={s.title} className={gridVisible ? `animate-in animate-in--delay-${Math.min(i + 1, 5)}` : ''} style={{ opacity: gridVisible ? undefined : 0 }}>
            <ServiceCard {...s} />
          </div>
        ))}
      </div>
    </section>
  )
}
