/**
 * Decide si los formularios guardan leads de verdad ('live') o solo simulan
 * el envío ('test'), para que las vistas previas y las pruebas locales nunca
 * escriban en la base de producción.
 *
 * - `override` (VITE_LEADS_MODE = 'live' | 'test') manda si está definido.
 *   Solo usar 'live' fuera de producción si apunta a una base de pruebas.
 * - En Vercel (`vercelEnv` = VERCEL_ENV) solo Production guarda;
 *   Preview y Development simulan.
 * - Fuera de Vercel, el build de producción guarda (las E2E simulan la red)
 *   y el servidor de desarrollo (`npm run dev`) simula.
 */
export function resolveLeadsMode({ prod, vercelEnv, override }) {
  if (override === 'live' || override === 'test') return override
  if (vercelEnv) return vercelEnv === 'production' ? 'live' : 'test'
  return prod ? 'live' : 'test'
}
