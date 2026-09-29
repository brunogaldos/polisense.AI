// Polisense's in-house analysis engines, shown on /platform/ and linked from
// product pages. Sources: ANALYSIS_TOOLS.md (the app team's tool guide) and
// VEGETATION_ANALYSIS_FEATURE.md.
//
// Overview only, by decision: a name, one plain sentence, up to three things
// the user gets, and the products each engine powers. Do not add tool names,
// pipeline steps, algorithms, thresholds or file paths here; the workflow
// stays private. Engine names are descriptive, not registered trademarks;
// rename them here and the whole site follows.

import type { Localized } from '@/lib/products'

export type EngineIcon = 'droplets' | 'sun' | 'leaf' | 'satellite' | 'layers' | 'file-search' | 'file-text'

export interface Toolkit {
  id: string
  icon: EngineIcon
  name: Localized
  summary: Localized
  /** What the user gets out of it. Keep to three short items. */
  outputs: Localized[]
  /** Product slugs (lib/products.ts) this engine is verified to power. */
  usedBy: string[]
}

export const toolkits: Toolkit[] = [
  {
    id: 'hydro-screening',
    icon: 'droplets',
    name: { en: 'Hydro Screening Engine', es: 'Motor de Evaluación Hidrológica' },
    summary: {
      en: 'Finds natural basins that could hold water and ranks them for field validation.',
      es: 'Encuentra cuencas naturales capaces de retener agua y las ordena para validar en campo.',
    },
    outputs: [
      { en: 'Ranked candidate sites', es: 'Sitios candidatos ordenados' },
      { en: '3D terrain view', es: 'Vista 3D del terreno' },
      { en: 'GIS exports', es: 'Exportaciones SIG' },
    ],
    usedBy: ['water-storage-mapping'],
  },
  {
    id: 'renewable-siting',
    icon: 'sun',
    name: { en: 'Renewable Siting Engine', es: 'Motor de Ubicación Renovable' },
    summary: {
      en: 'A guided assessment: choose an area, check the data, preview, then rank every unit for renewable potential.',
      es: 'Una evaluación guiada: elija un área, revise los datos, previsualice y ordene cada unidad por potencial renovable.',
    },
    outputs: [
      { en: 'Ranked map of the area', es: 'Mapa ordenado del área' },
      { en: 'Top-units table', es: 'Tabla de mejores unidades' },
      { en: 'Weights and confidence', es: 'Pesos y nivel de confianza' },
    ],
    usedBy: ['solar-site-screening'],
  },
  {
    id: 'vegetation-change',
    icon: 'leaf',
    name: { en: 'Vegetation Change Engine', es: 'Motor de Cambio de Vegetación' },
    summary: {
      en: 'Shows how vegetation has changed year by year since 2017, and exactly where the land is recovering or declining.',
      es: 'Muestra cómo cambió la vegetación año a año desde 2017, y exactamente dónde el territorio se recupera o decae.',
    },
    outputs: [
      { en: 'Change maps, year by year', es: 'Mapas de cambio, año a año' },
      { en: 'Priority areas ranked', es: 'Áreas prioritarias ordenadas' },
      { en: 'GIS downloads', es: 'Descargas SIG' },
    ],
    usedBy: ['vegetation-change-analysis'],
  },
  {
    id: 'earth-observation',
    icon: 'satellite',
    name: { en: 'Earth Observation Engine', es: 'Motor de Observación de la Tierra' },
    summary: {
      en: 'Satellite and climate indicators from a reviewed catalogue, summarised for your area: rainfall, temperature, soil moisture, air quality and more.',
      es: 'Indicadores satelitales y climáticos de un catálogo revisado, resumidos para su área: lluvia, temperatura, humedad del suelo, calidad del aire y más.',
    },
    outputs: [
      { en: 'Indicator values for your area', es: 'Valores de indicadores para su área' },
      { en: 'Satellite map layers', es: 'Capas satelitales en el mapa' },
    ],
    usedBy: [],
  },
  {
    id: 'layer-intelligence',
    icon: 'layers',
    name: { en: 'Layer Intelligence Engine', es: 'Motor de Inteligencia de Capas' },
    summary: {
      en: 'Upload your GIS layers and it works out what each one is, then runs the analyses your data supports.',
      es: 'Suba sus capas SIG y el motor deduce qué es cada una, y luego ejecuta los análisis que sus datos permiten.',
    },
    outputs: [
      { en: 'Layer profiles', es: 'Perfiles de capas' },
      { en: 'Statistics tables', es: 'Tablas de estadísticas' },
      { en: 'Ranked parcels', es: 'Parcelas ordenadas' },
    ],
    usedBy: [],
  },
  {
    id: 'document-intelligence',
    icon: 'file-search',
    name: { en: 'Document Intelligence Engine', es: 'Motor de Inteligencia Documental' },
    summary: {
      en: 'Ask questions of your documents and regulations and get cited answers. Boundary tables become shapes on the map.',
      es: 'Pregunte a sus documentos y normas y obtenga respuestas con citas. Las tablas de linderos se convierten en formas en el mapa.',
    },
    outputs: [
      { en: 'Cited passages', es: 'Pasajes citados' },
      { en: 'Boundaries on the map', es: 'Linderos en el mapa' },
    ],
    usedBy: [],
  },
  {
    id: 'report-builder',
    icon: 'file-text',
    name: { en: 'Report Builder', es: 'Generador de Informes' },
    summary: {
      en: 'An executive report for whatever you ran, with its references, ready to share or export to Word.',
      es: 'Un informe ejecutivo de lo que ejecutó, con sus referencias, listo para compartir o exportar a Word.',
    },
    outputs: [
      { en: 'Executive report', es: 'Informe ejecutivo' },
      { en: 'References list', es: 'Lista de referencias' },
      { en: 'Word export', es: 'Exportación a Word' },
    ],
    usedBy: ['solar-site-screening', 'water-storage-mapping', 'vegetation-change-analysis'],
  },
]

export function toolkitsFor(productSlug: string): Toolkit[] {
  return toolkits.filter((toolkit) => toolkit.usedBy.includes(productSlug))
}
