let clientPromise = null

/**
 * Cliente de Supabase creado solo cuando se necesita: la librería se carga
 * bajo demanda y un sitio sin variables de Supabase (p. ej. una vista previa)
 * no falla al cargar.
 */
export function getSupabase() {
  clientPromise ??= import('@supabase/supabase-js')
    .then(({ createClient }) => createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
    ))
    .catch((error) => {
      clientPromise = null
      throw error
    })
  return clientPromise
}
