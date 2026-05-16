/**
 * Shared data constants used across multiple components.
 * Import from here instead of defining inline to avoid duplication.
 */

/**
 * Navigation links — used in Nav and Footer.
 * Nav uses `id` for scrollIntoView; Footer uses `href` anchors.
 * Both are provided so each component can pick what it needs.
 */
export const navLinks = [
  { label: 'Inicio',    id: 'inicio',    href: '#inicio' },
  { label: 'Servicios', id: 'servicios', href: '#servicios' },
  { label: 'Cursos',    id: 'cursos',    href: '#cursos' },
  { label: 'Proyectos', id: 'proyectos', href: '#proyectos' },
  { label: 'Sobre mí',  id: 'sobre',     href: '#sobre' },
  { label: 'Contacto',  id: 'contacto',  href: '#contacto' },
]

/**
 * Statistics shown in Hero and About sections.
 * Hero renders with icons; About renders value+label only.
 * The shared values here are the canonical source of truth.
 */
export const statsData = [
  { value: '+30', label: 'Proyectos Completados', sub: 'Completados' },
  { value: '+10', label: 'Empresas Acompañadas',  sub: 'Acompañadas' },
  { value: '+5',  label: 'Años de Experiencia',   sub: 'de Experiencia' },
]
