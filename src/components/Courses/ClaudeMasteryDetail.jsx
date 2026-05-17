import { useState } from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import CourseLeadModal from './CourseLeadModal'
import './ClaudeMasteryDetail.css'

const TOOLS = [
  'Claude 3.5 Sonnet/Opus',
  'Claude Code CLI',
  'Anthropic Labs',
  'MCP',
  'LangGraph',
  'Python',
  'Docker',
]

const OBJECTIVES = [
  {
    number: '01',
    title: 'Ingeniería de Prototipado',
    text: 'Usar Claude Design en Anthropic Labs para pasar de una idea a una aplicación React/Tailwind funcional en minutos, sin escribir código boilerplate.',
  },
  {
    number: '02',
    title: 'Desarrollo 10x con Claude Code',
    text: 'Dominar la nueva interfaz CLI para realizar cambios masivos en bases de código, debugging automático y generación de tests unitarios.',
  },
  {
    number: '03',
    title: 'Model Context Protocol (MCP)',
    text: 'Implementar el estándar abierto de Anthropic para conectar Claude con bases de datos SQL, Google Drive, Slack y APIs locales de forma segura.',
  },
  {
    number: '04',
    title: 'Agentes y Computer Use',
    text: 'Configurar agentes que "ven" la pantalla y operan teclado/mouse para automatizar tareas repetitivas en cualquier software empresarial.',
  },
]

const MODULES = [
  {
    badge: 'Módulo 01',
    title: 'The Anthropic Advantage',
    items: [
      'Arquitectura interna de Claude 3.5 Sonnet y Opus',
      'Ventanas de contexto extendidas (200k tokens)',
      'Por qué Claude lidera en razonamiento y código',
      'Pricing, latencia y selección de modelo',
    ],
  },
  {
    badge: 'Módulo 02',
    title: 'Claude Design & Artifacts',
    items: [
      'Dominio de Anthropic Labs para prototipado rápido',
      'Generación de UIs React/Tailwind funcionales',
      'Gestión de Artifacts para dashboards internos',
      'Patrones de iteración y refinamiento visual',
    ],
  },
  {
    badge: 'Módulo 03',
    title: 'Claude Code CLI',
    items: [
      'Instalación y configuración experta de la terminal',
      'Refactorización de código a gran escala',
      'Debugging automático y generación de tests',
      'Integración con tu flujo de trabajo Git',
    ],
  },
  {
    badge: 'Módulo 04',
    title: 'Model Context Protocol (MCP)',
    items: [
      'Núcleo de la IA empresarial con Claude',
      'Configuración de servidores MCP locales',
      'Conexión con SQL, Slack, Drive y APIs internas',
      'Seguridad y control del flujo de datos',
    ],
  },
  {
    badge: 'Módulo 05',
    title: 'Computer Use & Autonomous Agents',
    items: [
      'Agentes que "ven" la pantalla y operan periféricos',
      'Configuración de flujos con LangGraph',
      'Patrones de supervisión Human-in-the-loop',
      'Manejo de errores y rollback automático',
    ],
  },
  {
    badge: 'Módulo 06',
    title: 'Proyecto Final — Enterprise Agent',
    items: [
      'Agente que lee tickets de Jira y mensajes de Slack',
      'Consulta BD empresarial vía MCP de forma segura',
      'Propone y ejecuta cambios de código vía Claude Code',
      'Despliegue con Docker y monitoreo en producción',
    ],
  },
]

const INSTRUCTORS = [
  {
    avatarKey: 'dg',
    initials: 'DG',
    name: 'David González',
    role: 'Co-Instructor Principal · Technical Data Leader · InDatA',
    tags: ['DATA STRATEGY', 'RAG', 'ENTERPRISE AI'],
    bio: 'Experto en estrategia de datos e implementación de IA generativa a nivel corporativo. Lidera la adopción de Claude en equipos de ingeniería y datos, diseñando arquitecturas seguras de RAG, agentes y automatización empresarial.',
  },
  {
    avatarKey: 'jm',
    initials: 'JM',
    name: 'Jair Martínez',
    role: 'Co-Instructor Principal · AI Engineer · InDatA',
    tags: ['AI AGENTS', 'MCP', 'COMPUTER USE'],
    bio: 'Especialista en arquitectura de agentes, automatización avanzada y despliegue de modelos de lenguaje en producción. Construye soluciones de Claude Code, MCP y Computer Use para clientes de LATAM y EE.UU.',
  },
]

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1v9M4.5 6.5 8 10l3.5-3.5M2 13h12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ClaudeMasteryDetail() {
  const [showForm, setShowForm] = useState(false)

  return (
    <main className="claude-mastery-detail">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="claude-mastery-detail__hero">
        <div className="claude-mastery-detail__hero-inner">
          <span className="claude-mastery-detail__badge">Online Asincrónico</span>

          <h1 className="claude-mastery-detail__title">
            Mastering Claude: Design, Code & Enterprise Agents
          </h1>

          <div className="claude-mastery-detail__stats">
            <span className="claude-mastery-detail__stat-pill">15 Horas</span>
            <span className="claude-mastery-detail__stat-pill">6 Módulos</span>
            <span className="claude-mastery-detail__stat-pill">Certificado Oficial</span>
          </div>

          <p className="claude-mastery-detail__subtitle">
            Domina el ecosistema más avanzado de IA generativa. Aprende a prototipar con Anthropic Labs,
            programar con Claude Code y construir agentes que operan sistemas empresariales mediante MCP y Computer Use.
          </p>

          <div className="claude-mastery-detail__tools">
            {TOOLS.map((tool) => (
              <span key={tool} className="claude-mastery-detail__tool-pill">{tool}</span>
            ))}
          </div>

          <button
            className="claude-mastery-detail__cta-btn"
            onClick={() => setShowForm(true)}
          >
            <DownloadIcon />
            Descargar Programa Completo (PDF)
          </button>
        </div>
      </section>

      {/* ── Objectives ────────────────────────────────────────────────────── */}
      <section className="claude-mastery-detail__section">
        <div className="claude-mastery-detail__section-inner">
          <SectionHeader
            eyebrow="OBJETIVOS"
            title="Lo que vas a dominar"
            accentColor="var(--color-blue)"
          />
          <div className="claude-mastery-detail__objectives-grid">
            {OBJECTIVES.map(({ number, title, text }) => (
              <div key={number} className="objective-card">
                <div className="objective-card__number">{number}</div>
                <p className="objective-card__title">{title}</p>
                <p className="objective-card__text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modules ───────────────────────────────────────────────────────── */}
      <section className="claude-mastery-detail__section claude-mastery-detail__section--alt">
        <div className="claude-mastery-detail__section-inner">
          <SectionHeader
            eyebrow="PROGRAMA"
            title="Ruta de Aprendizaje"
            accentColor="var(--color-purple)"
          />
          <div className="claude-mastery-detail__modules-grid">
            {MODULES.map(({ badge, title, items }) => (
              <div key={badge} className="module-card">
                <span className="module-card__badge">{badge}</span>
                <h3 className="module-card__title">{title}</h3>
                <ul className="module-card__list">
                  {items.map((item) => (
                    <li key={item} className="module-card__list-item">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instructors ───────────────────────────────────────────────────── */}
      <section className="claude-mastery-detail__section">
        <div className="claude-mastery-detail__section-inner">
          <SectionHeader
            eyebrow="INSTRUCTORES"
            title="Tu Equipo Docente"
            accentColor="var(--color-teal)"
          />
          <div className="claude-mastery-detail__instructors-grid">
            {INSTRUCTORS.map(({ avatarKey, initials, name, role, tags, bio }) => (
              <div key={name} className="instructor-card">
                <div className="instructor-card__header">
                  <div className={`instructor-card__avatar instructor-card__avatar--${avatarKey}`} aria-hidden="true">
                    {initials}
                  </div>
                  <div>
                    <p className="instructor-card__name">{name}</p>
                    <p className="instructor-card__role">{role}</p>
                  </div>
                </div>
                <div className="instructor-card__tags">
                  {tags.map((tag) => (
                    <span key={tag} className="instructor-card__tag">{tag}</span>
                  ))}
                </div>
                <p className="instructor-card__bio">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="claude-mastery-detail__final-cta">
        <div className="claude-mastery-detail__final-cta-inner">
          <h2>¿Listo para dominar el ecosistema Claude?</h2>
          <button
            className="claude-mastery-detail__cta-btn"
            onClick={() => setShowForm(true)}
          >
            <DownloadIcon />
            Descargar Programa Completo (PDF)
          </button>
          <p className="claude-mastery-detail__final-cta-note">
            15 horas · Online · Certificado incluido
          </p>
        </div>
      </section>

      <CourseLeadModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        courseName="Mastering Claude"
        tag="interesado_claude_mastery"
        pdfPath="/docs/claude-design-code.pdf"
        pdfFileName="Programa-Mastering-Claude-InDatA.pdf"
      />

    </main>
  )
}
