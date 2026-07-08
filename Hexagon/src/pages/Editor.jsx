import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Puck } from '@puckeditor/core'
import '@puckeditor/core/dist/index.css'
import { puckConfig } from '../puck/config.jsx'
import { makeDefaultData, loadSaved, saveData, clearAll } from '../store/pageStore.js'

const PAGE_LABELS = {
  home: 'Trang chủ',
  'tin-tuc': 'Tin tức',
}

// Lấy data sạch — tự động xoá nếu bị lỗi nhiều Footer/Header
function getCleanData(pageKey, lang) {
  const saved = loadSaved(pageKey, lang) // loadSaved đã tự validate & xoá nếu lỗi
  return saved || makeDefaultData(pageKey, lang)
}

export default function Editor() {
  const { pageKey = 'home', lang = 'vi' } = useParams()
  const navigate = useNavigate()
  const [mountKey, setMountKey] = useState(0)
  const [saved, setSaved] = useState(false)

  // Khi đổi trang/lang → remount Puck hoàn toàn
  function changePage(newKey, newLang) {
    navigate(`/editor/${newKey}/${newLang}`)
    setMountKey(k => k + 1)
  }

  function handlePublish(newData) {
    const content = newData.content || []
    const headers = content.filter(c => c.type === 'Header').length
    const footers = content.filter(c => c.type === 'Footer').length
    if (headers > 1 || footers > 1) {
      alert(`⚠️ Lỗi: ${headers} Header, ${footers} Footer!\nChỉ được có 1 Header và 1 Footer. Vui lòng xoá bớt.`)
      return
    }
    saveData(pageKey, lang, newData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleReset() {
    if (!window.confirm('Reset trang này về mặc định?')) return
    try {
      const KEY = 'hexagon_v1'
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const all = JSON.parse(raw)
        delete all[`${pageKey}__${lang}`]
        localStorage.setItem(KEY, JSON.stringify(all))
      }
    } catch {}
    setMountKey(k => k + 1)
  }

  function handleClearAll() {
    if (!window.confirm('Xoá TOÀN BỘ data đã lưu? Không thể hoàn tác!')) return
    clearAll()
    setMountKey(k => k + 1)
  }

  const data = getCleanData(pageKey, lang)
  const footerCount = (data.content || []).filter(c => c.type === 'Footer').length
  const headerCount = (data.content || []).filter(c => c.type === 'Header').length

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>

      {/* ── Top bar ── */}
      <div style={{
        background: '#1B4332', padding: '8px 20px',
        display: 'flex', alignItems: 'center', gap: 10,
        flexShrink: 0, zIndex: 9999, flexWrap: 'wrap',
      }}>
        {/* Logo */}
        <svg width="22" height="22" viewBox="0 0 40 40">
          <polygon points="20,2 37,11 37,29 20,38 3,29 3,11" fill="none" stroke="#4ADE80" strokeWidth="2.5"/>
          <circle cx="20" cy="20" r="5" fill="#4ADE80"/>
        </svg>
        <span style={{ color: '#4ADE80', fontWeight: 800, fontSize: 14, marginRight: 4 }}>HEXAGON</span>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Đang sửa:</span>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>
          {PAGE_LABELS[pageKey] || pageKey} [{lang.toUpperCase()}]
        </span>

        {/* Lang tabs */}
        <div style={{ display: 'flex', gap: 4, marginLeft: 6 }}>
          {['vi', 'en'].map(l => (
            <button key={l}
              onClick={() => changePage(pageKey, l)}
              style={{
                padding: '4px 12px', border: 'none', borderRadius: 16, cursor: 'pointer',
                fontSize: 12, fontWeight: 700,
                background: lang === l ? '#4ADE80' : 'rgba(255,255,255,0.12)',
                color: lang === l ? '#1B4332' : '#fff',
              }}>
              {l === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
            </button>
          ))}
        </div>

        {/* Page tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {Object.entries(PAGE_LABELS).map(([key, label]) => (
            <button key={key}
              onClick={() => changePage(key, lang)}
              style={{
                padding: '4px 12px', border: 'none', borderRadius: 16, cursor: 'pointer',
                fontSize: 12,
                fontWeight: pageKey === key ? 700 : 400,
                background: pageKey === key ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                color: '#fff',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {saved && <span style={{ color: '#4ADE80', fontWeight: 700, fontSize: 12 }}>✓ Đã lưu!</span>}

          <button onClick={handleReset}
            style={{ background: 'rgba(255,160,0,0.2)', border: '1px solid rgba(255,160,0,0.4)', color: '#ffd080', padding: '4px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
            🔄 Reset trang
          </button>

          <button onClick={handleClearAll}
            style={{ background: 'rgba(255,60,60,0.15)', border: '1px solid rgba(255,100,100,0.4)', color: '#ff9090', padding: '4px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
            🗑 Xoá tất cả
          </button>

          <a href={lang === 'en' ? '/en' : '/'} target="_blank" rel="noreferrer"
            style={{ color: '#4ADE80', textDecoration: 'none', fontSize: 12, border: '1px solid rgba(74,222,128,0.4)', padding: '4px 12px', borderRadius: 4 }}>
            Xem ↗
          </a>
          <a href="/admin" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 12 }}>← Quản lý</a>
        </div>
      </div>

      {/* ── Cảnh báo nếu data vẫn còn lỗi ── */}
      {(headerCount > 1 || footerCount > 1) && (
        <div style={{ background: '#FEF3C7', borderBottom: '2px solid #F59E0B', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <span style={{ color: '#92400E', fontSize: 14, fontWeight: 600 }}>
            Phát hiện {headerCount} Header, {footerCount} Footer. Vui lòng xoá bớt hoặc bấm Reset.
          </span>
          <button onClick={handleReset}
            style={{ background: '#F59E0B', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 4, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
            Reset ngay
          </button>
        </div>
      )}

      {/* ── Puck Editor ── */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Puck
          key={`${pageKey}-${lang}-${mountKey}`}
          config={puckConfig}
          data={data}
          onPublish={handlePublish}
        />
      </div>
    </div>
  )
}