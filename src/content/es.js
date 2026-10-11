/**
 * Textos comerciales de la landing — español (México).
 *
 * Todo el copy visible vive aquí, agrupado por sección. Los componentes solo
 * leen este objeto; los ids, colores, iconos y rutas viven en los archivos de
 * datos de cada componente (productsData, servicesData, etc.).
 *
 * Para agregar otro idioma, crear un archivo con la misma forma (p. ej. en.js)
 * y seleccionarlo en ./index.js.
 */
const es = {
  brand: {
    tagline: 'Inteligencia · Datos · Acción',
  },

  // Títulos de pestaña por ruta (ver App.jsx)
  pages: {
    home: 'InDaxion | Software e Inteligencia Artificial para Pymes',
    gova: 'Gova · Gestión comercial y cotización | InDaxion',
    miga: 'Miga · Contenido y video asistidos por IA | InDaxion',
    open: 'InDaxion Open · Educación abierta y comunidad | InDaxion',
    notFound: 'Página no encontrada | InDaxion',
  },

  common: {
    illustrationNote: 'Ilustración conceptual',
    screenshotsNote: 'Capturas del MVP de Gova · datos de ejemplo',
    status: {
      mvp: 'MVP en validación',
      development: 'En desarrollo',
      available: 'Disponible',
      planned: 'Próximamente',
      vision: 'Visión',
      initiative: 'Iniciativa en desarrollo',
    },
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'No encontramos esta página.',
    text: 'Es posible que el enlace haya cambiado o que la página ya no exista. Puedes volver al inicio o ver nuestros productos.',
    home: 'Volver al inicio',
    products: 'Ver productos',
  },

  nav: {
    links: {
      inicio: 'Inicio',
      soluciones: 'Soluciones',
      productos: 'Productos',
      nosotros: 'Nosotros',
      open: 'InDaxion Open',
      contacto: 'Contacto',
    },
    cta: 'Cuéntanos tu proyecto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    mainLabel: 'Navegación principal',
  },

  hero: {
    eyebrow: 'Software e inteligencia artificial para pymes',
    // Una frase por línea
    title: ['Tu negocio es único.', 'Tu software también puede serlo.'],
    description:
      'Somos InDaxion. Desarrollamos productos y soluciones a la medida para simplificar el trabajo de tu negocio.',
    primaryCta: 'Cuéntanos tu proyecto',
    secondaryCta: 'Ver productos',
    highlightsLabel: 'Lo que hacemos',
    highlights: {
      medida: 'Desarrollo a la medida',
      automatizacion: 'Automatización de procesos',
      ia: 'Inteligencia artificial',
      datos: 'Datos y reportes',
      integraciones: 'Integración de sistemas',
    },
  },

  problems: {
    title: 'Lo que vemos en las pymes',
    subtitle: 'Estos son los problemas que queremos resolver primero.',
    items: {
      cotizaciones: {
        title: 'Cada cotización se arma desde cero',
        desc: 'Se buscan precios en distintos archivos, se recalculan totales y se da formato al documento una y otra vez.',
      },
      informacion: {
        title: 'Precios y reglas en muchos lugares',
        desc: 'El catálogo vive en un Excel, las condiciones en un correo y los acuerdos en la memoria de alguien.',
      },
      contenido: {
        title: 'Hacer contenido toma demasiado',
        desc: 'Un video de un producto requiere tiempo, herramientas y práctica que no siempre hay.',
      },
      repetitivos: {
        title: 'Tareas que se repiten cada semana',
        desc: 'Capturar, copiar y dar seguimiento a mano a lo mismo de siempre.',
      },
      herramientas: {
        title: 'Software pensado para empresas grandes',
        desc: 'Sistemas caros o complicados para lo que una empresa pequeña necesita.',
      },
    },
    related: {
      gova: 'Ver Gova',
      miga: 'Ver Miga',
      soluciones: 'Ver soluciones',
    },
  },

  products: {
    title: 'Nuestros productos',
    subtitle: 'Te decimos qué funciona hoy y qué sigue en desarrollo.',
    backToProducts: '← Todos los productos',
    gova: {
      name: 'Gova',
      category: 'Gestión comercial y cotización',
      shortCategory: 'Gestión comercial y cotización',
      summary:
        'Tu catálogo, tus precios y tus reglas en un solo lugar, para armar cotizaciones sin empezar de cero.',
      benefits: [
        'Tu información comercial en un solo lugar.',
        'Cotizaciones que no empiezan de cero.',
        'Menos captura repetida.',
        'Lo que sabe tu negocio, guardado y con historial.',
      ],
      cta: 'Ver Gova',
      // Capturas del MVP (ver productsData.govaScreens)
      screens: {
        inicio: {
          label: 'Inicio',
          alt: 'Pantalla de Inicio de Gova con pendientes, cobros y agenda de un negocio de ejemplo.',
        },
        catalogo: {
          label: 'Catálogo',
          alt: 'Catálogo de productos y servicios en Gova, con precios confirmados y su versión.',
        },
        cotizacion: {
          label: 'Cotización',
          alt: 'Editor de cotización de Gova con dos conceptos y la vista previa del documento.',
        },
        documento: {
          label: 'Documento',
          alt: 'Documento de cotización de Gova con la plantilla Moderna y datos de ejemplo.',
        },
        ventas: {
          label: 'Ventas',
          alt: 'Lista de cotizaciones en Gova con su estado: aceptada, enviada, borrador, vencida y rechazada.',
        },
      },
      // Recorrido del home: un paso por pantalla (ver productsData.govaTour)
      tour: {
        title: 'Gova, paso a paso',
        steps: {
          catalogo: {
            title: 'Tu catálogo y tus precios, en un solo lugar',
            desc: 'Registra productos, servicios y reglas comerciales. Cuando cambias un precio, la versión anterior queda guardada.',
          },
          cotizacion: {
            title: 'Arma la cotización con esos datos',
            desc: 'Agrega conceptos, cantidades y ajustes. Gova te avisa si falta información antes de cotizar.',
          },
          documento: {
            title: 'Imprímela o guárdala en PDF',
            desc: 'Elige una de tres plantillas, agrega los datos de tu negocio y revisa cómo queda antes de compartirla.',
          },
          inicio: {
            title: 'Da seguimiento desde Inicio',
            desc: 'Pendientes, cobros y agenda del día, junto con tus contactos y tareas.',
          },
        },
      },
      detail: {
        intro:
          'Gova es una plataforma en desarrollo para que las pequeñas empresas organicen lo que saben de su negocio —catálogo, precios y reglas comerciales— y armen cotizaciones con esa información.',
        statusNote:
          'MVP funcional que se ejecuta de forma local, todavía en evolución y validación. Aún no tiene una versión pública.',
        todayTitle: 'Lo que hace hoy el MVP',
        today: [
          'Catálogo de productos y servicios.',
          'Información y reglas comerciales del negocio.',
          'Gestión de precios con historial de versiones.',
          'Creación y edición de cotizaciones.',
          'Identificación de información faltante antes de cotizar.',
          'Plantillas de cotización para imprimir o guardar en PDF.',
          'Historial y persistencia de la información.',
        ],
        todayExtra:
          'También incluye contactos, tareas y agenda para dar seguimiento comercial.',
        nextTitle: 'Próxima evolución',
        nextNote: 'En diseño. Todavía no está disponible.',
        next: [
          'Interpretar solicitudes escritas en lenguaje natural.',
          'Consultar la información del negocio para responder y cotizar.',
          'Preparar propuestas comerciales que tú revisas y apruebas antes de enviarlas.',
        ],
        techLabel: 'Tecnología',
        techNote:
          'Para esta etapa contemplamos integrar modelos de inteligencia artificial como Claude, de Anthropic, mediante su API, siempre con revisión humana de cada propuesta.',
        benefitsTitle: 'Para qué le sirve a tu negocio',
        ctaTitle: '¿Te interesa Gova para tu negocio?',
        ctaText:
          'Si quieres conocerlo o participar en un piloto, cuéntanos cómo preparas tus cotizaciones hoy.',
        cta: 'Quiero saber más de Gova',
      },
    },
    miga: {
      name: 'Miga',
      category: 'Contenido y video con ayuda de inteligencia artificial',
      shortCategory: 'Contenido y video con IA',
      summary:
        'Para que tu negocio cree videos y contenido de sus productos sin depender de herramientas complicadas.',
      benefits: [
        'Crear contenido comercial con menos pasos.',
        'Edición de video más accesible.',
        'Menos trabajo manual al editar.',
        'Más libertad para probar ideas.',
      ],
      cta: 'Ver Miga',
      illustrationAlt:
        'Ilustración conceptual de Miga: un video vertical con subtítulos y una línea de tiempo de edición.',
      detail: {
        intro:
          'Miga es una plataforma en desarrollo para crear y editar contenido de marketing sin depender de herramientas complejas: describes lo que necesitas y la plataforma te ayuda a prepararlo.',
        statusNote:
          'Producto en desarrollo. Sus capacidades técnicas se prueban en un entorno local; la experiencia para usuarios finales todavía está en diseño.',
        todayTitle: 'Avances técnicos actuales',
        today: [
          'Infraestructura para ejecutar herramientas de edición de forma controlada.',
          'Integración experimental con Claude Code en un entorno local.',
          'Procesamiento y renderizado de video mediante FFmpeg.',
          'Generación de archivos MP4 mediante flujos automatizados.',
          'Subtítulos generados a partir del audio del video (experimental).',
        ],
        todayExtra: null,
        nextTitle: 'Visión del producto',
        nextIntro:
          'Queremos que describas lo que necesitas y que la plataforma te ayude a crear, modificar y preparar contenido audiovisual.',
        nextNote: 'Capacidades objetivo. Todavía no están disponibles.',
        next: [
          'Edición asistida por instrucciones en lenguaje natural.',
          'Preparación de videos para redes sociales.',
          'Automatización de tareas de edición.',
          'Integración futura con herramientas de narración y generación multimedia.',
        ],
        techLabel: 'Tecnología',
        techNote:
          'En los prototipos, Claude interpreta la tarea y utiliza herramientas de video controladas para producir el resultado, que después se revisa.',
        benefitsTitle: 'Para qué le servirá a tu negocio',
        ctaTitle: '¿Tu negocio necesita crear contenido con más facilidad?',
        ctaText:
          'Cuéntanos qué tipo de contenido produces hoy y qué te gustaría simplificar.',
        cta: 'Quiero saber más de Miga',
      },
    },
  },

  services: {
    title: 'También hacemos proyectos a la medida',
    subtitle:
      'Cuando Gova o Miga no cubren lo que necesitas, lo resolvemos contigo.',
    items: {
      automatizacion: {
        title: 'Automatización de procesos',
        desc: 'Quitamos pasos manuales de tareas que se repiten, como capturar datos o enviar recordatorios.',
      },
      software: {
        title: 'Software a la medida',
        desc: 'Aplicaciones para un proceso específico de tu empresa, cuando una herramienta genérica no alcanza.',
      },
      ia: {
        title: 'Inteligencia artificial aplicada',
        desc: 'Asistentes y automatizaciones que usan la información de tu negocio, siempre con revisión de una persona.',
      },
      datos: {
        title: 'Datos e integraciones',
        desc: 'Conectamos los sistemas que ya usas y ordenamos la información para que puedas consultarla.',
      },
    },
    cta: 'Hablemos de tu proyecto',
  },

  process: {
    title: 'Cómo trabajamos',
    subtitle: 'Cuatro etapas, cada una con algo concreto que puedes revisar.',
    steps: [
      {
        title: 'Entendemos tu negocio',
        desc: 'Platicamos sobre el problema, cómo lo resuelves hoy y qué resultado buscas.',
      },
      {
        title: 'Definimos la solución',
        desc: 'Proponemos el producto, la integración o el desarrollo que tiene sentido, y acordamos el alcance.',
      },
      {
        title: 'Construimos y probamos',
        desc: 'Hacemos una primera versión y la probamos con situaciones reales de tu operación.',
      },
      {
        title: 'Implementamos y ajustamos',
        desc: 'Te acompañamos al empezar a usarla y la mejoramos con base en lo que funciona.',
      },
    ],
    note:
      'Usamos herramientas modernas e inteligencia artificial para avanzar más rápido, pero el alcance, las pruebas, la seguridad y el mantenimiento se cuidan igual en cada proyecto.',
  },

  about: {
    title: 'Qué es InDaxion',
    paragraphs: [
      'Hacemos software e inteligencia artificial para pequeñas y medianas empresas.',
      'Creemos que las herramientas que usan las empresas grandes también deberían estar al alcance de un negocio pequeño, sin que tenga que contratar un área de sistemas.',
      'Por eso empezamos por problemas concretos, como cotizar o crear contenido, y probamos cada producto con situaciones reales antes de ofrecerlo.',
    ],
    stage:
      'Somos una startup en etapa temprana, enfocada en las pymes de México y con la idea de crecer en Latinoamérica.',
    pillarsLabel: 'De dónde viene el nombre',
    pillars: {
      inteligencia: {
        title: 'Inteligencia',
        desc: 'Usamos la inteligencia artificial donde de verdad ahorra trabajo.',
      },
      datos: {
        title: 'Datos',
        desc: 'Partimos de la información real de tu negocio: catálogos, precios, reglas y procesos.',
      },
      accion: {
        title: 'Acción',
        desc: 'Todo termina en una herramienta que se usa en el día a día.',
      },
    },
  },

  openTeaser: {
    eyebrow: 'InDaxion Open',
    title: 'Aprender construyendo proyectos reales',
    text: 'Una iniciativa educativa abierta: módulos gratuitos, proyectos en comunidad y evidencia de lo que sabes hacer.',
    points: [
      'Módulos gratuitos, empezando por AI Engineering.',
      'Proyectos comunitarios con problemas reales.',
      'Habilidades demostradas con contribuciones, no con rankings.',
    ],
    cta: 'Conoce InDaxion Open',
  },

  open: {
    title: 'InDaxion Open',
    subtitle:
      'Una iniciativa educativa abierta para aprender construyendo, colaborar en proyectos reales y demostrar lo que sabes hacer.',
    philosophyLabel: 'Por qué existe',
    philosophy:
      'Queremos que las oportunidades dependan cada vez más de las capacidades demostradas y menos de los recursos económicos o antecedentes personales.',
    conceptsTitle: 'Cómo queremos que funcione',
    concepts: {
      aprendizaje: {
        title: 'Aprendizaje abierto',
        desc: 'Módulos gratuitos de formación, empezando por AI Engineering.',
      },
      construir: {
        title: 'Aprender construyendo',
        desc: 'Los conocimientos se aplican en proyectos comunitarios y problemas reales.',
      },
      comunidad: {
        title: 'Comunidad',
        desc: 'Espacios para estudiar, colaborar y compartir conocimientos.',
      },
      evidencia: {
        title: 'Evidencia de habilidades',
        desc: 'Proyectos e insignias basadas en contribuciones reales, no en rankings competitivos.',
      },
      oportunidades: {
        title: 'Oportunidades futuras',
        desc: 'Conexión con proyectos de empresas, universidades y organizaciones.',
      },
    },
    statusTitle: 'Estado del proyecto',
    status:
      'InDaxion Open es una iniciativa en desarrollo. Ya existe la infraestructura inicial de autenticación; el piloto comunitario y el sistema de reputación todavía requieren validación. Lo descrito arriba es la dirección del proyecto, no funcionalidades disponibles hoy.',
    ctaTitle: '¿Te interesa participar?',
    ctaText:
      'Escríbenos si quieres recibir novedades, colaborar o proponer un proyecto comunitario.',
    cta: 'Escríbenos',
  },

  courses: {
    eyebrow: 'Programas',
    title: 'Programas de formación publicados',
    subtitle:
      'Consulta el temario de cada programa y descarga el programa completo en PDF.',
    viewProgram: 'Ver programa →',
    items: {
      'ai-engineer': {
        title: 'AI Engineer Bootcamp',
        desc: 'Ruta de 6 semanas. Domina LLMs, RAG, sistemas multiagente con CrewAI y LangGraph, y despliega en producción.',
        tag: 'Bootcamp',
      },
      'mastering-claude': {
        title: 'Mastering Claude',
        desc: 'Domina el ecosistema Claude: prototipa con Anthropic Labs, programa con Claude Code CLI y despliega agentes empresariales con MCP.',
        tag: 'IA Generativa',
      },
      langflow: {
        title: 'Agentes con LangFlow',
        desc: 'Crea agentes inteligentes con flujos visuales, memoria y APIs. Listos para producción.',
        tag: 'IA Generativa',
      },
    },
  },

  contact: {
    title: 'Cuéntanos qué necesita tu negocio.',
    subtitle:
      'No necesitas saber de tecnología ni tener una solución definida. Cuéntanos qué proceso quieres mejorar o qué problema quieres resolver.',
    direct: {
      title: '¿Prefieres escribirnos directo?',
      whatsapp: 'WhatsApp',
      email: 'Correo',
    },
    fields: {
      name: { label: 'Nombre', placeholder: 'Tu nombre' },
      email: { label: 'Correo electrónico', placeholder: 'tu@empresa.com' },
      company: { label: 'Empresa o negocio', placeholder: 'Nombre de tu negocio (opcional)' },
      phone: { label: 'Teléfono', placeholder: 'Opcional' },
      interest: { label: '¿Qué necesitas?', placeholder: 'Selecciona una opción' },
      message: {
        label: 'Describe tu necesidad',
        placeholder:
          'Por ejemplo: tardamos mucho en preparar cotizaciones, o queremos publicar videos de nuestros productos…',
      },
      // Campo trampa para bots; las personas no lo ven
      trap: 'No llenes este campo',
    },
    options: {
      gova: 'Gova · Gestión comercial y cotización',
      miga: 'Miga · Contenido y video con IA',
      automatizacion: 'Automatización de procesos',
      software: 'Software a la medida',
      ia: 'Inteligencia artificial aplicada',
      datos: 'Datos e integraciones',
      open: 'Cursos e InDaxion Open',
      otro: 'Otra consulta',
    },
    requiredHint: 'obligatorio',
    submit: 'Enviar mensaje',
    // Envío muy rápido: no se rechaza, se pide confirmar
    confirm: {
      notice: 'Revisa que tus datos sean correctos y confirma el envío.',
      submit: 'Confirmar y enviar',
    },
    // Vista previa (Vercel Preview / desarrollo local): no se envía nada
    preview: {
      notice: 'Vista previa: este formulario no envía datos. Puedes probarlo sin crear contactos reales.',
      successTitle: 'Prueba completada',
      successText: 'Estás en una vista previa: tu mensaje no se guardó ni se envió.',
    },
    sending: 'Enviando…',
    errors: {
      required: 'Completa tu nombre, tu correo electrónico y la descripción de lo que necesitas.',
      email: 'Revisa que tu correo electrónico esté bien escrito.',
      send: 'No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos o escríbenos por WhatsApp o correo electrónico.',
    },
    success: {
      title: '¡Mensaje enviado!',
      text: 'Gracias por contarnos sobre tu negocio. Revisaremos tu mensaje y te responderemos por correo electrónico.',
      reset: 'Enviar otro mensaje',
    },
  },

  footer: {
    description:
      'Software e inteligencia artificial para pequeñas y medianas empresas en México.',
    columns: {
      products: 'Productos',
      solutions: 'Soluciones',
      open: 'InDaxion Open',
      contact: 'Contacto',
    },
    openLinks: {
      initiative: 'La iniciativa',
    },
    whatsapp: 'WhatsApp',
    email: 'Correo electrónico',
    // {year} se reemplaza en el componente
    copyright: '© {year} InDaxion. Todos los derechos reservados.',
    cta: 'Escríbenos',
  },
}

export default es
