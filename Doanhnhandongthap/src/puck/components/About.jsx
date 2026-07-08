import React from 'react'

export default function About({
  pageTitle = 'VỀ CÂU LẠC BỘ',
  description = 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh. Với tinh thần kết nối – đồng hành – sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.',
  image = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
  orgTitle = 'CƠ CẤU TỔ CHỨC',
  members = [
    { name: 'Trần Văn Khang', clbRole: 'Ủy viên BCH', bizRole: 'Tổng Giám đốc', company: 'Công ty CP Logistics Đồng Tháp', avatar: 'https://i.pravatar.cc/100?img=11' },
    { name: 'Đỗ Thu Trang', clbRole: 'Thủ quỹ CLB', bizRole: 'Giám đốc Tài chính', company: 'Công ty TNHH Sen Việt', avatar: 'https://i.pravatar.cc/100?img=5' },
    { name: 'Vũ Hoàng Long', clbRole: 'Ủy viên BCH', bizRole: 'Giám đốc Điều hành', company: 'Công ty Công nghệ số Mekong', avatar: 'https://i.pravatar.cc/100?img=8' },
  ],
}) {
  const [current, setCurrent] = React.useState(0)
  const visible = members.slice(current, current + 3)

  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #e8eeff 0%, #f5e8ff 50%, #ffe8f5 100%)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>

          {/* Left: about card */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '36px 36px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
            <h2 style={{ color: '#0A2472', fontSize: 22, fontWeight: 800, textTransform: 'uppercase', marginBottom: 20, letterSpacing: '0.03em' }}>{pageTitle}</h2>
            <p style={{ color: '#444', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>{description}</p>
            <div style={{ borderRadius: 12, overflow: 'hidden', height: 220 }}>
              <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Right: org structure */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '36px 36px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
            <h2 style={{ color: '#0A2472', fontSize: 22, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24, letterSpacing: '0.03em' }}>{orgTitle}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {members.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: i < members.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <img src={m.avatar} alt={m.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ fontSize: 14, lineHeight: 1.65, color: '#333' }}>
                    <div><span style={{ color: '#555' }}>Họ tên: </span><strong>{m.name}</strong></div>
                    <div><span style={{ color: '#555' }}>Chức vụ CLB: </span>{m.clbRole}</div>
                    <div><span style={{ color: '#555' }}>Chức vụ Doanh nghiệp: </span>{m.bizRole}</div>
                    <div><strong style={{ color: '#555' }}>Doanh nghiệp: </strong>{m.company}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
              <button onClick={() => setCurrent(c => Math.max(0, c - 1))}
                style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ height: 6, width: i === 1 ? 32 : 6, borderRadius: 4, background: i === 1 ? '#0A2472' : '#ddd', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setCurrent(i)} />
              ))}
              <button onClick={() => setCurrent(c => Math.min(members.length - 1, c + 1))}
                style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
