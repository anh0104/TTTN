import React from 'react'

export default function Contact({
  title = 'QUAN TÂM VÀ HỢP TÁC\nVỚI CÁC CHƯƠNG TRÌNH HOẠT ĐỘNG\nCỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM',
  email = 'info@dte.hunghau.vn',
  phone = '1800 1568',
  buttonText = 'Đăng ký hội viên',
}) {
  return (
    <section id="lien-he" style={{ position: 'relative', padding: '100px 32px', overflow: 'hidden', background: 'linear-gradient(135deg, #c8d8f8 0%, #e0c8f0 50%, #f0c8e8 100%)', textAlign: 'center', minHeight: 320 }}>
      {/* Wireframe hands decoration - left */}
      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '28%', opacity: 0.25, pointerEvents: 'none' }}>
        <svg viewBox="0 0 200 300" fill="none" stroke="#1a6bde" strokeWidth="1.5">
          <path d="M160 280 Q120 200 100 140 Q80 80 90 20" />
          <path d="M140 300 Q100 220 90 160 Q75 100 85 40" />
          <path d="M120 310 Q85 230 80 170 Q70 110 78 50" />
          <line x1="70" y1="200" x2="160" y2="180" /><line x1="75" y1="220" x2="150" y2="200" />
          <line x1="80" y1="240" x2="145" y2="220" />
          <polygon points="100,100 120,80 140,100 130,130 110,130" fill="rgba(26,107,222,0.1)" stroke="#1a6bde"/>
          <polygon points="80,150 100,120 130,140 120,180 90,175" fill="rgba(26,107,222,0.07)" stroke="#1a6bde"/>
        </svg>
      </div>
      {/* Wireframe hands decoration - right */}
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%) scaleX(-1)', width: '28%', opacity: 0.25, pointerEvents: 'none' }}>
        <svg viewBox="0 0 200 300" fill="none" stroke="#1a6bde" strokeWidth="1.5">
          <path d="M160 280 Q120 200 100 140 Q80 80 90 20" />
          <path d="M140 300 Q100 220 90 160 Q75 100 85 40" />
          <path d="M120 310 Q85 230 80 170 Q70 110 78 50" />
          <line x1="70" y1="200" x2="160" y2="180" /><line x1="75" y1="220" x2="150" y2="200" />
          <polygon points="100,100 120,80 140,100 130,130 110,130" fill="rgba(26,107,222,0.1)" stroke="#1a6bde"/>
        </svg>
      </div>

      <div style={{ position: 'relative' }}>
        <h2 style={{ color: '#0A2472', fontSize: 'clamp(16px,2.5vw,28px)', fontWeight: 800, lineHeight: 1.45, marginBottom: 44, whiteSpace: 'pre-line', letterSpacing: '0.02em' }}>{title}</h2>

        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 40, padding: '12px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', minWidth: 240 }}>
            <span style={{ color: '#999', fontSize: 18 }}>✉</span>
            <span style={{ color: '#1a1a3a', fontSize: 15, fontWeight: 500 }}>{email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 40, padding: '12px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', minWidth: 200 }}>
            <span style={{ color: '#e74c3c', fontSize: 18 }}>📞</span>
            <span style={{ color: '#1a1a3a', fontSize: 15, fontWeight: 500 }}>{phone}</span>
          </div>
        </div>

        <a href="/hoi-vien" style={{ display: 'inline-block', background: '#0A2472', color: '#fff', padding: '14px 40px', borderRadius: 32, textDecoration: 'none', fontWeight: 700, fontSize: 15, boxShadow: '0 4px 16px rgba(10,36,114,0.25)' }}>
          {buttonText}
        </a>
      </div>
    </section>
  )
}