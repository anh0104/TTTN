
import React, { useState, useEffect } from 'react'

export default function Header({ activePage = '' } = {}) {
  const [small, setSmall] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setSmall(window.scrollY > 60)
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const links = [
    { label: 'TRANG CHỦ', href: '/' },
    { label: 'GIỚI THIỆU', href: '/gioi-thieu' },
    { label: 'SẢN PHẨM', href: '/san-pham' },
    { label: 'TIN TỨC', href: '/tin-tuc' },
    { label: 'LIÊN HỆ', href: '/lien-he' },
  ]
  const ap = activePage || ''
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding:'0 32px',
        transition:'all .35s ease', display: 'flex', alignItems: 'center',height: small ? 60 : 85,
        transition: "all .35s ease"
        }}>
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', flexShrink: 0, marginRight: 48 }}>
          <a
            href="/"
            style={{
              textDecoration: "none",
              flexShrink: 0,
              marginRight: 48,
              transition: "all .35s ease",
            }}
          >
          <div
            style={{
            fontSize: small ? 34 : 48,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-2px",
            color: "#F5A800",
            textTransform: "lowercase",
            transition: "all .35s ease",
            fontFamily: "Arial Black, sans-serif",
            textShadow: "2px 2px 0 #d97706",
          }}
          >
           metik
          </div>

          </a>
        </a>
        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 0 }}>
          {links.map(l => {
            const active = l.href === '/' ? (ap === '' || ap === '/') : ap.startsWith(l.href)
            return (
              <a key={l.label} href={l.href} style={{
                color: '#333', textDecoration: 'none', fontSize: small ? 13 : 15,
                transition:"all .3s", fontWeight: 600,
                padding: '8px 20px', borderBottom: active ? '2px solid #F5A800' : '2px solid transparent',
                whiteSpace: 'nowrap', transition: 'color 0.15s',
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#F5A800' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#333' }}
              >{l.label}</a>
            )
          })}
        </nav>
        {/* Social */}
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {[['f','#1877F2'],['T','#000'],['in','#0077B5']].map(([t,bg]) => (
            <a key={t} href="#" style={{ width: small ? 30 : 36,
              height: small ? 30 : 36,
              transition:"all .3s", borderRadius:'50%', background:bg, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', textDecoration:'none', fontWeight:700, fontSize:14 }}>{t}</a>
          ))}
        </div>
       
      </div>
    </header>
  )
}

