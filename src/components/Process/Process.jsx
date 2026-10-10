import { useAnimateIn } from '../../hooks/useAnimateIn'
import SectionHeader from '../SectionHeader/SectionHeader'
import Icon from '../Icon/Icon'
import { content } from '../../content'
import './Process.css'

const copy = content.process

export default function Process() {
  const [headerRef, headerVisible] = useAnimateIn()
  const [stepsRef, stepsVisible] = useAnimateIn()

  return (
    <section id="como-trabajamos" className="process">
      <div className="process__inner">
        <div
          ref={headerRef}
          className={`process__header${headerVisible ? ' animate-in' : ''}`}
        >
          <SectionHeader
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.subtitle}
            accentColor="var(--color-cyan)"
          />
        </div>

        <ol ref={stepsRef} className="process__steps">
          {copy.steps.map((step, i) => (
            <li
              key={step.title}
              className={`process__step${stepsVisible ? ` animate-in animate-in--delay-${i + 1}` : ''}`}
              style={{ opacity: stepsVisible ? undefined : 0 }}
            >
              <span className="process__number" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__desc">{step.desc}</p>
            </li>
          ))}
        </ol>

        <p className="process__note">
          <Icon name="check" size={18} strokeWidth={2.25} className="process__note-icon" />
          <span>{copy.note}</span>
        </p>
      </div>
    </section>
  )
}
