import { content } from '../../content'
import './StatusBadge.css'

/**
 * Etiqueta de estado de un producto o funcionalidad.
 * status: mvp | development | available | planned | vision | initiative
 */
export default function StatusBadge({ status, className = '' }) {
  return (
    <span className={`status-badge status-badge--${status}${className ? ` ${className}` : ''}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {content.common.status[status]}
    </span>
  )
}
