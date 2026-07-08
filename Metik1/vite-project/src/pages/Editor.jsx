import React, { useState } from 'react'
import { Puck } from '@puckeditor/core'
import '@puckeditor/core/dist/index.css'
import { puckConfig } from '../puck/config.jsx'
import { PAGE_DATA, getSavedData, saveData, clearAllData } from '../pageData.js'

const PAGES = [
  { key: 'home',        label: '🏠 Trang chủ',  path: '/' },
  { key: 'gioi-thieu', label: '📖 Giới thiệu',  path: '/gioi-thieu' },
  { key: 'san-pham',   label: '🍟 Sản phẩm',    path: '/san-pham' },
  { key: 'chi-tiet',   label: '📦 Chi tiết SP', path: '/san-pham/snack-vi-bbq' },
  { key: 'tin-tuc',    label: '📰 Tin tức',     path: '/tin-tuc' },
  { key: 'lien-he',    label: '📍 Liên hệ',     path: '/lien-he' },
]

export default function Editor() {
  const [pageKey, setPageKey] = useState('home')
  const [mountKey, setMountKey] = useState(0) // force remount Puck khi đổi trang
  const [saved, setSaved] = useState(false)

  // Luôn lấy data sạch: saved hợp lệ → dùng, không có → dùng default
  function getCleanData(key) {
    return getSavedData(key) || PAGE_DATA[key] || PAGE_DATA.home
  }

  function handleChangePage(key) {
    setPageKey(key)
    setMountKey(k => k + 1) // remount Puck → không giữ state cũ
  }

  function handlePublish(newData) {
    // Validate trước khi lưu
    const footers = (newData.content || []).filter(c => c.type === 'Footer').length
    const headers = (newData.content || []).filter(c => c.type === 'Header').length
    if (footers > 1 || headers > 1) {
      alert('Lỗi: Trang có nhiều hơn 1 Header hoặc Footer! Vui lòng xoá bớt.')
      return
    }
    saveData(pageKey, newData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleResetPage() {
    if (!window.confirm(`Reset trang này về mặc định?`)) return
    // Xoá data đã lưu của trang này
    try {
      const raw = localStorage.getItem('metikkk_v1')
      if (raw) {
        const all = JSON.parse(raw)
        delete all[pageKey]
        localStorage.setItem('metikkk_v1', JSON.stringify(all))
      }
    } catch {}
    setMountKey(k => k + 1)
  }

  function handleClearAll() {
    if (!window.confirm('Xoá toàn bộ data đã lưu? Không thể hoàn tác!')) return
    clearAllData()
    setMountKey(k => k + 1)
    alert('Đã xoá! Tất cả trang sẽ về mặc định.')
  }

  const currentData = getCleanData(pageKey)
  const currentPath = PAGES.find(p => p.key === pageKey)?.path || '/'

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top bar ── */}
      <div style={{
        background: '#1c4fa3',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
        flexWrap: 'wrap',
        zIndex: 9999,
      }}>
        <span style={{ color: '#FFD875', fontWeight: 800, fontSize: 14, marginRight: 4 }}>METIK CMS</span>

        {/* Page tabs */}
        {PAGES.map(p => (
          <button
            key={p.key}
            onClick={() => handleChangePage(p.key)}
            style={{
              padding: '5px 13px',
              border: 'none',
              borderRadius: 20,
              cursor: 'pointer',
              background: pageKey === p.key ? '#FFD875' : 'rgba(255,255,255,0.15)',
              color: pageKey === p.key ? '#0A2472' : '#fff',
              fontWeight: pageKey === p.key ? 700 : 400,
              fontSize: 13,
              transition: 'all 0.15s',
            }}
          >
            {p.label}
          </button>
        ))}

        {/* Right actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {saved && (
            <span style={{ color: '#9cff9c', fontWeight: 700, fontSize: 12 }}>✓ Đã lưu!</span>
          )}

          <button
            onClick={handleResetPage}
            style={{ background: 'rgba(255,160,0,0.25)', border: '1px solid rgba(255,160,0,0.5)', color: '#ffd080', padding: '4px 11px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
            title="Reset trang này về mặc định"
          >
            🔄 Reset trang
          </button>

          <button
            onClick={handleClearAll}
            style={{ background: 'rgba(255,60,60,0.2)', border: '1px solid rgba(255,100,100,0.4)', color: '#ff9090', padding: '4px 11px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
            title="Xoá toàn bộ data localStorage"
          >
            🗑️ Xoá tất cả
          </button>

          <a
            href={currentPath}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#FFD875', textDecoration: 'none', fontSize: 12, border: '1px solid rgba(255,216,117,0.4)', padding: '4px 11px', borderRadius: 4 }}
          >
            Xem ↗
          </a>

          <a
            href="/"
            style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 12 }}
          >
            ← Web
          </a>
        </div>
      </div>

      {/* ── Puck editor ── */}
      {/* key thay đổi mỗi lần đổi trang → Puck unmount/remount hoàn toàn → không giữ state cũ */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Puck
          key={`${pageKey}-${mountKey}`}
          config={puckConfig}
          data={currentData}
          onPublish={handlePublish}
        />
      </div>
    </div>
  )
}