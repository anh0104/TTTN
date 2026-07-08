import React, { useState, useEffect } from 'react'

const VI_NAV = [
  { label: 'Trang chủ', href: '/',        type: 'route' },
  { label: 'Giới thiệu', href: '#about',  type: 'scroll' },
  { label: 'Dịch vụ',   href: '#services',type: 'scroll' },
  { label: 'Hỗ trợ',    href: '#news',   type: 'scroll' },
  { label: 'Liên hệ',   href: '#contact', type: 'scroll' },
]
const EN_NAV = [
  { label: 'Home',     href: '/',          type: 'route' },
  { label: 'About',    href: '#about',     type: 'scroll' },
  { label: 'Services', href: '#services',  type: 'scroll' },
  { label: 'Support',  href: '#news',      type: 'scroll' },
  { label: 'Contact',  href: '#contact',   type: 'scroll' },
]

export default function HexHeader({ lang = 'vi' } = {}) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const nav = lang === 'en' ? EN_NAV : VI_NAV

  function handleScroll(href, e) {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.location.href = '/' + href
  }

  function switchLang() {
    // Find equivalent page in other lang
    const currentSlug = window.location.pathname.replace('/', '') || 'home'
    const targetLang = lang === 'vi' ? 'en' : 'vi'
    window.location.href = `/site/${currentSlug}/${targetLang}`
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 1000, background: '#1B4332',
      boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.3)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 68 }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0, marginRight: 40 }}>
          <svg width="38" height="38" viewBox="0 0 40 40">
            <polygon points="20,2 37,11 37,29 20,38 3,29 3,11" fill="none" stroke="#4ADE80" strokeWidth="2.5"/>
            <polygon points="20,8 31,14 31,26 20,32 9,26 9,14" fill="none" stroke="#22C55E" strokeWidth="1.8"/>
            <circle cx="20" cy="20" r="4.5" fill="#4ADE80"/>
          </svg>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '0.05em' }}>HEXAGON</span>
        </a>

        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
          {nav.map(item => (
            <a key={item.label} href={item.href}
              onClick={item.type === 'scroll' ? (e) => handleScroll(item.href, e) : undefined}
              style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 15, fontWeight: 400, padding: '6px 14px', borderRadius: 6, whiteSpace: 'nowrap', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
            >{item.label}</a>
          ))}
        </nav>

        {/* Lang switcher */}
        <div onClick={switchLang} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', marginRight: 14 }}>
          <span title={lang === 'vi' ? 'Tiếng Việt (đang chọn)' : 'Tiếng Việt'} style={{ fontSize: 22, opacity: lang === 'vi' ? 1 : 0.4 }}>🇻🇳</span>
          <span title={lang === 'en' ? 'English (selected)' : 'English'} style={{ fontSize: 22, opacity: lang === 'en' ? 1 : 0.4 }}>🇬🇧</span>
        </div>

        <a href="/admin" style={{ fontSize: 12, color: '#4ADE80', textDecoration: 'none', border: '1px solid rgba(74,222,128,0.5)', padding: '5px 12px', borderRadius: 4, fontWeight: 600 }}>⚙ CMS</a>
      </div>
    </header>
  )
}