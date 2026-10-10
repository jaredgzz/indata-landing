import Icon from '../Icon/Icon'
import './ServiceCard.css'

export default function ServiceCard({ title, desc, icon, tone }) {
  return (
    <div className={`service-card tone-${tone}`}>
      <div className="service-card__icon">
        <Icon name={icon} />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{desc}</p>
    </div>
  )
}
