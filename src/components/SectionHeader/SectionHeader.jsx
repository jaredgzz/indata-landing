import './SectionHeader.css'

/**
 * Shared section header: eyebrow label + H2 + optional subtitle.
 * Replaces the duplicated header pattern across Services, Courses, Projects,
 * ContactCTA, and About sections.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  accentColor = 'var(--color-blue)',
  className = '',
}) {
  return (
    <div className={`section-header section-header--${align}${className ? ` ${className}` : ''}`}>
      <div
        className="section-header__eyebrow"
        style={{ color: accentColor }}
      >
        {eyebrow}
      </div>
      <h2 className="section-header__title">{title}</h2>
      {subtitle && (
        <p className="section-header__subtitle">{subtitle}</p>
      )}
    </div>
  )
}
