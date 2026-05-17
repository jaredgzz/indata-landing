import { useState } from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import LangflowLeadForm from './LangflowLeadForm'
import './LangflowDetail.css'

const TOOLS = ['LangFlow', 'Python', 'OpenAI API', 'Vector Stores', 'APIs externas', 'LangSmith', 'Docker']

const OBJECTIVES = [
  {
    number: '01',
    text: 'Dominar los fundamentos de LangFlow y el patrón ReAct para diseñar agentes conversacionales inteligentes mediante una interfaz visual de drag-and-drop.',
  },
  {
    number: '02',
    text: 'Crear componentes personalizados, integrar APIs externas y seleccionar los tipos de agentes adecuados según cada caso de uso empresarial.',
  },
  {
    number: '03',
    text: 'Implementar memoria conversacional y persistencia para gestionar contexto a largo plazo y optimizar el uso de tokens y costos.',
  },
  {
    number: '04',
    text: 'Desarrollar agentes avanzados mediante flujos visuales y workflows, configurando estrategias de monitoreo, logging y evaluación.',
  },
]

const SESSIONS = [
  {
    badge: 'Sesión 01',
    title: 'Fundamentos de LangFlow y Primer Agente ReAct',
    items: [
      'Comprender la arquitectura visual y componentes clave de LangFlow.',
      'Entender el patrón ReAct.',
      'Configurar el entorno y conectar modelos LLM (OpenAI, Anthropic, locales).',
      'Crear tu primer flujo visual con un agente ReAct funcional.',
    ],
  },
  {
    badge: 'Sesión 02',
    title: 'Componentes Personalizados y Tipos de Agentes',
    items: [
      'Crear componentes personalizados avanzados en LangFlow.',
      'Implementar diferentes tipos de agentes según el caso de uso.',
      'Integrar APIs externas y servicios web mediante nodos visuales.',
      'Optimizar la selección y conexión de herramientas en el flujo.',
    ],
  },
  {
    badge: 'Sesión 03',
    title: 'Memoria Conversacional y Persistencia',
    items: [
      'Implementar sistemas de memoria conversacional en LangFlow.',
      'Gestionar contexto a largo plazo con vector stores.',
      'Configurar persistencia de sesiones e historial de chat.',
      'Optimizar el uso de tokens.',
    ],
  },
  {
    badge: 'Sesión 04',
    title: 'Agentes Avanzados y Despliegue en Producción',
    items: [
      'Desarrollar agentes conversacionales complejos con multi-flujos.',
      'Implementar cadenas de agentes y workflows visuales avanzados.',
      'Configurar monitoring, logging y evaluación con LangSmith.',
      'Despliegue en producción con Docker.',
    ],
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

export default function LangflowDetail() {
  const [showForm, setShowForm] = useState(false)

  return (
    <main className="langflow-detail">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="langflow-detail__hero">
        <div className="langflow-detail__hero-inner">
          <span className="langflow-detail__badge">Online Asincrónico</span>

          <h1 className="langflow-detail__title">
            Creación de Agentes Inteligentes con LangFlow
          </h1>

          <div className="langflow-detail__stats">
            <span className="langflow-detail__stat-pill">11 Horas</span>
            <span className="langflow-detail__stat-pill">4 Sesiones</span>
            <span className="langflow-detail__stat-pill">Certificado incluido</span>
          </div>

          <p className="langflow-detail__subtitle">
            Crea agentes inteligentes con LangFlow. Aprende a diseñar flujos visuales,
            integrar herramientas, memoria y APIs para desplegar soluciones
            conversacionales listas para producción — sin escribir miles de líneas de código.
          </p>

          <div className="langflow-detail__tools">
            {TOOLS.map((tool) => (
              <span key={tool} className="langflow-detail__tool-pill">{tool}</span>
            ))}
          </div>

          <button
            className="langflow-detail__cta-btn"
            onClick={() => setShowForm(true)}
          >
            <DownloadIcon />
            Descargar Programa Completo (PDF)
          </button>
        </div>
      </section>

      {/* ── Objectives ────────────────────────────────────────────────────── */}
      <section className="langflow-detail__section">
        <div className="langflow-detail__section-inner">
          <SectionHeader
            eyebrow="OBJETIVOS"
            title="Lo que vas a dominar"
            accentColor="var(--color-blue)"
          />
          <div className="langflow-detail__objectives-grid">
            {OBJECTIVES.map(({ number, text }) => (
              <div key={number} className="objective-card">
                <div className="objective-card__number">{number}</div>
                <p className="objective-card__text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sessions ──────────────────────────────────────────────────────── */}
      <section className="langflow-detail__section langflow-detail__section--alt">
        <div className="langflow-detail__section-inner">
          <SectionHeader
            eyebrow="PROGRAMA"
            title="Ruta de Aprendizaje"
            accentColor="var(--color-purple)"
          />
          <div className="langflow-detail__sessions-grid">
            {SESSIONS.map(({ badge, title, items }) => (
              <div key={badge} className="session-card">
                <span className="session-card__badge">{badge}</span>
                <h3 className="session-card__title">{title}</h3>
                <ul className="session-card__list">
                  {items.map((item) => (
                    <li key={item} className="session-card__list-item">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instructor ────────────────────────────────────────────────────── */}
      <section className="langflow-detail__section">
        <div className="langflow-detail__section-inner">
          <SectionHeader
            eyebrow="INSTRUCTOR"
            title="Tu Instructor"
            accentColor="var(--color-teal)"
          />
          <div className="langflow-detail__instructor-card">
            <div className="instructor-avatar" aria-hidden="true">DG</div>
            <div className="instructor-info">
              <p className="instructor-info__name">David González</p>
              <p className="instructor-info__role">Fundador de InDatA · Consultor de Datos & IA</p>
              <p className="instructor-info__bio">
                Especialista en inteligencia de datos aplicada con más de 5 años desarrollando
                soluciones de IA para empresas en LATAM. Fundador de InDatA, donde lidera
                proyectos de analytics, automatización y agentes conversacionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="langflow-detail__final-cta">
        <div className="langflow-detail__final-cta-inner">
          <h2>¿Listo para construir tu primer agente?</h2>
          <button
            className="langflow-detail__cta-btn"
            onClick={() => setShowForm(true)}
          >
            <DownloadIcon />
            Descargar Programa Completo (PDF)
          </button>
          <p className="langflow-detail__final-cta-note">
            11 horas · Online · Certificado incluido
          </p>
        </div>
      </section>

      <LangflowLeadForm isOpen={showForm} onClose={() => setShowForm(false)} />

    </main>
  )
}
