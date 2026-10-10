/**
 * Shared data constants used across multiple components.
 * Labels live in content (src/content) — here only ids and routes.
 */

/**
 * Navigation links — used in Nav.
 * Items with `to` are their own route; the rest are sections of the home (#id).
 * Label: content.nav.links[id].
 */
export const navItems = [
  { id: 'inicio' },
  { id: 'productos' },
  { id: 'soluciones' },
  { id: 'nosotros' },
  { id: 'open', to: '/open' },
  { id: 'contacto' },
]

/** Home sections observed to highlight the active Nav link */
export const homeSections = [
  'inicio',
  'problemas',
  'productos',
  'soluciones',
  'como-trabajamos',
  'nosotros',
  'open',
  'contacto',
]

/**
 * Old home anchors → their new location, so existing links keep working.
 */
export const legacyHashes = {
  '#servicios': '/#soluciones',
  '#proyectos': '/#productos',
  '#sobre':     '/#nosotros',
  '#cursos':    '/open#cursos',
}
