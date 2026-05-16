export const servicesData = [
  {
    title: 'Inteligencia Artificial',
    desc: 'Implementación de modelos de IA que generan decisiones más rápidas y rentables para tu empresa.',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.12)',
    iconStroke: '#2563EB',
    iconPath: 'ai',
  },
  {
    title: 'Ingeniería de Datos',
    desc: 'Pipelines robustos, arquitecturas escalables y warehouses para centralizar y explotar tus datos.',
    color: '#00D1B2',
    bg: 'rgba(0,209,178,0.10)',
    iconStroke: '#00D1B2',
    iconPath: 'db',
  },
  {
    title: 'Automatización de Procesos',
    desc: 'Elimina tareas manuales y repetitivas. Automatiza flujos de trabajo y libera capacidad operativa.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.12)',
    iconStroke: '#7C3AED',
    iconPath: 'auto',
  },
  {
    title: 'Dashboards y BI',
    desc: 'Crea dashboards interactivos con Power BI, Tableau y herramientas cloud para decisiones en tiempo real.',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.12)',
    iconStroke: '#2563EB',
    iconPath: 'bi',
  },
  {
    title: 'Desarrollo de Software',
    desc: 'Aplicaciones web y herramientas internas a medida. Soluciones tecnológicas que escalan con tu negocio.',
    color: '#00D1B2',
    bg: 'rgba(0,209,178,0.10)',
    iconStroke: '#00D1B2',
    iconPath: 'code',
  },
  {
    title: 'Agentes IA Empresariales',
    desc: 'Crea agentes inteligentes que integran LLMs en tus procesos, atención al cliente y toma de decisiones.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.12)',
    iconStroke: '#7C3AED',
    iconPath: 'agent',
  },
]

const iconPaths = {
  ai: (
    <>
      <path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6.5-6 7.4V20h-2v-3.6C7.5 15.5 5 12.5 5 9a7 7 0 0 1 7-7z" />
      <path d="M9 21h6" />
    </>
  ),
  db: (
    <>
      <ellipse cx={12} cy={5} rx={9} ry={3} />
      <path d="M3 5v4c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 9v4c0 1.66 4 3 9 3s9-1.34 9-3V9" />
      <path d="M3 13v4c0 1.66 4 3 9 3s9-1.34 9-3v-4" />
    </>
  ),
  auto: (
    <>
      <rect x={2} y={3} width={6} height={6} rx={1} />
      <rect x={16} y={3} width={6} height={6} rx={1} />
      <rect x={9} y={15} width={6} height={6} rx={1} />
      <path d="M5 9v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
      <line x1={12} y1={13} x2={12} y2={15} />
    </>
  ),
  bi: (
    <>
      <rect x={3} y={3} width={18} height={14} rx={2} />
      <path d="M8 21h8M12 17v4" />
      <polyline points="7,11 10,8 13,11 17,7" />
    </>
  ),
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  agent: (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
}

export function ServiceIcon({ stroke, path }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[path]}
    </svg>
  )
}
