import { useAnimateIn } from '../../hooks/useAnimateIn'
import SectionHeader from '../SectionHeader/SectionHeader'
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
        <SectionHeader
          eyebrow="SERVICIOS"
          title="Soluciones que impulsan tu negocio"
          subtitle="Aplicamos tecnología, datos e inteligencia para resolver problemas reales y generar valor medible."
          accentColor="var(--color-blue)"
        />
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
