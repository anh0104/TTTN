import React from 'react'

export default function ContactSection({
  title = 'Liên hệ với chúng tôi',
  subtitle = 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.',
  addressLabel = 'Trụ sở chính',
  address = '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh',
  emailLabel = 'Email',
  email = 'info@hexagon.xyz',
  hotlineLabel = 'Hotline',
  hotline = '096 446 0333',
  facebook = 'https://facebook.com',
  linkedin = 'https://linkedin.com',
  youtube = 'https://youtube.com',
  zalo = 'https://zalo.me',
  mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3!2d106.6297!3d10.7815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1d58d3abf7%3A0x7a27f0e9e4f68db3!2zNjE1IMOAdSBDxqEsIFTDom4gUGjDuiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2svn!4v1234567890',
} = {}) {
  const socials = [
    { label: 'Facebook', href: facebook },
    { label: 'LinkedIn', href: linkedin },
    { label: 'YouTube', href: youtube },
    { label: 'Zalo', href: zalo },
  ]

  return (
    <section id="contact" style={{ padding: '80px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Left */}
          <div>
            <h2 style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>{title}</h2>
            <p style={{ color: '#666', fontSize: 16, lineHeight: 1.75, marginBottom: 40 }}>{subtitle}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
              {[
                { icon: '📍', label: addressLabel, value: address },
                { icon: '✉️', label: emailLabel, value: email },
                { icon: '📞', label: hotlineLabel, value: hotline },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 15, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ color: '#666', fontSize: 15 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ width: '100%', height: 1, background: '#eee', marginBottom: 28 }} />

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                  padding: '8px 20px', border: '1px solid #ddd', borderRadius: 8,
                  color: '#333', textDecoration: 'none', fontSize: 14, fontWeight: 500,
                  transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#065F46'; e.currentTarget.style.color = '#065F46' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#333' }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Map */}
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', height: 420 }}>
            <iframe src={mapSrc} width="100%" height="100%" style={{ border: 'none', display: 'block' }} allowFullScreen loading="lazy" title="Hexagon Map" />
          </div>
        </div>
      </div>
    </section>
  )
}