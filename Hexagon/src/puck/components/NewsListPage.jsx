import React from 'react'

const DEFAULT_NEWS = [
  { id: 1, title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25', excerpt: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC...', date: '26 thg 6, 2026', time: '02:54', category: 'Hoạt động', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80', slug: 'teambuilding-myh25' },
  { id: 2, title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên', excerpt: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng sinh viên khoa Công nghệ Thông tin...', date: '26 thg 6, 2026', time: '01:25', category: 'Hoạt động', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80', slug: 'van-hien-sinh-vien' },
  { id: 3, title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá', excerpt: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai...', date: '26 thg 6, 2026', time: '01:00', category: 'Sự kiện', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80', slug: 'sam-tet-cong-nghe' },
  { id: 4, title: 'Bài viết 4', excerpt: 'Bài viết 4', date: '25 thg 6, 2026', time: '18:58', category: 'Tin tức', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80', slug: 'bai-viet-4' },
  { id: 5, title: 'Bài viết 5', excerpt: 'Bài viết 5', date: '25 thg 6, 2026', time: '18:58', category: 'Tin tức', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&q=80', slug: 'bai-viet-5' },
]

const DEFAULT_SERVICES = [
  { title: 'Giải pháp thi công & lắp đặt', desc: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình...', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { title: 'Cung cấp thiết bị CNTT', desc: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh...', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80' },
  { title: 'Dịch vụ Công nghệ thông tin', desc: 'Giải pháp phần mềm và hạ tầng CNTT toàn diện...', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80' },
]

const CAT_COLORS = { 'Hoạt động': '#F59E0B', 'Sự kiện': '#3B82F6', 'Tin tức': '#8B5CF6' }

export default function NewsListPage({
  title = 'Tin tức',
  subtitle = 'Tin tức mới nhất, cập nhật và thông tin từ Hexagon Corporation.',
  news,
  services,
} = {}) {
  const list = Array.isArray(news) && news.length > 0 ? news : DEFAULT_NEWS
  const svcs = Array.isArray(services) && services.length > 0 ? services : DEFAULT_SERVICES
  const [svcIdx, setSvcIdx] = React.useState(0)
  const top3 = list.slice(0, 3)
  const rest = list.slice(3)

  return (
    <section style={{ padding: '48px 0 80px', background: '#fff', minHeight: '60vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 14, color: '#888', marginBottom: 32 }}>
          <a href="/" style={{ color: '#888', textDecoration: 'none' }}>Trang chủ</a>
          <span style={{ margin: '0 6px' }}>›</span>
          <span style={{ color: '#1a1a1a' }}>Tin tức</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40 }}>
          {/* Main */}
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F59E0B', marginBottom: 12 }}>{title}</h1>
            <p style={{ color: '#666', fontSize: 15, marginBottom: 8 }}>{subtitle}</p>
            <div style={{ width: 40, height: 4, background: '#F59E0B', borderRadius: 2, marginBottom: 40 }} />

            {/* Top 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 24 }}>
              {top3.map((item, i) => (
                <a key={i} href={`/tin-tuc/${item.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', transition: 'transform 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                    <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                      <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.background = '#eee'} />
                      <span style={{ position: 'absolute', top: 10, left: 10, background: CAT_COLORS[item.category] || '#888', color: '#fff', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{item.category}</span>
                    </div>
                    <div style={{ padding: '14px 16px 18px' }}>
                      <h3 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 14, lineHeight: 1.45, marginBottom: 8 }}>{item.title}</h3>
                      <p style={{ color: '#aaa', fontSize: 12, marginBottom: 10 }}>{item.excerpt}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#bbb', fontSize: 11 }}>📅 {item.date} ⏰ {item.time}</span>
                        <span style={{ color: '#F59E0B', fontSize: 12, fontWeight: 600 }}>Xem thêm →</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Rest */}
            {rest.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                {rest.map((item, i) => (
                  <a key={i} href={`/tin-tuc/${item.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                      <div style={{ height: 160, overflow: 'hidden' }}>
                        <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.background = '#eee'} />
                      </div>
                      <div style={{ padding: '12px 14px 16px' }}>
                        <span style={{ background: CAT_COLORS[item.category] || '#888', color: '#fff', padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{item.category}</span>
                        <h4 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 13, lineHeight: 1.4, margin: '8px 0 6px' }}>{item.title}</h4>
                        <p style={{ color: '#aaa', fontSize: 12, marginBottom: 8 }}>{item.excerpt}</p>
                        <span style={{ color: '#bbb', fontSize: 11 }}>📅 {item.date} ⏰ {item.time}</span>
                        <span style={{ color: '#F59E0B', fontSize: 11, fontWeight: 600, float: 'right' }}>Xem thêm →</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar: Dịch vụ */}
          <div>
            <div style={{ background: '#1B4332', borderRadius: 16, overflow: 'hidden', padding: '0 0 20px' }}>
              <div style={{ background: '#1B4332', padding: '20px 20px 16px' }}>
                <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>DỊCH VỤ CỦA CHÚNG TÔI</h3>
              </div>
              {/* Service image slider */}
              <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                <img src={svcs[svcIdx]?.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.background = '#065F46'} />
                {/* Arrows */}
                <button onClick={() => setSvcIdx(i => (i - 1 + svcs.length) % svcs.length)}
                  style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', fontSize: 16 }}>‹</button>
                <button onClick={() => setSvcIdx(i => (i + 1) % svcs.length)}
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', fontSize: 16 }}>›</button>
                {/* Dots */}
                <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4 }}>
                  {svcs.map((_, i) => (
                    <div key={i} onClick={() => setSvcIdx(i)} style={{ width: i === svcIdx ? 20 : 6, height: 6, borderRadius: 3, background: i === svcIdx ? '#F59E0B' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s' }} />
                  ))}
                </div>
              </div>
              <div style={{ padding: '20px 20px 0' }}>
                <h4 style={{ color: '#F59E0B', fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{svcs[svcIdx]?.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{svcs[svcIdx]?.desc}</p>
                <a href="#" style={{ color: '#F59E0B', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>Tìm hiểu thêm ›</a>
              </div>
              <div style={{ margin: '16px 20px 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
                <a href="#services" style={{ color: '#F59E0B', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Xem tất cả dịch vụ ›</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}