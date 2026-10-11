/**
 * Productos de InDaxion. Solo ids, rutas y estado;
 * los textos viven en content.products[id].
 *
 * status:     estado del producto hoy (ver StatusBadge)
 * nextStatus: estado de lo que viene (próxima evolución / visión)
 */
export const productsData = [
  { id: 'gova', path: '/productos/gova', status: 'mvp',         nextStatus: 'planned' },
  { id: 'miga', path: '/productos/miga', status: 'development', nextStatus: 'vision' },
]

export const getProduct = (id) => productsData.find(product => product.id === id)

// Captura con doble densidad: `src` (1x) y `src2x` (2x); width/height son los de la 1x
const shot = (file, width, height) => ({
  src: `/products/${file}.webp`,
  src2x: `/products/${file}@2x.webp`,
  width,
  height,
})

/**
 * Capturas del MVP de Gova (repo GovaCRM, base de ejemplo "Servicios del Centro"),
 * tomadas a 1240×820 con doble densidad (la 2x, sin pérdida).
 * Texto alternativo y etiqueta: content.products.gova.screens[id].
 */
const screen = (id, width = 1240, height = 820) => shot(`gova-${id}`, width, height)

export const govaScreens = {
  inicio:     screen('inicio'),
  catalogo:   screen('catalogo'),
  cotizacion: screen('cotizacion'),
  documento:  screen('documento', 456, 817),
  ventas:     screen('ventas'),
}

/**
 * Captura de cada producto que no tiene recorrido. Miga: primera versión local
 * (repo 9_AppMarketing, /reel) con almacenamiento temporal y el negocio ficticio
 * Café Aurora, a 1000 px de ancho. Texto: content.products[id].screenAlt.
 */
export const productShots = {
  miga: shot('miga-reel', 1000, 1105),
}

/** srcSet para que cada pantalla descargue la densidad que necesita */
export const screenSrcSet = shot => `${shot.src} 1x, ${shot.src2x} 2x`

/** Pasos del recorrido "Gova, paso a paso": cada uno muestra su captura */
export const govaTour = ['catalogo', 'cotizacion', 'documento', 'inicio']
