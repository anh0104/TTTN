import React from 'react'

export default function AboutMetik({
  sectionTitle = 'GIỚI THIỆU VỀ METIK',
  intro = 'metik là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nhịp sống hiện đại.',
  image1 = 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&q=80',
  text1 = 'Ra đời từ nền tảng sản xuất bánh kẹo của OCHAO, METIK kế thừa hệ thống nhà máy hiện đại, quy trình sản xuất khép kín và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt.',
  bullets,
  image2 = 'https://images.unsplash.com/photo-1565793949368-c0c27272b394?w=600&q=80',
  image3 = 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600&q=80',
  text2 = 'Với hương vị hấp dẫn, phong cách trẻ trung và tinh thần vui nhộn, METIK hướng đến hình ảnh một thương hiệu snack năng động, gần gũi và dễ tạo thiện cảm với người tiêu dùng Việt Nam.',
} = {}) {
  const safeBullets = Array.isArray(bullets)
    ? bullets.map(b => typeof b === 'string' ? b : (b?.text || ''))
    : ['Sử dụng nguyên liệu có nguồn gốc rõ ràng.', 'Quy trình sản xuất hiện đại, khép kín.', 'Kiểm soát chất lượng chặt chẽ trong từng công đoạn.']

  return (
    <section style={{ background: '#FDFAF4', padding: '64px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#2E7D32', fontSize: 22, fontWeight: 800, textTransform: 'uppercase', display: 'inline-block' }}>
            {sectionTitle}
            <div style={{ height: 4, background: '#F5C518', marginTop: 4, borderRadius: 2 }} />
          </h2>
        </div>
        <p style={{ color: '#444', fontSize: 16, lineHeight: 1.85, marginBottom: 48 }}>{intro}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: 56 }}>
          <div style={{ borderRadius: 16, overflow: 'hidden' }}>
            <img src={image1} alt="" style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block', borderRadius: 16 }}
              onError={e => e.target.style.opacity = 0.3} />
          </div>
          <p style={{ color: '#444', fontSize: 16, lineHeight: 1.9 }}>{text1}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: 56 }}>
          <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {safeBullets.map((b, i) => <li key={i} style={{ color: '#444', fontSize: 15, lineHeight: 1.75 }}>{b}</li>)}
          </ul>
          <div style={{ borderRadius: 16, overflow: 'hidden' }}>
            <img src={image2} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block', borderRadius: 16 }}
              onError={e => e.target.style.opacity = 0.3} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div style={{ borderRadius: 16, overflow: 'hidden' }}>
            <img src={image3} alt="" style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block', borderRadius: 16 }}
              onError={e => e.target.style.opacity = 0.3} />
          </div>
          <p style={{ color: '#444', fontSize: 16, lineHeight: 1.9 }}>{text2}</p>
        </div>
      </div>
    </section>
  )
}
