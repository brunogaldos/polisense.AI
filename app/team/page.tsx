'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Mail } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'
import Header from '@/components/Header'
import { useLanguage } from '@/lib/i18n/context'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const teamMemberMeta = [
  {
    photo: `${basePath}/bruno_linkedin.jpeg`,
    linkedin: 'https://www.linkedin.com/in/bruno-galdos-a25353a9/',
    email: null as string | null,
  },
  {
    photo: `${basePath}/abhirup_profile.png`,
    linkedin: 'https://www.linkedin.com/in/abhirup-das-82a955a9/',
    email: null as string | null,
  },
  {
    photo: `${basePath}/jose.jpeg`,
    linkedin: 'https://www.linkedin.com/in/josepastorp/',
    email: null as string | null,
  },
]

export default function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useLanguage()
  const teamMembers = t.team.members.map((member, index) => ({ ...member, ...teamMemberMeta[index] }))

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <Header onGetStarted={() => setIsModalOpen(true)} />

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
              {t.team.heroTitle}
            </h1>
            <p className="text-xl text-[#141517]/70 max-w-2xl mx-auto leading-relaxed">
              {t.team.heroDescription}
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
                    {t.footer.linkedin}
                  </a>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 px-4 py-2 border border-[#141517]/20 text-[#141517]/70 rounded-full text-sm font-medium hover:border-[#141517]/40 hover:text-[#141517] transition-all duration-200"
                    >
                      <Mail size={14} />
                      {t.team.email}
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
              href="https://www.linkedin.com/company/polisense-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141517] transition-colors duration-200"
            >
              {t.footer.linkedin}
            </a>
            <a
              href="mailto:info@polisenseai.com"
              className="hover:text-[#141517] transition-colors duration-200"
            >
              {t.footer.contact}
            </a>
          </div>
          <div className="text-sm text-[#141517]/50">{t.footer.copyright}</div>
        </div>
      </footer>

      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
