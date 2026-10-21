'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Mail } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import { useLanguage } from '@/lib/i18n/context'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// Same order as t.team.members.
const teamMemberMeta: { photo: string; linkedin?: string; email?: string }[] = [
  {
    photo: `${basePath}/bruno_linkedin.jpeg`,
    linkedin: 'https://www.linkedin.com/in/bruno-galdos-a25353a9/',
  },
  {
    photo: `${basePath}/amol.jpg`,
    linkedin: 'https://www.linkedin.com/in/amol-kodange',
  },
  {
    photo: `${basePath}/khuzaima.jpg`,
    linkedin: 'https://www.linkedin.com/in/khuzaima-aziz-7833ba1b4/',
  },
  {
    photo: `${basePath}/mauricio.jpg`,
    linkedin: 'https://www.linkedin.com/in/mauricio-peraltilla/',
  },
]

export default function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useLanguage()
  const teamMembers = t.team.members.map((member, index) => ({ ...member, ...teamMemberMeta[index] }))

  return (
    <div className="min-h-screen bg-canvas">
      <Header onGetStarted={() => setIsModalOpen(true)} />

      {/* Page Content */}
      <main id="main" className="pt-28 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-ink mb-4 tracking-tight">
              {t.team.heroTitle}
            </h1>
            <p className="text-xl text-ink/70 max-w-2xl mx-auto leading-relaxed">
              {t.team.heroDescription}
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="flex flex-wrap justify-center gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex flex-col items-center text-center p-7 bg-surface rounded-2xl border border-line hover:shadow-md hover:border-accent/40 transition-all duration-200"
              >
                {/* Circular portrait */}
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-line mb-6 flex-shrink-0">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>

                {/* Name & Role */}
                <h2 className="text-xl font-bold text-ink mb-1">{member.name}</h2>
                <p className="text-sm font-medium text-accent mb-4">
                  {member.role}
                </p>

                {/* Description */}
                <p className="text-ink/70 text-sm leading-relaxed mb-6 flex-grow">
                  {member.description}
                </p>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-auto flex-wrap justify-center">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-canvas rounded-full text-sm font-medium hover:bg-accent-strong transition-all duration-200 hover:scale-105"
                    >
                      <Linkedin size={14} />
                      {t.footer.linkedin}
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 px-4 py-2 border border-ink/20 text-ink/70 rounded-full text-sm font-medium hover:border-ink/40 hover:text-ink transition-all duration-200"
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

      <SiteFooter />

      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
