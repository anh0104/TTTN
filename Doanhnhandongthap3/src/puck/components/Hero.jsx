import React from 'react'

export default function Hero({
  eyebrow = 'LAN TỎA GIÁ TRỊ ĐẤT',
  title = 'Sen Hồng',
  description = 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác – Đổi mới – Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.',
  buttonText = 'Tham gia cộng đồng',
  buttonLink = '/hoi-vien',
  backgroundImage = 'https://webdemo.hexagon.xyz/medias/hieuunghero.webp',
}) {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* BG */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '80px 32px', width: '100%' }}>
        {/* Glassmorphism card */}
        <div style={{
          maxWidth: 500,
          maxHeight:330,
          marginTop: '90px',   // xuống dưới
          marginLeft: '40px',   // sang trái thêm chút (có thể bỏ nếu không cần)
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '10px 110px 10px 110px',
          border: '1px solid rgba(255,255,255,0.25)',
          padding: '48px 44px 52px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          textAlign: 'left', 
        }}>
          {/* Eyebrow */}
          <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', marginBottom: 14, textTransform: 'uppercase' }}>
            {eyebrow}
          </div>

          {/* Big title */}
          <h1
            style={{
            fontSize: 'clamp(52px,7vw,90px)',
            fontWeight: 800,
            color: '#FFD875',
            lineHeight: 1.15,
            marginTop: 10,
            marginBottom: 10,
            fontFamily: "'Playfair Display', serif",

            whiteSpace: 'normal',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
            }}
          >
          {title}
          </h1>

          {/* Description */}
          <p style={{ color: 'rgba(255,255,255,0.88)',  fontSize: 15, lineHeight: 1.75, marginBottom: 30 }}>
            {description}
          </p>

          {/* CTA */}
         <div
          style={{
          display: "flex",
          justifyContent: "center",
          }}
        >
        <a
          href={buttonLink}
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #1a8fe3, #0a6dc7)",
            color: "#fff",
            padding: "14px 36px",
            borderRadius: '0 30px 0 30px',
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 15,
            boxShadow: "0 4px 16px rgba(26,143,227,0.4)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-2px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "none")
          }
        >
        {buttonText}
        </a>
        </div>
        </div>
      </div>
    </section>
  )
}