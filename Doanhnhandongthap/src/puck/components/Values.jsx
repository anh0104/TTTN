import React from 'react'

export default function Values({
  title = 'GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG',
  bgImage = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=40',
  items = [
    { icon: '🌐', title: 'Kết nối chất lượng', desc: 'Tiếp cận mạng lưới doanh nhân uy tín, mở rộng cơ hội hợp tác thực tế.' },
    { icon: '📈', title: 'Phát triển kiến thức', desc: 'Cập nhật xu hướng, nâng cao tư duy quản trị và kỹ năng kinh doanh.' },
    { icon: '🤝', title: 'Cơ hội hợp tác', desc: 'Tham gia các dự án, hoạt động kết nối và xúc tiến thương mại.' },
  ],
}) {
  return (
    <section style={{ position: 'relative', padding: '80px 0', overflow: 'hidden', background: 'linear-gradient(180deg, #c8d8f8 0%, #e0c8f0 50%, #f0c8e8 100%)' }}>
      {/* City skyline bg */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center bottom', opacity: 0.12 }} />

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 56 }}>
          <h2 style={{ color: '#0A2472', fontSize: 'clamp(18px,2vw,26px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{title}</h2>
          <a href="#" style={{ color: '#0A2472', textDecoration: 'none', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>Xem thêm →</a>
        </div>

        {/* Staggered cards */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {items.map((item, i) => (
            <div key={i} style={{
              flex: '1 1 220px',
              background: '#fff',
              borderRadius: 20,
              padding: '32px 28px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              marginTop: i % 2 === 1 ? 40 : 0,
              textAlign: 'center',
            }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32 }}>
                {item.icon}
              </div>
              <h3 style={{ color: '#1a6bde', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
