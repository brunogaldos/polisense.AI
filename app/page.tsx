'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap, Globe, TrendingUp, Shield, Menu, X } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 w-full bg-[#FDFCFA]/95 backdrop-blur-md border-b border-[#E3DED6] z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/polisense_logo.svg`} alt="Polisense AI" className="h-7 w-7 sm:h-8 sm:w-8" />
            <div className="text-xl sm:text-2xl font-bold text-[#5E8EA6]">
              Polisense AI
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200">
              Features
            </a>
            <a href="#testimonials" className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200">
              Testimonials
            </a>
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/team`} className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200">
              Team
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 bg-[#5E8EA6] text-white rounded-full hover:bg-[#4A7185] transition-all duration-200 hover:scale-105 shadow-sm"
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#141517]/70 hover:text-[#141517] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-[#E3DED6]"
            >
              <div className="px-4 py-4 flex flex-col gap-4 bg-[#FDFCFA]/95">
                <a
                  href="#features"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200 py-1"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200 py-1"
                >
                  Testimonials
                </a>
                <a
                  href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/team`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200 py-1"
                >
                  Team
                </a>
                <button
                  onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="px-5 py-2 bg-[#5E8EA6] text-white rounded-full hover:bg-[#4A7185] transition-all duration-200 shadow-sm w-fit"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

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
              Backed by the Global Covenant of Mayors
            </motion.a>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-[#141517]">
                AI-Powered
              </span>
              <br />
              <span className="text-[#141517]">Resource & Energy Access</span>
              <br />
              <span className="text-[#5E8EA6]">
                Intelligence
              </span>
            </h1>

            <p className="text-lg text-[#141517]/70 max-w-xl leading-relaxed">
              Democratizing resource and energy infrastructure planning with AI.
              Analyze geospatial data layers, automate compliance reporting,
              and accelerate access in underserved communities.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#5E8EA6] text-white rounded-full font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Book a Demo
                <ArrowRight size={20} />
              </motion.button>

              <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/Polisense_AI_whitepaper.pdf`} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border border-[#141517]/20 text-[#141517] rounded-full font-medium hover:border-[#141517]/40 hover:bg-[#141517]/5 transition-all duration-200"
                >
                  Learn More
                </motion.button>
              </a>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E3DED6]">
              <div>
                <div className="text-3xl font-bold text-[#141517] mb-1">760M+</div>
                <div className="text-xs text-[#141517]/60 uppercase tracking-wider">Without Power</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#141517] mb-1">50%</div>
                <div className="text-xs text-[#141517]/60 uppercase tracking-wider">Projects Fail</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#5E8EA6] mb-1">10x</div>
                <div className="text-xs text-[#141517]/60 uppercase tracking-wider">Faster Planning</div>
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
              title="Texas Energy Infrastructure Visualization"
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
              Resource & Energy Planning Shouldn't Take Months
            </h2>
            <p className="text-xl text-[#141517]/85 mb-8 leading-relaxed">
              Government planners waste weeks gathering fragmented data from multiple sources,
              analyzing outdated spreadsheets, and making infrastructure decisions with incomplete information.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left mt-12">
              <div className="p-6 bg-[#F5F2EC] rounded-xl border border-[#E3DED6]">
                <h3 className="text-lg font-bold text-[#141517] mb-2">Without Polisense AI</h3>
                <ul className="space-y-2 text-[#141517]/70">
                  <li>• Months of manual data collection</li>
                  <li>• Siloed information across departments</li>
                  <li>• 50% of projects fail within 5 years</li>
                  <li>• Limited spatial analysis capabilities</li>
                </ul>
              </div>
              <div className="p-6 bg-[#5E8EA6]/10 rounded-xl border border-[#5E8EA6]/30">
                <h3 className="text-lg font-bold text-[#141517] mb-2">With Polisense AI</h3>
                <ul className="space-y-2 text-[#141517]/70">
                  <li>• Minutes to generate comprehensive plans</li>
                  <li>• Unified geospatial intelligence platform</li>
                  <li>• AI-powered risk assessment</li>
                  <li>• Real-time infrastructure modeling</li>
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
              Built for Impact
            </h2>
            <p className="text-xl text-[#141517]/85 max-w-2xl mx-auto">
              Powerful tools to accelerate resource and energy access in emerging markets
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: 'AI Site Recommendations',
                description: 'Get intelligent site recommendations for resource deployment, renewable energy, and grid infrastructure based on comprehensive geospatial analysis.'
              },
              {
                icon: Globe,
                title: 'Geospatial Analysis',
                description: 'Analyze terrain, population density, and infrastructure constraints with natural language queries.'
              },
              {
                icon: TrendingUp,
                title: 'Impact Modeling',
                description: 'Simulate and optimize infrastructure investments to maximize reach and sustainability.'
              },
              {
                icon: Shield,
                title: 'Automated Compliance Reports',
                description: 'Generate regulatory-compliant reports instantly, eliminating weeks of manual documentation and accelerating project approvals.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-8 bg-[#FDFCFA] rounded-2xl border border-[#E3DED6] hover:border-[#5E8EA6]/40 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-[#5E8EA6] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[#141517]">
                  {feature.title}
                </h3>
                <p className="text-[#141517]/85 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
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
              From Months to Minutes
            </h2>
            <p className="text-xl text-[#141517]/85 max-w-3xl mx-auto leading-relaxed">
              Join government agencies transforming how they plan and deploy resource and energy infrastructure.
              Make data-driven decisions with confidence and expand access for millions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Upload Your Data',
                description: 'Import existing geospatial datasets, census data, and infrastructure maps into our unified platform.'
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our AI analyzes terrain, population density, resource availability, and grid constraints in real-time.'
              },
              {
                step: '03',
                title: 'Deploy Confidently',
                description: 'Generate optimized infrastructure plans, risk assessments, and ROI projections ready for stakeholder approval.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[#5E8EA6] rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  {item.step}
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
            {[
              { value: '760M+', label: 'People without electricity access globally' },
              { value: '50%', label: 'Infrastructure projects fail within first 5 years' },
              { value: '10x', label: 'Faster infrastructure planning with AI' }
            ].map((stat, index) => (
              <motion.div
                key={index}
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
              Trusted by Resource & Energy Leaders
            </h2>
            <p className="text-xl text-[#141517]/85">
              Government agencies and international organizations rely on Polisense AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Polisense AI reduced our planning cycle from 6 months to 3 weeks. The geospatial analysis is remarkably accurate.",
                author: "Maria Santos",
                role: "Director of Infrastructure Planning",
                organization: "Ministry of Energy, Peru"
              },
              {
                quote: "The automated compliance reports saved us months of documentation work. We can now move from analysis to implementation in days, not months.",
                author: "Dr. Ahmed Hassan",
                role: "Chief Energy Strategist",
                organization: "National Power Authority"
              },
              {
                quote: "Finally, a tool that speaks our language. Polisense AI understands the real challenges of emerging market electrification.",
                author: "Jane Ochieng",
                role: "Program Director",
                organization: "East Africa Energy Access"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
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
            Ready to Transform Resource & Energy Access?
          </h2>
          <p className="text-xl text-[#141517]/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join leading organizations using Polisense AI to accelerate
            resource and energy access, optimize infrastructure investments, and improve
            lives in underserved communities.
          </p>
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-[#5E8EA6] text-white rounded-full font-medium text-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Schedule a Demo
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
            <a href="https://www.linkedin.com/company/polisense-ai/" target="_blank" rel="noopener noreferrer" className="hover:text-[#141517] transition-colors duration-200">LinkedIn</a>
            <a href="mailto:info@polisenseai.com" className="hover:text-[#141517] transition-colors duration-200">Contact</a>
          </div>
          <div className="text-sm text-[#141517]/50">
            © 2026 Polisense AI. All rights reserved.
          </div>
        </div>

        {/* Partners */}
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#E3DED6] flex flex-col items-center gap-4">
          <p className="text-xs text-[#141517]/40 uppercase tracking-widest font-medium">Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/Hack for Earth Foundation - black.svg`}
              alt="Hack for Earth Foundation"
              className="h-8 opacity-50 hover:opacity-80 transition-opacity duration-200"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/GCoM_logo.svg`}
              alt="Global Covenant of Mayors"
              className="h-8 opacity-50 hover:opacity-80 transition-opacity duration-200"
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
