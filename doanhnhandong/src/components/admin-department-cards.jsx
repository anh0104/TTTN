import React from 'react';

const AdminDepartmentCards = ({
  background = {},
  sectionTitle = 'CÁC BAN CHUYÊN MÔN',
  sectionSubtitle = 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
  cards = [
    { icon: '', name: 'Ban Kinh tế - Đầu tư',     buttonText: 'Xem hoạt động →', buttonUrl: '#' },
    { icon: '', name: 'Ban Văn hóa - Thể thao',   buttonText: 'Xem hoạt động →', buttonUrl: '#' },
    { icon: '', name: 'Ban Xã hội - Cộng đồng',  buttonText: 'Xem hoạt động →', buttonUrl: '#' },
    { icon: '', name: 'Ban Khởi nghiệp',          buttonText: 'Xem hoạt động →', buttonUrl: '#' },
    { icon: '', name: 'Ban Giao thương quốc tế',  buttonText: 'Xem hoạt động →', buttonUrl: '#' },
  ],
  cardGradientFrom  = '#5B9FE0',
  cardGradientTo    = '#1E3FA0',
  cardBorderRadius  = 24,
  cardCutCorner     = true,
}) => {
  /* ── Nền section ── */
  const getSectionBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return {
        background: `linear-gradient(${bg.gradientDirection || '145deg'}, ${bg.gradientFrom || '#E4EAF8'}, ${bg.gradientTo || '#EBE0F6'})`,
      };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    /* default: tím-xanh nhạt đúng thiết kế */
    return { background: 'linear-gradient(145deg, #E4EAF8 0%, #EBE0F6 100%)' };
  };

  /* ── Card style — gradient xanh + clip góc dưới phải ── */
  const cardStyle = (extra = {}) => ({
    background: `linear-gradient(145deg, ${cardGradientFrom} 0%, ${cardGradientTo} 100%)`,
    borderRadius: cardBorderRadius,
    /* clip-path tạo góc cắt chéo dưới-phải giống thiết kế gốc */
    clipPath: cardCutCorner
      ? 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)'
      : 'none',
    padding: '40px 24px 36px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    flex: '1 1 0',
    minWidth: 200,
    maxWidth: 340,
    boxSizing: 'border-box',
    ...extra,
  });

  /* ── Icon placeholder (hiện outline circle nếu chưa có ảnh) ── */
  const IconPlaceholder = () => (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="26" cy="26" r="24" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
      <rect x="14" y="32" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.7)" />
      <rect x="18" y="24" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.7)" />
      <rect x="22" y="16" width="8"  height="3" rx="1.5" fill="rgba(255,255,255,0.7)" />
    </svg>
  );

  // Bố cục 2-2-1: dòng 1 = 2 card, dòng 2 = 2 card, dòng 3 = 1 card (card cuối căn giữa)
  const row1 = cards.slice(0, 2);
  const row2 = cards.slice(2, 4);
  const row3 = cards.slice(4, 5);

  const CardItem = ({ card }) => (
    <div className="admin-dept-card" style={cardStyle()}>
      {/* Icon */}
      <div style={{ marginBottom: 20, height: 56, display: 'flex', alignItems: 'center' }}>
        {card.icon
          ? <img src={card.icon} alt="" aria-hidden="true" style={{ width: 52, height: 52, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          : <IconPlaceholder />
        }
      </div>

      {/* Name */}
      <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 24, lineHeight: 1.4 }}>
        {card.name}
      </p>

      {/* Button */}
      <a
        href={card.buttonUrl || '#'}
        style={{
          display: 'inline-block',
          padding: '9px 24px',
          border: '1.5px solid rgba(255,255,255,0.75)',
          borderRadius: card.buttonBorderRadius ?? 30,
          color: card.buttonTextColor || '#fff',
          background: card.buttonBgColor && card.buttonBgColor !== 'transparent'
            ? card.buttonBgColor
            : 'transparent',
          fontSize: 13,
          fontWeight: 600,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {card.buttonText || 'Xem hoạt động →'}
      </a>
    </div>
  );

  return (
    <section className="admin-dept-section" style={{ ...getSectionBg(), padding: '72px 48px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <h2 style={{
          fontSize: 26, fontWeight: 900, color: '#1A2B50',
          letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 10px',
        }}>
          {sectionTitle}
        </h2>
        <p style={{
          fontSize: 13, color: '#3B5A9A', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0,
        }}>
          {sectionSubtitle}
        </p>
      </div>

      {/* Dòng 1 — 2 card */}
      <div className="admin-dept-row" style={{ display: 'flex', gap: 28, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
        {row1.map((card, i) => <CardItem key={i} card={card} />)}
      </div>

      {/* Dòng 2 — 2 card */}
      {row2.length > 0 && (
        <div className="admin-dept-row" style={{ display: 'flex', gap: 28, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
          {row2.map((card, i) => <CardItem key={i + 2} card={card} />)}
        </div>
      )}

      {/* Dòng 3 — 1 card căn giữa */}
      {row3.length > 0 && (
        <div className="admin-dept-row" style={{ display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
          {row3.map((card, i) => <CardItem key={i + 4} card={card} />)}
        </div>
      )}

      {/* ── Responsive ──
          - Tablet (≤900px): giảm padding section
          - Mobile (≤600px): card chiếm full width, bỏ clip-path góc cắt vì
            ở màn hẹp clip-path khiến nội dung bị che mất một phần.
      */}
      <style>{`
        @media (max-width: 900px) {
          .admin-dept-section {
            padding: 56px 24px !important;
          }
        }
        @media (max-width: 600px) {
          .admin-dept-row {
            gap: 20px !important;
          }
          .admin-dept-card {
            min-width: 100% !important;
            max-width: 100% !important;
            clip-path: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AdminDepartmentCards;