import React from 'react'

const DEFAULT_SERVICES = [
  { title: 'Giải pháp công nghệ', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80', link: '#' },
  { title: 'Giải pháp thi công & lắp đặt', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80', link: '#' },
  { title: 'Cung cấp thiết bị CNTT', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80', link: '#' },
  { title: 'Dịch vụ Công nghệ thông tin', image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=80', link: '#' },
]

export default function ServicesSection({
  title = 'Lĩnh vực hoạt động',
  subtitle = 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:',
  services,
} = {}) {
  const list = Array.isArray(services) && services.length > 0 ? services : DEFAULT_SERVICES

  return (
    <section id="services" style={{ padding: '80px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 14 }}>{title}</h2>
          <p style={{ color: '#666', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>{subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {list.map((s, i) => (
            <a key={i} href={s.link || '#'} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                borderRadius: 16, overflow: 'hidden',
                background: 'linear-gradient(160deg, #064E3B 0%, #065F46 50%, #059669 100%)',
                height: 340, position: 'relative', cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(6,95,70,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                {/* Image */}
                <div style={{ position: 'absolute', inset: 0 }}>
                  <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, mixBlendMode: 'luminosity' }}
                    onError={e => e.target.style.display = 'none'} />
                </div>
                {/* Overlay gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,95,70,0.2) 0%, rgba(4,78,59,0.7) 100%)' }} />
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, padding: 24 }}>
                  <h3 style={{ color: '#F59E0B', fontSize: 18, fontWeight: 700, lineHeight: 1.4 }}>{s.title}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}