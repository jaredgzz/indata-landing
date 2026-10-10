/**
 * Productos de InDaxion. Solo ids, rutas, estado y tono;
 * los textos viven en content.products[id].
 *
 * status:     estado del producto hoy (ver StatusBadge)
 * nextStatus: estado de lo que viene (próxima evolución / visión)
 */
export const productsData = [
  { id: 'gova', path: '/productos/gova', status: 'mvp',         nextStatus: 'planned', tone: 'cyan' },
  { id: 'miga', path: '/productos/miga', status: 'development', nextStatus: 'vision',  tone: 'violet' },
]

export const getProduct = (id) => productsData.find(product => product.id === id)
