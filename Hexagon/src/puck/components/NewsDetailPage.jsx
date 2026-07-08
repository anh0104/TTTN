import React from 'react'
import { useParams } from 'react-router-dom'

const ARTICLES = {
  'teambuilding-myh25': { title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25', date: '25 tháng 6, 2026', time: '02:54', lang: 'Tiếng Việt', category: 'Hoạt động', content: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra tại Ngôi nhà Hùng Hậu. Một buổi gắn kết đầy ý nghĩa và cảm xúc.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80' },
  'van-hien-sinh-vien': { title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên', date: '26 tháng 6, 2026', time: '01:25', lang: 'Tiếng Việt', category: 'Hoạt động', content: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến trong ngày hội lớn.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80' },
  'bai-viet-4': { title: 'Bài viết 4', date: '25 tháng 6, 2026', time: '18:58', lang: 'Tiếng Việt', category: 'Tin tức', content: 'Bài viết 4', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=80' },
  'bai-viet-5': { title: 'Bài viết 5', date: '25 tháng 6, 2026', time: '18:58', lang: 'Tiếng Việt', category: 'Tin tức', content: 'Bài viết 5', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=700&q=80' },
}

const SIDEBAR_SERVICES = [
  { title: 'Cung cấp thiết bị CNTT', desc: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và...', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80' },
  { title: 'Giải pháp thi công & lắp đặt', desc: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và...', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
]

export default function NewsDetailPage() {
  const { slug } = useParams()
  const article = ARTICLES[slug] || { title: 'Bài viết', date: '2026', time: '', lang: 'Tiếng Việt', category: 'Tin tức', content: 'Nội dung bài viết...', image: '' }
  const [svcIdx, setSvcIdx] = React.useState(0)

  return (
    <section style={{ padding: '32px 0 80px', background: '#fff', minHeight: '60vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 14, color: '#888', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6 }}>
          <a href="/" style={{ color: '#888', textDecoration: 'none' }}>Trang chủ</a> ›
          <a href="/tin-tuc" style={{ color: '#888', textDecoration: 'none' }}>Bài viết</a> ›
          <a href="/tin-tuc" style={{ color: '#888', textDecoration: 'none' }}>Tin tức</a> ›
          <span style={{ color: '#1a1a1a' }}>{article.title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40 }}>
          {/* Article */}
          <div>
            <a href="/tin-tuc" style={{ color: '#F59E0B', fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 24 }}>‹ Quay lại danh sách</a>
            <div style={{ background: '#f9f9f9', borderRadius: 16, padding: '32px 36px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 20 }}>{article.title}</h1>
              <div style={{ display: 'flex', gap: 20, color: '#F59E0B', fontSize: 14, marginBottom: 28, flexWrap: 'wrap' }}>
                <span>📅 {article.date}</span>
                {article.time && <span>⏰ {article.time}</span>}
                <span>🌐 {article.lang}</span>
              </div>
              {article.image && (
                <img src={article.image} alt="" style={{ width: '100%', borderRadius: 12, marginBottom: 24, maxHeight: 400, objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
              )}
              <p style={{ color: '#444', fontSize: 16, lineHeight: 1.85 }}>{article.content}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: '#1B4332', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '20px 20px 16px' }}>
                <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.06em' }}>DỊCH VỤ CỦA CHÚNG TÔI</h3>
              </div>
              <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                <img src={SIDEBAR_SERVICES[svcIdx]?.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.background = '#065F46'} />
                <button onClick={() => setSvcIdx(i => (i - 1 + SIDEBAR_SERVICES.length) % SIDEBAR_SERVICES.length)} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer' }}>‹</button>
                <button onClick={() => setSvcIdx(i => (i + 1) % SIDEBAR_SERVICES.length)} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer' }}>›</button>
              </div>
              <div style={{ padding: '20px' }}>
                <h4 style={{ color: '#F59E0B', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{SIDEBAR_SERVICES[svcIdx]?.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{SIDEBAR_SERVICES[svcIdx]?.desc}</p>
                <a href="#" style={{ color: '#F59E0B', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Tìm hiểu thêm ›</a>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 16, paddingTop: 16 }}>
                  <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 12 }}>
                    {SIDEBAR_SERVICES.map((_, i) => <div key={i} onClick={() => setSvcIdx(i)} style={{ width: i === svcIdx ? 20 : 6, height: 6, borderRadius: 3, background: i === svcIdx ? '#F59E0B' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.2s' }} />)}
                  </div>
                  <a href="/dich-vu" style={{ color: '#F59E0B', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Xem tất cả dịch vụ ›</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}