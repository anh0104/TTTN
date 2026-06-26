import React, { useState } from 'react';

const AdminHeader = ({
  background = {},
  logoUrl = '',
  clubNameLine1 = 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
  clubNameLine2 = 'TẠI TP.HỒ CHÍ MINH',
  menuItems = [
    { label: 'Trang chủ', url: '/' },
    { label: 'Giới thiệu', url: '/gioi-thieu' },
    { label: 'Hội viên', url: '/hoi-vien' },
    { label: 'Hoạt động Ban', url: '/hoat-dong-ban' },
    { label: 'Tin tức & Sự kiện', url: '/tin-tuc' },
    { label: 'Liên hệ', url: '/lien-he' },
  ],
  showLangToggle = true,
  activeLang = 'vi',
  sticky = true,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState(activeLang);

  const getBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to right'}, ${bg.gradientFrom || '#1e3a8a'}, ${bg.gradientTo || '#1e40af'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || '#1432A0' };
  };

  return (
    <header
      className="admin-header"
      style={{
        ...getBg(),
        position: sticky ? 'sticky' : 'relative',
        top: 0,
        zIndex: 100,
        width: '100%',
      }}
    >
      <div
        className="admin-header-inner"
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '14px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Logo + tên CLB */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', background: '#fff' }} />
          ) : (
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              🪷
            </div>
          )}
          <div className="admin-header-clubname">
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: 1.3, letterSpacing: '0.02em' }}>
              {clubNameLine1}
            </div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: 1.3, letterSpacing: '0.02em' }}>
              {clubNameLine2}
            </div>
          </div>
        </a>

        {/* Menu desktop */}
        <nav className="admin-header-menu" style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'nowrap' }}>
          {menuItems.map((item, i) => (
            <a
              key={i}
              href={item.url || '#'}
              style={{ color: '#fff', fontSize: 14.5, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Toggle ngôn ngữ + nút mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          {showLangToggle && (
            <div
              style={{
                display: 'flex',
                background: '#F0B429',
                borderRadius: 20,
                padding: 3,
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              <button
                onClick={() => setLang('vi')}
                style={{
                  padding: '4px 10px',
                  borderRadius: 16,
                  border: 'none',
                  cursor: 'pointer',
                  background: lang === 'vi' ? '#0F2A6B' : 'transparent',
                  color: lang === 'vi' ? '#fff' : '#1e3a8a',
                }}
              >
                VN
              </button>
              <button
                onClick={() => setLang('en')}
                style={{
                  padding: '4px 10px',
                  borderRadius: 16,
                  border: 'none',
                  cursor: 'pointer',
                  background: lang === 'en' ? '#0F2A6B' : 'transparent',
                  color: lang === 'en' ? '#fff' : '#1e3a8a',
                }}
              >
                EN
              </button>
            </div>
          )}

          {/* Hamburger mobile */}
          <button
            className="admin-header-burger"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 4,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
            }}
            aria-label="Mở menu"
          >
            <span style={{ width: 22, height: 2, background: '#fff', display: 'block' }} />
            <span style={{ width: 22, height: 2, background: '#fff', display: 'block' }} />
            <span style={{ width: 22, height: 2, background: '#fff', display: 'block' }} />
          </button>
        </div>
      </div>

      {/* Menu mobile (dropdown) */}
      {mobileOpen && (
        <div
          className="admin-header-mobile-menu"
          style={{ background: '#0F2A6B', padding: '12px 24px', display: 'none', flexDirection: 'column', gap: 14 }}
        >
          {menuItems.map((item, i) => (
            <a key={i} href={item.url || '#'} style={{ color: '#fff', fontSize: 14, textDecoration: 'none' }}>
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          .admin-header-menu { display: none !important; }
          .admin-header-burger { display: flex !important; }
          .admin-header-mobile-menu.open { display: flex !important; }
        }
        @media (max-width: 1024px) {
          .admin-header-mobile-menu { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .admin-header-mobile-menu { display: none !important; }
        }
        @media (max-width: 480px) {
          .admin-header-inner { padding: 12px 16px !important; }
          .admin-header-clubname div { font-size: 10.5px !important; }
        }
      `}</style>
    </header>
  );
};

export default AdminHeader;