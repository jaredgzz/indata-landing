import './TeamSection.css'

const profiles = [
  {
    initials: 'DG',
    name: 'David González',
    role: 'Founder & Technical Data Leader',
    company: 'InDatA',
    bio: 'Especialista en arquitectura de datos e IA generativa. Proyectos en Azure, Databricks y MS Fabric.',
  },
  {
    initials: 'JM',
    name: 'Jair Martínez',
    role: 'IA Engineer',
    company: 'InDatA',
    bio: 'Especialista en desarrollo de agentes inteligentes y automatización avanzada con LangChain y LangGraph.',
  },
]

function ProfileCard({ initials, name, role, company, bio }) {
  return (
    <div className="profile-card">
      <div className="profile-card__avatar">{initials}</div>
      <div className="profile-card__info">
        <p className="profile-card__name">{name}</p>
        <p className="profile-card__role">{role}</p>
        <p className="profile-card__company">{company}</p>
        <p className="profile-card__bio">{bio}</p>
      </div>
    </div>
  )
}

function CodeEditor() {
  return (
    <div className="code-editor">
      <div className="code-editor__bar">
        <span className="code-editor__dot code-editor__dot--red" />
        <span className="code-editor__dot code-editor__dot--yellow" />
        <span className="code-editor__dot code-editor__dot--green" />
        <span className="code-editor__filename">indata_agent.py</span>
      </div>

      <div className="code-editor__body">
        <pre className="code-editor__pre">
          <code>
            <span className="code-kw">from</span>{' '}
            <span className="code-mod">langchain_openai</span>{' '}
            <span className="code-kw">import</span>{' '}
            <span className="code-cls">ChatOpenAI</span>{'\n'}
            <span className="code-kw">from</span>{' '}
            <span className="code-mod">langgraph.graph</span>{' '}
            <span className="code-kw">import</span>{' '}
            <span className="code-cls">StateGraph</span>{'\n'}
            {'\n'}
            <span className="code-cmnt"># InDatA Agent Core</span>{'\n'}
            <span className="code-var">builder</span>
            <span className="code-punc"> = </span>
            <span className="code-cls">StateGraph</span>
            <span className="code-punc">(</span>
            <span className="code-cls">AgentState</span>
            <span className="code-punc">)</span>{'\n'}
            <span className="code-var">builder</span>
            <span className="code-fn">.add_node</span>
            <span className="code-punc">(</span>
            <span className="code-str">"engineer"</span>
            <span className="code-punc">, </span>
            <span className="code-var">ai_engineer_node</span>
            <span className="code-punc">)</span>{'\n'}
            <span className="code-var">builder</span>
            <span className="code-fn">.set_entry_point</span>
            <span className="code-punc">(</span>
            <span className="code-str">"engineer"</span>
            <span className="code-punc">)</span>{'\n'}
            {'\n'}
            <span className="code-var">graph</span>
            <span className="code-punc"> = </span>
            <span className="code-var">builder</span>
            <span className="code-fn">.compile</span>
            <span className="code-punc">()</span>{'\n'}
            <span className="code-var">response</span>
            <span className="code-punc"> = </span>
            <span className="code-var">graph</span>
            <span className="code-fn">.invoke</span>
            <span className="code-punc">({'('}{'{'}</span>
            <span className="code-str">"task"</span>
            <span className="code-punc">: </span>
            <span className="code-str">"analyze_data"</span>
            <span className="code-punc">{'}'+')'}</span>{'\n'}
            {'\n'}
            <span className="code-kw">print</span>
            <span className="code-punc">(</span>
            <span className="code-str">"🚀 InDatA Pipeline: Deployed Successfully"</span>
            <span className="code-punc">)</span>
          </code>
        </pre>
      </div>

      <div className="code-editor__status">
        <span className="code-editor__status-icon">✓</span>
        <div>
          <p className="code-editor__status-label">BUILD STATUS</p>
          <p className="code-editor__status-text">InDatA Pipeline: Deployed Successfully</p>
        </div>
      </div>
    </div>
  )
}

export default function TeamSection() {
  return (
    <section id="sobre" className="team-section">
      <div className="team-section__inner">

        <div className="team-section__left">
          <div className="team-section__eyebrow">LIDERAZGO TÉCNICO</div>
          <h2 className="team-section__title">
            Aprende de expertos<br />en producción
          </h2>
          <p className="team-section__subtitle">
            Nuestro equipo está formado por ingenieros activos en la industria,
            con experiencia real desplegando soluciones de IA y datos en producción.
          </p>

          <div className="team-section__profiles">
            {profiles.map(p => (
              <ProfileCard key={p.initials} {...p} />
            ))}
          </div>
        </div>

        <div className="team-section__right">
          <CodeEditor />
        </div>

      </div>
    </section>
  )
}
