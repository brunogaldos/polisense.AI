'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Globe, TrendingUp, Shield } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'
import Header from '@/components/Header'
import { useLanguage } from '@/lib/i18n/context'

const featureIcons = [Zap, Globe, TrendingUp, Shield]

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <Header onGetStarted={() => setIsModalOpen(true)} />

      {/* Hero Section - Split Layout */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-20 grid lg:grid-cols-[2fr_3fr] gap-8 sm:gap-12 items-center w-full">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 z-10"
          >
            <motion.a
              href="https://www.globalcovenantofmayors.org/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="block mx-auto w-fit px-3 sm:px-4 py-1.5 sm:py-2 bg-[#5E8EA6]/10 border border-[#5E8EA6]/30 rounded-full text-xs sm:text-sm text-[#5E8EA6] font-medium hover:bg-[#5E8EA6]/20 transition-colors duration-200 text-center"
            >
              {t.hero.badge}
            </motion.a>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-[#141517]">
                {t.hero.titleLine1}
              </span>
              <br />
              <span className="text-[#141517]">{t.hero.titleLine2}</span>
              <br />
              <span className="text-[#5E8EA6]">
                {t.hero.titleLine3}
              </span>
            </h1>

            <p className="text-lg text-[#141517]/70 max-w-xl leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#5E8EA6] text-white rounded-full font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                {t.hero.bookDemo}
                <ArrowRight size={20} />
              </motion.button>

              <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/Polisense_AI_whitepaper.pdf`} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border border-[#141517]/20 text-[#141517] rounded-full font-medium hover:border-[#141517]/40 hover:bg-[#141517]/5 transition-all duration-200"
                >
                  {t.hero.learnMore}
                </motion.button>
              </a>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E3DED6]">
              <div>
                <div className="text-3xl font-bold text-[#141517] mb-1">760M+</div>
                <div className="text-xs text-[#141517]/60 uppercase tracking-wider">{t.hero.stats.withoutPower}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#141517] mb-1">50%</div>
                <div className="text-xs text-[#141517]/60 uppercase tracking-wider">{t.hero.stats.projectsFail}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#5E8EA6] mb-1">10x</div>
                <div className="text-xs text-[#141517]/60 uppercase tracking-wider">{t.hero.stats.fasterPlanning}</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Texas Proper Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden"
          >
            <iframe
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/master-visualization.html`}
              className="border-0 absolute top-0 left-0 origin-top-left scale-[0.35] w-[286%] h-[286%] sm:scale-[0.5] sm:w-[200%] sm:h-[200%] md:scale-[0.6] md:w-[167%] md:h-[167%] lg:scale-[0.7] lg:w-[143%] lg:h-[143%]"
              title={t.hero.visualizationTitle}
            />
          </motion.div>
        </div>
      </section>

      {/* Problem Agitation */}
      <section className="py-20 px-6 bg-[#FDFCFA] border-t border-[#E3DED6]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#141517]">
              {t.problem.title}
            </h2>
            <p className="text-xl text-[#141517]/85 mb-8 leading-relaxed">
              {t.problem.description}
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left mt-12">
              <div className="p-6 bg-[#F5F2EC] rounded-xl border border-[#E3DED6]">
                <h3 className="text-lg font-bold text-[#141517] mb-2">{t.problem.withoutTitle}</h3>
                <ul className="space-y-2 text-[#141517]/70">
                  {t.problem.withoutItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-[#5E8EA6]/10 rounded-xl border border-[#5E8EA6]/30">
                <h3 className="text-lg font-bold text-[#141517] mb-2">{t.problem.withTitle}</h3>
                <ul className="space-y-2 text-[#141517]/70">
                  {t.problem.withItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-[#F5F2EC]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 text-[#141517]">
              {t.features.title}
            </h2>
            <p className="text-xl text-[#141517]/85 max-w-2xl mx-auto">
              {t.features.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.features.items.map((feature, index) => {
              const Icon = featureIcons[index]
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-8 bg-[#FDFCFA] rounded-2xl border border-[#E3DED6] hover:border-[#5E8EA6]/40 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-[#5E8EA6] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-[#141517]">
                    {feature.title}
                  </h3>
                  <p className="text-[#141517]/85 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Customer's Transformation */}
      <section className="py-20 px-6 bg-[#FDFCFA] border-t border-[#E3DED6]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#141517]">
              {t.transformation.title}
            </h2>
            <p className="text-xl text-[#141517]/85 max-w-3xl mx-auto leading-relaxed">
              {t.transformation.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.transformation.steps.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[#5E8EA6] rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold text-[#141517] mb-3">{item.title}</h3>
                <p className="text-[#141517]/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 px-6 bg-[#5E8EA6]/5 border-y border-[#E3DED6]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {t.mission.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.1 }}
              >
                <div className="text-5xl font-bold mb-2 text-[#141517]">
                  {stat.value}
                </div>
                <div className="text-[#141517]/75 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-[#F5F2EC]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#141517]">
              {t.testimonials.title}
            </h2>
            <p className="text-xl text-[#141517]/85">
              {t.testimonials.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.1 }}
                className="p-8 bg-[#FDFCFA] rounded-2xl border border-[#E3DED6] hover:shadow-md transition-all duration-200"
              >
                <div className="mb-6">
                  <p className="text-[#141517]/85 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="border-t border-[#E3DED6] pt-4">
                  <p className="font-bold text-[#141517]">{testimonial.author}</p>
                  <p className="text-sm text-[#141517]/60">{testimonial.role}</p>
                  <p className="text-sm text-[#141517]/60">{testimonial.organization}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-32 px-6 bg-[#F5F2EC] border-t border-[#E3DED6]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold mb-6 text-[#141517]">
            {t.cta.title}
          </h2>
          <p className="text-xl text-[#141517]/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.cta.description}
          </p>
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-[#5E8EA6] text-white rounded-full font-medium text-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            {t.cta.button}
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#FDFCFA] text-[#141517]/70 border-t border-[#E3DED6]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/polisense_logo.svg`} alt="Polisense AI" className="h-6 w-6" />
            <div className="text-xl font-bold text-[#5E8EA6]">
              Polisense AI
            </div>
          </div>
          <div className="flex gap-8">
            <a href="https://www.linkedin.com/company/polisense-ai/" target="_blank" rel="noopener noreferrer" className="hover:text-[#141517] transition-colors duration-200">{t.footer.linkedin}</a>
            <a href="mailto:info@polisenseai.com" className="hover:text-[#141517] transition-colors duration-200">{t.footer.contact}</a>
          </div>
          <div className="text-sm text-[#141517]/50">
            {t.footer.copyright}
          </div>
        </div>

        {/* Partners */}
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#E3DED6] flex flex-col items-center gap-4">
          <p className="text-xs text-[#141517]/40 uppercase tracking-widest font-medium">{t.footer.partners}</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/Hack for Earth Foundation - black.svg`}
              alt="Hack for Earth Foundation"
              className="h-8 opacity-50 hover:opacity-80 transition-opacity duration-200"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/GCoM_logo.svg`}
              alt="Global Covenant of Mayors"
              className="h-10 opacity-50 hover:opacity-80 transition-opacity duration-200 brightness-0"
            />
            <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/elevenlabs-logo-black.svg`}
                alt="ElevenLabs"
                className="h-6 opacity-50 hover:opacity-80 transition-opacity duration-200"
              />
            </a>
          </div>
        </div>
      </footer>

      {/* Book Demo Modal */}
      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
