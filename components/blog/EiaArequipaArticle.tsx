import { Calendar, Clock, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react'
import { featuredPost } from '@/lib/blog/posts'
import { HeroIllustration, ParcelMapIllustration, InfrastructureIllustration } from './visuals'

interface EiaArequipaArticleProps {
  /** Opens the site's existing lead-capture modal, scoped to the pilot CTA. */
  onOpenPilotForm: () => void
}

const evidenceLayers = [
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
]

const resolvedItems = [
  'Ubicó los predios respecto de la subestación eléctrica de Majes, de 138/60/10 kV y ya operativa, y respecto del corredor de transmisión de 500/220 kV que está previsto para la zona.',
  'Calculó la salida logística hacia el puerto de Matarani, a unos 129 kilómetros por carretera desde El Pedregal.',
  'Contrastó el recurso solar declarado en el expediente con estudios de radiación de la franja desértica del sur del país.',
  'Ordenó qué permisos aplican y en qué secuencia, entre el Sistema Nacional de Evaluación del Impacto Ambiental (SEIA), la Ley de Concesiones Eléctricas, la certificación arqueológica y la coordinación con la Autoridad Nacional del Agua (ANA).',
]

const knownRecap = [
  'Ubicación frente a la subestación de Majes (138/60/10 kV) y el corredor previsto de 500/220 kV.',
  'Ruta logística hacia el puerto de Matarani (~129 km por carretera).',
  'Contraste del recurso solar declarado frente a estudios de radiación regionales.',
  'Secuencia de permisos: SEIA, concesiones eléctricas, certificación arqueológica y ANA.',
]

const pendingValidation = [
  'No logró confirmar si el trazado del corredor de 500/220 kV cruza los predios, porque eso exige superponer las coordenadas contra la línea oficial aprobada.',
  'Tampoco pudo dar por validado el recurso solar, porque para eso hace falta una estación meteorológica midiendo en el terreno durante al menos doce meses.',
]

const lessons = [
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
]

const timeline = [
  { value: '400', unit: 'días', label: 'Hasta 2024' },
  { value: '~300', unit: 'días', label: 'Hoy' },
  { value: '150–160', unit: 'días', label: 'Meta SENACE 2026', emphasized: true },
]

export default function EiaArequipaArticle({ onOpenPilotForm }: EiaArequipaArticleProps) {
  return (
    <article className="pb-8">
      {/* Article header */}
      <header className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
        <span className="inline-flex px-4 py-1.5 bg-[#5E8EA6]/10 border border-[#5E8EA6]/30 rounded-full text-xs sm:text-sm text-[#5E8EA6] font-medium mb-6">
          {featuredPost.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#141517] tracking-tight leading-tight mb-5">
          {featuredPost.title}
        </h1>
        <p className="text-lg sm:text-xl text-[#141517]/70 leading-relaxed mb-6">
          {featuredPost.subtitle}
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-[#141517]/50">
          <span className="flex items-center gap-1.5">
            <Calendar size={15} />
            <time dateTime={featuredPost.date}>{featuredPost.dateLabel}</time>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} />
            {featuredPost.readingTime}
          </span>
        </div>
      </header>

      {/* Hero image */}
      <figure className="max-w-5xl mx-auto mb-12 sm:mb-16">
        <div className="rounded-2xl overflow-hidden border border-[#E3DED6] shadow-md">
          <HeroIllustration className="w-full h-[220px] sm:h-[340px] md:h-[420px]" />
        </div>
        <figcaption className="text-xs text-[#141517]/45 text-center mt-3">
          Desierto del sur del Perú: el mismo terreno donde se evalúan el recurso solar y la infraestructura de transmisión.
        </figcaption>
      </figure>

      {/* Lede */}
      <div className="max-w-3xl mx-auto space-y-6 text-lg text-[#141517]/85 leading-relaxed mb-16 sm:mb-20">
        <p>
          Un Estudio de Impacto Ambiental detallado del sector minero demoraba unos 400 días hábiles en ser evaluado
          hasta 2024. Hoy demora cerca de 300. Y el Servicio Nacional de Certificación Ambiental para las Inversiones
          Sostenibles (SENACE) se puso una meta de 150 a 160 días hábiles para 2026. Piensa lograrlo simplificando
          trámites, conectando sus sistemas con los de otras entidades del Estado y usando inteligencia artificial
          para revisar si un expediente llega completo antes de evaluarlo a fondo.
        </p>

        {/* 400 → 300 → 150–160 days progression */}
        <div className="not-prose py-8">
          <div className="relative flex items-center justify-between max-w-xl mx-auto">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-[#E3DED6]" aria-hidden="true" />
            {timeline.map((step, index) => (
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
                {index < timeline.length - 1 && (
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

        <p>
          Si esa meta se cumple, el cuello de botella se muda. Deja de estar en la evaluación y pasa a estar en la
          preparación. Un titular que antes tenía doce meses de evaluación para acomodar campañas de campo,
          participación ciudadana y trabajo de escritorio, de pronto tiene la mitad. Y la parte que más se comprime
          no es la de campo (esa tiene estacionalidad, permisos y logística propia, y no se acelera con software)
          sino el trabajo de escritorio: la recopilación, la depuración, el cruce y la redacción trazable de todo lo
          que ya existe. Esa es la parte que decidimos automatizar.
        </p>
      </div>

      {/* El caso: Majes y Santa Rita */}
      <section className="max-w-3xl mx-auto mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#141517] mb-6">El caso: Majes y Santa Rita</h2>

        <figure className="mb-8 -mx-2 sm:mx-0">
          <div className="rounded-2xl overflow-hidden border border-[#E3DED6] bg-[#FDFCFA]">
            <ParcelMapIllustration className="w-full" />
          </div>
          <figcaption className="text-xs text-[#141517]/45 text-center mt-3">
            Mapa ilustrado de los predios evaluados, trazado a partir de los límites reales (GeoJSON) de Majes y Santa Rita de Siguas — no es una imagen satelital.
          </figcaption>
        </figure>

        <div className="space-y-6 text-lg text-[#141517]/85 leading-relaxed">
          <p>
            Trabajamos con la Gerencia Regional de Ciencia, Tecnología e Innovación (CTI) del Gobierno Regional
            (GORE) de Arequipa en el análisis de dos terrenos estatales con potencial para el desarrollo de un
            parque industrial vinculado a energías renovables, hidrógeno verde e industrias electrointensivas: el
            predio Majes, ubicado en la irrigación Majes-Pedregal, y el predio Santa Rita de Siguas. Ambos se
            encuentran bajo la modalidad de Proyectos en Activos (PEA), mecanismo que permite desarrollar
            inversiones sobre terrenos de propiedad del Estado.
          </p>
          <p>
            El encargo consistió en elaborar y presentar un expediente técnico comparativo de ambos predios,
            evaluando sus características, aptitud y condiciones para el desarrollo del proyecto, con el objetivo
            de proporcionar a la empresa desarrolladora los elementos técnicos necesarios para seleccionar la
            alternativa más idónea.
          </p>
          <p>
            Asimismo, se formularon recomendaciones sustentadas en el cruce de información territorial, de
            infraestructura, disponibilidad de recursos, accesibilidad y otros factores relevantes para apoyar el
            proceso de toma de decisiones.
          </p>
        </div>
      </section>

      {/* Cómo se construyó — four evidence layers */}
      <section className="max-w-5xl mx-auto mb-16 sm:mb-20">
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#141517] mb-6">Cómo se construyó</h2>
          <p className="text-lg text-[#141517]/85 leading-relaxed">
            El expediente se armó sobre <strong className="text-[#141517]">cuatro capas de evidencia</strong>, cada
            una identificada por separado:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4">
          {evidenceLayers.map((layer, index) => (
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
              {index < evidenceLayers.length - 1 && (
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
        <h2 className="text-2xl sm:text-3xl font-bold text-[#141517] mb-6">Lo que el sistema resolvió en días</h2>
        <p className="text-lg text-[#141517]/85 leading-relaxed mb-6">
          Sobre esa base, el sistema resolvió en días cosas que suelen tomar semanas de escritorio:
        </p>
        <ul className="space-y-4 mb-10">
          {resolvedItems.map((item) => (
            <li key={item} className="flex gap-3 text-lg text-[#141517]/85 leading-relaxed">
              <CheckCircle2 size={20} className="flex-shrink-0 mt-1 text-[#5E8EA6]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <figure>
          <div className="rounded-2xl overflow-hidden border border-[#E3DED6] bg-[#FDFCFA] py-6">
            <InfrastructureIllustration className="w-full h-[200px] sm:h-[220px]" />
          </div>
          <figcaption className="text-xs text-[#141517]/45 text-center mt-3">
            Infraestructura y marco normativo identificados a partir del expediente y las fuentes públicas.
          </figcaption>
        </figure>
      </section>

      {/* Lo que el sistema no pudo resolver */}
      <section className="max-w-3xl mx-auto mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#141517] mb-6">Lo que el sistema no pudo resolver</h2>
        <p className="text-lg text-[#141517]/85 leading-relaxed mb-2">
          También es importante mostrar las limitaciones.
        </p>
        <p className="text-lg text-[#141517]/85 leading-relaxed mb-8">
          El sistema dejó anotado lo que no pudo resolver:
        </p>

        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          <div className="p-6 bg-[#F5F2EC] rounded-xl border border-[#E3DED6]">
            <h3 className="flex items-center gap-2 text-base font-bold text-[#141517] mb-4">
              <CheckCircle2 size={18} className="text-[#5E8EA6]" aria-hidden="true" />
              Lo que sabemos
            </h3>
            <ul className="space-y-3 text-[#141517]/70 text-sm leading-relaxed">
              {knownRecap.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 bg-[#5E8EA6]/10 rounded-xl border border-[#5E8EA6]/30">
            <h3 className="flex items-center gap-2 text-base font-bold text-[#141517] mb-4">
              <AlertTriangle size={18} className="text-[#5E8EA6]" aria-hidden="true" />
              Lo que todavía debemos validar
            </h3>
            <ul className="space-y-3 text-[#141517]/70 text-sm leading-relaxed">
              {pendingValidation.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-[#141517]/50 italic">
          La automatización no sustituye las verificaciones técnicas de campo.
        </p>
      </section>

      {/* Tres lecciones */}
      <section className="max-w-5xl mx-auto mb-16 sm:mb-20">
        <h2 className="max-w-3xl mx-auto text-2xl sm:text-3xl font-bold text-[#141517] mb-10 text-center">
          Tres lecciones para quien prepara expedientes
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Una invitación concreta</h2>

            <p className="text-lg text-white/80 leading-relaxed mb-4">
              Estamos abriendo <strong className="text-white">tres pilotos gratuitos</strong> con consultoras
              registradas ante el SENACE.
            </p>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Nos dan un proyecto real en curso, entregamos el trabajo de escritorio en el formato que ustedes ya
              usan, y su equipo la revisa cómo revisaría el trabajo de un analista junior.
            </p>

            <span className="inline-flex px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-8">
              Sin costo y sin compromiso comercial
            </span>

            <p className="text-white/70 leading-relaxed mb-4">
              Nosotros no firmamos instrumentos de gestión ambiental. Eso le corresponde a una consultora
              registrada ante el SENACE y a profesionales colegiados que responden con su nombre.
            </p>
            <p className="text-white/70 leading-relaxed mb-10">
              El trabajo de Polisense es la base previa, todo el análisis de datos que se puede automatizar.
            </p>

            <button
              onClick={onOpenPilotForm}
              className="px-8 py-4 bg-white text-[#1E2024] rounded-full font-medium shadow-md hover:shadow-lg hover:bg-[#F5F2EC] transition-all duration-200 hover:scale-105 mb-10"
            >
              Postula tu proyecto piloto
            </button>

            <blockquote className="border-t border-white/15 pt-8 text-white/85 text-lg leading-relaxed italic">
              “Si preparan instrumentos ambientales en minería o energía en el Perú y esto les resulta útil o
              discutible, escríbanme. Las objeciones técnicas son bienvenidas.”
            </blockquote>
          </div>
        </div>
      </section>
    </article>
  )
}
