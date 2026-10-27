export type Language = 'en' | 'es'

const en = {
  nav: {
    products: 'Products',
    platform: 'Platform',
    blogs: 'Blog',
    team: 'Team',
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
    layers: ['Terrain', 'Water', 'Infrastructure', 'Constraints', 'Ranked result'],
    priority: 'Priority {n}',
    layersAlt:
      'Isometric stack of map layers for Arequipa, Peru: terrain, the Chili river, the road network, constraints and a ranked result, which spread apart as the page scrolls.',
    layersCaption: 'Arequipa, Peru. Streets and river from OpenStreetMap; scores are illustrative.',
    stats: [
      { value: '~30 min', label: 'per analysis, down from 3.5-4 hours' },
      { value: '196 → 41', label: 'water sites screened, then shortlisted' },
      { value: '7', label: 'capabilities on one engine' },
    ],
  },
  problem: {
    title: 'The money exists. The analysis is the bottleneck.',
    description:
      '49% of climate projects never get built. Funding is rarely why.',
    withoutTitle: 'Today',
    withTitle: 'With Polisense',
    compare: [
      { before: '3.5-4 h', after: '~30 min', label: 'per GIS analysis' },
      { before: '10 tools', after: '1 workspace', label: 'from question to answer' },
      { before: 'Black-box scores', after: 'Cited evidence', label: 'behind every ranking' },
    ],
  },
  how: {
    title: 'One loop, from question to decision',
    steps: [
      { label: 'Ask', title: 'Describe the area and the question', description: 'In plain language, right in the chat.' },
      { label: 'Analyze', title: 'The engine does the GIS work', description: 'Constraints drop out. Every area is scored.' },
      { label: 'Act', title: 'Get a ranked, defensible answer', description: 'With the evidence and a ready report.' },
    ],
    readout: {
      cells: '{n} cells in the study area',
      excluded: '{n} cells excluded: river corridor and historic centre',
      ranked: 'Top {n} candidates ranked',
    },
    caption: 'Real Arequipa streets and river (OpenStreetMap). Scores are illustrative.',
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
    title: 'Seven capabilities, one engine',
    viewAll: 'All products',
  },
  cta: {
    title: 'Bring us a territory and a question',
    description:
      'We will answer it with you, live.',
    button: 'Book a demo',
  },
  productPage: {
    indexTitle: 'Products',
    indexDescription:
      'Seven capabilities on one territorial climate engine, each answering where to invest, protect or intervene first.',
    backToProducts: 'All products',
    validatedIn: 'Validated in',
    whatItDoes: 'What it does',
    dataLabel: 'Data it combines',
    outputsLabel: 'What you get',
    proofLabel: 'Results',
    galleryTitle: 'Maps from a finished run',
    dataGalleryTitle: 'Data the analysis reads',
    otherProducts: 'Other products',
    ctaTitle: 'Try it on your own territory',
    ctaDescription: 'Live, on a real question from your region.',
    ctaButton: 'Book a demo',
    toolsTitle: 'Runs on',
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
    supportedBy: 'Supported by',
    products: 'Products',
    platform: 'Platform',
    blog: 'Blog',
    team: 'Team',
    whitepaper: 'Whitepaper',
  },
  team: {
    heroTitle: 'Our Team',
    heroDescription:
      'AI engineers, product strategists, and geospatial experts united by a mission to make climate and infrastructure planning faster and more accessible worldwide.',
    email: 'Email',
    members: [
      {
        name: 'Bruno Galdos',
        role: 'CEO & Co-founder',
        description:
          "Engineering technology that uplifts humanity. Built Polisense's full MVP from scratch, where AI, geospatial analysis, and sustainability meet to transform communities.",
      },
      {
        name: 'Jose Pastor',
        role: 'Founder & Chair',
        description:
          'Experienced leader in energy and AI products, and in strategy that amplifies the positive impact of technology on society.',
      },
      {
        name: 'Amol Kodange',
        role: 'CTO',
        description:
          "Robotics engineer from RWTH Aachen working across computer vision, machine learning and multi-sensor data. Leads Polisense's engineering.",
      },
      {
        name: 'Khuzaima Aziz',
        role: 'CPO',
        description:
          'Data scientist trained in Earth systems and remote sensing (Leipzig University), with experience bringing spatial analysis and AI together. Formerly at E.ON Group Innovations. Leads product.',
      },
      {
        name: 'Mauricio Peraltilla',
        role: 'LATAM Operations Director',
        description: "Leads Polisense's operations and partnerships across Latin America.",
      },
    ],
  },
  blog: {
    heroTitle: 'Blog',
    heroDescription:
      'Insights on AI and geospatial analysis for climate and infrastructure decisions.',
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
    team: 'Equipo',
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
    layers: ['Terreno', 'Agua', 'Infraestructura', 'Restricciones', 'Resultado ordenado'],
    priority: 'Prioridad {n}',
    layersAlt:
      'Pila isométrica de capas de mapa de Arequipa, Perú: terreno, el río Chili, la red vial, restricciones y un resultado ordenado, que se separan al desplazar la página.',
    layersCaption: 'Arequipa, Perú. Calles y río de OpenStreetMap; los puntajes son ilustrativos.',
    stats: [
      { value: '~30 min', label: 'por análisis, antes 3,5-4 horas' },
      { value: '196 → 41', label: 'sitios de agua evaluados y preseleccionados' },
      { value: '7', label: 'capacidades en un solo motor' },
    ],
  },
  problem: {
    title: 'El dinero existe. El cuello de botella es el análisis.',
    description:
      'El 49% de los proyectos climáticos nunca se construye. Rara vez por falta de fondos.',
    withoutTitle: 'Hoy',
    withTitle: 'Con Polisense',
    compare: [
      { before: '3,5-4 h', after: '~30 min', label: 'por análisis SIG' },
      { before: '10 herramientas', after: '1 espacio de trabajo', label: 'de la pregunta a la respuesta' },
      { before: 'Puntajes opacos', after: 'Evidencia citada', label: 'detrás de cada clasificación' },
    ],
  },
  how: {
    title: 'Un solo ciclo, de la pregunta a la decisión',
    steps: [
      { label: 'Preguntar', title: 'Describa el área y la pregunta', description: 'En lenguaje natural, directo en el chat.' },
      { label: 'Analizar', title: 'El motor hace el trabajo SIG', description: 'Las restricciones quedan fuera. Cada área recibe un puntaje.' },
      { label: 'Actuar', title: 'Obtenga una respuesta ordenada y defendible', description: 'Con la evidencia y un informe listo.' },
    ],
    readout: {
      cells: '{n} celdas en el área de estudio',
      excluded: '{n} celdas excluidas: cauce del río y centro histórico',
      ranked: 'Los {n} mejores candidatos ordenados',
    },
    caption: 'Calles y río reales de Arequipa (OpenStreetMap). Los puntajes son ilustrativos.',
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
    title: 'Siete capacidades, un solo motor',
    viewAll: 'Todos los productos',
  },
  cta: {
    title: 'Tráiganos un territorio y una pregunta',
    description:
      'La responderemos con usted, en vivo.',
    button: 'Agendar una demo',
  },
  productPage: {
    indexTitle: 'Productos',
    indexDescription:
      'Siete capacidades sobre un mismo motor climático territorial, cada una responde dónde invertir, proteger o intervenir primero.',
    backToProducts: 'Todos los productos',
    validatedIn: 'Validado en',
    whatItDoes: 'Qué hace',
    dataLabel: 'Datos que combina',
    outputsLabel: 'Qué obtiene',
    proofLabel: 'Resultados',
    galleryTitle: 'Mapas de una ejecución terminada',
    dataGalleryTitle: 'Datos que lee el análisis',
    otherProducts: 'Otros productos',
    ctaTitle: 'Pruébelo en su propio territorio',
    ctaDescription: 'En vivo, con una pregunta real de su región.',
    ctaButton: 'Agendar una demo',
    toolsTitle: 'Funciona con',
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
    supportedBy: 'Con el apoyo de',
    products: 'Productos',
    platform: 'Plataforma',
    blog: 'Blog',
    team: 'Equipo',
    whitepaper: 'Whitepaper',
  },
  team: {
    heroTitle: 'Nuestro Equipo',
    heroDescription:
      'Ingenieros de IA, estrategas de producto y expertos geoespaciales unidos por la misión de hacer más rápida y accesible la planificación climática y de infraestructura en todo el mundo.',
    email: 'Correo',
    members: [
      {
        name: 'Bruno Galdos',
        role: 'CEO y Cofundador',
        description:
          'Ingeniería tecnológica que impulsa a la humanidad. Construyó el MVP completo de Polisense desde cero, donde la IA, el análisis geoespacial y la sostenibilidad se unen para transformar comunidades.',
      },
      {
        name: 'Jose Pastor',
        role: 'Fundador y Presidente',
        description:
          'Líder con experiencia en productos de energía e IA, y en estrategias que amplifican el impacto positivo de la tecnología en la sociedad.',
      },
      {
        name: 'Amol Kodange',
        role: 'CTO',
        description:
          'Ingeniería robótica en la RWTH Aachen, con experiencia en visión por computadora, aprendizaje automático y datos multisensor. Dirige la ingeniería de Polisense.',
      },
      {
        name: 'Khuzaima Aziz',
        role: 'CPO',
        description:
          'Ciencia de datos, sistemas terrestres y teledetección (Universidad de Leipzig), con experiencia en combinar análisis espacial e IA. Antes en E.ON Group Innovations. Dirige el producto.',
      },
      {
        name: 'Mauricio Peraltilla',
        role: 'Director de Operaciones LATAM',
        description: 'Dirige las operaciones y alianzas de Polisense en América Latina.',
      },
    ],
  },
  blog: {
    heroTitle: 'Blog',
    heroDescription:
      'Perspectivas sobre IA y análisis geoespacial para decisiones de clima e infraestructura.',
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
