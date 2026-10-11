/**
 * Decide si los formularios guardan leads de verdad ('live') o solo simulan
 * el envío ('test'). Falla cerrado: solo un build autorizado guarda leads;
 * Preview, local, `npm run dev` y cualquier entorno desconocido simulan.
 *
 * - `mode` = modo de Vite. Solo `vite build --mode live` (`npm run build:live`,
 *   usado únicamente por el deploy de producción en Cloudflare) guarda.
 * - `vercelEnv` = VERCEL_ENV, solo si el build corre en Vercel. Compatibilidad
 *   temporal mientras Vercel siga publicando: Production guarda.
 * - `override` (VITE_LEADS_MODE): solo 'test' cuenta, para forzar la simulación.
 *   'live' se ignora: ninguna variable puede habilitar los envíos reales.
 *
 * Es un control de despliegue, no de seguridad: la clave anon es pública y la
 * protección de la tabla `leads` depende de RLS en Supabase.
 */
export function resolveLeadsMode({ mode, vercelEnv, override }) {
  if (override === 'test') return 'test'
  if (mode === 'live') return 'live'
  if (vercelEnv === 'production') return 'live'
  return 'test'
}

/** Supabase falso de las E2E: un build live local solo puede apuntar aquí */
export const E2E_SUPABASE_URL = 'https://e2e-falso.supabase.co'

/**
 * Hace fallar `vite build --mode live` fuera de los dos casos autorizados:
 * - Workers Builds en la rama `main`, con las variables de Supabase definidas.
 * - E2E local (sin CI) contra el Supabase falso `E2E_SUPABASE_URL`.
 * `env` incluye process.env y los archivos .env del modo.
 */
export function assertLiveBuildAllowed({ mode, env }) {
  if (mode !== 'live') return
  const deny = reason => {
    throw new Error(`build:live no autorizado: ${reason}`)
  }
  const hasSupabase = Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY)

  if (env.WORKERS_CI === '1') {
    if (env.WORKERS_CI_BRANCH !== 'main') {
      deny(`en Workers Builds solo se permite en main (rama: ${env.WORKERS_CI_BRANCH || 'desconocida'})`)
    }
    if (!hasSupabase) deny('faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY')
    return
  }
  if (env.CI) deny('fuera de Workers Builds no se permite en CI')
  if (env.VITE_SUPABASE_URL !== E2E_SUPABASE_URL) {
    deny(`en local solo se permite contra el Supabase falso de las E2E (${E2E_SUPABASE_URL})`)
  }
  if (!hasSupabase) deny('falta VITE_SUPABASE_ANON_KEY')
}
