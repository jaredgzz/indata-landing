import es from './es'

/**
 * Copy activo del sitio. Hoy solo existe español.
 *
 * Para agregar inglés: crear `en.js` con la misma forma que `es.js` y elegir
 * aquí el objeto según el idioma (por ruta, p. ej. /en, o por preferencia).
 */
export const content = es

/** Reemplaza marcadores {clave} en un texto: format('© {year}', { year: 2026 }) */
export function format(text, values) {
  return text.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match))
}
