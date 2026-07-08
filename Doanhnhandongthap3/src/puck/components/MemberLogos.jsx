import React, { useRef, useEffect } from 'react'

export default function MemberLogos({
  title = 'HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
  logos = [
    { name: 'ECOBOOK', color: '#2e7d32', bg: '#fff', initials: 'ECO' },
    { name: 'COMOON', color: '#1565c0', bg: '#fff', initials: 'COM' },
    { name: 'HEXAGON', color: '#0d47a1', bg: '#fff', initials: 'H' },
    { name: 'HUNO', color: '#e65100', bg: '#fff', initials: 'H' },
    { name: 'HHA', color: '#1565c0', bg: '#fff', initials: 'H' },
    { name: 'MYH', color: '#6a1b9a', bg: '#fff', initials: 'M' },
    { name: 'MYC', color: '#00695c', bg: '#fff', initials: 'M' },
    { name: 'COWE', color: '#c62828', bg: '#fff', initials: 'C' },
    { name: 'HHN', color: '#4527a0', bg: '#fff', initials: 'H' },
  ],
}) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let pos = 0
    const speed = 0.5
    const step = () => {
      pos += speed
      const half = track.scrollWidth / 2
      if (pos >= half) pos = 0
      track.style.transform = `translateX(-${pos}px)`
      requestAnimationFrame(step)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const doubled = [...logos, ...logos]

  return (
    <section style={{ padding: '64px 0', background: 'linear-gradient(180deg, #e8f0fe 0%, #f0f4ff 100%)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', marginBottom: 40 }}>
        <h2 style={{ textAlign: 'center', color: '#0A2472', fontSize: 'clamp(16px,2vw,22px)', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {title}
        </h2>
      </div>

      {/* Scrolling logos */}
      <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
        <div ref={trackRef} style={{ display: 'flex', gap: 24, width: 'max-content', willChange: 'transform' }}>
          {doubled.map((logo, i) => (
            <div key={i} style={{
              width: 160,
              height: 100,
              background: '#fff',
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)',
              flexShrink: 0,
              gap: 6,
            }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: logo.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: logo.color, fontWeight: 800, fontSize: 16 }}>{logo.initials}</span>
              </div>
              <span style={{ color: logo.color, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em' }}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}