import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Render } from '@puckeditor/core'
import { puckConfig } from './puck/config.jsx'
import '@puckeditor/core/dist/index.css'

// Helper: tạo content item có id unique
function blk(type, props = {}) {
  return { type, props: { ...props } }
}

// ── Default data cho từng trang ──────────────────────────────────
const DEFAULTS = {
  home: {
    content: [
      blk('Header', { activePage: '/' }),
      blk('Hero'),
      blk('ProductGrid'),
      blk('AboutMetik'),
      blk('AboutUs'),
      blk('Testimonials'),
      blk('Footer'),
    ],
    root: { props: {} },
  },
  'gioi-thieu': {
    content: [
      blk('Header', { activePage: '/gioi-thieu' }),
      blk('AboutPage'),
      blk('Footer'),
    ],
    root: { props: {} },
  },
  'san-pham': {
    content: [
      blk('Header', { activePage: '/san-pham' }),
      blk('Hero'),
      blk('ProductList'),
      blk('Footer'),
    ],
    root: { props: {} },
  },
  'chi-tiet': {
    content: [
      blk('Header', { activePage: '/san-pham' }),
      blk('ProductDetail'),
      blk('Footer'),
    ],
    root: { props: {} },
  },
  'tin-tuc': {
    content: [
      blk('Header', { activePage: '/tin-tuc' }),
      blk('NewsPage'),
      blk('Footer'),
    ],
    root: { props: {} },
  },
  'lien-he': {
    content: [
      blk('Header', { activePage: '/lien-he' }),
      blk('ContactPage'),
      blk('Footer'),
    ],
    root: { props: {} },
  },
}

function getPageData(key) {
  try {
    const s = localStorage.getItem('metik_pages')
    if (s) {
      const all = JSON.parse(s)
      if (all[key]) return all[key]
    }
  } catch (e) {}
  return DEFAULTS[key] || DEFAULTS.home
}

function PageView({ pageKey }) {
  const data = getPageData(pageKey)
  return <Render config={puckConfig} data={data} />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PageView pageKey="home" />} />
      <Route path="/gioi-thieu" element={<PageView pageKey="gioi-thieu" />} />
      <Route path="/san-pham" element={<PageView pageKey="san-pham" />} />
      <Route path="/san-pham/:slug" element={<PageView pageKey="chi-tiet" />} />
      <Route path="/tin-tuc" element={<PageView pageKey="tin-tuc" />} />
      <Route path="/lien-he" element={<PageView pageKey="lien-he" />} />
    </Routes>
  )
}
