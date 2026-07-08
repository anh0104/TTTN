import React from 'react'

export default function AboutPage({
  pageTitle = 'GIỚI THIỆU DOANH NHÂN ĐỒNG THÁP',
  image = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80',
  heading = 'Kết nối – Đồng hành – Phát triển',
  body1 = 'Cộng đồng Doanh nhân Đồng Tháp hướng đến việc xây dựng môi trường kết nối giữa các doanh nghiệp, thúc đẩy hợp tác và tạo ra nhiều giá trị bền vững cho địa phương.',
  body2 = 'Với tinh thần đổi mới, sáng tạo và phát triển lâu dài, cộng đồng doanh nhân luôn đóng vai trò quan trọng trong việc thúc đẩy kinh tế, hỗ trợ khởi nghiệp và nâng cao năng lực cạnh tranh.',
  vision = 'Xây dựng mạng lưới doanh nhân năng động, hiện đại và hội nhập.',
  mission = 'Kết nối doanh nghiệp – chia sẻ tri thức – tạo giá trị phát triển bền vững.',
  stats = [
    { number: '500+', label: 'Doanh nghiệp tham gia' },
    { number: '50+', label: 'Sự kiện kết nối mỗi năm' },
    { number: '100%', label: 'Hướng đến phát triển bền vững' },
  ],
}) {
  return (
    <div>
      {/* Page title */}
      <section style={{ padding: '64px 0 48px', background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <h1 style={{ color: '#0A2472', fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 16 }}>{pageTitle}</h1>
          <div style={{ width: 60, height: 4, background: '#E8A020', borderRadius: 2, margin: '0 auto' }} />
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: '0 0 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Image */}
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
            <img src={image} alt="Giới thiệu" style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Text */}
          <div>
            <h2 style={{ color: '#0A2472', fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 800, marginBottom: 20, lineHeight: 1.35 }}>{heading}</h2>
            <p style={{ color: '#444', fontSize: 15, lineHeight: 1.85, marginBottom: 16 }}>{body1}</p>
            <p style={{ color: '#444', fontSize: 15, lineHeight: 1.85, marginBottom: 28 }}>{body2}</p>

            {/* Vision/Mission box */}
            <div style={{ borderLeft: '4px solid #E8A020', padding: '16px 20px', background: '#fffbf0', borderRadius: '0 8px 8px 0' }}>
              <p style={{ color: '#333', fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                <strong>Tầm nhìn:</strong> {vision}
              </p>
              <p style={{ color: '#333', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                <strong>Sứ mệnh:</strong> {mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '48px 0 64px', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '36px 24px', background: '#f8f9ff', borderRadius: 12 }}>
              <div style={{ color: '#0A2472', fontSize: 'clamp(36px,4vw,56px)', fontWeight: 800, marginBottom: 10, fontFamily: 'Georgia, serif' }}>{s.number}</div>
              <div style={{ color: '#666', fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
