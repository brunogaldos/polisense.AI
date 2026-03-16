'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Linkedin, Mail } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const teamMembers = [
  {
    name: 'Bruno Galdos',
    role: 'CEO & Co-founder',
    description: "Engineering technology that uplifts humanity. Built Polisense's full MVP from scratch — where AI, energy, and sustainability meet to transform communities.",
    photo: `${basePath}/bruno_linkedin.jpeg`,
    linkedin: 'https://www.linkedin.com/in/bruno-galdos-a25353a9/',
    email: null as string | null,
  },
  {
    name: 'Abhirup Das',
    role: 'CTO & Co-founder',
    description: "Turns cutting-edge research into production systems. Robotics and vision researcher at RWTH Aachen, now engineering Polisense's core tech.",
    photo: `${basePath}/abhirup_profile.png`,
    linkedin: 'https://www.linkedin.com/in/abhirup-das-82a955a9/',
    email: null as string | null,
  },
  {
    name: 'Jose Pastor',
    role: 'Advisory Board — Product',
    description: "Senior PM of AI at Siemens Energy. Bridges enterprise energy know-how with Polisense's go-to-market across emerging markets.",
    photo: `${basePath}/jose.jpeg`,
    linkedin: 'https://www.linkedin.com/in/josepastorp/',
    email: null as string | null,
  },
]

export default function Team() {
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
          <a href={`${basePath}/`} className="flex items-center gap-2 sm:gap-3">
            <img
              src={`${basePath}/polisense_logo.svg`}
              alt="Polisense AI"
              className="h-7 w-7 sm:h-8 sm:w-8"
            />
            <div className="text-xl sm:text-2xl font-bold text-[#5E8EA6]">Polisense AI</div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={`${basePath}/#features`}
              className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200"
            >
              Features
            </a>
            <a
              href={`${basePath}/#testimonials`}
              className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200"
            >
              Testimonials
            </a>
            <a
              href={`${basePath}/team`}
              className="text-[#5E8EA6] font-medium transition-colors duration-200"
            >
              Team
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 bg-[#5E8EA6] text-white rounded-full hover:bg-[#4A7185] transition-all duration-200 hover:scale-105 shadow-sm"
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#141517]/70 hover:text-[#141517] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
                  href={`${basePath}/#features`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200 py-1"
                >
                  Features
                </a>
                <a
                  href={`${basePath}/#testimonials`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200 py-1"
                >
                  Testimonials
                </a>
                <a
                  href={`${basePath}/team`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#5E8EA6] font-medium py-1"
                >
                  Team
                </a>
                <button
                  onClick={() => {
                    setIsModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="px-5 py-2 bg-[#5E8EA6] text-white rounded-full hover:bg-[#4A7185] transition-all duration-200 shadow-sm w-fit"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Page Content */}
      <main className="pt-28 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#141517] mb-4 tracking-tight">
              Our Team
            </h1>
            <p className="text-xl text-[#141517]/70 max-w-2xl mx-auto leading-relaxed">
              AI engineers, product strategists, and energy experts united by a mission to
              democratize clean energy infrastructure planning worldwide.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="flex flex-col items-center text-center p-8 bg-[#FDFCFA] rounded-2xl border border-[#E3DED6] hover:shadow-md hover:border-[#5E8EA6]/40 transition-all duration-200"
              >
                {/* Circular portrait */}
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#E3DED6] mb-6 flex-shrink-0">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>

                {/* Name & Role */}
                <h2 className="text-xl font-bold text-[#141517] mb-1">{member.name}</h2>
                <p className="text-sm font-medium text-[#5E8EA6] uppercase tracking-wider mb-4">
                  {member.role}
                </p>

                {/* Description */}
                <p className="text-[#141517]/70 text-sm leading-relaxed mb-6 flex-grow">
                  {member.description}
                </p>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-auto flex-wrap justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#5E8EA6] text-white rounded-full text-sm font-medium hover:bg-[#4A7185] transition-all duration-200 hover:scale-105"
                  >
                    <Linkedin size={14} />
                    LinkedIn
                  </a>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 px-4 py-2 border border-[#141517]/20 text-[#141517]/70 rounded-full text-sm font-medium hover:border-[#141517]/40 hover:text-[#141517] transition-all duration-200"
                    >
                      <Mail size={14} />
                      Email
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#FDFCFA] text-[#141517]/70 border-t border-[#E3DED6]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src={`${basePath}/polisense_logo.svg`}
              alt="Polisense AI"
              className="h-6 w-6"
            />
            <div className="text-xl font-bold text-[#5E8EA6]">Polisense AI</div>
          </div>
          <div className="flex gap-8">
            <a
              href="https://www.linkedin.com/in/bruno-galdos-a25353a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141517] transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="mailto:info@polisenseai.com"
              className="hover:text-[#141517] transition-colors duration-200"
            >
              Contact
            </a>
          </div>
          <div className="text-sm text-[#141517]/50">© 2026 Polisense AI. All rights reserved.</div>
        </div>
      </footer>

      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
