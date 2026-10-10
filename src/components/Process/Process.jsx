import { useAnimateIn } from '../../hooks/useAnimateIn'
import SectionHeader from '../SectionHeader/SectionHeader'
import { content } from '../../content'
import './Process.css'

const copy = content.process

export default function Process() {
  const [ref, visible] = useAnimateIn()

  return (
    <section id="como-trabajamos" className="process">
      <div ref={ref} className={`process__inner${visible ? ' animate-in' : ''}`}>
        <SectionHeader title={copy.title} subtitle={copy.subtitle} />
        <ol className="process__steps">
          {copy.steps.map((step, i) => (
            <li key={step.title} className="process__step">
              <span className="process__number">{i + 1}</span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__desc">{step.desc}</p>
            </li>
          ))}
        </ol>
        <p className="process__note">{copy.note}</p>
      </div>
    </section>
  )
}
