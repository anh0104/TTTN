import React from 'react';

const AdminValueCardsOverlap = ({
  background = {},
  sectionTitle = 'GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG',
  viewMoreText = 'Xem thêm →',
  viewMoreUrl = '#',
  cards = [
    { icon: '', title: 'Kết nối chất lượng', desc: 'Tiếp cận mạng lưới doanh nhân uy tín, mở rộng cơ hội hợp tác thực tế.' },
    { icon: '', title: 'Phát triển kiến thức', desc: 'Cập nhật xu hướng, nâng cao tư duy quản trị và kỹ năng kinh doanh.' },
    { icon: '', title: 'Cơ hội hợp tác', desc: 'Tham gia các dự án, hoạt động kết nối và xúc tiến thương mại.' },
  ],
}) => {
  const getBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || '160deg'}, ${bg.gradientFrom || '#1e3a8a'}, ${bg.gradientTo || '#c7d2fe'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
   return {
  background: 'linear-gradient(180deg, #F8F5FF 0%, #EFEAFF 100%)',
};
  };

  // Card offset xếp tầng (staggered) — đúng hiệu ứng ảnh đè lên nhau trong thiết kế gốc
  const offsets = [0, 56, 112];

  return (
    <section style={{ position: 'relative', padding: '56px 32px', minHeight: 520, overflow: 'hidden', ...getBg() }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#4f4fe0', margin: 0, letterSpacing: '0.02em' }}>
            {sectionTitle}
          </h2>
          <a href={viewMoreUrl} style={{ fontSize: 14, fontWeight: 700, color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {viewMoreText}
          </a>
        </div>

        {/* Cards xếp tầng */}
        <div className="admin-value-cards-wrap" style={{ position: 'relative', maxWidth: 460 }}>
          {cards.map((c, i) => (
            <div
              key={i}
              className="admin-value-card"
              style={{
                position: i === 0 ? 'relative' : 'relative',
                marginTop: i === 0 ? 0 : -20,
                marginLeft: offsets[i] || 0,
               background: '#FFFFFF',
                borderRadius: 24,
                padding: '32px 28px',
                width: 280,
                boxShadow: '0 12px 32px rgba(30,58,138,0.18)',
                zIndex: i + 1,
              }}
            >
              {/* Icon tròn nổi */}
              <div
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                }}
              >
                {c.icon ? (
                  <img src={c.icon} alt={c.title} style={{ width: 38, height: 38, objectFit: 'contain' }} />
                ) : (
                  <span style={{ fontSize: 30 }}>{['🌐', '📈', '🤝'][i % 3]}</span>
                )}
              </div>

              <h3 style={{ fontSize: 16.5, fontWeight: 800, color: '#1E40AF', margin: '0 0 10px' }}>{c.title}</h3>
              <p style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive: bỏ hiệu ứng overlap trên mobile, xếp dọc bình thường */}
      <style>{`
        @media (max-width: 768px) {
          .admin-value-cards-wrap { max-width: 100% !important; }
          .admin-value-card {
            margin-left: 0 !important;
            margin-top: 16px !important;
            width: 100% !important;
            box-sizing: border-box;
          }
          .admin-value-card:first-child { margin-top: 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default AdminValueCardsOverlap;