import { useAnimateIn } from '../../hooks/useAnimateIn'
import Icon from '../Icon/Icon'
import { content } from '../../content'
import './TeamSection.css'

const { about, brand } = content

// Los tres pilares de la marca; textos en content.about.pillars[id]
const pillars = [
  { id: 'inteligencia', icon: 'ai',  tone: 'cyan' },
  { id: 'datos',        icon: 'db',  tone: 'blue' },
  { id: 'accion',       icon: 'zap', tone: 'violet' },
]

function ProfileCard({ initials, name, role, bio }) {
  return (
    <div className="profile-card">
      <div className="profile-card__avatar" aria-hidden="true">{initials}</div>
      <div className="profile-card__info">
        <p className="profile-card__name">{name}</p>
        <p className="profile-card__role">{role}</p>
        <p className="profile-card__bio">{bio}</p>
      </div>
    </div>
  )
}

export default function TeamSection() {
  const [ref, visible] = useAnimateIn()

  return (
    <section id="nosotros" className="team-section">
      <div ref={ref} className={`team-section__inner${visible ? ' animate-in' : ''}`}>

        <div className="team-section__left">
          <div className="team-section__eyebrow">{about.eyebrow}</div>
          <h2 className="team-section__title">{about.title}</h2>
          {about.paragraphs.map(paragraph => (
            <p key={paragraph} className="team-section__text">{paragraph}</p>
          ))}
          <p className="team-section__stage">{about.stage}</p>

          <h3 className="team-section__team-title">{about.teamTitle}</h3>
          <div className="team-section__profiles">
            {about.team.map(person => (
              <ProfileCard key={person.initials} {...person} />
            ))}
          </div>
        </div>

        <div className="team-section__right">
          <div className="pillars">
            <div className="pillars__head">
              <p className="pillars__label">{about.pillarsLabel}</p>
            </div>
            <ul className="pillars__list">
              {pillars.map(({ id, icon, tone }) => (
                <li key={id} className={`pillars__item tone-${tone}`}>
                  <span className="pillars__icon">
                    <Icon name={icon} size={22} />
                  </span>
                  <span>
                    <span className="pillars__title">{about.pillars[id].title}</span>
                    <span className="pillars__desc">{about.pillars[id].desc}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="pillars__tagline">{brand.taglineEn}</p>
          </div>
        </div>

      </div>
    </section>
  )
}
