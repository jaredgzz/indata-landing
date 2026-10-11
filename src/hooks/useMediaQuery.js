import { useCallback, useSyncExternalStore } from 'react'

/**
 * true mientras la pantalla cumpla la media query; se actualiza al cambiar
 * el tamaño de la ventana.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(onChange => {
    const media = window.matchMedia(query)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches)
}
