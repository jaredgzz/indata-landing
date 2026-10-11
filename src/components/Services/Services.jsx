import { useAnimateIn } from '../../hooks/useAnimateIn'
import SectionHeader from '../SectionHeader/SectionHeader'
import { servicesData } from './servicesData'
import { content } from '../../content'
import { scrollTo } from '../../lib/scrollTo'
import './Services.css'

const { services } = content

export default function Services() {
  const [ref, visible] = useAnimateIn()

  return (
    <section id="soluciones" className="services">
      <div ref={ref} className={`services__inner${visible ? ' animate-in' : ''}`}>
        <SectionHeader title={services.title} subtitle={services.subtitle} />
        <ul className="services__list">
          {servicesData.map(({ id }) => (
            <li key={id} className="services__item">
              <h3 className="services__title">{services.items[id].title}</h3>
              <p className="services__desc">{services.items[id].desc}</p>
            </li>
          ))}
        </ul>
        <button className="btn btn--secondary services__cta" onClick={() => scrollTo('contacto')}>
          {services.cta}
        </button>
      </div>
    </section>
  )
}
