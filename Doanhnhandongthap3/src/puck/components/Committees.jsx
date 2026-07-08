import React from 'react'

export default function Committees({
  title = 'CÁC BAN CHUYÊN MÔN',
  subtitle = 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
  items = [
    { icon: '📊', label: 'Ban Kinh tế – Đầu tư', link: '#' },
    { icon: '🎭', label: 'Ban Văn hóa – Thể thao', link: '#' },
    { icon: '🤝', label: 'Ban Xã hội – Cộng đồng', link: '#' },
    { icon: '🚀', label: 'Ban Khởi nghiệp', link: '#' },
    { icon: '🌐', label: 'Ban Giao thương quốc tế', link: '#' },
  ],
}) {
  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #e8eeff 0%, #f0e8ff 100%)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ color: '#0A2472', fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 8 }}>{title}</h2>
          <p style={{ color: '#1a3a8a', fontSize: 14, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{subtitle}</p>
        </div>

        {/* Hàng 1: 2 card */}
        <div
          style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 660, margin: '0 auto 32px'
        }}
        >
        {items.slice(0, 2).map((item, i) => (
          <CommitteeCard key={i} item={item} />
        ))}
        </div>

        {/* Hàng 2: 2 card */}
        <div
          style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 660, margin: '0 auto 32px'
          }}
        >
        {items.slice(2, 4).map((item, i) => (
          <CommitteeCard key={i} item={item} />
        ))}
        </div>

        {/* Hàng 3: 1 card ở giữa */}
        <div
          style={{
          maxWidth: 420,
          margin: '0 auto',
          }}
        >
        <CommitteeCard item={items[4]} />
        </div>
      </div>
    </section>
  )
}

function CommitteeCard({ item }) {
  return (
    <div style={{
      background: 'linear-gradient(145deg, #4e90d2, #2563EB)',
      padding: '40px 28px 32px',
      borderRadius: '80px 0 80px 0',
      textAlign: 'center',
      boxShadow: '0 8px 24px rgba(10,64,165,0.25)',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      <div style={{ fontSize: 48, marginBottom: 20 }}>{item.icon}</div>
      <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 700, marginBottom: 20, lineHeight: 1.3 }}>{item.label}</h3>
      <a href={item.link} style={{
        display: 'inline-block',
        border: '1px solid rgba(255,255,255,0.5)',
        color: '#fff',
        padding: '8px 24px',
        borderRadius: 24,
        textDecoration: 'none',
        fontSize: 13,
        fontWeight: 500,
      }}>Xem hoạt động →</a>
    </div>
  )
}