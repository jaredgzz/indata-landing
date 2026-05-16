import SectionHeader from '../SectionHeader/SectionHeader'
import './Technologies.css'

const techs = [
  'Python',
  'SQL',
  'Power BI',
  'Tableau',
  'Databricks',
  'Apache Spark',
  'Azure Synapse',
  'Azure Data Factory',
  'dbt',
  'Airflow',
  'FastAPI',
  'React',
  'OpenAI API',
  'LangChain',
  'Supabase',
]

export default function Technologies() {
  return (
    <section className="technologies">
      <div className="technologies__inner">
        <SectionHeader
          eyebrow="STACK TECNOLOGICO"
          title="Tecnologías que dominamos"
          accentColor="var(--color-purple)"
        />
        <div className="technologies__grid">
          {techs.map(tech => (
            <span key={tech} className="tech-chip">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
