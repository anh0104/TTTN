import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo2.png";
import coVN from "../../assets/co-vn.png";
import coAnh from "../../assets/co-anh.png";

const VI_NAV = [
  { label: 'Trang chủ', href: '/', type: 'route' },
  { label: 'Giới thiệu', href: '#about', type: 'scroll' },
  { label: 'Dịch vụ', href: '#services', type: 'scroll' },
  { label: 'Hỗ trợ', href: '#news', type: 'scroll' },
  { label: 'Liên hệ', href: '#contact', type: 'scroll' },
]
const EN_NAV = [
  { label: 'Home', href: '/', type: 'route' },
  { label: 'About', href: '#about', type: 'scroll' },
  { label: 'Services', href: '#services', type: 'scroll' },
  { label: 'Support', href: '#news', type: 'scroll' },
  { label: 'Contact', href: '#contact', type: 'scroll' },
]

export default function Header({ lang = 'vi' } = {}) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = location.pathname === '/' || location.pathname === '/en'
  const nav = lang === 'en' ? EN_NAV : VI_NAV

  function switchLang() {
    const newLang = lang === 'vi' ? 'en' : 'vi'
    const path = newLang === 'en' ? '/en' : '/'
    window.location.href = path
  }

  function handleNav(item, e) {
    if (item.type === 'scroll') {
      e.preventDefault()
      if (!isHome) {
        window.location.href = (lang === 'en' ? '/en' : '/') + item.href
        return
      }
      const el = document.querySelector(item.href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: scrolled ? "#0F4D32" : "#176C45",
     
     
      transition: "all 0.35s ease",
    boxShadow: scrolled
      ? "0 8px 25px rgba(0,0,0,.25)"
      : "0 1px 0 rgba(255,255,255,.08)",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 30px', display: 'flex', alignItems: 'center', height: 80 }}>
        {/* Logo */}
        <a href={lang === 'en' ? '/en' : '/'} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0, marginRight: 48 }}>
          <img
            src={logo}
            alt="Hexagon Logo"
            style={{
              width: 65,
              height: 65,
              objectFit: "contain",
            }}
          />
          <span style={{ color: '#fff', fontWeight: 650, fontSize: 20, letterSpacing: '0.05em' }}>HEXAGON</span>
        </a>

        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 35, marginRight: 40 }}>
          {nav.map(item => (
            <a key={item.label} href={item.href}
              onClick={item.type === 'scroll' ? (e) => handleNav(item, e) : undefined}
              style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 17, fontWeight: 400, padding: '8px 10px', borderRadius: 6, transition: 'all 0.15s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
            >{item.label}</a>
          ))}
        </nav>

        {/* Lang switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
        <img
          src={coVN}
          alt="VN"
          onClick={() => (window.location.href = "/")}
          style={{
            width: 20,
            height: 15,
            cursor: "pointer",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />

        <img
          src={coAnh}
          alt="EN"
          onClick={() => (window.location.href = "/en")}
          style={{
            width: 20,
            height: 15,
            cursor: "pointer",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
        </div>

        <a href="/admin" style={{ marginLeft: 16, fontSize: 12, color: '#4ADE80', textDecoration: 'none', border: '1px solid #4ADE80', padding: '4px 10px', borderRadius: 4, fontWeight: 600 }}>
          ⚙ CMS
        </a>
      </div>
    </header>
  )
}