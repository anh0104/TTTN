import React from 'react'
import { buildBackground } from '../fields.js'

const DEFAULT_NEWS = [
  { id: 1, title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25', excerpt: 'Cùng nhìn lại những khoảnh khắc đáng nhớ...', date: '26 thg 6, 2026', category: 'Hoạt động', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', slug: 'teambuilding-myh25' },
  { id: 2, title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên', excerpt: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành...', date: '26 thg 6, 2026', category: 'Hoạt động', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80', slug: 'van-hien-sinh-vien' },
  { id: 3, title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá', excerpt: 'Năm mới, vận hội mới, thiết bị cũng phải mới!...', date: '26 thg 6, 2026', category: 'Sự kiện', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80', slug: 'sam-tet-cong-nghe' },
  { id: 4, title: 'Bài viết 4', excerpt: 'Bài viết 4', date: '25 thg 6, 2026', category: 'Tin tức', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80', slug: 'bai-viet-4' },
  { id: 5, title: 'Bài viết 5', excerpt: 'Bài viết 5', date: '25 thg 6, 2026', category: 'Tin tức', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&q=80', slug: 'bai-viet-5' },
]
const CAT = { 'Hoạt động': '#F59E0B', 'Sự kiện': '#3B82F6', 'Tin tức': '#8B5CF6' }
 
export function HexNews({
  title = 'Tin tức', subtitle = 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.',
  btnText = 'Xem tất cả bài viết', titleColor = '#1a1a1a', subtitleColor = '#666',
  bgType = 'color', bgColor = '#F9FAFB',
  bgGradientFrom = '#F9FAFB', bgGradientTo = '#f0fdf4',
  bgGradientDir = 'to bottom', bgImage = '', bgOverlayColor = 'rgba(0,0,0,0.4)',
  news, buttons = [],
} = {}) {
  const list = Array.isArray(news) && news.length ? news : DEFAULT_NEWS
  const top2 = list.slice(0, 2), bot3 = list.slice(2, 5)
  const bg = buildBackground({ bgType, bgColor, bgGradientFrom, bgGradientTo, bgGradientDir, bgImage, bgOverlayColor })
  return (
    <section id="news" style={{ padding: '80px 0', background: bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800, color: titleColor, marginBottom: 12 }}>{title}</h2>
          <p style={{ color: subtitleColor, fontSize: 16 }}>{subtitle}</p>
          <div style={{ width: 48, height: 4, background: '#F59E0B', borderRadius: 2, margin: '12px auto 0' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginBottom: 22 }}>
          {top2.map((item, i) => (
            <a key={i} href={`/tin-tuc/${item.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                <div style={{ height: 240, overflow: 'hidden' }}><img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.background = '#eee'} /></div>
                <div style={{ padding: '18px 22px 22px' }}>
                  <h3 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 17, lineHeight: 1.4, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{item.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#aaa', fontSize: 13 }}>📅 {item.date}</span>
                    <span style={{ color: '#F59E0B', fontWeight: 600, fontSize: 13 }}>Xem chi tiết →</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        {bot3.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 36 }}>
            {bot3.map((item, i) => (
              <a key={i} href={`/tin-tuc/${item.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  <div style={{ height: 170, overflow: 'hidden', position: 'relative' }}>
                    <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.background = '#eee'} />
                    <span style={{ position: 'absolute', top: 10, left: 10, background: CAT[item.category] || '#888', color: '#fff', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{item.category}</span>
                  </div>
                  <div style={{ padding: '14px 16px 18px' }}>
                    <h4 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 14, lineHeight: 1.4, marginBottom: 8 }}>{item.title}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#bbb', fontSize: 12 }}>📅 {item.date}</span>
                      <span style={{ color: '#F59E0B', fontSize: 12, fontWeight: 600 }}>Xem thêm →</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <a href="/tin-tuc" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#065F46,#059669)', color: '#fff', padding: '13px 32px', borderRadius: 30, textDecoration: 'none', fontWeight: 700, fontSize: 15, boxShadow: '0 4px 14px rgba(6,95,70,0.3)' }}>{btnText} ›</a>
        </div>
      </div>
    </section>
  )
}