import React, { useEffect, useRef } from 'react'
import { buildBackground } from '../fields.js'

function ButtonList({ buttons = [] }) {
  if (!buttons.length) return null
  return (
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
      {buttons.map((btn, i) => (
        <a key={i} href={btn.href || '#'}
          onClick={e => { if (btn.href?.startsWith('#')) { e.preventDefault(); document.querySelector(btn.href)?.scrollIntoView({ behavior: 'smooth' }) } }}
          style={{
            padding: '13px 30px', borderRadius: 8, textDecoration: 'none',
            fontWeight: 700, fontSize: 15,
            background: btn.style === 'outline' ? 'transparent' : (btn.bgColor || '#F59E0B'),
            color: btn.textColor || '#fff',
            border: btn.style === 'outline' ? `2px solid ${btn.bgColor || '#fff'}` : 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >{btn.label}</a>
      ))}
    </div>
  )
}

export default function HexHero({
  // Text
  titleLine1 = 'Thi công & lắp đặt',
  titleLine2 = 'HEXAGON',
  titleLine3 = 'Solutions',
  titleColor = '#ffffff',
  brandColor = '#4ADE80',
  description = 'HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.',
  descColor = 'rgba(255,255,255,0.82)',
  scrollText = 'Cuộn xuống để khám phá',
  // Background
  bgType = 'gradient',
  bgColor = '#064E3B',
  bgGradientFrom = '#064E3B',
  bgGradientTo = '#059669',
  bgGradientDir = 'to bottom right',
  bgImage = '',
  bgOverlayColor = 'rgba(6,78,59,0.75)',
  // Animation
  enableAnimation = true,
  // Buttons
  buttons = [
    { label: 'Khám phá Dịch vụ', href: '#services', bgColor: '#F59E0B', textColor: '#fff', style: 'solid' },
    { label: 'Liên hệ Tư vấn',   href: '#contact',  bgColor: 'transparent', textColor: '#fff', style: 'outline' },
  ],
} = {}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!enableAnimation) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, angle = 0

    function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      const w = canvas.width, h = canvas.height
      const cx = w / 2, cy = h / 2
      const r = Math.min(w, h) * 0.42
      ctx.clearRect(0, 0, w, h)

      for (let lat = -80; lat <= 80; lat += 12) {
        for (let lon = 0; lon < 360; lon += 12) {
          const phi = (lat * Math.PI) / 180
          const theta = ((lon + angle) * Math.PI) / 180
          const x = r * Math.cos(phi) * Math.sin(theta)
          const y = r * Math.sin(phi)
          const z = r * Math.cos(phi) * Math.cos(theta)
          if (z > 0) {
            const b = z / r
            ctx.beginPath()
            ctx.arc(cx + x, cy - y, 2 * b, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(74,222,128,${0.3 + 0.7 * b})`
            ctx.fill()
          }
        }
      }
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.ellipse(cx, cy, r * (0.7 + i * 0.15), r * 0.2 * (i + 1), (i * 30 + angle / 3) * Math.PI / 180, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(96,165,250,${0.12 - i * 0.03})`
        ctx.lineWidth = 1; ctx.stroke()
      }
      angle += 0.3
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [enableAnimation])

  const bg = buildBackground({ bgType, bgColor, bgGradientFrom, bgGradientTo, bgGradientDir, bgImage, bgOverlayColor })

  return (
    <section id="hero" style={{ minHeight: '100vh', background: bg, display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', width: '100%' }}>
        {/* Text */}
        <div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,62px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 20, color: titleColor }}>
            {titleLine1}<br />
            <span style={{ color: brandColor }}>{titleLine2}</span><br />
            {titleLine3}
          </h1>
          <p style={{ color: descColor, fontSize: 17, lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>{description}</p>
          <div style={{ marginBottom: 36 }}>
            <ButtonList buttons={buttons} />
          </div>
          <div onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>
            {scrollText}
            <span style={{ display: 'inline-block', animation: enableAnimation ? 'bounce 1.5s infinite' : 'none', fontSize: 18 }}>∨</span>
          </div>
        </div>
        {/* Globe */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {enableAnimation
            ? <canvas ref={canvasRef} style={{ width: '100%', maxWidth: 440, height: 440 }} />
            : <div style={{ width: 440, height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="200" height="200" viewBox="0 0 40 40">
                  <polygon points="20,2 37,11 37,29 20,38 3,29 3,11" fill="none" stroke="#4ADE80" strokeWidth="2"/>
                  <circle cx="20" cy="20" r="8" fill="#4ADE80" opacity="0.3"/>
                </svg>
              </div>
          }
        </div>
      </div>
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}`}</style>
    </section>
  )
}