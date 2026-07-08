// ─── Storage key ───────────────────────────────────────────────────
const KEY = 'hexagon_v1'

// ─── Default page data for Puck ─────────────────────────────────────
export function makeDefaultData(pageKey, lang = 'vi') {
  const k = `${pageKey}__${lang}`
  const map = {
    'home__vi': {
      content: [
        { type: 'Header',          props: { lang: 'vi' } },
        { type: 'HeroSection',     props: {} },
        { type: 'AboutSection',    props: {} },
        { type: 'ServicesSection', props: {} },
        { type: 'NewsSection',     props: {} },
        { type: 'PartnersSection', props: {} },
        { type: 'ContactSection',  props: {} },
        { type: 'Footer',          props: { lang: 'vi' } },
      ],
      root: { props: {} },
    },
    'home__en': {
      content: [
        { type: 'Header',          props: { lang: 'en' } },
        { type: 'HeroSection',     props: { title: 'Construction & Installation', brandName: 'HEXAGON', subtitle: 'Solutions', description: 'HEXAGON creates comprehensive digital transformation solutions.', btn1: 'Explore Services', btn2: 'Contact Us', scrollText: 'Scroll down to explore' } },
        { type: 'AboutSection',    props: { title: 'About Hexagon', description: 'Hexagon Corporation – Pioneering technology, where we continuously create and innovate.', missionTitle: 'Mission', missionText: 'Build the digital future with advanced solutions.', visionTitle: 'Vision', visionText: 'Become a symbol of innovative technology ecosystem.', valuesTitle: 'Core Values', valuesText: 'Innovation - Companion - Pioneer - Transparent.', foundationTitle: 'Foundation', foundationText: 'Multi-industry ecosystem, solid and flexible.', quote: '"Work day, work night, work extra day ^_^"', quoteAuthor: '— HEXAGON CULTURE' } },
        { type: 'ServicesSection', props: { title: 'Fields of Operation', subtitle: 'At Hexagon, we focus on developing a comprehensive technology ecosystem.' } },
        { type: 'NewsSection',     props: { title: 'News', subtitle: 'Latest news from Hexagon Corporation.', btnText: 'View all articles' } },
        { type: 'PartnersSection', props: { title: 'Linked Partners' } },
        { type: 'ContactSection',  props: { title: 'Contact Us', subtitle: 'Ready for your next project? Our experts are here to help.', addressLabel: 'Headquarters', emailLabel: 'Email', hotlineLabel: 'Hotline' } },
        { type: 'Footer',          props: { lang: 'en' } },
      ],
      root: { props: {} },
    },
    'tin-tuc__vi': {
      content: [
        { type: 'Header',       props: { lang: 'vi' } },
        { type: 'NewsListPage', props: {} },
        { type: 'Footer',       props: { lang: 'vi' } },
      ],
      root: { props: {} },
    },
    'tin-tuc__en': {
      content: [
        { type: 'Header',       props: { lang: 'en' } },
        { type: 'NewsListPage', props: { title: 'News', subtitle: 'Latest news from Hexagon Corporation.' } },
        { type: 'Footer',       props: { lang: 'en' } },
      ],
      root: { props: {} },
    },
  }
  return map[k] || map['home__vi']
}

export function loadSaved(pageKey, lang) {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const all = JSON.parse(raw)
    const data = all[`${pageKey}__${lang}`]
    if (!data || !Array.isArray(data.content) || data.content.length === 0) return null
    // Strict validation: max 1 Header, max 1 Footer
    const headers = data.content.filter(c => c.type === 'Header').length
    const footers = data.content.filter(c => c.type === 'Footer').length
    if (headers > 1 || footers > 1) {
      // Auto-fix: delete corrupted data, return null to use default
      console.warn(`[Hexagon] Corrupted data for ${pageKey}__${lang}: ${headers} headers, ${footers} footers. Resetting.`)
      try {
        const all2 = JSON.parse(raw)
        delete all2[`${pageKey}__${lang}`]
        localStorage.setItem(KEY, JSON.stringify(all2))
      } catch {}
      return null
    }
    return data
  } catch { return null }
}

export function saveData(pageKey, lang, newData) {
  try {
    const raw = localStorage.getItem(KEY)
    const all = raw ? JSON.parse(raw) : {}
    all[`${pageKey}__${lang}`] = newData
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {}
}

export function clearAll() {
  try { localStorage.removeItem(KEY) } catch {}
}

export const MANAGED_PAGES = [
  { key: 'home',     slug: '/',         titleVi: 'Trang chủ', titleEn: 'Home' },
  { key: 'tin-tuc',  slug: '/tin-tuc',  titleVi: 'Tin tức',   titleEn: 'News' },
]