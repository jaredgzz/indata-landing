import './Stats.css'

// Stats are defined here directly since this component owns their display.
// The canonical values match statsData in lib/data.js but include a 4th entry
// (Especialidades) that only appears in this strip, not in the About section.
const items = [
  { value: '+30', label: 'Proyectos' },
  { value: '+10', label: 'Empresas' },
  { value: '+5',  label: 'Años' },
  { value: '4',   label: 'Especialidades' },
]

export default function Stats() {
  return (
    <div className="stats" aria-label="Estadísticas de InDatA">
      <div className="stats__grid">
        {items.map(item => (
          <div key={item.label} className="stats__item">
            <div className="stats__value">{item.value}</div>
            <div className="stats__label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
