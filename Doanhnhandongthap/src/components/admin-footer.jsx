import React from 'react';

/**
 * AdminFooter
 * Footer dùng chung cho cả 3 trang. Khớp thiết kế: nền gradient tím-xanh
 * có dải núi/sóng SVG mờ phía sau, 3 cột (Logo+liên hệ / Liên kết trang / Khác),
 * social icons + copyright ở cuối.
 *
 * Props:
 *  - background    : { type, color, gradientFrom, gradientTo, gradientDirection, imageUrl }
 *  - logoUrl       : string
 *  - clubName      : string
 *  - address       : string
 *  - email         : string
 *  - hotline       : string
 *  - linksColumn1Title : string
 *  - linksColumn1  : [{ label, url }]
 *  - linksColumn2Title : string
 *  - linksColumn2  : [{ label, url }]
 *  - copyrightText : string
 */
const AdminFooter = ({
  background = {},
  logoUrl = '',
  clubName = 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
  address = 'Phòng Đồng Tháp, HungHau Campus, Trường Đại học Văn Hiến, Đại lộ Nguyễn Văn Linh, Khu đô thị Nam Thành Phố, Thành phố Hồ Chí Minh',
  email = 'info@dte.hunghau.vn',
  hotline = '1800 1568',
  linksColumn1Title = 'Liên kết trang',
  linksColumn1 = [
    { label: 'Trang chủ', url: '/' },
    { label: 'Tin tức và sự kiện', url: '/tin-tuc' },
    { label: 'Về chúng tôi', url: '/gioi-thieu' },
    { label: 'Các lĩnh vực hoạt động', url: '/hoat-dong-ban' },
    { label: 'Doanh nghiệp hội viên', url: '/hoi-vien' },
    { label: 'Đăng kí', url: '/dang-ky' },
    { label: 'Hoạt động Ban', url: '/hoat-dong-ban' },
  ],
  linksColumn2Title = 'Khác',
  linksColumn2 = [
    { label: 'MYH', url: '#' },
    { label: 'MYC', url: '#' },
    { label: 'HHF', url: '#' },
    { label: 'HHE', url: '#' },
    { label: 'HHA', url: '#' },
    { label: 'COWE', url: '#' },
    { label: 'HHN', url: '#' },
    { label: 'HYV', url: '#' },
  ],
  copyrightText = 'Copyright © CLB Doanh nhan Dong Thap. All rights reserved.',
}) => {
  const getBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || '160deg'}, ${bg.gradientFrom || '#ede9fe'}, ${bg.gradientTo || '#bfdbfe'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || '#dbeafe' };
  };

  return (
    <footer style={{ position: 'relative', padding: '56px 32px 28px', overflow: 'hidden', ...getBg() }}>
      {/* Dải sóng/núi SVG mờ nền */}
      <svg
        aria-hidden="true" viewBox="0 0 1440 400" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35, pointerEvents: 'none' }}
      >
        <path d="M0 250 L300 100 L600 220 L900 60 L1200 200 L1440 120 L1440 400 L0 400 Z" fill="#a5b4fc" />
        <path d="M0 300 L350 180 L700 280 L1050 150 L1440 260 L1440 400 L0 400 Z" fill="#93c5fd" opacity="0.7" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
        <div
          className="admin-footer-grid"
          style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: 40, marginBottom: 36 }}
        >
          {/* Cột 1 — Logo + thông tin liên hệ */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  🪷
                </div>
              )}
              <span style={{ fontSize: 14, fontWeight: 800, color: '#1A2B50', lineHeight: 1.4 }}>{clubName}</span>
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#1A2B50', marginBottom: 10, letterSpacing: '0.04em' }}>
              TRỤ SỞ CHÍNH
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
              <span>📍</span>
              <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.7, margin: 0 }}>{address}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'center' }}>
              <span>✉️</span>
              <span style={{ fontSize: 13, color: '#334155' }}>Email: {email}</span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span>📞</span>
              <span style={{ fontSize: 13, color: '#334155' }}>Hotline: {hotline}</span>
            </div>
          </div>

          {/* Cột 2 — Liên kết trang */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#1A2B50', marginBottom: 16 }}>{linksColumn1Title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {linksColumn1.map((link, i) => (
                <a key={i} href={link.url || '#'} style={{ fontSize: 13.5, color: '#334155', textDecoration: 'none' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Cột 3 — Khác */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#1A2B50', marginBottom: 16 }}>{linksColumn2Title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {linksColumn2.map((link, i) => (
                <a key={i} href={link.url || '#'} style={{ fontSize: 13.5, color: '#334155', textDecoration: 'none' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(30,41,59,0.15)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 12.5, color: '#475569' }}>{copyrightText}</span>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Facebook', 'TikTok', 'YouTube', 'LinkedIn'].map((s, i) => (
              <a
                key={i}
                href="#"
                aria-label={s}
                style={{
                  width: 34, height: 34, borderRadius: '50%', background: '#1A2B50',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 13, textDecoration: 'none',
                }}
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .admin-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

export default AdminFooter;