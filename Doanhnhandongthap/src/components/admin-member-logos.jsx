const AdminMemberLogos = ({
  background = {},
  title = 'HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
  logos = [
    { imageUrl: '', name: 'Hội viên 1' },
    { imageUrl: '', name: 'Hội viên 2' },
    { imageUrl: '', name: 'HappyFood' },
    { imageUrl: '', name: 'Ecobook' },
    { imageUrl: '', name: 'Comoon' },
    { imageUrl: '', name: 'Hội viên 6' },
  ],
  speed = 30,
  pauseOnHover = true,
}) => {
  const getBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to bottom'}, ${bg.gradientFrom || '#dbeafe'}, ${bg.gradientTo || '#eff6ff'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || 'transparent' };
  };

  // Nhân đôi danh sách để vòng lặp marquee liền mạch, không bị "giật" khi quay lại đầu
  const loopedLogos = [...logos, ...logos];

  const LogoCard = ({ logo }) => (
    <div
      style={{
        flex: '0 0 auto',
        width: 180,
        height: 110,
        background: '#fff',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        marginRight: 16,
      }}
    >
      {logo.imageUrl ? (
        <img src={logo.imageUrl} alt={logo.name} style={{ maxWidth: 100, maxHeight: 50, objectFit: 'contain' }} />
      ) : (
        <div style={{ fontSize: 28, opacity: 0.3 }}>🏢</div>
      )}
      <span style={{ fontSize: 11, fontWeight: 700, color: '#1e3a8a' }}>{logo.name}</span>
    </div>
  );

  return (
    <section style={{ padding: '40px 0', ...getBg() }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: '#1A2B50',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            margin: '0 0 24px',
          }}
        >
          {title}
        </h2>
      </div>

      {/* Vùng chạy marquee — overflow hidden để che phần logo nhân đôi */}
      <div className="admin-logos-marquee-wrap" style={{ overflow: 'hidden', width: '100%' }}>
        <div
          className={`admin-logos-marquee-track ${pauseOnHover ? 'admin-logos-pausable' : ''}`}
          style={{
            display: 'flex',
            width: 'max-content',
            animation: `admin-logos-scroll ${speed}s linear infinite`,
          }}
        >
          {loopedLogos.map((logo, i) => (
            <LogoCard key={i} logo={logo} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes admin-logos-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .admin-logos-pausable:hover {
          animation-play-state: paused;
        }
        @media (max-width: 640px) {
          .admin-logos-marquee-track { animation-duration: ${speed * 0.6}s !important; }
        }
      `}</style>
    </section>
  );
};

export default AdminMemberLogos;