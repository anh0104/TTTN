// ─────────────────────────────────────────────────────────────
// CMS STORE
// Single source of truth: localStorage['hexagon_cms']
// Schema: { pages: Page[] }
// Page: { id, title, slug, language, status, seoTitle, updatedAt, puckData }
// ─────────────────────────────────────────────────────────────

import { SAMPLE_PAGES } from '../data/sampleData.js'

const KEY = 'hexagon_cms'

// ── Helpers ─────────────────────────────────────────────────
function genId() {
  return 'page-' + Math.random().toString(36).slice(2, 9) + '-' + Date.now()
}

function today() {
  return new Date().toLocaleDateString('vi-VN')
}

// ── Bootstrap: load localStorage or seed from sampleData ────
export function bootstrap() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const db = JSON.parse(raw)
      if (db && Array.isArray(db.pages) && db.pages.length > 0) return
    }
  } catch {}
  // First run — seed sample data
  localStorage.setItem(KEY, JSON.stringify({ pages: SAMPLE_PAGES }))
}

// ── Read ────────────────────────────────────────────────────
export function getAllPages() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const db = JSON.parse(raw)
    return Array.isArray(db.pages) ? db.pages : []
  } catch { return [] }
}

function write(pages) {
  localStorage.setItem(KEY, JSON.stringify({ pages }))
}

// ── Get single page ─────────────────────────────────────────
export function getPage(id) {
  return getAllPages().find(p => p.id === id) || null
}

// ── Get page by slug+lang (for public site) ─────────────────
export function getPageBySlugLang(slug, lang) {
  return getAllPages().find(p => p.slug === slug && p.language === lang && p.status === 'published') || null
}

// ── Create new page ─────────────────────────────────────────
export function createPage({ title = 'Trang mới', slug = 'trang-moi', language = 'vi' } = {}) {
  const pages = getAllPages()
  const newPage = {
    id: genId(),
    title,
    slug,
    language,
    status: 'draft',
    seoTitle: title,
    updatedAt: today(),
    puckData: {
      content: [
        { type: 'HexHeader',  props: { lang: language } },
        { type: 'HexHero',    props: {} },
        { type: 'HexFooter',  props: { lang: language } },
      ],
      root: { props: {} },
    },
  }
  write([...pages, newPage])
  return newPage
}

// ── Publish (save puckData + mark published) ─────────────────
export function publishPage(id, puckData) {
  const pages = getAllPages()
  const idx = pages.findIndex(p => p.id === id)
  if (idx === -1) return null

  // Validate: max 1 HexHeader, max 1 HexFooter
  const content = puckData.content || []
  const headers = content.filter(c => c.type === 'HexHeader').length
  const footers = content.filter(c => c.type === 'HexFooter').length
  if (headers > 1 || footers > 1) {
    throw new Error(`Lỗi: ${headers} Header, ${footers} Footer. Chỉ được có 1 mỗi loại.`)
  }

  const updated = {
    ...pages[idx],
    puckData,
    status: 'published',
    updatedAt: today(),
  }
  pages[idx] = updated
  write(pages)
  return updated
}

// ── Save draft (without publishing) ─────────────────────────
export function saveDraft(id, puckData) {
  const pages = getAllPages()
  const idx = pages.findIndex(p => p.id === id)
  if (idx === -1) return null
  const content = puckData.content || []
  const headers = content.filter(c => c.type === 'HexHeader').length
  const footers = content.filter(c => c.type === 'HexFooter').length
  if (headers > 1 || footers > 1) {
    throw new Error(`Lỗi: ${headers} Header, ${footers} Footer.`)
  }
  pages[idx] = { ...pages[idx], puckData, updatedAt: today() }
  write(pages)
  return pages[idx]
}

// ── Update metadata ──────────────────────────────────────────
export function updatePageMeta(id, meta) {
  const pages = getAllPages()
  const idx = pages.findIndex(p => p.id === id)
  if (idx === -1) return null
  pages[idx] = { ...pages[idx], ...meta, updatedAt: today() }
  write(pages)
  return pages[idx]
}

// ── Delete ───────────────────────────────────────────────────
export function deletePage(id) {
  const pages = getAllPages().filter(p => p.id !== id)
  write(pages)
}

// ── Duplicate: clone page, same language, new id ─────────────
export function duplicatePage(id) {
  const page = getPage(id)
  if (!page) return null
  const cloned = {
    ...page,
    id: genId(),
    title: page.title + ' (Bản sao)',
    slug: page.slug + '-copy-' + Date.now(),
    status: 'draft',
    updatedAt: today(),
  }
  const pages = getAllPages()
  write([...pages, cloned])
  return cloned
}

// ── Create Translation: clone to opposite language ───────────
export function createTranslation(id) {
  const page = getPage(id)
  if (!page) return null
  const targetLang = page.language === 'vi' ? 'en' : 'vi'

  // Update HexHeader/HexFooter lang prop in cloned puckData
  const clonedContent = (page.puckData?.content || []).map(block => {
    if (block.type === 'HexHeader' || block.type === 'HexFooter') {
      return { ...block, props: { ...block.props, lang: targetLang } }
    }
    return { ...block }
  })

  const translation = {
    ...page,
    id: genId(),
    language: targetLang,
    status: 'draft',
    updatedAt: today(),
    puckData: { ...page.puckData, content: clonedContent },
  }
  const pages = getAllPages()
  write([...pages, translation])
  return translation
}

// ── Check if page already has translation ───────────────────
export function hasTranslation(page) {
  const targetLang = page.language === 'vi' ? 'en' : 'vi'
  const all = getAllPages()
  return all.some(p => p.slug === page.slug && p.language === targetLang)
}