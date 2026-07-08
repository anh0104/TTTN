import React, { useRef, useEffect } from 'react'
import logo2 from "../../assets/Logo2.png";
import logo1 from "../../assets/Logo1.png";
import logo3 from "../../assets/Logo3.png";
import logo4 from "../../assets/Logo4.png";
import HF from "../../assets/HF.png";
import H from "../../assets/H.png";
import eco from "../../assets/ecobook.jpg";

const DEFAULT_PARTNERS = [
  { logo: logo2 },
  {  logo: logo1 },
  { logo: logo3},
  { logo: logo4},
  { logo: H},
  {logo: HF},
  {logo: eco},
]
export default function PartnersSection({ title = 'Các đối tác liên kết', partners } = {}) {
  const trackRef = useRef(null)
  const list = Array.isArray(partners) && partners.length > 0 ? partners : DEFAULT_PARTNERS
  const doubled = [...list, ...list]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let pos = 0
    let rafId
    const speed = 1
    const step = () => {
      pos += speed
      const half = track.scrollWidth / 2
      if (pos >= half) pos = 0
      track.style.transform = `translateX(-${pos}px)`
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section style={{
      padding: '40px 0',
      background: 'linear-gradient(180deg, #0f826b, #12846d 35%, #86efac )',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 40 }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 700, color: '#1a1a1a' }}>{title}</h2>
      </div>

      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div ref={trackRef} style={{ display: 'flex', gap: 20, width: 'max-content', willChange: 'transform' }}>
          {doubled.map((p, i) => (
            <div
              key={i}
              style={{
                width: 180,
                height: 100,
                background: "#fff",
                borderRadius: 16,
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,.08)",
              }}
            >
            <img
              src={p.logo}
              alt=""
              style={{
                maxWidth: "120px",
                maxHeight: "55px",
                objectFit: "contain",
              }}
            />
          </div>
          ))}
        </div>
      </div>
    </section>
  )
}