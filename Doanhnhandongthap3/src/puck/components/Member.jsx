import React from 'react'

export default function Member({
  pageTitle = 'HỘI VIÊN',
  heroTitle = 'Cộng đồng doanh nhân cùng phát triển',
  heroDesc = 'Hội viên là lực lượng nòng cốt tạo nên sự kết nối, chia sẻ và phát triển trong cộng đồng doanh nghiệp Đồng Tháp.',
  heroDesc2 = 'Việc tham gia hội viên mở ra cơ hội mở rộng mạng lưới, trao đổi kinh nghiệm, tiếp cận chương trình hỗ trợ và đồng hành trong các hoạt động xúc tiến thương mại.',
  heroImage = 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700&q=80',
  benefits = [
    'Tham gia các chương trình kết nối doanh nghiệp',
    'Tiếp cận hoạt động đào tạo và hội thảo chuyên đề',
    'Nhận thông tin thị trường và cơ hội hợp tác',
    'Tham gia các hoạt động cộng đồng doanh nhân',
    'Đồng hành cùng các chương trình phát triển địa phương',
  ],
  stats = [
    { number: '800+', label: 'Hội viên' },
    { number: '120+', label: 'Đối tác' },
    { number: '40+', label: 'Sự kiện / năm' },
    { number: '12', label: 'Nhóm kết nối' },
  ],
}) {
  return (
    <div>
      {/* Page title */}
      <section style={{ padding: '64px 0 40px', marginTop: 40, background: '#fff', textAlign: 'center', display: 'inline-block', width: '100%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <h1 style={{ color: '#0A2472', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 15 }}>{pageTitle}</h1>
          <div style={{ width: 60, height: 4, background: '#E8A020', borderRadius: 2, margin: '0 auto' }} />
        </div>
      </section>

      {/* Main 2-col */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Image left */}
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
            <img src={heroImage} alt="Hội viên" style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Text right */}
          <div>
            <h2 style={{ color: '#0A2472', fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 800, lineHeight: 1.35, marginBottom: 20 }}>{heroTitle}</h2>
            <p style={{ color: '#444', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>{heroDesc}</p>
            <p style={{ color: '#444', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>{heroDesc2}</p>

            {/* Benefits */}
            <div style={{ background: '#f8f9ff', borderRadius: 12, padding: '24px 28px' }}>
              <h3 style={{ color: '#0A2472', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Quyền lợi hội viên</h3>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12, color: '#333', fontSize: 14, lineHeight: 1.5 }}>
                  <span style={{ color: '#E8A020', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ padding: '48px 0', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '24px', background: '#f8f9ff', borderRadius: 12, margin: 4 }}>
              <div style={{ color: '#0A2472', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, marginBottom: 8, fontFamily: 'Georgia, serif' }}>{s.number}</div>
              <div style={{ color: '#666', fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}