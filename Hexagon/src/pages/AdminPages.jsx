import React, { useState } from 'react'
import { makeDefaultData, loadSaved, saveData, clearAll, MANAGED_PAGES } from '../store/pageStore.js'

const KEY = 'hexagon_v1'

function getAllPages() {
  try {
    const raw = localStorage.getItem(KEY)
    const saved = raw ? JSON.parse(raw) : {}
    // Merge default pages + any extra saved pages
    const result = []
    MANAGED_PAGES.forEach(p => {
      ;['vi', 'en'].forEach(lang => {
        const k = `${p.key}__${lang}`
        const data = saved[k] || makeDefaultData(p.key, lang)
        const isPublished = !!saved[k]
        result.push({
          id: k,
          pageKey: p.key,
          lang,
          title: lang === 'vi' ? p.titleVi : p.titleEn,
          slug: lang === 'en' ? `/en${p.slug === '/' ? '' : p.slug}` : p.slug,
          seo: lang === 'vi' ? p.titleVi : p.titleEn,
          status: isPublished ? 'published' : 'draft',
          updatedAt: isPublished ? new Date().toLocaleDateString('vi-VN') : '',
        })
      })
    })
    return result
  } catch { return [] }
}

export default function AdminPages() {
  const [pages, setPages] = useState(getAllPages)
  const [filterLang, setFilterLang] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('')
  const [flash, setFlash] = useState('')

  function refresh() { setPages(getAllPages()) }

  function handleDelete(id) {
    if (!window.confirm('Xoá trang này?')) return
    try {
      const raw = localStorage.getItem(KEY)
      const all = raw ? JSON.parse(raw) : {}
      delete all[id]
      localStorage.setItem(KEY, JSON.stringify(all))
      refresh()
      showFlash('Đã xoá!')
    } catch {}
  }

  function handleClone(page) {
    // Clone vi → en or en → vi
    const targetLang = page.lang === 'vi' ? 'en' : 'vi'
    const targetId = `${page.pageKey}__${targetLang}`
    try {
      const raw = localStorage.getItem(KEY)
      const all = raw ? JSON.parse(raw) : {}
      // Get source data
      const sourceData = all[page.id] || makeDefaultData(page.pageKey, page.lang)
      // Clone but switch lang in Header/Footer props
      const cloned = {
        ...sourceData,
        content: sourceData.content.map(block => {
          if (block.type === 'Header' || block.type === 'Footer') {
            return { ...block, props: { ...block.props, lang: targetLang } }
          }
          return block
        })
      }
      all[targetId] = cloned
      localStorage.setItem(KEY, JSON.stringify(all))
      refresh()
      showFlash(`Đã tạo bản dịch ${targetLang.toUpperCase()}! Vào Editor để chỉnh sửa.`)
    } catch {}
  }

  function showFlash(msg) {
    setFlash(msg)
    setTimeout(() => setFlash(''), 3000)
  }

  const filtered = pages.filter(p => {
    if (filterLang !== 'all' && p.lang !== filterLang) return false
    if (filterStatus !== 'all' && p.status !== filterStatus) return false
    return true
  })

  const statusColors = { published: '#16a34a', draft: '#6b7280' }
  const statusLabels = { published: 'Đã xuất bản', draft: 'Bản nháp' }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Top bar */}
      <div style={{ background: '#1B4332', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <svg width="28" height="28" viewBox="0 0 40 40">
          <polygon points="20,2 37,11 37,29 20,38 3,29 3,11" fill="none" stroke="#4ADE80" strokeWidth="2.5"/>
          <circle cx="20" cy="20" r="5" fill="#4ADE80"/>
        </svg>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 18 }}>HEXAGON CMS</span>
        <a href="/" style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>← Xem trang web</a>
      </div>

      <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px' }}>
        {/* Flash message */}
        {flash && (
          <div style={{ background: '#D1FAE5', border: '1px solid #6EE7B7', color: '#065F46', padding: '12px 20px', borderRadius: 8, marginBottom: 20, fontWeight: 600 }}>
            ✓ {flash}
          </div>
        )}

        {/* Header card */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '28px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>📄</span> Quản lý Pages
              </h1>
              <p style={{ color: '#888', fontSize: 14 }}>Tạo và quản lý các trang với PUCK Visual Builder</p>
            </div>
            <a href="/editor/home/vi" style={{
              background: '#065F46', color: '#fff', padding: '10px 22px', borderRadius: 8,
              textDecoration: 'none', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8,
            }}>+ Tạo Page Mới</a>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>Ngôn ngữ</label>
              <select value={filterLang} onChange={e => setFilterLang(e.target.value)}
                style={{ padding: '8px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, background: '#fff', minWidth: 140 }}>
                <option value="all">Tất cả</option>
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>Trạng thái</label>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                style={{ padding: '8px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, background: '#fff', minWidth: 140 }}>
                <option value="all">Tất cả</option>
                <option value="published">Đã xuất bản</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>Ngày cập nhật</label>
              <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
                style={{ padding: '8px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, background: '#fff' }} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px 120px 100px 140px', gap: 0, background: '#f9fafb', padding: '12px 24px', borderBottom: '1px solid #eee' }}>
            {['TIÊU ĐỀ', 'SLUG', 'NGÔN NGỮ', 'TRẠNG THÁI', 'CẬP NHẬT', 'THAO TÁC'].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((page, i) => (
            <div key={page.id} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 80px 120px 100px 140px',
              gap: 0, padding: '16px 24px', borderBottom: '1px solid #f0f0f0',
              background: i % 2 === 0 ? '#fff' : '#fafafa',
              alignItems: 'center',
            }}>
              {/* Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>📄</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: 14 }}>{page.title}</div>
                  <div style={{ color: '#888', fontSize: 12 }}>SEO: {page.seo}</div>
                </div>
              </div>
              {/* Slug */}
              <span style={{ color: '#065F46', fontSize: 13, fontWeight: 500 }}>{page.slug}</span>
              {/* Lang */}
              <span style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                background: page.lang === 'vi' ? '#FEF3C7' : '#DBEAFE',
                color: page.lang === 'vi' ? '#92400E' : '#1E40AF',
                textTransform: 'uppercase', width: 'fit-content',
              }}>{page.lang}</span>
              {/* Status */}
              <span style={{
                display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                background: page.status === 'published' ? '#D1FAE5' : '#F3F4F6',
                color: statusColors[page.status], width: 'fit-content',
              }}>{statusLabels[page.status]}</span>
              {/* Date */}
              <span style={{ color: '#888', fontSize: 13 }}>{page.updatedAt || '—'}</span>
              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {/* Clone to other lang */}
                <button onClick={() => handleClone(page)} title={`Tạo bản dịch ${page.lang === 'vi' ? 'EN' : 'VI'}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: 4, color: '#888' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#065F46'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                  ⧉
                </button>
                {/* Edit */}
                <a href={`/editor/${page.pageKey}/${page.lang}`} title="Chỉnh sửa với Puck"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: 4, color: '#888', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2563EB'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                  ✏️
                </a>
                {/* Delete */}
                <button onClick={() => handleDelete(page.id)} title="Xoá"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: 4, color: '#888' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#DC2626'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                  🗑️
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px', color: '#888' }}>Không có trang nào.</div>
          )}
        </div>

        {/* Danger zone */}
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <button onClick={() => { if (window.confirm('Xoá toàn bộ data đã lưu?')) { clearAll(); refresh(); showFlash('Đã xoá toàn bộ!') } }}
            style={{ background: 'none', border: '1px solid #fca5a5', color: '#ef4444', padding: '6px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
            🗑 Xoá toàn bộ cache
          </button>
        </div>
      </div>
    </div>
  )
}