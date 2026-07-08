import React, { useState } from 'react'

export default function ProductDetail({
  breadcrumbBg = 'https://metik.vn/wp-content/uploads/2024/09/snack-vi-bbq.jpg',
  name = 'Snack vị BBQ',
  image = 'https://metik.vn/wp-content/uploads/2024/09/snack-vi-bbq.jpg',
  image2 = 'https://metik.vn/wp-content/uploads/2024/09/snack-vi-bbq-2.jpg',
  category = 'Các sản phẩm bánh METIK',
  description = 'Snack METIK vị BBQ là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM, mang đến trải nghiệm ăn vặt tuyệt vời. Sản phẩm sử dụng gia vị thịt nướng, lấy cảm hứng từ phong cách BBQ quen thuộc.',
  details = [
    { bold: 'Hương vị BBQ đậm đà, kết cấu giòn', text: 'Snack có mùi thơm rõ của gia vị BBQ, vị mặn ngọt hài hòa, xen lẫn hậu vị khói nhẹ, mang đến hương vị hấp dẫn khi ăn.' },
    { bold: 'Công thức được nghiên cứu bài bản, sản xuất trên dây chuyền hiện đại', text: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D, được sản xuất trên hệ thống máy móc chuyên nghiệp, đảm bảo độ ổn định và chất lượng đồng đều.' },
    { bold: 'Đa dạng hình thức chế biến, phù hợp nhiều thị trường', text: 'Snack vị BBQ OCHAO có thể phát triển dạng phôi bánh, dòng chiên và không chiên, linh hoạt theo nhu cầu thị trường và định hướng sản phẩm của từng đối tác. Sản phẩm bổ sung xơ, có dán nhãn "source of fiber".' },
  ],
  related = [
    { name: 'Snack vị Bắp', slug: 'snack-vi-bap', image: 'https://metik.vn/wp-content/uploads/2024/09/snack-vi-bap.jpg' },
    { name: 'Snack vị Phô mai', slug: 'snack-vi-pho-mai', image: 'https://metik.vn/wp-content/uploads/2024/09/snack-vi-pho-mai.jpg' },
    { name: 'Snack vị Tảo biển', slug: 'snack-vi-tao-bien', image: 'https://metik.vn/wp-content/uploads/2024/09/snack-vi-tao-bien.jpg' },
  ],
}) {
  const [mainImg, setMainImg] = useState(image)
  const fallback = 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&q=80'
  const relFallbacks = [
    'https://images.unsplash.com/photo-1608068811980-85bbc6cd5b9b?w=400&q=80',
    'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&q=80',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80',
  ]

  return (
    <div style={{ background: '#fff' }}>
      {/* Breadcrumb banner */}
      <div style={{ position: 'relative', height: 100, overflow: 'hidden', background: '#333' }}>
        <img src={breadcrumbBg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          onError={e => e.target.style.display = 'none'} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', maxWidth: 1280, margin: '0 auto', left: 0, right: 0 }}>
          <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>
            <a href="/" style={{ color: '#ccc', textDecoration: 'none' }}>TRANG CHỦ</a>
            <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
            <a href="/san-pham" style={{ color: '#ccc', textDecoration: 'none' }}>SẢN PHẨM</a>
            <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
            <span style={{ color: '#fff' }}>CÁC SẢN PHẨM BÁNH METIK</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>‹</button>
            <button style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>›</button>
          </div>
        </div>
      </div>

      {/* Product detail */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          {/* Images */}
          <div>
            <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 12, cursor: 'zoom-in', position: 'relative' }}>
              <img src={mainImg} alt={name} style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block', borderRadius: 12 }}
                onError={e => e.target.src = fallback} />
              <div style={{ position: 'absolute', bottom: 12, left: 12, width: 28, height: 28, borderRadius: '50%', border: '1px solid #ccc', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14 }}>⛶</div>
            </div>
            {image2 && (
              <div style={{ display: 'flex', gap: 10 }}>
                {[image, image2].map((img, i) => (
                  <img key={i} src={img} alt="" onClick={() => setMainImg(img)}
                    style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6, cursor: 'pointer', border: mainImg === img ? '2px solid #F5A800' : '2px solid #eee' }}
                    onError={e => e.target.src = fallback} />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#222', marginBottom: 12 }}>{name}</h1>
            <div style={{ width: 40, height: 3, background: '#ddd', marginBottom: 20, borderRadius: 2 }} />
            <p style={{ color: '#555', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>{description}</p>
            <div style={{ marginBottom: 20 }}>
              <span style={{ color: '#666', fontSize: 14 }}>Danh mục: </span>
              <a href="/san-pham" style={{ color: '#2E7D32', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>{category}</a>
            </div>
            {/* Social share */}
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: 16 }}>f</a>
              <a href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: '#0077B5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>in</a>
            </div>
          </div>
        </div>

        {/* Chi tiết sản phẩm */}
        <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid #eee' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 60, height: 3, background: '#F5A800', margin: '0 auto 10px', borderRadius: 2 }} />
            <h2 style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', color: '#333', letterSpacing: '0.08em' }}>CHI TIẾT SẢN PHẨM</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {details.map((d, i) => (
              <p key={i} style={{ color: '#444', fontSize: 15, lineHeight: 1.8 }}>
                <strong>{d.bold}:</strong> {d.text}
              </p>
            ))}
          </div>
        </div>

        {/* Related products */}
        <div style={{ marginTop: 56 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#222', marginBottom: 24 }}>SẢN PHẨM LIÊN QUAN</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {related.map((r, i) => (
              <a key={i} href={`/san-pham/${r.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #eee', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  <img src={r.image} alt={r.name} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
                    onError={e => e.target.src = relFallbacks[i % relFallbacks.length]} />
                  <div style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{ color: '#E07820', fontWeight: 700, fontSize: 15 }}>{r.name}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
