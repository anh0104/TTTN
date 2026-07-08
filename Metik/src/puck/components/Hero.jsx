import React, { useState, useEffect } from 'react'

export default function Hero({ slides } = {}) {
  const safeSlides = (Array.isArray(slides) && slides.length > 0) ? slides : [{ image: '', fallbackBg: 'linear-gradient(135deg,#87CEEB,#E8F4F8)' }]
  const [cur, setCur] = useState(0)
  const total = safeSlides.length

  useEffect(() => {
    if (total <= 1) return
    const t = setInterval(() => setCur(c => (c + 1) % total), 5000)
    return () => clearInterval(t)
  }, [total])

  const slide = safeSlides[cur] || safeSlides[0]

  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'relative', minHeight: 420, background: slide.fallbackBg || 'linear-gradient(135deg,#87CEEB,#E8F4F8)' }}>
        {slide.image && (
          <img src={slide.image} alt="Banner"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => e.target.style.display = 'none'} />
        )}
        {/* Fallback content */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 420, padding: 40 }}>
          <div style={{ fontSize: 'clamp(48px,8vw,88px)', fontWeight: 900, color: '#F5A800', textShadow: '4px 4px 0 #E07800', lineHeight: 0.95, fontFamily: 'Arial Black,Arial', textAlign: 'center' }}>
            Snack<br />Pellets
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 32, background: 'rgba(255,200,0,0.9)', padding: '12px 28px', borderRadius: 8 }}>
            {[['👑','Premium','Quality'],['🛡️','Food','Safety'],['🚛','Export','Quality']].map(([icon,l1,l2]) => (
              <div key={l1} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#333' }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{l1}<br />{l2}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: '#333' }}>A member of <strong>HUNGHAU</strong></div>
        </div>
      </div>
      {total > 1 && (
        <>
          <button onClick={() => setCur(c => (c-1+total)%total)} style={{ position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',width:36,height:36,borderRadius:'50%',background:'rgba(255,255,255,0.8)',border:'none',cursor:'pointer',fontSize:18 }}>‹</button>
          <button onClick={() => setCur(c => (c+1)%total)} style={{ position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',width:36,height:36,borderRadius:'50%',background:'rgba(255,255,255,0.8)',border:'none',cursor:'pointer',fontSize:18 }}>›</button>
        </>
      )}
      <div style={{ background: '#1565C0', height: 8 }} />
    </section>
  )
}
