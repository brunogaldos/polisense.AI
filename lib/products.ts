// The capabilities that run on the Polisense engine. Each one gets a page
// at /products/[slug]/, a card on the homepage and an entry in /products/.
// Adding a capability means adding an entry here, no new page code.
//
// Source of truth: Polisense_GIS.md (Solution, Value Proposition, Traction),
// plus VEGETATION_ANALYSIS_FEATURE.md for vegetation change analysis.
// Solar screening and water storage carry measured results from that doc.
// The other five are only named there, so their copy describes what the shared
// engine does for that question and deliberately carries no numbers. Have the
// team confirm those five before publishing.

export interface Localized {
  en: string
  es: string
}

export interface ProofPoint {
  value: string
  label: Localized
}

export interface ProductView {
  name: Localized
  description: Localized
  /** Legend colours for this view, left to right. */
  swatch: string[]
}

export interface Product {
  slug: string
  sector: Localized
  name: Localized
  /** Where the capability was validated. */
  location: Localized
  /** The territorial question the capability answers, in the user's words. */
  question: Localized
  summary: Localized
  steps: Localized[]
  data: Localized[]
  outputs: Localized[]
  proof: ProofPoint[]
  /** Data credit shown with the data list, e.g. required satellite attribution. */
  sourceNote?: Localized
  /** Optional deeper read, e.g. a blog case study. */
  caseStudy?: { href: string; label: Localized }
  /** Featured capabilities get the large homepage cards. */
  featured: boolean
  /**
   * Screenshot of the capability running in Polisense, path under /public.
   * Until one exists, pages show a contour-pattern panel instead. Wanted per
   * capability: a landscape capture of the ranked result map, 1600px+ wide.
   */
  image?: { src: string; alt: Localized }
  /**
   * Maps drawn from a finished run's stored outputs, shown whole (never
   * cropped) under the intro. Rendered by the engine repo's
   * backend/scripts/render_run_maps.py; the caption says which run it is.
   */
  gallery?: { src: string; alt: Localized; caption: Localized }[]
  /**
   * 'data' when the gallery shows the public data an analysis reads, for a
   * capability with no finished run to draw yet. Changes the section title;
   * each caption also says the map is not a result. Defaults to a run.
   */
  galleryKind?: 'run' | 'data'
  /** Optional section listing the ways a result can be read on the map. */
  views?: { title: Localized; items: ProductView[] }
  /** Optional short trust statements shown as a strip on the product page. */
  trust?: Localized[]
}

export const products: Product[] = [
  {
    slug: 'solar-site-screening',
    sector: { en: 'Energy', es: 'Energía' },
    name: { en: 'Solar site screening', es: 'Selección de sitios solares' },
    location: { en: 'Peru', es: 'Perú' },
    question: {
      en: 'Where should the next solar plant go, and will the site survive regulatory review?',
      es: '¿Dónde debería ir la próxima planta solar, y resistirá el sitio la revisión regulatoria?',
    },
    summary: {
      en: 'Scores every candidate parcel in a territory on solar resource, terrain, grid and road access, removes land that is legally or physically off-limits, and ranks what is left. The shortlist arrives with the evidence behind each site and the inputs for a draft Environmental Impact Assessment.',
      es: 'Puntúa cada parcela candidata de un territorio según recurso solar, terreno, acceso a red y a carreteras, descarta el suelo legal o físicamente inviable y ordena lo que queda. La lista corta llega con la evidencia de cada sitio y los insumos para un borrador de Estudio de Impacto Ambiental.',
    },
    steps: [
      { en: 'Rules out protected areas and steep terrain.', es: 'Descarta áreas protegidas y pendientes fuertes.' },
      { en: 'Scores the land on sun, slope, grid and road access.', es: 'Puntúa el suelo por sol, pendiente, red y acceso vial.' },
      { en: 'Ranks the sites and shows what drove each score.', es: 'Ordena los sitios y muestra qué definió cada puntaje.' },
      { en: 'Assembles the evidence into a draft EIA.', es: 'Reúne la evidencia en un borrador de EIA.' },
    ],
    data: [
      { en: 'Solar irradiance and weather records', es: 'Irradiación solar y registros meteorológicos' },
      { en: 'Digital elevation models', es: 'Modelos digitales de elevación' },
      { en: 'Grid and road networks', es: 'Redes eléctricas y viales' },
      { en: 'Land use and protected areas', es: 'Uso de suelo y áreas protegidas' },
      { en: 'Regulatory and environmental records', es: 'Registros regulatorios y ambientales' },
    ],
    outputs: [
      { en: 'Ranked site shortlist on the map', es: 'Lista corta de sitios ordenada en el mapa' },
      { en: 'Per-site evidence and score breakdown', es: 'Evidencia y desglose del puntaje por sitio' },
      { en: 'Draft EIA inputs', es: 'Insumos para el borrador de EIA' },
    ],
    proof: [
      {
        value: '3 mo → 2 days',
        label: {
          en: 'Site prioritization plus a draft EIA, done by one planner instead of a consultant team',
          es: 'Priorización de sitios y borrador de EIA, hecho por un planificador en lugar de un equipo consultor',
        },
      },
      {
        value: '~30 min',
        label: {
          en: 'Per analysis, against 3.5-4 hours in desktop GIS',
          es: 'Por análisis, frente a 3,5-4 horas en un SIG de escritorio',
        },
      },
    ],
    caseStudy: {
      href: '/blog/',
      label: {
        en: 'Read the Arequipa case study',
        es: 'Lee el caso de Arequipa',
      },
    },
    featured: true,
    image: {
      src: '/products/solar-site-screening-cover.jpg',
      alt: {
        en: 'Shaded-relief map of Leipzig, Germany, divided into grid units coloured by relative score, with the top five numbered and excluded units hatched.',
        es: 'Mapa de relieve sombreado de Leipzig, Alemania, dividido en unidades de cuadrícula coloreadas por puntaje relativo, con las cinco mejores numeradas y las unidades excluidas rayadas.',
      },
    },
    gallery: [
      {
        src: '/products/solar-site-screening-ranking.jpg',
        alt: {
          en: 'Map of Leipzig divided into grid units coloured by relative score, the top five numbered, five excluded units hatched, beside the criteria weights used.',
          es: 'Mapa de Leipzig dividido en unidades de cuadrícula coloreadas por puntaje relativo, las cinco mejores numeradas, cinco unidades excluidas rayadas, junto a los pesos de los criterios usados.',
        },
        caption: {
          en: 'Example run: Leipzig, Germany. 57 units ranked on four criteria, 5 excluded. Screening-level result.',
          es: 'Ejemplo de ejecución: Leipzig, Alemania. 57 unidades ordenadas con cuatro criterios, 5 excluidas. Resultado a nivel de tamizaje.',
        },
      },
    ],
  },
  {
    slug: 'water-storage-mapping',
    sector: { en: 'Water', es: 'Agua' },
    name: { en: 'Natural water storage mapping', es: 'Mapeo de almacenamiento natural de agua' },
    location: { en: 'Andean highlands, Peru', es: 'Altoandino, Perú' },
    question: {
      en: 'Where can the landscape itself hold water through the dry season?',
      es: '¿Dónde puede el propio paisaje retener agua durante la temporada seca?',
    },
    summary: {
      en: 'Models the terrain of a watershed to find places where the landscape could store water naturally, then ranks them so field teams only visit the sites worth their time.',
      es: 'Modela el terreno de una cuenca para encontrar lugares donde el paisaje podría almacenar agua de forma natural, y los ordena para que los equipos de campo solo visiten los sitios que valen la pena.',
    },
    steps: [
      {
        en: 'Builds a terrain model of the watershed from elevation data.',
        es: 'Construye un modelo del terreno de la cuenca a partir de datos de elevación.',
      },
      {
        en: 'Finds natural basins that could hold water and estimates their capacity.',
        es: 'Encuentra cuencas naturales capaces de retener agua y estima su capacidad.',
      },
      {
        en: 'Checks every site against protected areas and other constraints.',
        es: 'Revisa cada sitio frente a áreas protegidas y otras restricciones.',
      },
      {
        en: 'Ranks candidates and flags a shortlist for field validation.',
        es: 'Ordena los candidatos y marca una lista corta para validación en campo.',
      },
    ],
    data: [
      { en: 'Digital elevation models', es: 'Modelos digitales de elevación' },
      { en: 'Historical and projected climate data', es: 'Datos climáticos históricos y proyectados' },
      { en: 'Satellite imagery', es: 'Imágenes satelitales' },
      { en: 'Land use and access routes', es: 'Uso de suelo y rutas de acceso' },
    ],
    outputs: [
      { en: 'Candidate sites with estimated volume', es: 'Sitios candidatos con volumen estimado' },
      { en: 'Catchment layers on the map', es: 'Capas de captación en el mapa' },
      { en: 'Field-validation shortlist', es: 'Lista corta para validación en campo' },
    ],
    proof: [
      {
        value: '196 → 41',
        label: {
          en: 'Candidate sites screened, and the number flagged for field validation',
          es: 'Sitios candidatos evaluados, y los marcados para validación en campo',
        },
      },
    ],
    featured: false,
    image: {
      src: '/products/water-storage-mapping-cover.jpg',
      alt: {
        en: 'Shaded-relief map of the Arequipa highlands, Peru, with the natural basins kept after screening marked in amber and the top five numbered.',
        es: 'Mapa de relieve sombreado de la sierra de Arequipa, Perú, con las cuencas naturales que pasaron la evaluación marcadas en ámbar y las cinco mejores numeradas.',
      },
    },
    gallery: [
      {
        src: '/products/water-storage-mapping-candidates.jpg',
        alt: {
          en: 'Shaded-relief map of the Arequipa highlands with the natural basins kept after screening marked in amber, the top five numbered, beside a table of their area, depth and volume.',
          es: 'Mapa de relieve sombreado de la sierra de Arequipa con las cuencas naturales que pasaron la evaluación marcadas en ámbar, las cinco mejores numeradas, junto a una tabla con su área, profundidad y volumen.',
        },
        caption: {
          en: 'Arequipa region, Peru: 196 candidate depressions screened, 41 kept for field validation.',
          es: 'Región Arequipa, Perú: 196 depresiones candidatas evaluadas, 41 conservadas para validación en campo.',
        },
      },
    ],
  },
  {
    slug: 'farmer-early-warning',
    sector: { en: 'Agriculture', es: 'Agricultura' },
    name: { en: 'Farmer early warning', es: 'Alerta temprana para agricultores' },
    location: { en: 'Bangladesh', es: 'Bangladés' },
    question: {
      en: 'Which farming areas need a warning first when the weather turns?',
      es: '¿Qué zonas agrícolas necesitan una alerta primero cuando cambia el clima?',
    },
    summary: {
      en: 'A prevention engine that overlays weather and climate data on farmland and exposure, so programs can see which areas face the highest risk and decide where to warn and intervene first.',
      es: 'Un motor de prevención que cruza datos meteorológicos y climáticos con zonas agrícolas y exposición, para que los programas vean qué áreas enfrentan mayor riesgo y decidan dónde alertar e intervenir primero.',
    },
    steps: [
      {
        en: 'Combines historical and projected weather with farmland and settlement data.',
        es: 'Combina clima histórico y proyectado con datos de zonas agrícolas y asentamientos.',
      },
      {
        en: 'Scores exposure area by area.',
        es: 'Puntúa la exposición zona por zona.',
      },
      {
        en: 'Ranks where to warn and intervene first, with the reasoning attached.',
        es: 'Ordena dónde alertar e intervenir primero, con el razonamiento incluido.',
      },
    ],
    data: [
      { en: 'Historical and projected weather', es: 'Clima histórico y proyectado' },
      {
        en: 'Soil moisture, runoff and evapotranspiration',
        es: 'Humedad del suelo, escorrentía y evapotranspiración',
      },
      {
        en: 'Cropland segmentation with the Prithvi model',
        es: 'Segmentación de cultivos con el modelo Prithvi',
      },
      { en: 'Land use and cropland', es: 'Uso de suelo y tierras de cultivo' },
      { en: 'Census and settlement data', es: 'Datos censales y de asentamientos' },
      { en: 'Terrain and hydrology', es: 'Terreno e hidrología' },
    ],
    outputs: [
      { en: 'Exposure map by area', es: 'Mapa de exposición por zona' },
      { en: 'Priority list for warnings and interventions', es: 'Lista de prioridades para alertas e intervenciones' },
    ],
    proof: [],
    image: {
      src: '/products/farmer-early-warning-cover.jpg',
      alt: {
        en: 'Map of Bangladesh coloured by surface soil moisture in the dry season, drier in the north-west and wetter in the north-east wetlands and the south-west coast.',
        es: 'Mapa de Bangladés coloreado por humedad superficial del suelo en la estación seca, más seco al noroeste y más húmedo en los humedales del noreste y la costa suroeste.',
      },
    },
    galleryKind: 'data',
    gallery: [
      {
        src: '/products/farmer-early-warning-soil-moisture.jpg',
        alt: {
          en: 'Map of Bangladesh coloured by surface soil moisture, with the mean, the 5th and 95th percentiles and a histogram of values inside the country.',
          es: 'Mapa de Bangladés coloreado por humedad superficial del suelo, con el promedio, los percentiles 5 y 95 y un histograma de los valores dentro del país.',
        },
        caption: {
          en: 'Surface soil moisture, 1 Dec 2025 to 30 Apr 2026. NASA SMAP L4, 9 km. Input data, not an analysis result.',
          es: 'Humedad superficial del suelo, del 1 de dic. de 2025 al 30 de abr. de 2026. NASA SMAP L4, 9 km. Datos de entrada, no un resultado del análisis.',
        },
      },
      {
        src: '/products/farmer-early-warning-runoff.jpg',
        alt: {
          en: 'Map of Bangladesh coloured by surface runoff in the dry season, low across most of the country and highest in the north-east.',
          es: 'Mapa de Bangladés coloreado por escorrentía superficial en la estación seca, baja en casi todo el país y más alta al noreste.',
        },
        caption: {
          en: 'Storm surface runoff, same season. FLDAS Noah land surface model, 0.1°. Input data, not an analysis result.',
          es: 'Escorrentía superficial de tormenta, misma estación. Modelo de superficie FLDAS Noah, 0,1°. Datos de entrada, no un resultado del análisis.',
        },
      },
      {
        src: '/products/farmer-early-warning-evapotranspiration.jpg',
        alt: {
          en: 'Map of Bangladesh coloured by total evapotranspiration over the dry season at 500 m, highest in the forested south-east hills.',
          es: 'Mapa de Bangladés coloreado por evapotranspiración total en la estación seca a 500 m, más alta en las colinas boscosas del sureste.',
        },
        caption: {
          en: 'Evapotranspiration, season total. MODIS/Terra MOD16A2, 500 m. Input data, not an analysis result.',
          es: 'Evapotranspiración, total de la estación. MODIS/Terra MOD16A2, 500 m. Datos de entrada, no un resultado del análisis.',
        },
      },
    ],
    featured: false,
  },
  {
    slug: 'air-quality-sensor-placement',
    sector: { en: 'Air quality', es: 'Calidad del aire' },
    name: { en: 'Air-quality sensor placement', es: 'Ubicación de sensores de calidad del aire' },
    location: { en: 'Chișinău, Moldova', es: 'Chisináu, Moldavia' },
    question: {
      en: 'Where should a city put a limited number of air-quality sensors?',
      es: '¿Dónde debería una ciudad instalar un número limitado de sensores de calidad del aire?',
    },
    summary: {
      en: 'Weighs where people live against likely pollution sources and existing coverage, then ranks sensor locations so a small network covers as many residents and hotspots as possible.',
      es: 'Contrasta dónde vive la gente con las fuentes probables de contaminación y la cobertura existente, y ordena ubicaciones para que una red pequeña cubra a la mayor cantidad posible de residentes y puntos críticos.',
    },
    steps: [
      {
        en: 'Maps population density alongside emission sources and road networks.',
        es: 'Mapea la densidad de población junto con fuentes de emisión y redes viales.',
      },
      {
        en: 'Scores candidate locations on the coverage they would add.',
        es: 'Puntúa las ubicaciones candidatas según la cobertura que aportarían.',
      },
      {
        en: 'Ranks placements for the size of network the city can afford.',
        es: 'Ordena las ubicaciones según el tamaño de red que la ciudad puede costear.',
      },
    ],
    data: [
      { en: 'Population and census data', es: 'Datos de población y censo' },
      { en: 'Emissions data', es: 'Datos de emisiones' },
      { en: 'Road networks', es: 'Redes viales' },
      { en: 'Land use', es: 'Uso de suelo' },
    ],
    outputs: [
      { en: 'Ranked sensor locations', es: 'Ubicaciones de sensores ordenadas' },
      { en: 'Coverage map', es: 'Mapa de cobertura' },
    ],
    proof: [],
    image: {
      src: '/products/air-quality-sensor-placement-cover.jpg',
      alt: {
        en: 'Map of Chișinău with the tropospheric nitrogen dioxide column for 2025, highest over the city centre and falling towards the edges.',
        es: 'Mapa de Chișinău con la columna troposférica de dióxido de nitrógeno de 2025, más alta sobre el centro y decreciente hacia los bordes.',
      },
    },
    galleryKind: 'data',
    gallery: [
      {
        src: '/products/air-quality-sensor-placement-no2.jpg',
        alt: {
          en: 'Map of Chișinău coloured by tropospheric nitrogen dioxide for 2025, with the mean, the 5th and 95th percentiles and a histogram of values inside the city boundary.',
          es: 'Mapa de Chișinău coloreado por dióxido de nitrógeno troposférico de 2025, con el promedio, los percentiles 5 y 95 y un histograma de los valores dentro del límite de la ciudad.',
        },
        caption: {
          en: 'Tropospheric nitrogen dioxide, 2025 mean. Copernicus Sentinel-5P. Input data, not an analysis result.',
          es: 'Dióxido de nitrógeno troposférico, promedio de 2025. Copernicus Sentinel-5P. Datos de entrada, no un resultado del análisis.',
        },
      },
    ],
    featured: false,
  },
  {
    slug: 'net-zero-opportunity-scan',
    sector: { en: 'Cities', es: 'Ciudades' },
    name: { en: 'Net-zero opportunity scan', es: 'Escaneo de oportunidades net-zero' },
    location: { en: 'Córdoba, Argentina', es: 'Córdoba, Argentina' },
    question: {
      en: 'Where are a city’s biggest opportunities to cut emissions?',
      es: '¿Dónde están las mayores oportunidades de una ciudad para reducir emisiones?',
    },
    summary: {
      en: 'Scans a city’s emissions, infrastructure and land use to locate the interventions with the most potential, and ranks them so climate plans start where they will count most.',
      es: 'Analiza las emisiones, la infraestructura y el uso de suelo de una ciudad para ubicar las intervenciones con más potencial, y las ordena para que los planes climáticos empiecen donde más cuentan.',
    },
    steps: [
      {
        en: 'Maps emissions against infrastructure and land use across the city.',
        es: 'Mapea las emisiones frente a la infraestructura y el uso de suelo de la ciudad.',
      },
      {
        en: 'Identifies candidate interventions by area.',
        es: 'Identifica intervenciones candidatas por zona.',
      },
      {
        en: 'Ranks opportunities and shows the evidence behind each one.',
        es: 'Ordena las oportunidades y muestra la evidencia de cada una.',
      },
    ],
    data: [
      { en: 'Emissions data', es: 'Datos de emisiones' },
      { en: 'Infrastructure networks', es: 'Redes de infraestructura' },
      { en: 'Land use', es: 'Uso de suelo' },
      { en: 'Satellite imagery, including night-time lights', es: 'Imágenes satelitales, incluidas luces nocturnas' },
    ],
    outputs: [
      { en: 'Opportunity map', es: 'Mapa de oportunidades' },
      { en: 'Ranked intervention list', es: 'Lista de intervenciones ordenada' },
    ],
    proof: [],
    image: {
      src: '/products/net-zero-opportunity-scan-cover.jpg',
      alt: {
        en: 'Map of Córdoba, Argentina, showing night-time light radiance for 2025, brightest in the centre and along the main corridors.',
        es: 'Mapa de Córdoba, Argentina, con la radiancia de luces nocturnas de 2025, más intensa en el centro y a lo largo de los corredores principales.',
      },
    },
    galleryKind: 'data',
    gallery: [
      {
        src: '/products/net-zero-opportunity-scan-night-lights.jpg',
        alt: {
          en: 'Map of Córdoba coloured by night-time radiance for 2025, with the mean, the 5th and 95th percentiles and a histogram of values inside the city boundary.',
          es: 'Mapa de Córdoba coloreado por radiancia nocturna de 2025, con el promedio, los percentiles 5 y 95 y un histograma de los valores dentro del límite de la ciudad.',
        },
        caption: {
          en: 'Night-time lights, 2025 mean. VIIRS Day/Night Band monthly composites. Input data, not an analysis result.',
          es: 'Luces nocturnas, promedio de 2025. Compuestos mensuales VIIRS Day/Night Band. Datos de entrada, no un resultado del análisis.',
        },
      },
    ],
    featured: false,
  },
  {
    slug: 'green-corridors',
    sector: { en: 'Resilience', es: 'Resiliencia' },
    name: { en: 'Green corridors', es: 'Corredores verdes' },
    location: { en: 'Validated capability', es: 'Capacidad validada' },
    question: {
      en: 'Where should green space connect to protect people and ecosystems?',
      es: '¿Dónde debería conectarse el espacio verde para proteger a las personas y los ecosistemas?',
    },
    summary: {
      en: 'Finds routes where connected green space would do the most for climate resilience, combining land cover, terrain and exposure data, and ranks corridor options for planners to take forward.',
      es: 'Encuentra trazados donde un espacio verde conectado aportaría más a la resiliencia climática, combinando cobertura de suelo, terreno y datos de exposición, y ordena opciones de corredor para que los planificadores las desarrollen.',
    },
    steps: [
      {
        en: 'Maps existing green space, land cover and terrain.',
        es: 'Mapea el espacio verde existente, la cobertura de suelo y el terreno.',
      },
      {
        en: 'Scores connections on the exposure they would reduce.',
        es: 'Puntúa las conexiones según la exposición que reducirían.',
      },
      {
        en: 'Ranks corridor options with the reasoning attached.',
        es: 'Ordena las opciones de corredor con el razonamiento incluido.',
      },
    ],
    data: [
      { en: 'Satellite imagery and land cover', es: 'Imágenes satelitales y cobertura de suelo' },
      { en: 'Digital elevation models', es: 'Modelos digitales de elevación' },
      { en: 'Climate exposure data', es: 'Datos de exposición climática' },
      { en: 'Land use and census data', es: 'Uso de suelo y datos censales' },
    ],
    outputs: [
      { en: 'Corridor options on the map', es: 'Opciones de corredor en el mapa' },
      { en: 'Ranked list with evidence', es: 'Lista ordenada con evidencia' },
    ],
    proof: [],
    featured: false,
  },
  {
    slug: 'vegetation-change-analysis',
    sector: { en: 'Land and ecosystems', es: 'Territorio y ecosistemas' },
    name: { en: 'Vegetation change analysis', es: 'Análisis de cambio de vegetación' },
    location: { en: 'Arequipa, Peru', es: 'Arequipa, Perú' },
    question: {
      en: 'Where is the land greening, and where is it losing ground?',
      es: '¿Dónde reverdece el territorio, y dónde está perdiendo terreno?',
    },
    summary: {
      en: 'Upload any area, ask in plain language, and see how its vegetation has changed year by year since 2017, from free Landsat satellite imagery. An area-wide average can look stable while parts of the land recover or decline; the map shows exactly where.',
      es: 'Suba cualquier área, pregunte en lenguaje natural y vea cómo cambió su vegetación año a año desde 2017, con imágenes satelitales Landsat gratuitas. Un promedio del área puede parecer estable mientras partes del territorio se recuperan o decaen; el mapa muestra exactamente dónde.',
    },
    steps: [
      { en: 'Upload your area and ask in the chat.', es: 'Suba su área y pregunte en el chat.' },
      { en: 'Approve the plan. Nothing runs before you do.', es: 'Apruebe el plan. Nada se ejecuta antes.' },
      { en: 'One clean image per year, early period against recent.', es: 'Una imagen limpia por año, periodo inicial frente al reciente.' },
      { en: 'Explore six map views of the change.', es: 'Explore seis vistas del cambio en el mapa.' },
      { en: 'Rank areas by change and download the results.', es: 'Ordene áreas por cambio y descargue los resultados.' },
    ],
    data: [
      { en: 'Landsat satellite imagery, 2017 to today', es: 'Imágenes satelitales Landsat, de 2017 a hoy' },
      { en: 'Satellite-based vegetation index (NDVI)', es: 'Índice de vegetación satelital (NDVI)' },
      { en: 'Your own study area', es: 'Su propia área de estudio' },
      { en: 'Processed with Google Earth Engine', es: 'Procesado con Google Earth Engine' },
    ],
    outputs: [
      { en: 'Change-class and heatmap views', es: 'Vistas de clases de cambio y mapa de calor' },
      { en: 'Year-by-year maps and long-term trend', es: 'Mapas año a año y tendencia de largo plazo' },
      { en: 'Ranked priority cells and zone breakdown', es: 'Celdas prioritarias ordenadas y desglose por zonas' },
      { en: 'GeoTIFF, CSV, GeoJSON and Shapefile downloads', es: 'Descargas en GeoTIFF, CSV, GeoJSON y Shapefile' },
    ],
    proof: [
      {
        value: '6,687 ha',
        label: {
          en: 'Show a recovery signal in a 225 km² watershed near Arequipa (2017-2025) whose average looked stable',
          es: 'Muestran señal de recuperación en una cuenca de 225 km² cerca de Arequipa (2017-2025) cuyo promedio parecía estable',
        },
      },
      {
        value: '136 ha',
        label: {
          en: 'Show a decrease signal in the same watershed, with 9 of 9 years of usable satellite data',
          es: 'Muestran señal de disminución en la misma cuenca, con 9 de 9 años de datos satelitales utilizables',
        },
      },
    ],
    sourceNote: {
      en: 'Landsat Collection 2 Level-2 surface reflectance; USGS/NASA.',
      es: 'Landsat Collection 2 Level-2, reflectancia de superficie; USGS/NASA.',
    },
    featured: true,
    image: {
      src: '/products/vegetation-change-analysis-cover.jpg',
      alt: {
        en: 'Shaded-relief map of a 225 km² watershed near Arequipa, 2017 to 2025, with each pixel coloured by vegetation recovery, decrease, stable or uncertain.',
        es: 'Mapa de relieve sombreado de una cuenca de 225 km² cerca de Arequipa, de 2017 a 2025, con cada píxel coloreado según recuperación, disminución, estable o incierto.',
      },
    },
    gallery: [
      {
        src: '/products/vegetation-change-analysis-classes.jpg',
        alt: {
          en: 'Map of a watershed near Arequipa with each 320 m pixel classed as vegetation recovery, decrease, stable or uncertain, beside the summary numbers and a yearly NDVI line from 2017 to 2025.',
          es: 'Mapa de una cuenca cerca de Arequipa con cada píxel de 320 m clasificado como recuperación, disminución, estable o incierto, junto a las cifras resumen y una línea de NDVI anual de 2017 a 2025.',
        },
        caption: {
          en: 'Change classes: where the signal is recovery, decrease or neither. 225 km² watershed near Arequipa, 2017 to 2025.',
          es: 'Clases de cambio: dónde la señal es recuperación, disminución o ninguna. Cuenca de 225 km² cerca de Arequipa, de 2017 a 2025.',
        },
      },
      {
        src: '/products/vegetation-change-analysis-heatmap.jpg',
        alt: {
          en: 'The same watershed as a continuous heatmap of recent NDVI minus early NDVI, red for decrease through green for increase.',
          es: 'La misma cuenca como mapa de calor continuo del NDVI reciente menos el inicial, de rojo para disminución a verde para aumento.',
        },
        caption: {
          en: 'Change heatmap: the recent three years minus the first three.',
          es: 'Mapa de calor del cambio: los tres años recientes menos los tres primeros.',
        },
      },
      {
        src: '/products/vegetation-change-analysis-years.jpg',
        alt: {
          en: 'Nine small maps of the watershed, one per year from 2017 to 2025, each showing the NDVI of that year and its mean.',
          es: 'Nueve mapas pequeños de la cuenca, uno por año de 2017 a 2025, cada uno con el NDVI de ese año y su promedio.',
        },
        caption: {
          en: 'One composite per year, May to October, on a shared colour scale.',
          es: 'Un compuesto por año, de mayo a octubre, con una escala de color común.',
        },
      },
    ],
    // Colours for change classes and the yearly ramp come from the feature brief.
    // Trend, data quality and review grid have no documented hex values, so they
    // reuse the class colours (trend, grid) and a plain blue scale (quality).
    views: {
      title: { en: 'Six ways to read the change', es: 'Seis formas de leer el cambio' },
      items: [
        {
          name: { en: 'Change classes', es: 'Clases de cambio' },
          description: {
            en: 'Every pixel classed from strong recovery to strong decrease, with uncertain areas marked.',
            es: 'Cada píxel clasificado de recuperación fuerte a disminución fuerte, con las zonas inciertas marcadas.',
          },
          swatch: ['#0f766e', '#67c5bb', '#cbd5e1', '#94a3b8', '#f6b77a', '#c2410c'],
        },
        {
          name: { en: 'Change heatmap', es: 'Mapa de calor del cambio' },
          description: {
            en: 'Recent average minus early average, as one continuous surface.',
            es: 'Promedio reciente menos promedio inicial, como una superficie continua.',
          },
          swatch: ['#c2410c', '#f6b77a', '#ffffe5', '#78c679', '#238443'],
        },
        {
          name: { en: 'Vegetation by year', es: 'Vegetación por año' },
          description: {
            en: 'The vegetation map for any single year, with a slider to move through time.',
            es: 'El mapa de vegetación de cualquier año, con un deslizador para moverse en el tiempo.',
          },
          swatch: ['#ffffe5', '#d9f0a3', '#78c679', '#238443', '#004529'],
        },
        {
          name: { en: 'Long-term trend', es: 'Tendencia de largo plazo' },
          description: {
            en: 'The direction and consistency of change across every year.',
            es: 'La dirección y consistencia del cambio a lo largo de todos los años.',
          },
          swatch: ['#c2410c', '#cbd5e1', '#0f766e'],
        },
        {
          name: { en: 'Data quality', es: 'Calidad de datos' },
          description: {
            en: 'How many valid years support each pixel. Gaps are marked, never guessed.',
            es: 'Cuántos años válidos respaldan cada píxel. Los vacíos se marcan, nunca se inventan.',
          },
          swatch: ['#dbeafe', '#93c5fd', '#3b82f6', '#1e40af'],
        },
        {
          name: { en: 'Review grid', es: 'Grilla de revisión' },
          description: {
            en: 'Coarser cells coloured by their share of gaining and losing area, ready to rank.',
            es: 'Celdas más gruesas coloreadas según su proporción de área que gana y pierde, listas para ordenar.',
          },
          swatch: ['#c2410c', '#f6b77a', '#67c5bb', '#0f766e'],
        },
      ],
    },
    trust: [
      { en: 'Runs only after you approve the plan', es: 'Solo se ejecuta después de que usted aprueba el plan' },
      { en: 'Every result shows its data quality', es: 'Cada resultado muestra la calidad de sus datos' },
      { en: 'Built on USGS/NASA Landsat and Google Earth Engine', es: 'Construido sobre Landsat de USGS/NASA y Google Earth Engine' },
    ],
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
