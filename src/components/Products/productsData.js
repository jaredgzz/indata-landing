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

/**
 * Capturas del MVP de Gova (repo GovaCRM, base de ejemplo "Servicios del Centro").
 * Texto alternativo y etiqueta: content.products.gova.screens[id].
 */
export const govaScreens = {
  inicio:     { src: '/products/gova-inicio.webp',     width: 1440, height: 900 },
  catalogo:   { src: '/products/gova-catalogo.webp',   width: 1440, height: 900 },
  cotizacion: { src: '/products/gova-cotizacion.webp', width: 1440, height: 900 },
  documento:  { src: '/products/gova-documento.webp',  width: 1112, height: 1594 },
  ventas:     { src: '/products/gova-ventas.webp',     width: 1440, height: 900 },
}

/** Pasos del recorrido "Gova, paso a paso": cada uno muestra su captura */
export const govaTour = ['catalogo', 'cotizacion', 'documento', 'inicio']
