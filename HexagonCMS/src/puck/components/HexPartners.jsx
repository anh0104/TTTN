import React from 'react'
import { buildBackground } from '../fields.js'
const DEFAULT_PARTNERS = [
  { name: 'COMOON', color: '#1565C0' }, { name: 'HEXAGON', color: '#065F46' },
  { name: 'HUNO', color: '#F59E0B' }, { name: 'HHA', color: '#1565C0' },
  { name: 'HHF', color: '#7C3AED' }, { name: 'MYH', color: '#0891B2' },
  { name: 'COWE', color: '#059669' }, { name: 'HHN', color: '#DC2626' },
]
 
export function HexPartners({ title = 'Các đối tác liên kết', partners } = {}) {
  const list = Array.isArray(partners) && partners.length ? partners : DEFAULT_PARTNERS
  const doubled = [...list, ...list]
  const trackRef = React.useRef(null)
 
  React.useEffect(() => {
    const track = trackRef.current; if (!track) return
    let pos = 0, rafId
    const step = () => { pos += 0.5; if (pos >= track.scrollWidth / 2) pos = 0; track.style.transform = `translateX(-${pos}px)`; rafId = requestAnimationFrame(step) }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [])
 
  return (
    <section style={{ padding: '60px 0', background: 'linear-gradient(135deg,#D1FAE5,#A7F3D0)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 36 }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 800, color: '#1a1a1a' }}>{title}</h2>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div ref={trackRef} style={{ display: 'flex', gap: 20, width: 'max-content', willChange: 'transform' }}>
          {doubled.map((p, i) => (
            <div key={i} style={{ width: 148, height: 90, background: '#fff', borderRadius: 14, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 4px 14px rgba(0,0,0,0.07)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: (p.color || '#065F46') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: p.color || '#065F46', fontWeight: 800, fontSize: 13 }}>{(p.name || 'H').slice(0, 2)}</span>
              </div>
              <span style={{ color: p.color || '#065F46', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}