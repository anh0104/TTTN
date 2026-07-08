import React, { useState, useEffect } from 'react'
import { Puck } from '@puckeditor/core'
import { puckConfig } from '../puck/config.jsx'
import '@puckeditor/core/dist/index.css'

// ── Safe default data — không lấy từ localStorage nếu lỗi ──────────
function makeDefault(pageKey) {
  const map = {
    home: {
      content: [
        { type: 'Header', props: { activePage: '/' } },
        { type: 'Hero', props: {} },
        { type: 'ProductGrid', props: {} },
        { type: 'AboutMetik', props: {} },
        { type: 'AboutUs', props: {} },
        { type: 'Testimonials', props: {} },
        { type: 'Footer', props: {} },
      ],
      root: { props: {} },
    },
    'gioi-thieu': {
      content: [
        { type: 'Header', props: { activePage: '/gioi-thieu' } },
        { type: 'AboutPage', props: {} },
        { type: 'Footer', props: {} },
      ],
      root: { props: {} },
    },
    'san-pham': {
      content: [
        { type: 'Header', props: { activePage: '/san-pham' } },
        { type: 'Hero', props: {} },
        { type: 'ProductList', props: {} },
        { type: 'Footer', props: {} },
      ],
      root: { props: {} },
    },
    'chi-tiet': {
      content: [
        { type: 'Header', props: { activePage: '/san-pham' } },
        { type: 'ProductDetail', props: {} },
        { type: 'Footer', props: {} },
      ],
      root: { props: {} },
    },
    'tin-tuc': {
      content: [
        { type: 'Header', props: { activePage: '/tin-tuc' } },
        { type: 'NewsPage', props: {} },
        { type: 'Footer', props: {} },
      ],
      root: { props: {} },
    },
    'lien-he': {
      content: [
        { type: 'Header', props: { activePage: '/lien-he' } },
        { type: 'ContactPage', props: {} },
        { type: 'Footer', props: {} },
      ],
      root: { props: {} },
    },
  }
  return map[pageKey] || map.home
}

const PAGES = [
  { key: 'home',        label: '🏠 Trang chủ',  path: '/' },
  { key: 'gioi-thieu', label: '📖 Giới thiệu',  path: '/gioi-thieu' },
  { key: 'san-pham',   label: '🍟 Sản phẩm',    path: '/san-pham' },
  { key: 'chi-tiet',   label: '📦 Chi tiết SP', path: '/san-pham/snack-vi-bbq' },
  { key: 'tin-tuc',    label: '📰 Tin tức',     path: '/tin-tuc' },
  { key: 'lien-he',    label: '📍 Liên hệ',     path: '/lien-he' },
]

const STORAGE_KEY = 'metik_pages_v2' // Đổi key mới để tránh data cũ bị lỗi

function loadSaved(pageKey) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const all = JSON.parse(raw)
    const data = all[pageKey]
    if (!data || !Array.isArray(data.content) || data.content.length === 0) return null
    // Kiểm tra không có duplicate type liên tiếp (dấu hiệu data cũ bị lỗi)
    const types = data.content.map(c => c.type)
    const footerCount = types.filter(t => t === 'Footer').length
    if (footerCount > 1) return null // data cũ bị lỗi → dùng default
    return data
  } catch (e) {
    return null
  }
}

function saveAll(pageKey, newData, currentSaved) {
  try {
    const all = { ...currentSaved, [pageKey]: newData }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    return all
  } catch (e) {
    return currentSaved
  }
}

export default function Editor() {
  const [page, setPage] = useState('home')
  const [dataMap, setDataMap] = useState({}) // { [pageKey]: puckData }
  const [saved, setSaved] = useState(false)
  const [resetKey, setResetKey] = useState(0) // force re-mount Puck

  // Lấy data cho trang hiện tại
  const currentData = dataMap[page] || loadSaved(page) || makeDefault(page)

  function onPublish(newData) {
    setDataMap(prev => {
      const updated = { ...prev, [page]: newData }
      // Persist
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const all = raw ? JSON.parse(raw) : {}
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...all, [page]: newData }))
      } catch (e) {}
      return updated
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleChangePage(key) {
    setPage(key)
    setResetKey(k => k + 1)
  }

  function handleReset() {
    if (!window.confirm(`Reset trang "${PAGES.find(p=>p.key===page)?.label}" về mặc định?`)) return
    const fresh = makeDefault(page)
    setDataMap(prev => ({ ...prev, [page]: fresh }))
    // Xoá khỏi storage
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const all = raw ? JSON.parse(raw) : {}
      delete all[page]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    } catch (e) {}
    setResetKey(k => k + 1)
  }

  function handleResetAll() {
    if (!window.confirm('Xoá toàn bộ data đã lưu và reset về mặc định?')) return
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('metik_pages') // xoá key cũ luôn
    setDataMap({})
    setResetKey(k => k + 1)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── Top bar ── */}
      <div style={{
        background: '#1c4fa3', padding: '8px 16px',
        display: 'flex', alignItems: 'center', gap: 8,
        flexShrink: 0, zIndex: 1000, flexWrap: 'wrap',
      }}>
        <span style={{ color: '#FFD875', fontWeight: 800, fontSize: 15, marginRight: 6 }}>METIK CMS</span>

        {PAGES.map(p => (
          <button key={p.key} onClick={() => handleChangePage(p.key)} style={{
            padding: '5px 13px', border: 'none', borderRadius: 20, cursor: 'pointer',
            background: page === p.key ? '#FFD875' : 'rgba(255,255,255,0.12)',
            color: page === p.key ? '#0A2472' : '#fff',
            fontWeight: page === p.key ? 700 : 400, fontSize: 13,
          }}>{p.label}</button>
        ))}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {saved && <span style={{ color: '#9cff9c', fontWeight: 700, fontSize: 12 }}>✓ Đã lưu</span>}

          {/* Nút Reset trang hiện tại */}
          <button onClick={handleReset} style={{
            background: 'rgba(255,100,100,0.25)', border: '1px solid rgba(255,150,150,0.5)',
            color: '#ffaaaa', padding: '4px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 12,
          }} title="Reset trang này về mặc định">🔄 Reset trang</button>

          {/* Nút Reset tất cả */}
          <button onClick={handleResetAll} style={{
            background: 'rgba(255,50,50,0.2)', border: '1px solid rgba(255,100,100,0.5)',
            color: '#ff8888', padding: '4px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 12,
          }} title="Xoá toàn bộ localStorage và reset">🗑️ Xoá tất cả</button>

          <a href={PAGES.find(p => p.key === page)?.path || '/'} target="_blank" rel="noreferrer"
            style={{ color: '#FFD875', textDecoration: 'none', fontSize: 12, border: '1px solid rgba(255,216,117,0.4)', padding: '4px 12px', borderRadius: 4 }}>
            Xem ↗
          </a>
          <a href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 12 }}>← Web</a>
        </div>
      </div>

      {/* ── Puck editor ── */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Puck
          key={`${page}-${resetKey}`}
          config={puckConfig}
          data={currentData}
          onPublish={onPublish}
        />
      </div>
    </div>
  )
}
