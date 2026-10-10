import { getSupabase } from './supabaseClient'
import { resolveLeadsMode } from './leadsMode'

/** 'live' guarda en Supabase; 'test' simula el envío (ver leadsMode.js) */
export const leadsMode = resolveLeadsMode({
  prod: import.meta.env.PROD,
  vercelEnv: import.meta.env.VERCEL_ENV,
  override: import.meta.env.VITE_LEADS_MODE,
})

export const leadsAreLive = leadsMode === 'live'

/**
 * Guarda un lead en la tabla `leads`. En modo 'test' no se envía nada.
 * No lanza excepciones: devuelve { error, simulated }.
 */
export async function saveLead(payload) {
  if (!leadsAreLive) return { error: null, simulated: true }
  try {
    const supabase = await getSupabase()
    const { error } = await supabase.from('leads').insert([payload])
    return { error, simulated: false }
  } catch (error) {
    return { error, simulated: false }
  }
}
