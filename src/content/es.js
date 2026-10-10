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
    taglineEn: 'We turn data into action.',
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
    status: {
      mvp: 'MVP en validación',
      development: 'En desarrollo',
      available: 'Disponible',
      planned: 'Próximamente',
      vision: 'Visión',
      initiative: 'Iniciativa en desarrollo',
    },
    // Aviso en formularios cuando el sitio es una vista previa (no guarda datos)
    previewNotice: 'Vista previa: tus datos no se guardarán.',
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'No encontramos esta página.',
    text: 'Es posible que el enlace haya cambiado o que la página ya no exista. Puedes volver al inicio o conocer nuestros productos.',
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
    cta: 'Hablemos',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    mainLabel: 'Navegación principal',
  },

  hero: {
    eyebrow: 'Software e inteligencia artificial para pymes',
    // Partes del título; `accent` aplica el degradado de marca
    title: [
      { text: 'Tecnología ' },
      { text: 'inteligente', accent: 'blue' },
      { text: ' para negocios que ' },
      { text: 'quieren crecer.', accent: 'purple' },
    ],
    description:
      'Desarrollamos software, automatizaciones y herramientas de inteligencia artificial que ayudan a las pequeñas y medianas empresas a simplificar tareas, mejorar procesos y concentrarse en hacer crecer su negocio.',
    primaryCta: 'Conoce nuestras soluciones',
    secondaryCta: 'Cuéntanos tu idea',
    productsLabel: 'Nuestros productos',
  },

  problems: {
    eyebrow: 'Lo que vemos en las pymes',
    title: 'Tu negocio no necesita procesos más complicados.',
    titleAccent: 'Necesita mejores herramientas.',
    subtitle:
      'Estas son algunas de las necesidades hacia las que orientamos nuestros productos y servicios.',
    items: {
      cotizaciones: {
        title: 'Cotizaciones que consumen demasiado tiempo',
        desc: 'Procesos manuales, cálculos repetitivos y elaboración de documentos comerciales.',
      },
      informacion: {
        title: 'Información dispersa',
        desc: 'Precios, catálogos, documentos y reglas de negocio almacenados en distintos lugares.',
      },
      contenido: {
        title: 'Creación de contenido complicada',
        desc: 'Dificultades para producir materiales comerciales y videos sin conocimientos especializados.',
      },
      repetitivos: {
        title: 'Procesos repetitivos',
        desc: 'Actividades administrativas que pueden simplificarse mediante automatización e integración de sistemas.',
      },
      herramientas: {
        title: 'Herramientas que no se adaptan al negocio',
        desc: 'Software complejo o demasiado costoso para las necesidades reales de una empresa pequeña.',
      },
    },
    related: {
      gova: 'Ver Gova',
      miga: 'Ver Miga',
      soluciones: 'Ver soluciones',
    },
  },

  products: {
    eyebrow: 'Productos',
    title: 'Productos diseñados para hacer tu negocio más inteligente.',
    subtitle:
      'Desarrollamos productos propios a partir de necesidades reales de las pymes, y te mostramos con claridad qué funciona hoy y qué está en camino.',
    backToProducts: '← Todos los productos',
    gova: {
      name: 'Gova',
      category: 'Gestión comercial y cotización inteligente',
      shortCategory: 'Gestión comercial y cotización',
      summary:
        'Organiza el conocimiento de tu negocio —catálogo, precios y reglas comerciales— y elabora cotizaciones con mayor facilidad.',
      benefits: [
        'Centraliza tu información comercial.',
        'Simplifica la elaboración de cotizaciones.',
        'Reduce tareas repetitivas.',
        'Aprovecha mejor el conocimiento de tu negocio.',
      ],
      cta: 'Conocer Gova',
      illustrationAlt:
        'Ilustración conceptual de Gova: un catálogo de productos y una cotización con conceptos y total.',
      detail: {
        intro:
          'Gova es una plataforma en desarrollo que busca ayudar a las pequeñas empresas a organizar el conocimiento de su negocio, administrar catálogos y reglas comerciales y elaborar cotizaciones con mayor facilidad.',
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
      category: 'Creación de contenido y edición de video asistida por IA',
      shortCategory: 'Contenido y video con IA',
      summary:
        'Facilita crear y editar contenido de marketing para que tu negocio comunique sus productos y servicios sin depender de herramientas complejas.',
      benefits: [
        'Simplifica la creación de contenido comercial.',
        'Hace más accesibles las herramientas audiovisuales.',
        'Reduce el trabajo manual de edición.',
        'Facilita la experimentación creativa.',
      ],
      cta: 'Descubrir Miga',
      illustrationAlt:
        'Ilustración conceptual de Miga: un video vertical con subtítulos y una línea de tiempo de edición.',
      detail: {
        intro:
          'Miga es una plataforma en desarrollo cuyo objetivo es facilitar la creación y edición de contenido de marketing para empresas que necesitan comunicar sus productos y servicios sin depender de herramientas complejas.',
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
          'Queremos que describas lo que necesitas y que la plataforma te ayude a crear, modificar y preparar contenido audiovisual mediante herramientas inteligentes.',
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
    eyebrow: 'Soluciones',
    title: 'Tecnología adaptada a las necesidades de tu empresa.',
    subtitle:
      'Además de nuestros productos, adaptamos e integramos tecnología para resolver problemas concretos de tu operación.',
    items: {
      automatizacion: {
        title: 'Automatización de procesos',
        desc: 'Identificamos y simplificamos tareas administrativas y operativas repetitivas.',
      },
      software: {
        title: 'Desarrollo de software',
        desc: 'Aplicaciones y herramientas diseñadas para las necesidades específicas de tu empresa.',
      },
      ia: {
        title: 'Inteligencia artificial aplicada',
        desc: 'Asistentes, automatizaciones inteligentes y soluciones que aprovechan la información de tu empresa.',
      },
      datos: {
        title: 'Datos e integraciones',
        desc: 'Organización de información, conexión entre sistemas y herramientas de análisis para apoyar tus decisiones.',
      },
    },
    cta: 'Hablemos de tu proyecto',
  },

  process: {
    eyebrow: 'Cómo trabajamos',
    title: 'De una necesidad a una solución real.',
    subtitle:
      'Un proceso claro, en el que cada etapa tiene un propósito y un resultado que puedes revisar.',
    steps: [
      {
        title: 'Entendemos tu negocio',
        desc: 'Escuchamos el problema, los procesos actuales y los resultados que buscas.',
      },
      {
        title: 'Definimos la solución',
        desc: 'Identificamos qué producto, integración o desarrollo puede resolver la necesidad y acordamos el alcance.',
      },
      {
        title: 'Construimos y validamos',
        desc: 'Desarrollamos un prototipo o solución inicial y lo probamos con situaciones reales.',
      },
      {
        title: 'Implementamos y mejoramos',
        desc: 'Acompañamos la adopción de la solución y definimos mejoras según los resultados.',
      },
    ],
    note:
      'Las herramientas modernas e inteligencia artificial nos permiten avanzar más rápido. Aun así, el alcance, las pruebas, la seguridad y el mantenimiento siguen siendo esenciales en cada proyecto.',
  },

  about: {
    eyebrow: 'Nosotros',
    title: 'La inteligencia y los datos deben convertirse en acción.',
    paragraphs: [
      'InDaxion nace de una idea sencilla: la inteligencia y los datos deben convertirse en acciones que generen valor.',
      'Creemos que las herramientas tecnológicas avanzadas no deberían estar reservadas únicamente para grandes empresas. Por eso desarrollamos software y soluciones de inteligencia artificial pensadas para hacer más accesible la transformación digital de pequeños y medianos negocios.',
      'Nuestro enfoque combina ingeniería, análisis de datos, desarrollo de software e inteligencia artificial aplicada.',
    ],
    stage:
      'Somos una startup en etapa temprana, enfocada en las pymes de México y con visión de crecer en Latinoamérica.',
    pillarsLabel: 'Lo que significa InDaxion',
    pillars: {
      inteligencia: {
        title: 'Inteligencia',
        desc: 'Usamos la IA donde realmente simplifica el trabajo, no como un fin en sí misma.',
      },
      datos: {
        title: 'Datos',
        desc: 'Partimos de la información real de tu negocio: catálogos, precios, reglas y procesos.',
      },
      accion: {
        title: 'Acción',
        desc: 'Convertimos esa información en herramientas que producen resultados concretos.',
      },
    },
  },

  openTeaser: {
    eyebrow: 'InDaxion Open',
    title: 'El conocimiento crece cuando se comparte.',
    text: 'Una iniciativa educativa abierta donde aprender significa construir, colaborar y demostrar habilidades mediante proyectos reales.',
    points: [
      'Módulos gratuitos de formación, comenzando con AI Engineering.',
      'Conocimientos aplicados en proyectos comunitarios y problemas reales.',
      'Evidencia de habilidades basada en contribuciones reales.',
    ],
    cta: 'Conoce InDaxion Open',
  },

  open: {
    eyebrow: 'InDaxion Open',
    title: 'El conocimiento crece cuando se comparte.',
    subtitle:
      'Una iniciativa educativa abierta donde aprender significa construir, colaborar y demostrar habilidades mediante proyectos reales.',
    philosophyLabel: 'Nuestra filosofía',
    philosophy:
      'Queremos que las oportunidades dependan cada vez más de las capacidades demostradas y menos de los recursos económicos o antecedentes personales.',
    conceptsTitle: 'Cómo queremos que funcione',
    concepts: {
      aprendizaje: {
        title: 'Aprendizaje abierto',
        desc: 'Módulos gratuitos de formación, comenzando con AI Engineering.',
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
    eyebrow: 'Contacto',
    title: 'Cuéntanos qué necesita tu negocio.',
    subtitle:
      'No necesitas tener conocimientos técnicos ni una solución definida. Cuéntanos qué proceso quieres mejorar o qué problema necesitas resolver.',
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
      software: 'Software personalizado',
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
      'Software e inteligencia artificial para pequeñas y medianas empresas. Convertimos inteligencia y datos en soluciones que producen resultados reales.',
    columns: {
      products: 'Productos',
      solutions: 'Soluciones',
      open: 'InDaxion Open',
      contact: 'Contacto',
    },
    openLinks: {
      initiative: 'La iniciativa',
      courses: 'Programas publicados',
    },
    whatsapp: 'WhatsApp',
    email: 'Correo electrónico',
    // {year} se reemplaza en el componente
    copyright: '© {year} InDaxion — Inteligencia · Datos · Acción. Todos los derechos reservados.',
    cta: 'Contáctanos →',
  },
}

export default es
