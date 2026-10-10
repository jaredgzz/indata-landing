/**
 * Productos de InDaxion. Solo ids, rutas, estado y tono;
 * los textos viven en content.products[id].
 *
 * status:     estado del producto hoy (ver StatusBadge)
 * nextStatus: estado de lo que viene (próxima evolución / visión)
 */
export const productsData = [
  {
    id: 'gova', path: '/productos/gova', status: 'mvp', nextStatus: 'planned', tone: 'cyan',
    // Captura del MVP (repo GovaCRM, docs/qa/indaxion-desktop.png) con datos de ejemplo
    screenshot: { src: '/products/gova-panel.png', width: 1440, height: 900 },
  },
  { id: 'miga', path: '/productos/miga', status: 'development', nextStatus: 'vision',  tone: 'violet' },
]

export const getProduct = (id) => productsData.find(product => product.id === id)
