import React, { useState } from 'react'

export default function Header({ activePage = '' } = {}) {
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'TRANG CHỦ', href: '/' },
    { label: 'GIỚI THIỆU', href: '/gioi-thieu' },
    { label: 'SẢN PHẨM', href: '/san-pham' },
    { label: 'TIN TỨC', href: '/tin-tuc' },
    { label: 'LIÊN HỆ', href: '/lien-he' },
  ]
  const ap = activePage || ''
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 80 }}>
        <a href="/" style={{ textDecoration: 'none', flexShrink: 0, marginRight: 48 }}>
          <svg width="110" height="52" viewBox="0 0 110 52">
            <text x="6" y="40" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="36"
              fill="#F5A800" stroke="#E07800" strokeWidth="3" strokeLinejoin="round" style={{ letterSpacing: '-1px' }}>metik</text>
            <text x="6" y="40" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="36"
              fill="#FFD000" style={{ letterSpacing: '-1px' }}>metik</text>
            <ellipse cx="62" cy="12" rx="5" ry="8" fill="#4CAF50" transform="rotate(-30 62 12)" />
            <circle cx="8" cy="8" r="4" fill="#FFD000" opacity="0.7" />
          </svg>
        </a>
        <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 0 }}>
          {links.map(l => {
            const isActive = l.href === '/' ? (ap === '' || ap === '/') : ap.startsWith(l.href)
            return (
              <a key={l.label} href={l.href} style={{
                color: '#333', textDecoration: 'none', fontSize: 14, fontWeight: 600,
                padding: '8px 20px', borderBottom: isActive ? '2px solid #F5A800' : '2px solid transparent',
                transition: 'all 0.15s', letterSpacing: '0.03em', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#F5A800' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#333' }}
              >{l.label}</a>
            )
          })}
        </nav>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <a href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: 16 }}>f</a>
          <a href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#fff', fontWeight: 700, fontSize: 13 }}>T</a>
          <a href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: '#0077B5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>in</a>
        </div>
        <a href="/editor" style={{ marginLeft: 16, fontSize: 12, color: '#F5A800', textDecoration: 'none', fontWeight: 700, border: '1px solid #F5A800', padding: '4px 10px', borderRadius: 4 }}>⚙ Edit</a>
      </div>
    </header>
  )
}
