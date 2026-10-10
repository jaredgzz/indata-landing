/**
 * Opciones de "¿Qué necesitas?" del formulario de contacto.
 *
 * `value` es lo que se guarda en `leads.service`: es canónico y NO se traduce,
 * para que los leads sigan siendo comparables sin importar el idioma del sitio.
 * Donde el significado coincide se conservan los valores que ya se guardaban.
 * La etiqueta visible vive en content.contact.options[id].
 */
export const leadInterests = [
  { id: 'gova',           value: 'Gova' },
  { id: 'miga',           value: 'Miga' },
  { id: 'automatizacion', value: 'Automatización de Procesos' },
  { id: 'software',       value: 'Desarrollo de Software' },
  { id: 'ia',             value: 'Inteligencia Artificial' },
  { id: 'datos',          value: 'Datos e Integraciones' },
  { id: 'open',           value: 'InDaxion Open / Cursos' },
  { id: 'otro',           value: 'Otro' },
]

export const isLeadInterest = (id) => leadInterests.some(option => option.id === id)

export const leadInterestValue = (id) =>
  leadInterests.find(option => option.id === id)?.value ?? null
