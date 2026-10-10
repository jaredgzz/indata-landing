import { useAnimateIn } from '../../hooks/useAnimateIn'
import { content } from '../../content'
import './About.css'

const { about } = content

// Las tres partes del nombre; textos en content.about.pillars[id]
const pillars = ['inteligencia', 'datos', 'accion']

export default function About() {
  const [ref, visible] = useAnimateIn()

  return (
    <section id="nosotros" className="about">
      <div ref={ref} className={`about__inner${visible ? ' animate-in' : ''}`}>
        <div className="about__intro">
          <h2 className="about__title">{about.title}</h2>
          <p className="about__stage">{about.stage}</p>
        </div>

        <div className="about__body">
          {about.paragraphs.map(paragraph => (
            <p key={paragraph} className="about__text">{paragraph}</p>
          ))}

          <div className="about__name">
            <p className="about__name-label">{about.pillarsLabel}</p>
            <dl className="about__pillars">
              {pillars.map(id => (
                <div key={id} className="about__pillar">
                  <dt>{about.pillars[id].title}</dt>
                  <dd>{about.pillars[id].desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
