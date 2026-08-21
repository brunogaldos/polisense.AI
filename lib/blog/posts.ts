// Blog post metadata. Kept separate from the article body/markup so that a
// future `/blog/[slug]` route can key off `slug` without duplicating data.
// Localized fields carry both languages so the post can follow the site's
// existing EN/ES switch.
interface Localized {
  en: string
  es: string
}

export interface BlogPostMeta {
  slug: string
  category: Localized
  title: Localized
  subtitle: Localized
  /** ISO date string, used for the <time dateTime> attribute — language-independent. */
  date: string
  /** Human-readable date, localized per language. */
  dateLabel: Localized
  readingTime: Localized
}

export const posts: BlogPostMeta[] = [
  {
    slug: '150-dias-para-aprobar-un-eia',
    category: { es: 'Casos de uso', en: 'Use cases' },
    title: {
      es: '150 días para aprobar un EIA: ¿en cuánto se puede preparar?',
      en: '150 days to approve an EIA: how fast can it be prepared?',
    },
    subtitle: {
      es: 'Qué aprendimos automatizando un expediente técnico con Polisense en Arequipa',
      en: 'What we learned automating a technical case file with Polisense in Arequipa',
    },
    date: '2026-08-18',
    dateLabel: { es: '18 de agosto de 2026', en: 'August 18, 2026' },
    readingTime: { es: '6 min de lectura', en: '6 min read' },
  },
]

export const featuredPost = posts[0]
