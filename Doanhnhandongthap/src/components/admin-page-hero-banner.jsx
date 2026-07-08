import React from 'react';

/**
 * AdminPageHeroBanner
 * Banner đầu trang con (Giới thiệu / Hội viên) — tiêu đề lớn căn trái,
 * có gạch ngang màu cam ngắn phía dưới. Khớp ảnh 12 và 14.
 *
 * Props:
 *  - background : { type, color, gradientFrom, gradientTo, gradientDirection, imageUrl }
 *  - title      : string
 *  - underlineColor : string
 */
const AdminPageHeroBanner = ({
  background = {},
  title = 'GIỚI THIỆU DOANH NHÂN ĐỒNG THÁP',
  underlineColor = '#F0B429',
}) => {
  const getBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to right'}, ${bg.gradientFrom || '#ffffff'}, ${bg.gradientTo || '#ffffff'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || '#ffffff' };
  };

  return (
    <section style={{ padding: '40px 32px 24px', ...getBg() }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 30, fontWeight: 900, color: '#1A2B50', textTransform: 'uppercase', margin: '0 0 14px', letterSpacing: '0.02em' }}>
          {title}
        </h1>
        <div style={{ width: 70, height: 4, background: underlineColor, borderRadius: 2 }} />
      </div>
    </section>
  );
};

export default AdminPageHeroBanner;