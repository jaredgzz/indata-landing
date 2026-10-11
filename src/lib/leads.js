import { getSupabase } from './supabaseClient'

/** true solo en un build autorizado; lo decide vite.config.js (ver leadsMode.js) */
export const leadsAreLive = import.meta.env.LEADS_LIVE === true

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
