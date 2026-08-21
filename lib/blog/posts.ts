// Blog post metadata. Kept separate from the article body/markup so that a
// future `/blog/[slug]` route can key off `slug` without duplicating data.
export interface BlogPostMeta {
  slug: string
  category: string
  title: string
  subtitle: string
  /** ISO date string, used for the <time dateTime> attribute. */
  date: string
  /** Human-readable date, already localized for this post. */
  dateLabel: string
  readingTime: string
}

export const posts: BlogPostMeta[] = [
  {
    slug: '150-dias-para-aprobar-un-eia',
    category: 'Casos de uso',
    title: '150 días para aprobar un EIA: ¿en cuánto se puede preparar?',
    subtitle:
      'Qué aprendimos automatizando un expediente técnico con Polisense en Arequipa',
    date: '2026-08-18',
    dateLabel: '18 de agosto de 2026',
    readingTime: '6 min de lectura',
  },
]

export const featuredPost = posts[0]
