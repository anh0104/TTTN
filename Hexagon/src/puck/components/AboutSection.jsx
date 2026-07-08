import React from 'react'

export default function AboutSection({
  title = 'Về Hexagon',
  image = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  description = 'Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.',
  missionTitle = 'Sứ mệnh', missionText = 'Kiến tạo tương lai số bằng các giải pháp tiên tiến.',
  visionTitle = 'Tầm nhìn', visionText = 'Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.',
  valuesTitle = 'Giá trị cốt lõi', valuesText = 'Đổi mới - Đồng hành - Tiên phong - Minh bạch.',
  foundationTitle = 'Nền tảng', foundationText = 'Hệ sinh thái đa ngành, vững chắc và linh hoạt.',
  quote = '"Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^"',
  quoteAuthor = '— HEXAGON CULTURE',
} = {}) {
  const cards = [
    { title: missionTitle, text: missionText },
    { title: visionTitle, text: visionText },
    { title: valuesTitle, text: valuesText },
    { title: foundationTitle, text: foundationText },
  ]

  return (
    <section id="about" style={{ padding: '96px 0', background: '#f8fffe' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'linear-gradient(135deg,#D1FAE5,#A7F3D0)', borderRadius: 20, padding: 24, display: 'inline-block', width: '100%' }}>
              <img src={image} alt="Hexagon Office" style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 12, display: 'block' }}
                onError={e => { e.target.style.background = '#065F46'; e.target.style.minHeight = '360px' }} />
            </div>
            {/* Quote card */}
            <div style={{ position: 'absolute', bottom: 8, left: 32, background: '#fff', borderRadius: 12, padding: '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', maxWidth: 280 }}>
              <p style={{ color: '#1a1a1a', fontSize: 14, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 8 }}>{quote}</p>
              <p style={{ color: '#F59E0B', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>{quoteAuthor}</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 20 }}>{title}</h2>
            <p style={{ color: '#555', fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>{description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {cards.map((c, i) => (
                <div key={i} style={{ padding: '20px', background: '#fff', borderRadius: 12, border: '1px solid #E5F9EE', boxShadow: '0 2px 8px rgba(6,95,70,0.06)' }}>
                  <h4 style={{ color: '#065F46', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{c.title}</h4>
                  <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll up button */}
        <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 500 }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ width: 48, height: 48, borderRadius: '50%', background: '#F59E0B', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', boxShadow: '0 4px 16px rgba(245,158,11,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ↑
          </button>
        </div>
      </div>
    </section>
  )
}