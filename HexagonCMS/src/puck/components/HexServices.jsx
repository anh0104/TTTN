import React from 'react'
import { buildBackground } from '../fields.js'

export function HexServices({
  title = 'Lĩnh vực hoạt động',
  subtitle = 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:',
  titleColor = '#1a1a1a', subtitleColor = '#666',
  bgType = 'color', bgColor = '#fff',
  bgGradientFrom = '#fff', bgGradientTo = '#f0fdf4',
  bgGradientDir = 'to bottom', bgImage = '', bgOverlayColor = 'rgba(0,0,0,0.4)',
  services = [
    { title: 'Giải pháp công nghệ',         image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80' },
    { title: 'Giải pháp thi công & lắp đặt',image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
    { title: 'Cung cấp thiết bị CNTT',       image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80' },
    { title: 'Dịch vụ Công nghệ thông tin',  image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=80' },
  ],
  buttons = [],
} = {}) {
  const bg = buildBackground({ bgType, bgColor, bgGradientFrom, bgGradientTo, bgGradientDir, bgImage, bgOverlayColor })
  return (
    <section id="services" style={{ padding: '80px 0', background: bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800, color: titleColor, marginBottom: 12 }}>{title}</h2>
          <p style={{ color: subtitleColor, fontSize: 16, maxWidth: 540, margin: '0 auto' }}>{subtitle}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
          {(services || []).map((s, i) => (
            <div key={i} style={{ borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(160deg,#064E3B,#059669)', height: 320, position: 'relative', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ position: 'absolute', inset: 0 }}>
                <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, mixBlendMode: 'luminosity' }} onError={e => e.target.style.display = 'none'} />
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,95,70,0.1) 0%, rgba(4,78,59,0.75) 100%)' }} />
              <div style={{ position: 'relative', zIndex: 2, padding: 22 }}>
                <h3 style={{ color: '#F59E0B', fontSize: 17, fontWeight: 700, lineHeight: 1.4 }}>{s.title}</h3>
              </div>
            </div>
          ))}
        </div>
        {buttons?.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center' }}>
            {buttons.map((btn, i) => <a key={i} href={btn.href || '#'} style={{ padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14, background: btn.style === 'outline' ? 'transparent' : (btn.bgColor || '#065F46'), color: btn.textColor || '#fff', border: btn.style === 'outline' ? `2px solid ${btn.bgColor || '#065F46'}` : 'none' }}>{btn.label}</a>)}
          </div>
        )}
      </div>
    </section>
  )
}
 