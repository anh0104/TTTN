import React from 'react'

export default function News({
  title = 'TIN TỨC & SỰ KIỆN',
  items = [
    { title: 'Hội thảo kết nối doanh nghiệp chia sẻ xu hướng phát triển', date: '20/03/2026', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', excerpt: 'Sự kiện quy tụ nhiều chuyên gia và doanh nhân, cùng thảo luận về chiến lược phát triển, chuyển đổi số và cơ hội hợp tác trong thời đại mới.', isNew: true },
    { title: 'Kết nối và chia sẻ niềm vui là cách phát triển sự hiệu quả...', date: '20/03/2026', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80', excerpt: 'Khi chúng ta làm việc với một trái tim mở lòng và tinh thần sẻ chia, áp lực sẽ biến thành động lực, và khó khăn sẽ trở thành trải nghiệm.', isNew: true },
    { title: 'Lan tỏa yêu thương thiện nguyện', date: '10/03/2026', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', excerpt: 'Các thành viên đã cùng chung tay tổ chức hoạt động trao tặng...', isNew: false },
    { title: 'Hợp tác giữa các doanh nghiệp', date: '23/02/2026', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', excerpt: 'Định hướng phát triển tương lai là mở rộng quan hệ hợp tác giữa các ...', isNew: false },
    { title: 'Đẩy mạnh chuyển đổi số ...', date: '23/02/2026', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80', excerpt: 'Sự phát triển hệ thống chuyển đổi đồng bộ nhằm tối ưu hóa...', isNew: false },
  ],
}) {
  const top2 = items.slice(0, 2)
  const bottom3 = items.slice(2, 5)

  return (
    <section id="tin-tuc" style={{ padding: '72px 0 80px', background: '#f0f0f8' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <h2 style={{ color: '#0A2472', fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{title}</h2>
          <a href="/tin-tuc" style={{ color: '#0A2472', textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>Xem thêm →</a>
        </div>

        {/* Top row: 2 large cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {top2.map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {item.isNew && (
                  <div style={{ position: 'absolute', top: 16, right: 16, background: '#E8A020', color: '#fff', padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Mới nhất</div>
                )}
              </div>
              <div style={{ padding: '20px 24px 28px' }}>
                <div style={{ color: '#888', fontSize: 13, marginBottom: 10 }}>{item.date}</div>
                <h3 style={{ color: '#0A2472', fontSize: 17, fontWeight: 700, lineHeight: 1.45, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{item.excerpt}</p>
                <a href="#" style={{ color: '#0A2472', textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>Xem thêm →</a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row: 3 smaller cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {bottom3.map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'relative' }}>
              <div style={{ height: 200, overflow: 'hidden' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px 20px 52px' }}>
                <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>{item.date}</div>
                <h4 style={{ color: '#0A2472', fontSize: 15, fontWeight: 700, lineHeight: 1.4, marginBottom: 8 }}>{item.title}</h4>
                <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6 }}>{item.excerpt}</p>
              </div>
              {/* Arrow button bottom right */}
              <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
                <a href="#" style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: i === bottom3.length - 1 ? '#0A2472' : '#fff',
                  border: '1px solid #ddd',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i === bottom3.length - 1 ? '#fff' : '#333',
                  textDecoration: 'none', fontSize: 16, fontWeight: 700,
                }}>→</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
