import { Link } from 'react-router-dom'
import { useAnimateIn } from '../../hooks/useAnimateIn'
import SectionHeader from '../SectionHeader/SectionHeader'
import { problemsData } from './problemsData'
import { content } from '../../content'
import './Problems.css'

const { problems } = content

export default function Problems() {
  const [ref, visible] = useAnimateIn()

  return (
    <section id="problemas" className="problems">
      <div ref={ref} className={`problems__inner${visible ? ' animate-in' : ''}`}>
        <SectionHeader
          title={problems.title}
          subtitle={problems.subtitle}
          className="problems__header"
        />
        <ol className="problems__list">
          {problemsData.map(({ id, related, to }) => (
            <li key={id} className="problems__item">
              <h3 className="problems__title">{problems.items[id].title}</h3>
              <p className="problems__desc">{problems.items[id].desc}</p>
              <Link to={to} className="text-link problems__related">
                {problems.related[related]} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
