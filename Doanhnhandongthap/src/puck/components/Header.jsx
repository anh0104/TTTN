import React, { useState } from 'react'

export default function Header({
  logo = 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
  logoSub = 'TẠI TP.HỒ CHÍ MINH',
  logoImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg',
}) {
  const [open, setOpen] = useState(false)
  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/gioi-thieu' },
    { label: 'Hội viên', href: '/hoi-vien' },
    { label: 'Hoạt động Ban', href: '/#hoat-dong' },
    { label: 'Tin tức & Sự kiện', href: '/#tin-tuc' },
    { label: 'Liên hệ', href: '/#lien-he' },
  ]
  return (
    <header style={{ background: '#0A2472', position: 'sticky', top: 0, zIndex: 999, boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="36" height="36" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="18" fill="#0A2472"/>
              <ellipse cx="18" cy="22" rx="10" ry="6" fill="#1a6b8a" opacity="0.7"/>
              <ellipse cx="18" cy="14" rx="6" ry="9" fill="#e75480" opacity="0.85"/>
              <ellipse cx="13" cy="17" rx="5" ry="8" fill="#e75480" opacity="0.7" transform="rotate(-20 13 17)"/>
              <ellipse cx="23" cy="17" rx="5" ry="8" fill="#e75480" opacity="0.7" transform="rotate(20 23 17)"/>
              <circle cx="18" cy="14" r="3" fill="#FFD700"/>
            </svg>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: 1.25, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{logo}</div>
            <div style={{ color: '#fff', fontWeight: 400, fontSize: 11, opacity: 0.85, marginTop: 1 }}>{logoSub}</div>
          </div>
        </a>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href}
              style={{ color: '#fff', textDecoration: 'none', fontSize: 14.5, fontWeight: 400, padding: '8px 16px', borderRadius: 4, transition: 'background 0.15s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >{l.label}</a>
          ))}
          {/* VN/EN toggle */}
          <div style={{ marginLeft: 12, background: '#C8A84B', borderRadius: 20, padding: '5px 12px', display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>VN</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>EN</span>
          </div>
        </nav>
      </div>
    </header>
  )
}
