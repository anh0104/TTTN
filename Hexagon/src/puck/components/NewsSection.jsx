import React from 'react'

const DEFAULT_NEWS = [
  { id: 1, title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu', excerpt: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra...', date: '26 thg 6, 2026', category: 'Hoạt động', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', slug: 'teambuilding-myh25' },
  { id: 2, title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên', excerpt: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến tron...', date: '26 thg 6, 2026', category: 'Hoạt động', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80', slug: 'van-hien-sinh-vien' },
  { id: 3, title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá', excerpt: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé "Lục Giác" để chọn cho m...', date: '26 thg 6, 2026', category: 'Sự kiện', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80', slug: 'sam-tet-cong-nghe' },
  { id: 4, title: 'Bài viết 4', excerpt: 'Bài viết 4', date: '25 thg 6, 2026', category: 'Tin tức', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80', slug: 'bai-viet-4' },
  { id: 5, title: 'Bài viết 5', excerpt: 'Bài viết 5', date: '25 thg 6, 2026', category: 'Tin tức', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80', slug: 'bai-viet-5' },
]

const CAT_COLORS = { 'Hoạt động': '#F59E0B', 'Sự kiện': '#3B82F6', 'Tin tức': '#8B5CF6', 'default': '#6B7280' }

export default function NewsSection({
  title = 'Tin tức',
  subtitle = 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.',
  btnText = 'Xem tất cả bài viết',
  news,
} = {}) {
  const list = Array.isArray(news) && news.length > 0 ? news : DEFAULT_NEWS
  const top2 = list.slice(0, 2)
  const bottom3 = list.slice(2, 5)

  const catColor = (cat) => CAT_COLORS[cat] || CAT_COLORS.default

  return (
    <section id="news" style={{ padding: '80px 0', background: '#F9FAFB' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 12 }}>{title}</h2>
          <p style={{ color: '#666', fontSize: 16, marginBottom: 12 }}>{subtitle}</p>
          <div style={{ width: 48, height: 4, background: '#F59E0B', borderRadius: 2, margin: '0 auto' }} />
        </div>

        {/* Top 2 large */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {top2.map((item, i) => (
            <a key={i} href={`/tin-tuc/${item.slug || item.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', height: '100%', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                <div style={{ height: 260, overflow: 'hidden', position: 'relative' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.style.background = '#065F46'; e.target.style.display = 'block' }} />
                </div>
                <div style={{ padding: '20px 24px 24px' }}>
                  <h3 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 18, lineHeight: 1.4, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{item.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#aaa', fontSize: 13 }}>📅 {item.date}</span>
                    <span style={{ color: '#F59E0B', fontWeight: 600, fontSize: 13 }}>Xem chi tiết →</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom 3 */}
        {bottom3.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 40 }}>
            {bottom3.map((item, i) => (
              <a key={i} href={`/tin-tuc/${item.slug || item.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.style.background = '#065F46' }} />
                    <span style={{ position: 'absolute', top: 12, left: 12, background: catColor(item.category), color: '#fff', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{item.category}</span>
                  </div>
                  <div style={{ padding: '16px 18px 20px' }}>
                    <h4 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 15, lineHeight: 1.4, marginBottom: 8 }}>{item.title}</h4>
                    <p style={{ color: '#999', fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{item.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#bbb', fontSize: 12 }}>📅 {item.date}</span>
                      <span style={{ color: '#F59E0B', fontSize: 12, fontWeight: 600 }}>Xem thêm →</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* CTA button */}
        <div style={{ textAlign: 'center' }}>
          <a href="/tin-tuc" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg,#065F46,#059669)',
            color: '#fff', padding: '14px 36px', borderRadius: 30,
            textDecoration: 'none', fontWeight: 700, fontSize: 15,
            boxShadow: '0 4px 16px rgba(6,95,70,0.3)',
          }}>
            {btnText} ›
          </a>
        </div>
      </div>
    </section>
  )
}