import React from 'react'
import { buildBackground } from '../fields.js'

const SVCS = [
  { title: 'Giải pháp thi công & lắp đặt', desc: 'Tư vấn chiến lược chuyển đổi số toàn diện.', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { title: 'Cung cấp thiết bị CNTT', desc: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu.', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80' },
]
 
export function HexNewsListPage({ title = 'Tin tức', subtitle = 'Tin tức mới nhất, cập nhật và thông tin từ Hexagon Corporation.', news } = {}) {
  const list = Array.isArray(news) && news.length ? news : DEFAULT_NEWS
  const [sIdx, setSIdx] = React.useState(0)
  return (
    <section style={{ padding: '40px 0 80px', background: '#fff', minHeight: '60vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 28 }}>
          <a href="/" style={{ color: '#888', textDecoration: 'none' }}>Trang chủ</a> › <span style={{ color: '#1a1a1a' }}>Tin tức</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 330px', gap: 36 }}>
          <div>
            <h1 style={{ fontSize: 34, fontWeight: 800, color: '#F59E0B', marginBottom: 10 }}>{title}</h1>
            <p style={{ color: '#666', fontSize: 15, marginBottom: 6 }}>{subtitle}</p>
            <div style={{ width: 38, height: 4, background: '#F59E0B', borderRadius: 2, marginBottom: 36 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 20 }}>
              {list.slice(0, 3).map((item, i) => (
                <a key={i} href={`/tin-tuc/${item.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                    <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                      <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.background = '#eee'} />
                      <span style={{ position: 'absolute', top: 8, left: 8, background: CAT[item.category] || '#888', color: '#fff', padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{item.category}</span>
                    </div>
                    <div style={{ padding: '12px 14px 16px' }}>
                      <h3 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 13, lineHeight: 1.4, marginBottom: 6 }}>{item.title}</h3>
                      <span style={{ color: '#bbb', fontSize: 11 }}>📅 {item.date}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            {list.length > 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
                {list.slice(3).map((item, i) => (
                  <a key={i} href={`/tin-tuc/${item.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                      <div style={{ height: 140, overflow: 'hidden' }}><img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.background = '#eee'} /></div>
                      <div style={{ padding: '10px 13px 14px' }}>
                        <span style={{ background: CAT[item.category] || '#888', color: '#fff', padding: '2px 7px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{item.category}</span>
                        <h4 style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 12, lineHeight: 1.4, margin: '7px 0 5px' }}>{item.title}</h4>
                        <span style={{ color: '#bbb', fontSize: 10 }}>📅 {item.date}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div>
            <div style={{ background: '#1B4332', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '16px 18px' }}><h3 style={{ color: '#fff', fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>DỊCH VỤ CỦA CHÚNG TÔI</h3></div>
              <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                <img src={SVCS[sIdx]?.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.background = '#065F46'} />
                <button onClick={() => setSIdx(i => (i - 1 + SVCS.length) % SVCS.length)} style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer' }}>‹</button>
                <button onClick={() => setSIdx(i => (i + 1) % SVCS.length)} style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer' }}>›</button>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <h4 style={{ color: '#F59E0B', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{SVCS[sIdx]?.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>{SVCS[sIdx]?.desc}</p>
                <a href="#" style={{ color: '#F59E0B', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Tìm hiểu thêm ›</a>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 14, paddingTop: 14 }}>
                  <a href="#" style={{ color: '#F59E0B', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>Xem tất cả dịch vụ ›</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}