import React from 'react'
import { buildBackground } from '../fields.js'

export function HexAbout({
  title = 'Về Hexagon',
  image = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  description = 'Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số.',
  titleColor = '#1a1a1a',
  descColor = '#555',
  bgType = 'color', bgColor = '#f8fffe',
  bgGradientFrom = '#f0fdf4', bgGradientTo = '#dcfce7',
  bgGradientDir = 'to bottom', bgImage = '', bgOverlayColor = 'rgba(0,0,0,0.4)',
  enableAnimation = true,
  cards = [
    { title: 'Sứ mệnh',    text: 'Kiến tạo tương lai số bằng các giải pháp tiên tiến.' },
    { title: 'Tầm nhìn',   text: 'Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.' },
    { title: 'Giá trị cốt lõi', text: 'Đổi mới - Đồng hành - Tiên phong - Minh bạch.' },
    { title: 'Nền tảng',   text: 'Hệ sinh thái đa ngành, vững chắc và linh hoạt.' },
  ],
  quote = '"Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^"',
  quoteAuthor = '— HEXAGON CULTURE',
  buttons = [],
} = {}) {
  const bg = buildBackground({ bgType, bgColor, bgGradientFrom, bgGradientTo, bgGradientDir, bgImage, bgOverlayColor })
  return (
    <section id="about" style={{ padding: '96px 0', background: bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'linear-gradient(135deg,#D1FAE5,#A7F3D0)', borderRadius: 20, padding: 20 }}>
              <img src={image} alt="" style={{ width: '100%', height: 340, objectFit: 'cover', borderRadius: 12, display: 'block' }} onError={e => e.target.style.opacity='0.3'} />
            </div>
            <div style={{ position: 'absolute', bottom: 8, left: 24, background: '#fff', borderRadius: 10, padding: '14px 18px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', maxWidth: 260 }}>
              <p style={{ color: '#333', fontSize: 13, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 6 }}>{quote}</p>
              <p style={{ color: '#F59E0B', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>{quoteAuthor}</p>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800, color: titleColor, marginBottom: 18 }}>{title}</h2>
            <p style={{ color: descColor, fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>{description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              {(cards || []).map((c, i) => (
                <div key={i} style={{ padding: 18, background: '#fff', borderRadius: 10, border: '1px solid #E5F9EE', boxShadow: '0 2px 8px rgba(6,95,70,0.06)' }}>
                  <h4 style={{ color: '#065F46', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{c.title}</h4>
                  <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6 }}>{c.text}</p>
                </div>
              ))}
            </div>
            {buttons?.length > 0 && (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {buttons.map((btn, i) => (
                  <a key={i} href={btn.href || '#'} style={{ padding: '11px 26px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14, background: btn.style === 'outline' ? 'transparent' : (btn.bgColor || '#065F46'), color: btn.textColor || '#fff', border: btn.style === 'outline' ? `2px solid ${btn.bgColor || '#065F46'}` : 'none' }}>{btn.label}</a>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Scroll-to-top */}
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 400 }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ width: 46, height: 46, borderRadius: '50%', background: '#F59E0B', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', boxShadow: '0 4px 14px rgba(245,158,11,0.4)' }}>↑</button>
        </div>
      </div>
    </section>
  )
}