import { Link } from 'react-router-dom'
import { useAnimateIn } from '../../hooks/useAnimateIn'
import SectionHeader from '../SectionHeader/SectionHeader'
import Icon from '../Icon/Icon'
import { problemsData } from './problemsData'
import { content } from '../../content'
import './Problems.css'

const { problems } = content

export default function Problems() {
  const [headerRef, headerVisible] = useAnimateIn()
  const [gridRef, gridVisible] = useAnimateIn()

  return (
    <section id="problemas" className="problems">
      <div className="problems__inner">
        <div
          ref={headerRef}
          className={`problems__header${headerVisible ? ' animate-in' : ''}`}
        >
          <SectionHeader
            eyebrow={problems.eyebrow}
            title={<>{problems.title} <span className="text-gradient">{problems.titleAccent}</span></>}
            subtitle={problems.subtitle}
            accentColor="var(--color-cyan)"
          />
        </div>
        <div ref={gridRef} className="problems__grid">
          {problemsData.map(({ id, icon, tone, related, to }, i) => (
            <div
              key={id}
              className={`problems__item${gridVisible ? ` animate-in animate-in--delay-${Math.min(i + 1, 5)}` : ''}`}
              style={{ opacity: gridVisible ? undefined : 0 }}
            >
              <article className={`problems__card tone-${tone}`}>
                <div className="problems__icon">
                  <Icon name={icon} size={22} />
                </div>
                <h3 className="problems__title">{problems.items[id].title}</h3>
                <p className="problems__desc">{problems.items[id].desc}</p>
                <Link to={to} className="problems__related">
                  {problems.related[related]} <span aria-hidden="true">→</span>
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
