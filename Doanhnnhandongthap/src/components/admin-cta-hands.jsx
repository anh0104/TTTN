import React from 'react';

const AdminCtaHands = ({
  background = {},
  titleLines = [
    'QUAN TÂM VÀ HỢP TÁC',
    'VỚI CÁC CHƯƠNG TRÌNH HOẠT ĐỘNG',
    'CỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM',
  ],
  email = 'info@dte.hunghau.vn',
  hotline = '1800 1568',
  buttonText = 'Đăng ký hội viên',
  buttonUrl = '#',
  showHands = true,
}) => {
  const getBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || '180deg'}, ${bg.gradientFrom || '#ede9fe'}, ${bg.gradientTo || '#dbeafe'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || '#ede9fe' };
  };

  return (
    <section style={{ position: 'relative', padding: '72px 32px', overflow: 'hidden', textAlign: 'center', ...getBg() }}>
      {/* Bàn tay outline trang trí 2 bên — SVG, không cần ảnh */}
      

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{ margin: '0 0 36px' }}>
          {titleLines.map((line, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                fontSize: i === 0 ? 26 : 24,
                fontWeight: 900,
                color: '#1A2B50',
                letterSpacing: '0.02em',
                lineHeight: 1.5,
              }}
            >
              {line}
            </span>
          ))}
        </h2>

        {/* Pills liên hệ */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          <div
            style={{
              background: '#fff', borderRadius: 30, padding: '14px 26px',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)', fontWeight: 700, color: '#1A2B50', fontSize: 15,
            }}
          >
            <span>✉️</span> {email}
          </div>
          <div
            style={{
              background: '#fff', borderRadius: 30, padding: '14px 26px',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)', fontWeight: 700, color: '#1A2B50', fontSize: 15,
            }}
          >
            <span style={{ color: '#ef4444' }}>📞</span> {hotline}
          </div>
        </div>

        {/* Nút CTA */}
        <a
          href={buttonUrl}
          style={{
            display: 'inline-block', background: '#0F2A6B', color: '#fff',
            padding: '16px 44px', borderRadius: 30, fontWeight: 800, fontSize: 16,
            textDecoration: 'none', boxShadow: '0 6px 20px rgba(15,42,107,0.3)',
          }}
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default AdminCtaHands;