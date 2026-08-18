export type Language = 'en' | 'es'

const en = {
  nav: {
    features: 'Features',
    testimonials: 'Testimonials',
    blogs: 'Blogs',
    getStarted: 'Get Started',
    toggleMenu: 'Toggle menu',
    languageLabel: 'Language',
  },
  hero: {
    badge: 'Backed by the Global Covenant of Mayors',
    titleLine1: 'AI-Powered',
    titleLine2: 'Resource & Energy Access',
    titleLine3: 'Intelligence',
    description:
      'Democratizing resource and energy infrastructure planning with AI. Analyze geospatial data layers, automate compliance reporting, and accelerate access in underserved communities.',
    bookDemo: 'Book a Demo',
    learnMore: 'Learn More',
    visualizationTitle: 'Texas Energy Infrastructure Visualization',
    stats: {
      withoutPower: 'Without Power',
      projectsFail: 'Projects Fail',
      fasterPlanning: 'Faster Planning',
    },
  },
  problem: {
    title: "Resource & Energy Planning Shouldn't Take Months",
    description:
      'Government planners waste weeks gathering fragmented data from multiple sources, analyzing outdated spreadsheets, and making infrastructure decisions with incomplete information.',
    withoutTitle: 'Without Polisense AI',
    withoutItems: [
      'Months of manual data collection',
      'Siloed information across departments',
      '50% of projects fail within 5 years',
      'Limited spatial analysis capabilities',
    ],
    withTitle: 'With Polisense AI',
    withItems: [
      'Minutes to generate comprehensive plans',
      'Unified geospatial intelligence platform',
      'AI-powered risk assessment',
      'Real-time infrastructure modeling',
    ],
  },
  features: {
    title: 'Built for Impact',
    description: 'Powerful tools to accelerate resource and energy access in emerging markets',
    items: [
      {
        title: 'AI Site Recommendations',
        description:
          'Get intelligent site recommendations for resource deployment, renewable energy, and grid infrastructure based on comprehensive geospatial analysis.',
      },
      {
        title: 'Geospatial Analysis',
        description:
          'Analyze terrain, population density, and infrastructure constraints with natural language queries.',
      },
      {
        title: 'Impact Modeling',
        description:
          'Simulate and optimize infrastructure investments to maximize reach and sustainability.',
      },
      {
        title: 'Automated Compliance Reports',
        description:
          'Generate regulatory-compliant reports instantly, eliminating weeks of manual documentation and accelerating project approvals.',
      },
    ],
  },
  transformation: {
    title: 'From Months to Minutes',
    description:
      'Join government agencies transforming how they plan and deploy resource and energy infrastructure. Make data-driven decisions with confidence and expand access for millions.',
    steps: [
      {
        title: 'Upload Your Data',
        description:
          'Import existing geospatial datasets, census data, and infrastructure maps into our unified platform.',
      },
      {
        title: 'AI Analysis',
        description:
          'Our AI analyzes terrain, population density, resource availability, and grid constraints in real-time.',
      },
      {
        title: 'Deploy Confidently',
        description:
          'Generate optimized infrastructure plans, risk assessments, and ROI projections ready for stakeholder approval.',
      },
    ],
  },
  mission: {
    stats: [
      { value: '760M+', label: 'People without electricity access globally' },
      { value: '50%', label: 'Infrastructure projects fail within first 5 years' },
      { value: '10x', label: 'Faster infrastructure planning with AI' },
    ],
  },
  testimonials: {
    title: 'Trusted by Resource & Energy Leaders',
    description: 'Government agencies and international organizations rely on Polisense AI',
    items: [
      {
        quote:
          'Polisense AI reduced our planning cycle from 6 months to 3 weeks. The geospatial analysis is remarkably accurate.',
        author: 'Maria Santos',
        role: 'Director of Infrastructure Planning',
        organization: 'Ministry of Energy, Peru',
      },
      {
        quote:
          'The automated compliance reports saved us months of documentation work. We can now move from analysis to implementation in days, not months.',
        author: 'Dr. Ahmed Hassan',
        role: 'Chief Energy Strategist',
        organization: 'National Power Authority',
      },
      {
        quote:
          "Finally, a tool that speaks our language. Polisense AI understands the real challenges of emerging market electrification.",
        author: 'Jane Ochieng',
        role: 'Program Director',
        organization: 'East Africa Energy Access',
      },
    ],
  },
  cta: {
    title: 'Ready to Transform Resource & Energy Access?',
    description:
      'Join leading organizations using Polisense AI to accelerate resource and energy access, optimize infrastructure investments, and improve lives in underserved communities.',
    button: 'Schedule a Demo',
  },
  footer: {
    linkedin: 'LinkedIn',
    contact: 'Contact',
    copyright: '© 2026 Polisense AI. All rights reserved.',
    partners: 'Partners',
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
        role: 'Advisory Board — Product',
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
    successTitle: 'Request Submitted!',
    successDescription: "We'll be in touch shortly to schedule your demo.",
    title: 'Book a Demo',
    description: 'See how Polisense AI can transform your energy planning',
    emailLabel: 'Email Address',
    emailPlaceholder: 'you@organization.com',
    organizationLabel: 'Organization',
    organizationPlaceholder: 'Your organization name',
    errorMessage: 'Failed to submit. Please try again.',
    submitting: 'Submitting...',
    submit: 'Submit Request',
    disclaimer: 'By submitting, you agree to our Terms of Service and Privacy Policy',
  },
}

const es: typeof en = {
  nav: {
    features: 'Funcionalidades',
    testimonials: 'Testimonios',
    blogs: 'Blog',
    getStarted: 'Comenzar',
    toggleMenu: 'Alternar menú',
    languageLabel: 'Idioma',
  },
  hero: {
    badge: 'Respaldado por el Pacto Global de Alcaldes',
    titleLine1: 'Inteligencia de Acceso a',
    titleLine2: 'Recursos y Energía',
    titleLine3: 'Impulsada por IA',
    description:
      'Democratizando la planificación de infraestructura de recursos y energía con IA. Analiza capas de datos geoespaciales, automatiza reportes de cumplimiento y acelera el acceso en comunidades desatendidas.',
    bookDemo: 'Agendar una Demo',
    learnMore: 'Saber Más',
    visualizationTitle: 'Visualización de Infraestructura Energética de Texas',
    stats: {
      withoutPower: 'Sin Electricidad',
      projectsFail: 'Proyectos Fallidos',
      fasterPlanning: 'Planificación Más Rápida',
    },
  },
  problem: {
    title: 'La Planificación de Recursos y Energía No Debería Tomar Meses',
    description:
      'Los planificadores gubernamentales pierden semanas recopilando datos fragmentados de múltiples fuentes, analizando hojas de cálculo desactualizadas y tomando decisiones de infraestructura con información incompleta.',
    withoutTitle: 'Sin Polisense AI',
    withoutItems: [
      'Meses de recopilación manual de datos',
      'Información aislada entre departamentos',
      'El 50% de los proyectos fallan en 5 años',
      'Capacidades limitadas de análisis espacial',
    ],
    withTitle: 'Con Polisense AI',
    withItems: [
      'Minutos para generar planes integrales',
      'Plataforma unificada de inteligencia geoespacial',
      'Evaluación de riesgos impulsada por IA',
      'Modelado de infraestructura en tiempo real',
    ],
  },
  features: {
    title: 'Diseñado para Generar Impacto',
    description:
      'Herramientas poderosas para acelerar el acceso a recursos y energía en mercados emergentes',
    items: [
      {
        title: 'Recomendaciones de Sitios con IA',
        description:
          'Obtén recomendaciones inteligentes de sitios para el despliegue de recursos, energía renovable e infraestructura de red, basadas en un análisis geoespacial integral.',
      },
      {
        title: 'Análisis Geoespacial',
        description:
          'Analiza el terreno, la densidad de población y las restricciones de infraestructura con consultas en lenguaje natural.',
      },
      {
        title: 'Modelado de Impacto',
        description:
          'Simula y optimiza inversiones en infraestructura para maximizar el alcance y la sostenibilidad.',
      },
      {
        title: 'Reportes de Cumplimiento Automatizados',
        description:
          'Genera reportes conformes con la normativa al instante, eliminando semanas de documentación manual y acelerando las aprobaciones de proyectos.',
      },
    ],
  },
  transformation: {
    title: 'De Meses a Minutos',
    description:
      'Únete a agencias gubernamentales que transforman la forma en que planifican y despliegan infraestructura de recursos y energía. Toma decisiones basadas en datos con confianza y amplía el acceso para millones.',
    steps: [
      {
        title: 'Sube Tus Datos',
        description:
          'Importa conjuntos de datos geoespaciales existentes, datos censales y mapas de infraestructura a nuestra plataforma unificada.',
      },
      {
        title: 'Análisis con IA',
        description:
          'Nuestra IA analiza el terreno, la densidad de población, la disponibilidad de recursos y las restricciones de red en tiempo real.',
      },
      {
        title: 'Despliega con Confianza',
        description:
          'Genera planes de infraestructura optimizados, evaluaciones de riesgo y proyecciones de retorno listas para la aprobación de las partes interesadas.',
      },
    ],
  },
  mission: {
    stats: [
      { value: '760M+', label: 'Personas sin acceso a electricidad en el mundo' },
      { value: '50%', label: 'Proyectos de infraestructura fallan en los primeros 5 años' },
      { value: '10x', label: 'Planificación de infraestructura más rápida con IA' },
    ],
  },
  testimonials: {
    title: 'Confiado por Líderes de Recursos y Energía',
    description: 'Agencias gubernamentales y organizaciones internacionales confían en Polisense AI',
    items: [
      {
        quote:
          'Polisense AI redujo nuestro ciclo de planificación de 6 meses a 3 semanas. El análisis geoespacial es sorprendentemente preciso.',
        author: 'Maria Santos',
        role: 'Directora de Planificación de Infraestructura',
        organization: 'Ministerio de Energía, Perú',
      },
      {
        quote:
          'Los reportes de cumplimiento automatizados nos ahorraron meses de trabajo de documentación. Ahora podemos pasar del análisis a la implementación en días, no en meses.',
        author: 'Dr. Ahmed Hassan',
        role: 'Estratega Jefe de Energía',
        organization: 'Autoridad Nacional de Energía',
      },
      {
        quote:
          'Finalmente, una herramienta que habla nuestro idioma. Polisense AI entiende los verdaderos desafíos de la electrificación en mercados emergentes.',
        author: 'Jane Ochieng',
        role: 'Directora de Programa',
        organization: 'East Africa Energy Access',
      },
    ],
  },
  cta: {
    title: '¿Listo para Transformar el Acceso a Recursos y Energía?',
    description:
      'Únete a organizaciones líderes que usan Polisense AI para acelerar el acceso a recursos y energía, optimizar inversiones en infraestructura y mejorar la vida de comunidades desatendidas.',
    button: 'Agendar una Demo',
  },
  footer: {
    linkedin: 'LinkedIn',
    contact: 'Contacto',
    copyright: '© 2026 Polisense AI. Todos los derechos reservados.',
    partners: 'Socios',
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
        role: 'Junta Asesora — Producto',
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
    successTitle: '¡Solicitud Enviada!',
    successDescription: 'Nos pondremos en contacto pronto para agendar tu demo.',
    title: 'Agendar una Demo',
    description: 'Descubre cómo Polisense AI puede transformar tu planificación energética',
    emailLabel: 'Correo Electrónico',
    emailPlaceholder: 'tu@organizacion.com',
    organizationLabel: 'Organización',
    organizationPlaceholder: 'Nombre de tu organización',
    errorMessage: 'No se pudo enviar. Por favor, inténtalo de nuevo.',
    submitting: 'Enviando...',
    submit: 'Enviar Solicitud',
    disclaimer: 'Al enviar, aceptas nuestros Términos de Servicio y Política de Privacidad',
  },
}

export const translations = { en, es }
export type Translations = typeof en
