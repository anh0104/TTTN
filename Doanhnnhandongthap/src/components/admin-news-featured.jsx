import React from 'react';


const AdminNewsFeatured = ({
  background = {},
  sectionTitle = 'TIN TỨC & SỰ KIỆN',
  viewMoreText = 'Xem thêm →',
  viewMoreUrl = '#',
  articles = [
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&auto=format&fit=crop',
      date: '20/03/2026',
      badge: 'Mới nhất',
      title: 'Hội thảo kết nối doanh nghiệp chia sẻ xu hướng phát triển',
      excerpt: 'Sự kiện quy tụ nhiều chuyên gia và doanh nhân, cùng thảo luận về chiến lược phát triển, chuyển đổi số và cơ hội hợp tác trong thời đại mới.',
      url: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&auto=format&fit=crop',
      date: '20/03/2026',
      badge: 'Mới nhất',
      title: 'Kết nối và chia sẻ niềm vui là cách phát triển sự hiệu quả...',
      excerpt: 'Khi chúng ta làm việc với một trái tim mở lòng và tinh thần sẻ chia, áp lực sẽ biến thành động lực, và khó khăn sẽ trở thành trải nghiệm.',
      url: '#',
    },
  ],
}) => {
  const getBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || '145deg'}, ${bg.gradientFrom || '#ede9fe'}, ${bg.gradientTo || '#f5f3ff'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || '#ede9fe' };
  };

  return (
    <section style={{ padding: '56px 32px', ...getBg() }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1A2B50', margin: 0, letterSpacing: '0.02em' }}>
            {sectionTitle}
          </h2>
          <a href={viewMoreUrl} style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {viewMoreText}
          </a>
        </div>

        {/* Grid 2 cột */}
        <div className="admin-news-featured-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          {articles.map((a, i) => (
            <a
              key={i}
              href={a.url || '#'}
              style={{
                display: 'block', background: '#fff', borderRadius: 16, overflow: 'hidden',
                textDecoration: 'none', color: 'inherit', boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                {a.badge && (
                  <span
                    style={{
                      position: 'absolute', top: 16, right: 16,
                      background: '#F0B429', color: '#1A2B50',
                      fontSize: 12, fontWeight: 800, padding: '5px 14px', borderRadius: 20,
                    }}
                  >
                    {a.badge}
                  </span>
                )}
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10 }}>{a.date}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1A2B50', margin: '0 0 12px', lineHeight: 1.4 }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: 0 }}>{a.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-news-featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default AdminNewsFeatured;