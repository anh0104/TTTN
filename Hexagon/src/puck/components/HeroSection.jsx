import React, { useEffect, useRef } from 'react'

export default function HeroSection({
  title = 'Thi công & lắp đặt',
  brandName = 'HEXAGON',
  subtitle = 'Solutions',
  description = 'HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.',
  btn1 = 'Khám phá Dịch vụ',
  btn2 = 'Liên hệ Tư vấn',
  scrollText = 'Cuộn xuống để khám phá',
  backgroundImage = '',
} = {}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let angle = 0

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function drawGlobe() {
      const w = canvas.width, h = canvas.height
      const cx = w / 2, cy = h / 2
      const r = Math.min(w, h) * 0.42
      ctx.clearRect(0, 0, w, h)

      // Dots on sphere
      for (let lat = -80; lat <= 80; lat += 12) {
        for (let lon = 0; lon < 360; lon += 12) {
          const phi = (lat * Math.PI) / 180
          const theta = ((lon + angle) * Math.PI) / 180
          const x = r * Math.cos(phi) * Math.sin(theta)
          const y = r * Math.sin(phi)
          const z = r * Math.cos(phi) * Math.cos(theta)
          if (z > 0) {
            const px = cx + x
            const py = cy - y
            const brightness = z / r
            ctx.beginPath()
            ctx.arc(px, py, 2 * brightness, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(74,222,128,${0.3 + 0.7 * brightness})`
            ctx.fill()
          }
        }
      }

      // Orbit rings
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.ellipse(cx, cy, r * (0.7 + i * 0.15), r * 0.2 * (i + 1), (i * 30 + angle / 3) * Math.PI / 180, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(96,165,250,${0.15 - i * 0.03})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      angle += 0.3
      animId = requestAnimationFrame(drawGlobe)
    }
    drawGlobe()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  function scrollDown() {
    const el = document.querySelector('#about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      background: backgroundImage
        ? `url(${backgroundImage}) center/cover`
        : 'linear-gradient(135deg, #064E3B 0%, #065F46 40%, #047857 70%, #059669 100%)',
      display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', width: '100%' }}>
        {/* Text */}
        <div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 8 }}>
            {title}<br />
            <span style={{ color: '#4ADE80' }}>{brandName}</span><br />
            {subtitle}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>{description}</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
            <a href="#services" onClick={e => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{ background: '#F59E0B', color: '#fff', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
              {btn1}
            </a>
            <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1px solid rgba(255,255,255,0.3)' }}>
              {btn2}
            </a>
          </div>
          <div onClick={scrollDown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
            {scrollText}
            <span style={{ animation: 'bounce 1.5s infinite', display: 'inline-block', fontSize: 18 }}>∨</span>
          </div>
        </div>

        {/* Globe canvas */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <canvas ref={canvasRef} style={{ width: '100%', maxWidth: 480, height: 480 }} />
        </div>
      </div>

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }`}</style>
    </section>
  )
}