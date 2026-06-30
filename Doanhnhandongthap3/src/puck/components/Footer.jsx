import React from 'react'

export default function Footer({
  orgName = 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
  orgSub = 'TẠI TP. HỒ CHÍ MINH',
  address = 'Phòng Đồng Tháp, HungHau Campus, Trường Đại học Văn Hiến, Đại lộ Nguyễn Văn Linh, Khu đô thị Nam Thành Phố, Thành phố Hồ Chí Minh',
  email = 'info@dte.hunghau.vn',
  hotline = '1800 1568',
  quickLinks = ['Trang chủ','Tin tức và sự kiện','Về chúng tôi','Các lĩnh vực hoạt động','Doanh nghiệp hội viên','Đăng kí','Hoạt động Ban'],
  others = ['MYH','MYC','HHF','HHE','HHA','COWE','HHN','HYV'],
}) {
  return (
    <footer style={{ position: 'relative', background: 'linear-gradient(135deg, #c0d0f0 0%, #d8c0f0 40%, #e8c0e0 70%, #c8c0f0 100%)', overflow: 'hidden' }}>
      {/* Wave decoration */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '35%', opacity: 0.15, pointerEvents: 'none' }}>
        <svg viewBox="0 0 300 400" fill="none">
          <path d="M300 0 Q200 100 250 200 Q300 300 200 400" stroke="#6644aa" strokeWidth="80" fill="none"/>
          <path d="M300 50 Q180 150 230 250 Q280 350 180 400" stroke="#8866cc" strokeWidth="60" fill="none"/>
        </svg>
      </div>

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '64px 32px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', gap: 48, paddingBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #0A2472', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="20" fill="#e8f0fe"/>
                  <ellipse cx="20" cy="24" rx="11" ry="7" fill="#1a6b8a" opacity="0.5"/>
                  <ellipse cx="20" cy="15" rx="6" ry="10" fill="#e75480"/>
                  <ellipse cx="13" cy="18" rx="5" ry="9" fill="#e75480" opacity="0.7" transform="rotate(-25 13 18)"/>
                  <ellipse cx="27" cy="18" rx="5" ry="9" fill="#e75480" opacity="0.7" transform="rotate(25 27 18)"/>
                  <circle cx="20" cy="15" r="3" fill="#FFD700"/>
                </svg>
              </div>
              <div>
                <div style={{ color: '#0A2472', fontWeight: 800, fontSize: 13, letterSpacing: '0.04em', lineHeight: 1.3, textTransform: 'uppercase' }}>{orgName}</div>
                <div style={{ color: '#0A2472', fontSize: 12, opacity: 0.7, textTransform: 'uppercase' }}>{orgSub}</div>
              </div>
            </div>

            <div style={{ marginBottom: 10 }}>
              <p style={{ color: '#333', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>TRỤ SỞ CHÍNH</p>
              <div style={{ display: 'flex', gap: 8, color: '#444', fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>
                <span>📍</span><span>{address}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, color: '#444', fontSize: 13, marginBottom: 6 }}>
                <span>✉</span><span>Email: {email}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, color: '#444', fontSize: 13 }}>
                <span>📞</span><span>Hotline: {hotline}</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ color: '#0A2472', fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Liên kết trang</h4>
            {quickLinks.map(l => (
              <a key={l} href="#" style={{ display: 'block', color: '#444', textDecoration: 'none', fontSize: 14, marginBottom: 12, transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#0A2472'}
                onMouseLeave={e => e.target.style.color = '#444'}>
                {l}
              </a>
            ))}
          </div>

          {/* Others */}
          <div>
            <h4 style={{ color: '#0A2472', fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Khác</h4>
            {others.map(o => (
              <a key={o} href="#" style={{ display: 'block', color: '#444', textDecoration: 'none', fontSize: 14, marginBottom: 12 }}>{o}</a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(10,36,114,0.15)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#666', fontSize: 13 }}>Copyright © CLB Doanh nhan Dong Thap. All rights reserved</span>
          <div style={{ display: 'flex', gap: 10 }}>
            {['f','T','▶','in'].map((icon, i) => (
              <a key={i} href="#" style={{ width: 32, height: 32, borderRadius: '50%', background: ['#1877f2','#000','#FF0000','#0a66c2'][i], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}