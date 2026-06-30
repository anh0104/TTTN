import React, { useState } from 'react'
import { Puck } from '@puckeditor/core'
import { puckConfig } from '../puck/config.jsx'
import '@puckeditor/core/dist/index.css'

const HOME_DATA = {
  content: [
    { type: 'Header', props: { id: 'h1' } },
    { type: 'Hero', props: { id: 'hero1' } },
    { type: 'MemberLogos', props: { id: 'ml1' } },
    { type: 'About', props: { id: 'ab1' } },
    { type: 'Committees', props: { id: 'cm1' } },
    { type: 'Stats', props: { id: 'st1' } },
    { type: 'News', props: { id: 'nw1' } },
    { type: 'Values', props: { id: 'vl1' } },
    { type: 'Contact', props: { id: 'ct1' } },
    { type: 'Footer', props: { id: 'ft1' } },
  ],
  root: { props: {} },
}
const GIOI_THIEU_DATA = {
  content: [
    { type: 'Header', props: { id: 'h1' } },
    { type: 'AboutPage', props: { id: 'ap1' } },
    { type: 'Contact', props: { id: 'ct1' } },
    { type: 'Footer', props: { id: 'ft1' } },
  ],
  root: { props: {} },
}
const HOI_VIEN_DATA = {
  content: [
    { type: 'Header', props: { id: 'h1' } },
    { type: 'Member', props: { id: 'mv1' } },
    { type: 'Contact', props: { id: 'ct1' } },
    { type: 'Footer', props: { id: 'ft1' } },
  ],
  root: { props: {} },
}
const DEFAULTS = { home: HOME_DATA, 'gioi-thieu': GIOI_THIEU_DATA, 'hoi-vien': HOI_VIEN_DATA }

const PAGES = [
  { key: 'home', label: '🏠 Trang chủ', path: '/' },
  { key: 'gioi-thieu', label: '📖 Giới thiệu', path: '/gioi-thieu' },
  { key: 'hoi-vien', label: '👥 Hội viên', path: '/hoi-vien' },
]

function load() {
  try { const s = localStorage.getItem('dndt_pages'); if (s) return { ...DEFAULTS, ...JSON.parse(s) } } catch (e) {}
  return { ...DEFAULTS }
}

export default function Editor() {
  const [page, setPage] = useState('home')
  const [pages, setPages] = useState(load)
  const [saved, setSaved] = useState(false)

  const data = pages[page] || DEFAULTS[page]

  function onPublish(d) {
    const updated = { ...pages, [page]: d }
    setPages(updated)
    localStorage.setItem('dndt_pages', JSON.stringify(updated))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav bar */}
      <div style={{ background: '#0A2472', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, zIndex: 1000 }}>
        <span style={{ color: '#FFD875', fontWeight: 800, fontSize: 14, marginRight: 8 }}>CLB Doanh Nhân Đồng Tháp</span>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Trang:</span>
        {PAGES.map(p => (
          <button key={p.key} onClick={() => setPage(p.key)} style={{
            padding: '6px 16px', background: page === p.key ? '#FFD875' : 'rgba(255,255,255,0.1)',
            color: page === p.key ? '#0A2472' : '#fff', border: 'none', borderRadius: 20,
            cursor: 'pointer', fontSize: 13, fontWeight: page === p.key ? 700 : 400,
          }}>{p.label}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          {saved && <span style={{ color: '#4caf50', fontSize: 13, fontWeight: 600 }}>✓ Đã lưu!</span>}
          <a href={PAGES.find(p => p.key === page)?.path || '/'} target="_blank"
            style={{ color: '#FFD875', textDecoration: 'none', fontSize: 13, padding: '6px 14px', border: '1px solid rgba(255,215,117,0.4)', borderRadius: 4 }}>
            Xem trang ↗
          </a>
          <a href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>← Về trang web</a>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Puck key={page} config={puckConfig} data={data} onPublish={onPublish} />
      </div>
    </div>
  )
}