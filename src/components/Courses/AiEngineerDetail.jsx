import { useState } from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import CourseLeadModal from './CourseLeadModal'
import './AiEngineerDetail.css'

const TOOLS = ['Python', 'OpenAI', 'LangChain', 'LangGraph', 'LlamaIndex', 'CrewAI', 'n8n', 'LangFuse', 'GCP', 'Docker']

const OBJECTIVES = [
  {
    number: '01',
    text: 'Dominar los fundamentos de LLMs y la arquitectura Transformer (self-attention, embeddings, tokenizacion) y los modelos fundacionales: GPT, Gemini, Claude, LLaMA, Mistral.',
  },
  {
    number: '02',
    text: 'Disenar arquitecturas RAG con LlamaIndex, vector databases y tecnicas de retrieval avanzadas para sistemas de IA con contexto empresarial.',
  },
  {
    number: '03',
    text: 'Construir sistemas multiagente con CrewAI y LangGraph, orquestando agentes especializados con memoria, herramientas y logica ReAct.',
  },
  {
    number: '04',
    text: 'Desplegar soluciones de IA en produccion con monitoreo (LangFuse), seguridad, automatizacion low-code (n8n) e infraestructura cloud (GCP).',
  },
]

const MODULES = [
  {
    badge: 'Modulo 01',
    title: 'Fundamentos de IA y Modelos de Lenguaje',
    items: [
      'Conceptos clave de ML & Deep Learning',
      'Arquitectura Transformer y self-attention',
      'GPT, Gemini, Claude, LLaMA, Mistral',
    ],
  },
  {
    badge: 'Modulo 02',
    title: 'Arquitectura LLM y LLMOps',
    items: [
      'Diseno de soluciones con LLMs',
      'Patrones de integracion empresarial',
      'Fundamentos de LLMOps',
    ],
  },
  {
    badge: 'Modulo 03',
    title: 'Data Management & Vector Databases',
    items: [
      'Gestion de datos para IA',
      'Bases vectoriales y embeddings',
      'Tecnicas de indexacion y busqueda',
    ],
  },
  {
    badge: 'Modulo 04',
    title: 'LlamaIndex & RAG',
    items: [
      'Retrieval Augmented Generation',
      'LlamaCloud y orquestacion',
      'RAG avanzado y multimodal',
    ],
  },
  {
    badge: 'Modulo 05',
    title: 'CrewAI · Agentic Framework',
    items: [
      'Agentes especializados con CrewAI',
      'Orquestacion multiagente',
      'Tools, tareas y delegacion',
    ],
  },
  {
    badge: 'Modulo 06',
    title: 'Agentic Low-Code con n8n (RAG)',
    items: [
      'Automatizacion visual con n8n',
      'Workflows con RAG integrado',
      'Conexion a APIs y webhooks',
    ],
  },
  {
    badge: 'Modulo 07',
    title: 'LLM Monitoring & Security con LangFuse',
    items: [
      'Tracing y observabilidad de LLMs',
      'Evaluacion y prompt analytics',
      'Seguridad y gobernanza',
    ],
  },
  {
    badge: 'Modulo 08',
    title: 'Taller · Agente IA de Voz en Real Time',
    items: [
      'Speech-to-text y text-to-speech',
      'Latencia y streaming en vivo',
      'Despliegue de agente conversacional',
    ],
  },
  {
    badge: 'Modulo 09',
    title: 'Proyecto Integrador End-to-End',
    items: [
      'Solucion IA completa con casos reales',
      'Arquitectura, codigo y despliegue',
      'Portafolio profesional listo',
    ],
  },
]

const VALUE_PROPS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Fortalecimiento',
    desc: 'de habilidades clave en IA y automatizacion',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: 'Aprendizaje Progresivo',
    desc: 'paso a paso con feedback constante',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Learning by Doing',
    desc: 'formacion 100% practica',
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

export default function AiEngineerDetail() {
  const [showForm, setShowForm] = useState(false)

  return (
    <main className="ai-engineer-detail">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="ai-engineer-detail__hero">
        <div className="ai-engineer-detail__hero-inner">
          <span className="ai-engineer-detail__badge">Bootcamp Ruta Certificada</span>

          <h1 className="ai-engineer-detail__title">
            AI Engineer Bootcamp Certificado
          </h1>

          <div className="ai-engineer-detail__stats">
            <span className="ai-engineer-detail__stat-pill">6 Semanas</span>
            <span className="ai-engineer-detail__stat-pill">105 Horas Academicas</span>
            <span className="ai-engineer-detail__stat-pill">Certificado Oficial</span>
          </div>

          <p className="ai-engineer-detail__subtitle">
            Conviertete en AI Engineer de elite. Domina Python, OpenAI, LangChain y LangGraph.
            Crea sistemas multiagente avanzados, despliega en la nube y automatiza con n8n.
            Lidera la revolucion de la inteligencia artificial conversacional.
          </p>

          <div className="ai-engineer-detail__tools">
            {TOOLS.map((tool) => (
              <span key={tool} className="ai-engineer-detail__tool-pill">{tool}</span>
            ))}
          </div>

          <button
            className="ai-engineer-detail__cta-btn"
            onClick={() => setShowForm(true)}
          >
            <DownloadIcon />
            Descargar Programa Completo (PDF)
          </button>
        </div>
      </section>

      {/* ── Objectives ────────────────────────────────────────────────────── */}
      <section className="ai-engineer-detail__section">
        <div className="ai-engineer-detail__section-inner">
          <SectionHeader
            eyebrow="OBJETIVOS"
            title="Lo que vas a dominar"
            accentColor="var(--color-blue)"
          />
          <div className="ai-engineer-detail__objectives-grid">
            {OBJECTIVES.map(({ number, text }) => (
              <div key={number} className="objective-card">
                <div className="objective-card__number">{number}</div>
                <p className="objective-card__text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modules ───────────────────────────────────────────────────────── */}
      <section className="ai-engineer-detail__section ai-engineer-detail__section--alt">
        <div className="ai-engineer-detail__section-inner">
          <SectionHeader
            eyebrow="PROGRAMA"
            title="Ruta de Aprendizaje"
            accentColor="var(--color-purple)"
          />
          <div className="ai-engineer-detail__modules-grid">
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

      {/* ── Instructor ────────────────────────────────────────────────────── */}
      <section className="ai-engineer-detail__section">
        <div className="ai-engineer-detail__section-inner">
          <SectionHeader
            eyebrow="INSTRUCTOR"
            title="Tu Instructor"
            accentColor="var(--color-teal)"
          />
          <div className="ai-engineer-detail__instructor-card">
            <div className="instructor-avatar" aria-hidden="true">DG</div>
            <div className="instructor-info">
              <p className="instructor-info__name">David Gonzalez</p>
              <p className="instructor-info__role">Technical Data Leader · InDatA</p>
              <p className="instructor-info__bio">
                Especialista en Inteligencia Artificial y diseno de soluciones de datos en la nube.
                Lidera proyectos de integracion, transformacion y analisis en Azure, Databricks y MS Fabric.
                Junto a un equipo de docentes con experiencia en consultorias de IA generativa,
                te acompanara a lo largo del programa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Value Props ───────────────────────────────────────────────────── */}
      <section className="ai-engineer-detail__section ai-engineer-detail__section--alt">
        <div className="ai-engineer-detail__section-inner">
          <SectionHeader
            eyebrow="METODOLOGIA"
            title="Propuesta de Aprendizaje"
            accentColor="var(--color-blue)"
          />
          <div className="ai-engineer-detail__value-props">
            {VALUE_PROPS.map(({ icon, title, desc }) => (
              <div key={title} className="value-prop-card">
                <div className="value-prop-card__icon">{icon}</div>
                <h3 className="value-prop-card__title">{title}</h3>
                <p className="value-prop-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="ai-engineer-detail__final-cta">
        <div className="ai-engineer-detail__final-cta-inner">
          <h2>¿Listo para convertirte en AI Engineer?</h2>
          <button
            className="ai-engineer-detail__cta-btn"
            onClick={() => setShowForm(true)}
          >
            <DownloadIcon />
            Descargar Programa Completo (PDF)
          </button>
          <p className="ai-engineer-detail__final-cta-note">
            6 semanas · 105 horas · Certificado oficial
          </p>
        </div>
      </section>

      <CourseLeadModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        courseName="AI Engineer Bootcamp"
        tag="interesado_ai_engineer"
        pdfPath="/docs/ai-engineer-bootcamp.pdf"
        pdfFileName="Programa-AI-Engineer-InDatA.pdf"
      />

    </main>
  )
}
