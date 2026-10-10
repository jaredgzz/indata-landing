import { useAnimateIn } from '../../hooks/useAnimateIn'
import SectionHeader from '../SectionHeader/SectionHeader'
import ServiceCard from './ServiceCard'
import { servicesData } from './servicesData'
import { content } from '../../content'
import { scrollTo } from '../../lib/scrollTo'
import './Services.css'

const { services } = content

export default function Services() {
  const [headerRef, headerVisible] = useAnimateIn()
  const [gridRef, gridVisible] = useAnimateIn()

  return (
    <section id="soluciones" className="services">
      <div
        ref={headerRef}
        className={`services__header${headerVisible ? ' animate-in' : ''}`}
      >
        <SectionHeader
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.subtitle}
          accentColor="#B9A2FB"
        />
      </div>
      <div ref={gridRef} className="services__grid">
        {servicesData.map(({ id, icon, tone }, i) => (
          <div key={id} className={gridVisible ? `animate-in animate-in--delay-${Math.min(i + 1, 5)}` : ''} style={{ opacity: gridVisible ? undefined : 0 }}>
            <ServiceCard
              title={services.items[id].title}
              desc={services.items[id].desc}
              icon={icon}
              tone={tone}
            />
          </div>
        ))}
      </div>
      <div className="services__cta">
        <button className="btn btn--secondary" onClick={() => scrollTo('contacto')}>
          {services.cta} <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}
