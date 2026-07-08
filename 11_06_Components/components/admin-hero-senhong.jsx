import React from 'react';

const AdminHeroSenHong = ({
  background = {},
  eyebrow = 'LAN TỎA GIÁ TRỊ ĐẤT',
  title = 'Sen Hồng',
  titleColor = '#F5C518',
  titleSize = 62,
  description = 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác – Đổi mới – Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.',
  descColor = '#ffffff',
  cardPosition = 'left',
  cardBorderRadius = 28,
  cardOpacity = 0.18,
  buttons = [
    { text: 'Tham gia cộng đồng', url: '#', bgColor: '#2563eb', textColor: '#ffffff', borderRadius: 8, fontSize: 15 },
  ],
}) => {
  /* ── Nền section ── */
  const getSectionBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return {
        background: `linear-gradient(${bg.gradientDirection || '160deg'}, ${bg.gradientFrom || '#5BB8F5'}, ${bg.gradientTo || '#87CEEB'})`,
      };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    /* default: xanh biển nhạt đúng thiết kế gốc */
    return {
      background: 'linear-gradient(160deg, #5BB8F5 0%, #7EC8E3 40%, #A8D8EA 70%, #C5E8F0 100%)',
    };
  };

  /* ── Vị trí card ── */
  const flexAlignMap = { left: 'flex-start', center: 'center', right: 'flex-end' };
  const flexAlign = flexAlignMap[cardPosition] || 'flex-start';

  return (
    <section
      style={{
        position: 'relative',
        minHeight: 540,
        display: 'flex',
        alignItems: 'center',
        padding: '64px 6vw',
        overflow: 'hidden',
        ...getSectionBg(),
      }}
    >
      {/* ── Dải lụa holographic SVG (hồng-tím-xanh, chạy ngang) ── */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        viewBox="0 0 1440 540"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silk1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#E8A0BF" stopOpacity="0.55" />
            <stop offset="35%"  stopColor="#C084D4" stopOpacity="0.45" />
            <stop offset="65%"  stopColor="#818CF8" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.30" />
          </linearGradient>
          <linearGradient id="silk2" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%"   stopColor="#F0ABFC" stopOpacity="0.40" />
            <stop offset="50%"  stopColor="#A78BFA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="silk3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%"   stopColor="#FCA5A5" stopOpacity="0.20" />
            <stop offset="50%"  stopColor="#F0ABFC" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.20" />
          </linearGradient>
          {/* ánh sáng lóe góc phải */}
          <radialGradient id="glow" cx="85%" cy="40%" r="40%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"   />
          </radialGradient>
        </defs>

        {/* Dải lụa 1 — uốn lớn */}
        <path
          d="M 600 -80 C 750 80 900 40 1100 180 C 1250 290 1350 200 1500 280 L 1500 400 C 1350 330 1200 420 1050 320 C 880 200 730 270 580 100 Z"
          fill="url(#silk1)"
        />
        {/* Dải lụa 2 — nhỏ hơn, chéo nhẹ */}
        <path
          d="M 700 -20 C 820 120 970 60 1150 200 C 1280 300 1380 240 1500 310 L 1500 380 C 1380 310 1260 370 1130 280 C 940 140 800 220 680 80 Z"
          fill="url(#silk2)"
        />
        {/* Dải lụa 3 — viền mỏng */}
        <path
          d="M 550 40 C 700 160 900 90 1120 230 C 1270 330 1380 260 1500 330 L 1500 360 C 1370 290 1260 360 1110 260 C 880 120 680 200 540 80 Z"
          fill="url(#silk3)"
        />
        {/* Ánh sáng lóe */}
        <ellipse cx="1230" cy="220" rx="240" ry="160" fill="url(#glow)" />
      </svg>

      {/* ── Nội dung (card glassmorphism) ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: flexAlign,
        }}
      >
        <div
          style={{
            background: `rgba(255,255,255,${cardOpacity})`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: cardBorderRadius,
            padding: '44px 48px',
            maxWidth: 500,
            border: '1px solid rgba(255,255,255,0.35)',
            boxShadow: '0 4px 40px rgba(80,120,200,0.10)',
          }}
        >
          {/* Eyebrow */}
          {eyebrow && (
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.82)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 10,
                margin: '0 0 10px',
              }}
            >
              {eyebrow}
            </p>
          )}

          {/* Title */}
          <h1
            style={{
              fontSize: titleSize,
              fontWeight: 900,
              color: titleColor,
              lineHeight: 1.05,
              margin: '0 0 18px',
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 14,
              color: descColor,
              lineHeight: 1.75,
              margin: '0 0 32px',
              opacity: 0.92,
            }}
          >
            {description}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {buttons.map((btn, i) => (
              <a
                key={i}
                href={btn.url || '#'}
                style={{
                  display: 'inline-block',
                  padding: '11px 28px',
                  background: btn.bgColor || '#2563eb',
                  color: btn.textColor || '#fff',
                  borderRadius: btn.borderRadius ?? 8,
                  fontSize: btn.fontSize || 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                {btn.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminHeroSenHong;