'use client'

import { Calendar, Clock, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react'
import { featuredPost } from '@/lib/blog/posts'
import { useLanguage } from '@/lib/i18n/context'
import { HeroIllustration, ParcelMapIllustration, InfrastructureIllustration } from './visuals'

interface EiaArequipaArticleProps {
  /** Opens the site's existing lead-capture modal, scoped to the pilot CTA. */
  onOpenPilotForm: () => void
}

interface EvidenceLayer {
  number: string
  title: string
  description: string
  stat?: string
}

interface Lesson {
  number: string
  title: string
  description: string
  closing?: string
}

interface TimelineStep {
  value: string
  unit: string
  label: string
  emphasized?: boolean
}

interface ArticleContent {
  heroCaption: string
  ledeP1: string
  ledeP2: string
  timeline: TimelineStep[]
  caseTitle: string
  mapCaption: string
  caseParas: string[]
  howBuiltTitle: string
  howBuiltIntroPre: string
  howBuiltIntroStrong: string
  howBuiltIntroPost: string
  evidenceLayers: EvidenceLayer[]
  resolvedTitle: string
  resolvedIntro: string
  resolvedItems: string[]
  infraCaption: string
  notResolvedTitle: string
  notResolvedP1: string
  notResolvedP2: string
  knownTitle: string
  knownRecap: string[]
  pendingTitle: string
  pendingValidation: string[]
  notResolvedFooter: string
  lessonsTitle: string
  lessons: Lesson[]
  ctaTitle: string
  ctaP1Pre: string
  ctaP1Strong: string
  ctaP1Post: string
  ctaP2: string
  ctaBadge: string
  ctaP3: string
  ctaP4: string
  ctaButton: string
  ctaQuote: string
  heroAlt: string
  mapAlt: string
  infraAlt: string
  connectorLabel: string
  majesLabel: string
  majesSubLabel: string
  santaRitaLabel: string
  santaRitaSubLabel: string
}

const content: Record<'es' | 'en', ArticleContent> = {
  es: {
    heroCaption:
      'Desierto del sur del Perú: el mismo terreno donde se evalúan el recurso solar y la infraestructura de transmisión.',
    ledeP1:
      'Un Estudio de Impacto Ambiental detallado del sector minero demoraba unos 400 días hábiles en ser evaluado hasta 2024. Hoy demora cerca de 300. Y el Servicio Nacional de Certificación Ambiental para las Inversiones Sostenibles (SENACE) se puso una meta de 150 a 160 días hábiles para 2026. Piensa lograrlo simplificando trámites, conectando sus sistemas con los de otras entidades del Estado y usando inteligencia artificial para revisar si un expediente llega completo antes de evaluarlo a fondo.',
    ledeP2:
      'Si esa meta se cumple, el cuello de botella se muda. Deja de estar en la evaluación y pasa a estar en la preparación. Un titular que antes tenía doce meses de evaluación para acomodar campañas de campo, participación ciudadana y trabajo de escritorio, de pronto tiene la mitad. Y la parte que más se comprime no es la de campo (esa tiene estacionalidad, permisos y logística propia, y no se acelera con software) sino el trabajo de escritorio: la recopilación, la depuración, el cruce y la redacción trazable de todo lo que ya existe. Esa es la parte que decidimos automatizar.',
    timeline: [
      { value: '400', unit: 'días', label: 'Hasta 2024' },
      { value: '~300', unit: 'días', label: 'Hoy' },
      { value: '150–160', unit: 'días', label: 'Meta SENACE 2026', emphasized: true },
    ],
    caseTitle: 'El caso: Majes y Santa Rita',
    mapCaption:
      'Mapa ilustrado de los predios evaluados, trazado a partir de los límites reales (GeoJSON) de Majes y Santa Rita de Siguas — no es una imagen satelital.',
    caseParas: [
      'Trabajamos con la Gerencia Regional de Ciencia, Tecnología e Innovación (CTI) del Gobierno Regional (GORE) de Arequipa en el análisis de dos terrenos estatales con potencial para el desarrollo de un parque industrial vinculado a energías renovables, hidrógeno verde e industrias electrointensivas: el predio Majes, ubicado en la irrigación Majes-Pedregal, y el predio Santa Rita de Siguas. Ambos se encuentran bajo la modalidad de Proyectos en Activos (PEA), mecanismo que permite desarrollar inversiones sobre terrenos de propiedad del Estado.',
      'El encargo consistió en elaborar y presentar un expediente técnico comparativo de ambos predios, evaluando sus características, aptitud y condiciones para el desarrollo del proyecto, con el objetivo de proporcionar a la empresa desarrolladora los elementos técnicos necesarios para seleccionar la alternativa más idónea.',
      'Asimismo, se formularon recomendaciones sustentadas en el cruce de información territorial, de infraestructura, disponibilidad de recursos, accesibilidad y otros factores relevantes para apoyar el proceso de toma de decisiones.',
    ],
    howBuiltTitle: 'Cómo se construyó',
    howBuiltIntroPre: 'El expediente se armó sobre ',
    howBuiltIntroStrong: 'cuatro capas de evidencia',
    howBuiltIntroPost: ', cada una identificada por separado:',
    evidenceLayers: [
      {
        number: '01',
        title: 'Expediente registral',
        description:
          'Coordenadas oficiales en el sistema UTM del catastro peruano, superficies, partidas registrales y fases del proyecto.',
      },
      {
        number: '02',
        title: 'Informe GORE Arequipa',
        description: 'Acredita la modalidad PEA, quién es el titular y el estado de saneamiento.',
      },
      {
        number: '03',
        title: 'Cálculos geoespaciales',
        description:
          'Área de cada polígono y distancia entre los predios, calculadas a partir de las propias tablas de coordenadas del expediente.',
      },
      {
        number: '04',
        title: 'Fuentes públicas',
        description:
          'Más de 50 fuentes ordenadas por tema: recurso solar y clima, proyectos fotovoltaicos y de transmisión, puertos y logística, marco legal y ambiental.',
        stat: '50+',
      },
    ],
    resolvedTitle: 'Lo que el sistema resolvió en días',
    resolvedIntro: 'Sobre esa base, el sistema resolvió en días cosas que suelen tomar semanas de escritorio:',
    resolvedItems: [
      'Ubicó los predios respecto de la subestación eléctrica de Majes, de 138/60/10 kV y ya operativa, y respecto del corredor de transmisión de 500/220 kV que está previsto para la zona.',
      'Calculó la salida logística hacia el puerto de Matarani, a unos 129 kilómetros por carretera desde El Pedregal.',
      'Contrastó el recurso solar declarado en el expediente con estudios de radiación de la franja desértica del sur del país.',
      'Ordenó qué permisos aplican y en qué secuencia, entre el Sistema Nacional de Evaluación del Impacto Ambiental (SEIA), la Ley de Concesiones Eléctricas, la certificación arqueológica y la coordinación con la Autoridad Nacional del Agua (ANA).',
    ],
    infraCaption: 'Infraestructura y marco normativo identificados a partir del expediente y las fuentes públicas.',
    notResolvedTitle: 'Lo que el sistema no pudo resolver',
    notResolvedP1: 'También es importante mostrar las limitaciones.',
    notResolvedP2: 'El sistema dejó anotado lo que no pudo resolver:',
    knownTitle: 'Lo que sabemos',
    knownRecap: [
      'Ubicación frente a la subestación de Majes (138/60/10 kV) y el corredor previsto de 500/220 kV.',
      'Ruta logística hacia el puerto de Matarani (~129 km por carretera).',
      'Contraste del recurso solar declarado frente a estudios de radiación regionales.',
      'Secuencia de permisos: SEIA, concesiones eléctricas, certificación arqueológica y ANA.',
    ],
    pendingTitle: 'Lo que todavía debemos validar',
    pendingValidation: [
      'No logró confirmar si el trazado del corredor de 500/220 kV cruza los predios, porque eso exige superponer las coordenadas contra la línea oficial aprobada.',
      'Tampoco pudo dar por validado el recurso solar, porque para eso hace falta una estación meteorológica midiendo en el terreno durante al menos doce meses.',
    ],
    notResolvedFooter: 'La automatización no sustituye las verificaciones técnicas de campo.',
    lessonsTitle: 'Tres lecciones para quien prepara expedientes',
    lessons: [
      {
        number: '01',
        title: 'La trazabilidad importa más que la velocidad',
        description:
          'En este expediente cada afirmación tiene detrás un código de fuente. Eso es lo que sostiene el documento cuando la autoridad observa.',
      },
      {
        number: '02',
        title: 'Declarar los vacíos también es un resultado',
        description:
          'Las brechas que quedaron abiertas indican con precisión en qué conviene gastar el presupuesto de campo. Un buen trabajo de escritorio orienta el trabajo de campo y lo vuelve más barato.',
      },
      {
        number: '03',
        title: 'El cuello de botella se movió y conviene mirarlo de frente',
        description:
          'Si el SENACE cumple su meta de 150 a 160 días, la ventaja de una consultora pasará a depender de cuántos expedientes de calidad logra preparar en paralelo con el mismo equipo senior.',
        closing: 'Esa es una pregunta de capacidad, y la capacidad se contrata o se automatiza.',
      },
    ],
    ctaTitle: 'Una invitación concreta',
    ctaP1Pre: 'Estamos abriendo ',
    ctaP1Strong: 'tres pilotos gratuitos',
    ctaP1Post: ' con consultoras registradas ante el SENACE.',
    ctaP2:
      'Nos dan un proyecto real en curso, entregamos el trabajo de escritorio en el formato que ustedes ya usan, y su equipo la revisa cómo revisaría el trabajo de un analista junior.',
    ctaBadge: 'Sin costo y sin compromiso comercial',
    ctaP3:
      'Nosotros no firmamos instrumentos de gestión ambiental. Eso le corresponde a una consultora registrada ante el SENACE y a profesionales colegiados que responden con su nombre.',
    ctaP4: 'El trabajo de Polisense es la base previa, todo el análisis de datos que se puede automatizar.',
    ctaButton: 'Postula tu proyecto piloto',
    ctaQuote:
      '“Si preparan instrumentos ambientales en minería o energía en el Perú y esto les resulta útil o discutible, escríbanme. Las objeciones técnicas son bienvenidas.”',
    heroAlt: 'Atardecer sobre dunas desérticas con un parque solar y una torre de transmisión en el horizonte',
    mapAlt: 'Mapa de los predios evaluados, trazado a partir de los límites reales de Majes y Santa Rita de Siguas, Arequipa',
    infraAlt:
      'Elementos identificados por Polisense: subestación de Majes, corredor de transmisión previsto, recurso solar, ruta logística a Matarani y secuencia normativa',
    connectorLabel: 'predios evaluados',
    majesLabel: 'Predio Majes',
    majesSubLabel: 'Irrigación Majes-Pedregal',
    santaRitaLabel: 'Santa Rita',
    santaRitaSubLabel: 'de Siguas',
  },
  en: {
    heroCaption:
      "Southern Peru's desert: the same terrain where solar resource and transmission infrastructure are being assessed.",
    ledeP1:
      "A detailed Environmental Impact Assessment for the mining sector used to take about 400 business days to be evaluated, until 2024. Today it takes close to 300. And Peru's National Service for Environmental Certification for Sustainable Investments (SENACE) has set itself a target of 150 to 160 business days by 2026. It plans to get there by simplifying procedures, connecting its systems with those of other government agencies, and using artificial intelligence to check whether a case file is complete before evaluating it in depth.",
    ledeP2:
      "If that target is met, the bottleneck moves. It stops being in the evaluation stage and becomes the preparation stage. A project holder who used to have twelve months of evaluation time to fit in field campaigns, public participation, and desk work suddenly has half of that. And the part that gets squeezed the most isn't the field work (that has its own seasonality, permits, and logistics, and doesn't speed up with software) but the desk work: gathering, cleaning, cross-referencing, and the traceable write-up of everything that already exists. That's the part we decided to automate.",
    timeline: [
      { value: '400', unit: 'days', label: 'Until 2024' },
      { value: '~300', unit: 'days', label: 'Today' },
      { value: '150–160', unit: 'days', label: 'SENACE 2026 target', emphasized: true },
    ],
    caseTitle: 'The case: Majes and Santa Rita',
    mapCaption:
      'Illustrated map of the evaluated parcels, traced from the real boundaries (GeoJSON) of Majes and Santa Rita de Siguas — not a satellite image.',
    caseParas: [
      'We worked with the Regional Management of Science, Technology and Innovation (CTI) of the Regional Government (GORE) of Arequipa on the analysis of two state-owned parcels with potential for developing an industrial park linked to renewable energy, green hydrogen, and electro-intensive industries: the Majes parcel, located in the Majes-Pedregal irrigation area, and the Santa Rita de Siguas parcel. Both fall under the Projects on Assets (PEA) mechanism, which allows investments to be developed on state-owned land.',
      "The assignment consisted of preparing and presenting a comparative technical case file for both parcels, evaluating their characteristics, suitability, and conditions for the project's development, with the goal of giving the developing company the technical elements needed to select the most suitable option.",
      'Recommendations were also put forward, grounded in the cross-referencing of territorial and infrastructure information, resource availability, accessibility, and other relevant factors to support the decision-making process.',
    ],
    howBuiltTitle: 'How it was built',
    howBuiltIntroPre: 'The case file was built on ',
    howBuiltIntroStrong: 'four layers of evidence',
    howBuiltIntroPost: ', each one separately identified:',
    evidenceLayers: [
      {
        number: '01',
        title: 'Registry file',
        description:
          "Official coordinates in the UTM system of the Peruvian land registry, surface areas, registry entries, and the project's phases.",
      },
      {
        number: '02',
        title: 'GORE Arequipa report',
        description: 'Certifies the PEA mechanism, who the title holder is, and the land title status.',
      },
      {
        number: '03',
        title: 'Geospatial calculations',
        description:
          "Area of each polygon and distance between the parcels, calculated from the case file's own coordinate tables.",
      },
      {
        number: '04',
        title: 'Public sources',
        description:
          'More than 50 sources organized by topic: solar resource and climate, photovoltaic and transmission projects, ports and logistics, legal and environmental framework.',
        stat: '50+',
      },
    ],
    resolvedTitle: 'What the system resolved in days',
    resolvedIntro: 'On that basis, the system resolved in days things that usually take weeks of desk work:',
    resolvedItems: [
      'Located the parcels relative to the Majes electrical substation, 138/60/10 kV and already operating, and relative to the 500/220 kV transmission corridor planned for the area.',
      'Calculated the logistics route to the port of Matarani, about 129 kilometers by road from El Pedregal.',
      "Cross-checked the solar resource stated in the case file against radiation studies for the country's southern desert strip.",
      'Sorted out which permits apply and in what sequence, across the National Environmental Impact Assessment System (SEIA), the Electrical Concessions Law, archaeological certification, and coordination with the National Water Authority (ANA).',
    ],
    infraCaption: 'Infrastructure and regulatory framework identified from the case file and public sources.',
    notResolvedTitle: "What the system couldn't resolve",
    notResolvedP1: "It's also important to show the limitations.",
    notResolvedP2: "The system flagged what it couldn't resolve:",
    knownTitle: 'What we know',
    knownRecap: [
      'Location relative to the Majes substation (138/60/10 kV) and the planned 500/220 kV corridor.',
      'Logistics route to the port of Matarani (~129 km by road).',
      'Cross-check of the stated solar resource against regional radiation studies.',
      'Permit sequence: SEIA, electrical concessions, archaeological certification, and ANA.',
    ],
    pendingTitle: 'What we still need to validate',
    pendingValidation: [
      'Could not confirm whether the 500/220 kV corridor route crosses the parcels, because that requires overlaying the coordinates against the officially approved line.',
      'Nor could it validate the solar resource, because that requires a weather station measuring on-site for at least twelve months.',
    ],
    notResolvedFooter: "Automation doesn't replace technical field verification.",
    lessonsTitle: 'Three lessons for anyone preparing case files',
    lessons: [
      {
        number: '01',
        title: 'Traceability matters more than speed',
        description:
          "In this case file, every statement has a source code behind it. That's what holds the document up when the authority raises questions.",
      },
      {
        number: '02',
        title: 'Declaring the gaps is also a result',
        description:
          'The gaps that were left open point precisely to where the field budget should be spent. Good desk work guides the field work and makes it cheaper.',
      },
      {
        number: '03',
        title: "The bottleneck moved, and it's worth looking at it head-on",
        description:
          "If SENACE meets its 150-to-160-day target, a consultancy's edge will come to depend on how many quality case files it can prepare in parallel with the same senior team.",
        closing: "That's a question of capacity, and capacity is either hired or automated.",
      },
    ],
    ctaTitle: 'A concrete invitation',
    ctaP1Pre: "We're opening ",
    ctaP1Strong: 'three free pilots',
    ctaP1Post: ' with consultancies registered with SENACE.',
    ctaP2:
      "You give us a real project already underway, we deliver the desk work in the format you already use, and your team reviews it the way it would review a junior analyst's work.",
    ctaBadge: 'No cost and no commercial commitment',
    ctaP3:
      "We don't sign environmental management instruments. That's the responsibility of a consultancy registered with SENACE and licensed professionals who put their name behind it.",
    ctaP4: "Polisense's work is the groundwork beforehand — all the data analysis that can be automated.",
    ctaButton: 'Apply for a pilot project',
    ctaQuote:
      '“If you prepare environmental instruments for mining or energy in Peru and this is useful or debatable to you, write to me. Technical objections are welcome.”',
    heroAlt: 'Sunset over desert dunes with a solar farm and a transmission tower on the horizon',
    mapAlt: 'Map of the evaluated parcels, traced from the real boundaries of Majes and Santa Rita de Siguas, Arequipa',
    infraAlt:
      'Elements identified by Polisense: the Majes substation, the planned transmission corridor, solar resource, the logistics route to Matarani, and the regulatory sequence',
    connectorLabel: 'evaluated parcels',
    majesLabel: 'Predio Majes',
    majesSubLabel: 'Majes-Pedregal irrigation area',
    santaRitaLabel: 'Santa Rita',
    santaRitaSubLabel: 'de Siguas',
  },
}

export default function EiaArequipaArticle({ onOpenPilotForm }: EiaArequipaArticleProps) {
  const { language } = useLanguage()
  const T = content[language]
  const post = featuredPost

  return (
    <article className="pb-8">
      {/* Article header */}
      <header className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
        <span className="inline-flex px-4 py-1.5 bg-[#5E8EA6]/10 border border-[#5E8EA6]/30 rounded-full text-xs sm:text-sm text-[#5E8EA6] font-medium mb-6">
          {post.category[language]}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#141517] tracking-tight leading-tight mb-5">
          {post.title[language]}
        </h1>
        <p className="text-lg sm:text-xl text-[#141517]/70 leading-relaxed mb-6">{post.subtitle[language]}</p>
        <div className="flex items-center justify-center gap-4 text-sm text-[#141517]/50">
          <span className="flex items-center gap-1.5">
            <Calendar size={15} />
            <time dateTime={post.date}>{post.dateLabel[language]}</time>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} />
            {post.readingTime[language]}
          </span>
        </div>
      </header>

      {/* Hero image */}
      <figure className="max-w-5xl mx-auto mb-12 sm:mb-16">
        <div className="rounded-2xl overflow-hidden border border-[#E3DED6] shadow-md">
          <HeroIllustration className="w-full h-[220px] sm:h-[340px] md:h-[420px]" title={T.heroAlt} />
        </div>
        <figcaption className="text-xs text-[#141517]/45 text-center mt-3">{T.heroCaption}</figcaption>
      </figure>

      {/* Lede */}
      <div className="max-w-3xl mx-auto space-y-6 text-lg text-[#141517]/85 leading-relaxed mb-16 sm:mb-20">
        <p>{T.ledeP1}</p>

        {/* 400 → 300 → 150–160 days progression */}
        <div className="not-prose py-8">
          <div className="relative flex items-center justify-between max-w-xl mx-auto">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-[#E3DED6]" aria-hidden="true" />
            {T.timeline.map((step, index) => (
              <div key={step.label} className="relative z-10 flex flex-col items-center gap-2 bg-[#F5F2EC] px-2 sm:px-4">
                <span
                  className={`text-3xl sm:text-4xl font-bold ${
                    step.emphasized ? 'text-[#5E8EA6]' : 'text-[#141517]'
                  }`}
                >
                  {step.value}
                </span>
                <span className="text-[10px] sm:text-xs text-[#141517]/50 uppercase tracking-wider text-center">
                  {step.unit}
                </span>
                <span
                  className={`text-xs sm:text-sm font-medium text-center ${
                    step.emphasized ? 'text-[#5E8EA6]' : 'text-[#141517]/70'
                  }`}
                >
                  {step.label}
                </span>
                {index < T.timeline.length - 1 && (
                  <ArrowRight
                    size={16}
                    className="hidden sm:block absolute top-4 -right-8 sm:-right-10 text-[#141517]/30"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <p>{T.ledeP2}</p>
      </div>

      {/* El caso: Majes y Santa Rita */}
      <section className="max-w-3xl mx-auto mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#141517] mb-6">{T.caseTitle}</h2>

        <figure className="mb-8 -mx-2 sm:mx-0">
          <div className="rounded-2xl overflow-hidden border border-[#E3DED6] bg-[#FDFCFA]">
            <ParcelMapIllustration
              className="w-full"
              title={T.mapAlt}
              connectorLabel={T.connectorLabel}
              majesLabel={T.majesLabel}
              majesSubLabel={T.majesSubLabel}
              santaRitaLabel={T.santaRitaLabel}
              santaRitaSubLabel={T.santaRitaSubLabel}
            />
          </div>
          <figcaption className="text-xs text-[#141517]/45 text-center mt-3">{T.mapCaption}</figcaption>
        </figure>

        <div className="space-y-6 text-lg text-[#141517]/85 leading-relaxed">
          {T.caseParas.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </section>

      {/* Cómo se construyó — four evidence layers */}
      <section className="max-w-5xl mx-auto mb-16 sm:mb-20">
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#141517] mb-6">{T.howBuiltTitle}</h2>
          <p className="text-lg text-[#141517]/85 leading-relaxed">
            {T.howBuiltIntroPre}
            <strong className="text-[#141517]">{T.howBuiltIntroStrong}</strong>
            {T.howBuiltIntroPost}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4">
          {T.evidenceLayers.map((layer, index) => (
            <div key={layer.number} className="relative">
              <div className="h-full p-6 bg-[#FDFCFA] rounded-2xl border border-[#E3DED6] hover:border-[#5E8EA6]/40 hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 bg-[#5E8EA6] rounded-full flex items-center justify-center text-white font-bold text-sm mb-4">
                  {layer.number}
                </div>
                <h3 className="text-base font-bold text-[#141517] mb-2">{layer.title}</h3>
                <p className="text-sm text-[#141517]/70 leading-relaxed">{layer.description}</p>
                {layer.stat && (
                  <div className="mt-4 pt-4 border-t border-[#E3DED6] text-2xl font-bold text-[#5E8EA6]">
                    {layer.stat}
                  </div>
                )}
              </div>
              {index < T.evidenceLayers.length - 1 && (
                <ArrowRight
                  size={18}
                  className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-[#141517]/25 z-10"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lo que el sistema resolvió */}
      <section className="max-w-3xl mx-auto mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#141517] mb-6">{T.resolvedTitle}</h2>
        <p className="text-lg text-[#141517]/85 leading-relaxed mb-6">{T.resolvedIntro}</p>
        <ul className="space-y-4 mb-10">
          {T.resolvedItems.map((item) => (
            <li key={item} className="flex gap-3 text-lg text-[#141517]/85 leading-relaxed">
              <CheckCircle2 size={20} className="flex-shrink-0 mt-1 text-[#5E8EA6]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <figure>
          <div className="rounded-2xl overflow-hidden border border-[#E3DED6] bg-[#FDFCFA] py-6">
            <InfrastructureIllustration className="w-full h-[200px] sm:h-[220px]" title={T.infraAlt} />
          </div>
          <figcaption className="text-xs text-[#141517]/45 text-center mt-3">{T.infraCaption}</figcaption>
        </figure>
      </section>

      {/* Lo que el sistema no pudo resolver */}
      <section className="max-w-3xl mx-auto mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#141517] mb-6">{T.notResolvedTitle}</h2>
        <p className="text-lg text-[#141517]/85 leading-relaxed mb-2">{T.notResolvedP1}</p>
        <p className="text-lg text-[#141517]/85 leading-relaxed mb-8">{T.notResolvedP2}</p>

        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          <div className="p-6 bg-[#F5F2EC] rounded-xl border border-[#E3DED6]">
            <h3 className="flex items-center gap-2 text-base font-bold text-[#141517] mb-4">
              <CheckCircle2 size={18} className="text-[#5E8EA6]" aria-hidden="true" />
              {T.knownTitle}
            </h3>
            <ul className="space-y-3 text-[#141517]/70 text-sm leading-relaxed">
              {T.knownRecap.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 bg-[#5E8EA6]/10 rounded-xl border border-[#5E8EA6]/30">
            <h3 className="flex items-center gap-2 text-base font-bold text-[#141517] mb-4">
              <AlertTriangle size={18} className="text-[#5E8EA6]" aria-hidden="true" />
              {T.pendingTitle}
            </h3>
            <ul className="space-y-3 text-[#141517]/70 text-sm leading-relaxed">
              {T.pendingValidation.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-[#141517]/50 italic">{T.notResolvedFooter}</p>
      </section>

      {/* Tres lecciones */}
      <section className="max-w-5xl mx-auto mb-16 sm:mb-20">
        <h2 className="max-w-3xl mx-auto text-2xl sm:text-3xl font-bold text-[#141517] mb-10 text-center">
          {T.lessonsTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {T.lessons.map((lesson) => (
            <div
              key={lesson.number}
              className="p-8 bg-[#FDFCFA] rounded-2xl border border-[#E3DED6] hover:border-[#5E8EA6]/40 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-[#5E8EA6] rounded-xl flex items-center justify-center text-white font-bold mb-5">
                {lesson.number}
              </div>
              <h3 className="text-lg font-bold text-[#141517] mb-3 leading-snug">{lesson.title}</h3>
              <p className="text-[#141517]/70 leading-relaxed">{lesson.description}</p>
              {lesson.closing && (
                <p className="text-[#141517] font-medium leading-relaxed mt-3">{lesson.closing}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Una invitación concreta — CTA */}
      <section className="max-w-5xl mx-auto px-2 sm:px-0">
        <div className="rounded-3xl bg-[#1E2024] text-white px-6 py-12 sm:px-14 sm:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">{T.ctaTitle}</h2>

            <p className="text-lg text-white/80 leading-relaxed mb-4">
              {T.ctaP1Pre}
              <strong className="text-white">{T.ctaP1Strong}</strong>
              {T.ctaP1Post}
            </p>
            <p className="text-lg text-white/80 leading-relaxed mb-6">{T.ctaP2}</p>

            <span className="inline-flex px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-8">
              {T.ctaBadge}
            </span>

            <p className="text-white/70 leading-relaxed mb-4">{T.ctaP3}</p>
            <p className="text-white/70 leading-relaxed mb-10">{T.ctaP4}</p>

            <button
              onClick={onOpenPilotForm}
              className="px-8 py-4 bg-white text-[#1E2024] rounded-full font-medium shadow-md hover:shadow-lg hover:bg-[#F5F2EC] transition-all duration-200 hover:scale-105 mb-10"
            >
              {T.ctaButton}
            </button>

            <blockquote className="border-t border-white/15 pt-8 text-white/85 text-lg leading-relaxed italic">
              {T.ctaQuote}
            </blockquote>
          </div>
        </div>
      </section>
    </article>
  )
}
