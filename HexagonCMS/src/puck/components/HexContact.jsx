import React from 'react'
import { buildBackground } from '../fields.js'

export function HexContact({
  title = 'Liên hệ với chúng tôi',
  subtitle = 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe.',
  titleColor = '#1a1a1a', subtitleColor = '#666',
  bgType = 'color', bgColor = '#fff',
  bgGradientFrom = '#fff', bgGradientTo = '#f0fdf4',
  bgGradientDir = 'to bottom', bgImage = '', bgOverlayColor = 'rgba(0,0,0,0.4)',
  addressLabel = 'Trụ sở chính', address = '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh',
  emailLabel = 'Email', email = 'info@hexagon.xyz',
  hotlineLabel = 'Hotline', hotline = '096 446 0333',
  facebook = '#', linkedin = '#', youtube = '#', zalo = '#',
  mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3!2d106.6297!3d10.7815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSGV4YWdvbg!5e0!3m2!1svi!2svn!4v1234567890',
  buttons = [],
} = {}) {
  const bg = buildBackground({ bgType, bgColor, bgGradientFrom, bgGradientTo, bgGradientDir, bgImage, bgOverlayColor })
  const socials = [{ label: 'Facebook', href: facebook }, { label: 'LinkedIn', href: linkedin }, { label: 'YouTube', href: youtube }, { label: 'Zalo', href: zalo }]
  return (
    <section id="contact" style={{ padding: '80px 0', background: bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: titleColor, marginBottom: 14 }}>{title}</h2>
            <p style={{ color: subtitleColor, fontSize: 16, lineHeight: 1.75, marginBottom: 36 }}>{subtitle}</p>
            {[{ icon: '📍', label: addressLabel, val: address }, { icon: '✉️', label: emailLabel, val: email }, { icon: '📞', label: hotlineLabel, val: hotline }].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 17 }}>{r.icon}</div>
                <div><div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 14, marginBottom: 3 }}>{r.label}</div><div style={{ color: '#666', fontSize: 14 }}>{r.val}</div></div>
              </div>
            ))}
            <div style={{ width: '100%', height: 1, background: '#eee', margin: '24px 0' }} />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ padding: '7px 18px', border: '1px solid #ddd', borderRadius: 8, color: '#333', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#065F46'; e.currentTarget.style.color = '#065F46' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#333' }}>
                  {s.label}
                </a>
              ))}
            </div>
            {buttons?.length > 0 && (
              <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                {buttons.map((btn, i) => <a key={i} href={btn.href || '#'} style={{ padding: '11px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14, background: btn.style === 'outline' ? 'transparent' : (btn.bgColor || '#065F46'), color: btn.textColor || '#fff', border: btn.style === 'outline' ? `2px solid ${btn.bgColor || '#065F46'}` : 'none' }}>{btn.label}</a>)}
              </div>
            )}
          </div>
          <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: 400 }}>
            <iframe src={mapSrc} width="100%" height="100%" style={{ border: 'none', display: 'block' }} allowFullScreen loading="lazy" title="Map" />
          </div>
        </div>
      </div>
    </section>
  )
}