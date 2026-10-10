import './SectionHeader.css'

/**
 * Encabezado de sección compartido: título H2, subtítulo y una etiqueta
 * opcional encima. Alineado a la izquierda salvo que se pida centrado.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  return (
    <div className={`section-header section-header--${align}${className ? ` ${className}` : ''}`}>
      {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
      <h2 className="section-header__title">{title}</h2>
      {subtitle && (
        <p className="section-header__subtitle">{subtitle}</p>
      )}
    </div>
  )
}
