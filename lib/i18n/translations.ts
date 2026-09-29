export type Language = 'en' | 'es'

const en = {
  nav: {
    products: 'Products',
    platform: 'Platform',
    blogs: 'Blog',
    getStarted: 'Book a demo',
    toggleMenu: 'Toggle menu',
    languageLabel: 'Language',
    skipToContent: 'Skip to content',
  },
  hero: {
    badge: 'Backed by the Global Covenant of Mayors',
    title: 'Know where to invest, protect',
    titleHighlight: 'and intervene first.',
    description:
      'Polisense turns satellite, climate, infrastructure and regulatory data into ranked, explainable answers, in hours instead of months.',
    bookDemo: 'Book a demo',
    secondary: 'How it works',
    imageAlt:
      'Polisense answering a question about vegetation change in a watershed near Arequipa, Peru: a change map, summary numbers and the answer in the chat.',
    layers: ['Regulation', 'Terrain', 'Infrastructure'],
    meta: [
      { label: 'lat/lon', value: '16.4°S 71.5°W' },
      { label: 'area', value: '225 km²' },
      { label: 'imagery', value: 'Landsat 2017-2025' },
    ],
    stats: [
      { value: '~30 min', label: 'per analysis, down from 3.5-4 hours' },
      { value: '196 → 41', label: 'water sites screened, then shortlisted' },
      { value: '8', label: 'capabilities on one engine' },
    ],
  },
  problem: {
    title: 'The money exists. The analysis is the bottleneck.',
    description:
      'Teams pay around $150K and wait six months for a feasibility report. 49% of climate projects never get built, and funding is rarely why.',
    withoutTitle: 'Today',
    withoutItems: [
      'Ten disconnected tools and hand-matched datasets',
      '3.5-4 hours per GIS analysis, which can still fail',
      '$15K-$80K consultant studies, 4-12 weeks each',
      'Scores nobody can explain to an investment committee',
    ],
    withTitle: 'With Polisense',
    withItems: [
      'One map workspace and one engine',
      'About 30 minutes per analysis',
      'Constrained zones excluded automatically',
      'Every ranking traced back to its sources',
    ],
  },
  how: {
    title: 'One loop, from question to decision',
    description:
      'Every capability runs on the same engine, so a new question is a configuration rather than a new tool.',
    steps: [
      {
        label: 'Ask',
        title: 'Describe the territory and the question',
        description:
          'Write it in plain language: where should we invest, protect or intervene first? Mention datasets in the chat and add layers to the map.',
      },
      {
        label: 'Analyze',
        title: 'The engine runs the workflow end to end',
        description:
          'Terrain, weather, infrastructure, land and regulation are combined in one pass. Constrained zones drop out and every candidate area is scored.',
      },
      {
        label: 'Act',
        title: 'Take a defensible answer to the room',
        description:
          'Ranked candidates arrive with the evidence behind each one, plus a report ready for an investment committee, a funder or a field team.',
      },
    ],
    explainTitle: 'Every ranking explains itself',
    explainDescription:
      'Factor attribution shows what drove each score. Citations link every claim to the regulation, report or dataset behind it.',
    readout: {
      cells: '{n} cells in the study area',
      excluded: '{n} cells excluded: river corridor and historic centre',
      ranked: 'Top {n} candidates ranked',
    },
    caption:
      'Illustration on real Arequipa streets and the Chili river (OpenStreetMap data). The study area and scores are generated, not a real result.',
    mapAlt:
      'Map of central Arequipa, Peru, with a grid of candidate cells over the city. Cells along the Chili river and around the historic centre are excluded, the rest are scored, and the top five are ranked.',
    mapLabels: {
      place: 'Arequipa, Peru',
      river: 'Chili river',
      centre: 'Historic centre',
      excluded: 'Excluded',
      score: 'Score',
    },
  },
  productsSection: {
    title: 'Eight capabilities, one engine',
    description:
      'Each capability answers a different territorial question, and each was proven on real territories and real data.',
    viewAll: 'All products',
  },
  proof: {
    title: 'Early, and already in the field',
    mapAlt:
      'World map marking live deployments in Peru, Jordan and Moldova, and letters of intent from Argentina, Bangladesh and Mozambique.',
    legendLive: 'Live deployment',
    legendLoi: 'Letter of intent',
    stats: [
      { value: '3', label: 'Countries live: Peru, Jordan and Moldova' },
      { value: '3', label: 'Letters of intent: Argentina, Bangladesh and Mozambique' },
      { value: '10+', label: 'Active users running analyses' },
    ],
    recognitionTitle: 'Recognition',
    recognition: [
      'Winner, AI x City Climate Action Hackathon, Climate Week NYC 2025, energy access track',
      'Winner, IEEE climate challenge, for an AI extreme-weather advisor',
      'Selected for the IRENA NewGen Accelerator',
      'EXIST Founders’ Grant, Germany, 2026',
      'Harvard Innovation Labs, 2026 cohort',
    ],
  },
  cta: {
    title: 'Bring us a territory and a question',
    description:
      'We will run a live demo on a real question from your region, so you see your own problem answered in minutes.',
    button: 'Book a demo',
  },
  productPage: {
    indexTitle: 'Products',
    indexDescription:
      'Eight capabilities on one territorial climate engine, each answering where to invest, protect or intervene first.',
    backToProducts: 'All products',
    validatedIn: 'Validated in',
    whatItDoes: 'What it does',
    dataLabel: 'Data it combines',
    outputsLabel: 'What you get',
    proofLabel: 'Results',
    engineTitle: 'Runs on the shared engine',
    engineDescription:
      'Ask in plain language, let the engine run the analysis, and act on ranked, explainable results. The same loop powers every capability.',
    otherProducts: 'Other products',
    ctaTitle: 'Try it on your own territory',
    ctaDescription: 'We will run a live demo on a real question from your region.',
    ctaButton: 'Book a demo',
    toolsTitle: 'Engines behind this',
  },
  platform: {
    eyebrow: 'Built in-house by Polisense',
    title: 'Our analysis engines',
    description:
      'Seven engines designed and built by the Polisense team, running on one platform. Every product combines them.',
    usedBy: 'Powers',
    principles: [
      'Runs only after you approve the plan',
      'Every answer cites its sources',
      'Results open in the GIS tools you already use',
    ],
    ctaTitle: 'See the tools on your own territory',
    ctaDescription: 'We will run a live demo on a real question from your region.',
    ctaButton: 'Book a demo',
  },
  footer: {
    linkedin: 'LinkedIn',
    contact: 'Contact',
    copyright: '© 2026 Polisense AI. All rights reserved.',
    partners: 'Partners',
    products: 'Products',
    platform: 'Platform',
    blog: 'Blog',
    whitepaper: 'Whitepaper',
  },
  team: {
    heroTitle: 'Our Team',
    heroDescription:
      'AI engineers, product strategists, and energy experts united by a mission to democratize clean energy infrastructure planning worldwide.',
    email: 'Email',
    members: [
      {
        name: 'Bruno Galdos',
        role: 'CEO & Co-founder',
        description:
          "Engineering technology that uplifts humanity. Built Polisense's full MVP from scratch, where AI, energy, and sustainability meet to transform communities.",
      },
      {
        name: 'Abhirup Das',
        role: 'CTO & Co-founder',
        description:
          "Turns cutting-edge research into production systems. Robotics and vision researcher at RWTH Aachen, now engineering Polisense's core tech.",
      },
      {
        name: 'Jose Pastor',
        role: 'Advisory Board, Product',
        description:
          'Senior Product Manager of AI at Siemens with 6+ years in energy and grid infrastructure. Drives product strategy and partnerships',
      },
    ],
  },
  blog: {
    heroTitle: 'Blog',
    heroDescription:
      'Insights on AI, geospatial analysis, and accelerating resource and energy access worldwide.',
    emptyTitle: 'New posts are on the way',
    emptyDescription:
      "We're working on our first articles. Check back soon for updates on our research, product, and mission.",
  },
  demoModal: {
    successTitle: 'Request received',
    successDescription: "We'll be in touch shortly to schedule your demo.",
    title: 'Book a demo',
    description: 'We will run a live demo on a real question from your territory.',
    emailLabel: 'Work email',
    emailPlaceholder: 'you@organization.com',
    organizationLabel: 'Organization',
    organizationPlaceholder: 'Your organization name',
    errorMessage: 'We couldn’t send your request. Please try again.',
    errorBlocked:
      "Couldn't reach our servers. Check your internet connection, or disable any ad blocker or privacy extension for this site, then try again.",
    submitting: 'Sending…',
    submit: 'Request a demo',
    disclaimer: 'We only use your details to arrange the demo.',
  },
}

const es: typeof en = {
  nav: {
    products: 'Productos',
    platform: 'Plataforma',
    blogs: 'Blog',
    getStarted: 'Agendar una demo',
    toggleMenu: 'Alternar menú',
    languageLabel: 'Idioma',
    skipToContent: 'Saltar al contenido',
  },
  hero: {
    badge: 'Respaldado por el Pacto Global de Alcaldes',
    title: 'Sepa dónde invertir, proteger',
    titleHighlight: 'e intervenir primero.',
    description:
      'Polisense convierte datos satelitales, climáticos, de infraestructura y regulatorios en respuestas ordenadas y explicables, en horas y no meses.',
    bookDemo: 'Agendar una demo',
    secondary: 'Cómo funciona',
    imageAlt:
      'Polisense respondiendo una pregunta sobre el cambio de vegetación en una cuenca cerca de Arequipa, Perú: un mapa de cambio, cifras resumen y la respuesta en el chat.',
    layers: ['Regulación', 'Terreno', 'Infraestructura'],
    meta: [
      { label: 'lat/lon', value: '16.4°S 71.5°W' },
      { label: 'área', value: '225 km²' },
      { label: 'imágenes', value: 'Landsat 2017-2025' },
    ],
    stats: [
      { value: '~30 min', label: 'por análisis, antes 3,5-4 horas' },
      { value: '196 → 41', label: 'sitios de agua evaluados y preseleccionados' },
      { value: '8', label: 'capacidades en un solo motor' },
    ],
  },
  problem: {
    title: 'El dinero existe. El cuello de botella es el análisis.',
    description:
      'Los equipos pagan unos $150K y esperan seis meses por un estudio de factibilidad. El 49% de los proyectos climáticos nunca se construye, y rara vez por falta de fondos.',
    withoutTitle: 'Hoy',
    withoutItems: [
      'Diez herramientas desconectadas y datos cruzados a mano',
      '3,5-4 horas por análisis SIG, que aun así puede fallar',
      'Estudios de consultoría de $15K-$80K y 4-12 semanas cada uno',
      'Puntajes que nadie puede explicar a un comité de inversión',
    ],
    withTitle: 'Con Polisense',
    withItems: [
      'Un solo espacio de mapas y un solo motor',
      'Unos 30 minutos por análisis',
      'Zonas restringidas excluidas automáticamente',
      'Cada clasificación trazable hasta sus fuentes',
    ],
  },
  how: {
    title: 'Un solo ciclo, de la pregunta a la decisión',
    description:
      'Todas las capacidades corren sobre el mismo motor, así que una nueva pregunta es una configuración y no una herramienta nueva.',
    steps: [
      {
        label: 'Preguntar',
        title: 'Describa el territorio y la pregunta',
        description:
          'Escríbala en lenguaje natural: ¿dónde deberíamos invertir, proteger o intervenir primero? Mencione conjuntos de datos en el chat y agregue capas al mapa.',
      },
      {
        label: 'Analizar',
        title: 'El motor ejecuta el flujo completo',
        description:
          'Terreno, clima, infraestructura, suelo y regulación se combinan en una sola pasada. Las zonas restringidas quedan fuera y cada área candidata recibe un puntaje.',
      },
      {
        label: 'Actuar',
        title: 'Lleve una respuesta defendible a la mesa',
        description:
          'Los candidatos llegan ordenados con la evidencia de cada uno, más un informe listo para un comité de inversión, un financiador o un equipo de campo.',
      },
    ],
    explainTitle: 'Cada clasificación se explica sola',
    explainDescription:
      'La atribución de factores muestra qué determinó cada puntaje. Las citas vinculan cada afirmación con la norma, el informe o los datos que la respaldan.',
    readout: {
      cells: '{n} celdas en el área de estudio',
      excluded: '{n} celdas excluidas: cauce del río y centro histórico',
      ranked: 'Los {n} mejores candidatos ordenados',
    },
    caption:
      'Ilustración sobre calles reales de Arequipa y el río Chili (datos de OpenStreetMap). El área de estudio y los puntajes son generados, no un resultado real.',
    mapAlt:
      'Mapa del centro de Arequipa, Perú, con una grilla de celdas candidatas sobre la ciudad. Las celdas junto al río Chili y alrededor del centro histórico quedan excluidas, el resto recibe un puntaje y las cinco mejores se ordenan.',
    mapLabels: {
      place: 'Arequipa, Perú',
      river: 'Río Chili',
      centre: 'Centro histórico',
      excluded: 'Excluido',
      score: 'Puntaje',
    },
  },
  productsSection: {
    title: 'Ocho capacidades, un solo motor',
    description:
      'Cada capacidad responde a una pregunta territorial distinta, y cada una fue probada en territorios y datos reales.',
    viewAll: 'Todos los productos',
  },
  proof: {
    title: 'En etapa temprana, y ya en el campo',
    mapAlt:
      'Mapa mundial que marca despliegues activos en Perú, Jordania y Moldavia, y cartas de intención de Argentina, Bangladés y Mozambique.',
    legendLive: 'Despliegue activo',
    legendLoi: 'Carta de intención',
    stats: [
      { value: '3', label: 'Países activos: Perú, Jordania y Moldavia' },
      { value: '3', label: 'Cartas de intención: Argentina, Bangladés y Mozambique' },
      { value: '10+', label: 'Usuarios activos realizando análisis' },
    ],
    recognitionTitle: 'Reconocimientos',
    recognition: [
      'Ganador, AI x City Climate Action Hackathon, Climate Week NYC 2025, categoría acceso a la energía',
      'Ganador, desafío climático del IEEE, por un asesor de clima extremo con IA',
      'Seleccionado para el IRENA NewGen Accelerator',
      'Beca EXIST para fundadores, Alemania, 2026',
      'Harvard Innovation Labs, cohorte 2026',
    ],
  },
  cta: {
    title: 'Tráiganos un territorio y una pregunta',
    description:
      'Haremos una demo en vivo con una pregunta real de su región, para que vea su propio problema resuelto en minutos.',
    button: 'Agendar una demo',
  },
  productPage: {
    indexTitle: 'Productos',
    indexDescription:
      'Ocho capacidades sobre un mismo motor climático territorial, cada una responde dónde invertir, proteger o intervenir primero.',
    backToProducts: 'Todos los productos',
    validatedIn: 'Validado en',
    whatItDoes: 'Qué hace',
    dataLabel: 'Datos que combina',
    outputsLabel: 'Qué obtiene',
    proofLabel: 'Resultados',
    engineTitle: 'Corre sobre el motor compartido',
    engineDescription:
      'Pregunte en lenguaje natural, deje que el motor ejecute el análisis y actúe sobre resultados ordenados y explicables. El mismo ciclo impulsa cada capacidad.',
    otherProducts: 'Otros productos',
    ctaTitle: 'Pruébelo en su propio territorio',
    ctaDescription: 'Haremos una demo en vivo con una pregunta real de su región.',
    ctaButton: 'Agendar una demo',
    toolsTitle: 'Motores detrás de esto',
  },
  platform: {
    eyebrow: 'Desarrollado internamente por Polisense',
    title: 'Nuestros motores de análisis',
    description:
      'Siete motores diseñados y construidos por el equipo de Polisense, sobre una misma plataforma. Cada producto los combina.',
    usedBy: 'Impulsa',
    principles: [
      'Solo se ejecuta después de que usted aprueba el plan',
      'Cada respuesta cita sus fuentes',
      'Los resultados se abren en las herramientas SIG que ya usa',
    ],
    ctaTitle: 'Vea las herramientas en su propio territorio',
    ctaDescription: 'Haremos una demo en vivo con una pregunta real de su región.',
    ctaButton: 'Agendar una demo',
  },
  footer: {
    linkedin: 'LinkedIn',
    contact: 'Contacto',
    copyright: '© 2026 Polisense AI. Todos los derechos reservados.',
    partners: 'Socios',
    products: 'Productos',
    platform: 'Plataforma',
    blog: 'Blog',
    whitepaper: 'Whitepaper',
  },
  team: {
    heroTitle: 'Nuestro Equipo',
    heroDescription:
      'Ingenieros de IA, estrategas de producto y expertos en energía unidos por la misión de democratizar la planificación de infraestructura de energía limpia en todo el mundo.',
    email: 'Correo',
    members: [
      {
        name: 'Bruno Galdos',
        role: 'CEO y Cofundador',
        description:
          'Ingeniería tecnológica que impulsa a la humanidad. Construyó el MVP completo de Polisense desde cero, donde la IA, la energía y la sostenibilidad se unen para transformar comunidades.',
      },
      {
        name: 'Abhirup Das',
        role: 'CTO y Cofundador',
        description:
          'Convierte investigación de vanguardia en sistemas de producción. Investigador en robótica y visión en RWTH Aachen, ahora desarrollando la tecnología central de Polisense.',
      },
      {
        name: 'Jose Pastor',
        role: 'Junta Asesora, Producto',
        description:
          'Gerente Senior de Producto de IA en Siemens con más de 6 años en energía e infraestructura de red. Impulsa la estrategia de producto y las alianzas',
      },
    ],
  },
  blog: {
    heroTitle: 'Blog',
    heroDescription:
      'Perspectivas sobre IA, análisis geoespacial y cómo acelerar el acceso a recursos y energía en el mundo.',
    emptyTitle: 'Nuevos artículos en camino',
    emptyDescription:
      'Estamos preparando nuestros primeros artículos. Vuelve pronto para conocer novedades sobre nuestra investigación, producto y misión.',
  },
  demoModal: {
    successTitle: 'Solicitud recibida',
    successDescription: 'Nos pondremos en contacto pronto para agendar tu demo.',
    title: 'Agendar una demo',
    description: 'Haremos una demo en vivo con una pregunta real de su territorio.',
    emailLabel: 'Correo de trabajo',
    emailPlaceholder: 'tu@organizacion.com',
    organizationLabel: 'Organización',
    organizationPlaceholder: 'Nombre de tu organización',
    errorMessage: 'No pudimos enviar su solicitud. Inténtelo de nuevo.',
    errorBlocked:
      'No pudimos conectar con nuestros servidores. Revisa tu conexión a internet, o desactiva cualquier bloqueador de anuncios o extensión de privacidad para este sitio, e inténtalo de nuevo.',
    submitting: 'Enviando…',
    submit: 'Solicitar una demo',
    disclaimer: 'Solo usamos sus datos para organizar la demo.',
  },
}

export const translations = { en, es }
export type Translations = typeof en
