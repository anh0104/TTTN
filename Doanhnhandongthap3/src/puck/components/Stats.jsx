import React from 'react'

export default function Stats({
  title = 'HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ',
  bgImage = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=40',
  items = [
    { number: '500+', label: 'Hội viên là các doanh nghiệp và doanh nhân tiêu biểu tại TP.HCM' },
    { number: '20+', label: 'Năm hình thành và phát triển mạng lưới kết nối đồng hương' },
    { number: '1.000+', label: 'Cơ hội giao thương và kết nối đầu tư được khởi tạo mỗi năm' },
    { number: '100+', label: 'Chương trình thiện nguyện và hoạt động hướng về quê hương' },
  ],
}) {
  return (
    <section style={{ position: 'relative', padding: '100px 0', overflow: 'hidden', background: 'linear-gradient(180deg, #dde6f5 0%, #e8d5f0 50%, #f5d5e8 100%)' }}>
      {/* Lotus watermark */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <svg width="400" height="400" viewBox="0 0 400 400" style={{ opacity: 0.07 }}>
          <ellipse cx="200" cy="280" rx="120" ry="60" fill="#8888cc"/>
          <ellipse cx="200" cy="160" rx="60" ry="100" fill="#aa88cc"/>
          <ellipse cx="140" cy="200" rx="55" ry="90" fill="#aa88cc" transform="rotate(-25 140 200)"/>
          <ellipse cx="260" cy="200" rx="55" ry="90" fill="#aa88cc" transform="rotate(25 260 200)"/>
          <ellipse cx="110" cy="230" rx="40" ry="70" fill="#aa88cc" transform="rotate(-45 110 230)"/>
          <ellipse cx="290" cy="230" rx="40" ry="70" fill="#aa88cc" transform="rotate(45 290 230)"/>
        </svg>
      </div>

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
        <h2 style={{ color: '#0A2472', fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 72 }}>{title}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {items.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 'clamp(40px,5vw,68px)', fontWeight: 800, color: '#1a1a3a', lineHeight: 1, marginBottom: 16, fontFamily: 'Georgia, serif' }}>{s.number}</div>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, maxWidth: 180, margin: '0 auto' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}