import React from 'react';

/**
 * AdminNewsGridSmall
 * Biến thể tin tức 3 cột nhỏ hơn, có nút mũi tên tròn ở góc dưới phải mỗi card
 * (thay vì chữ "Xem chi tiết →"). Dùng cho khu vực hoạt động/sự kiện thứ 2
 * trên trang chủ, dưới phần "Giá trị khi tham gia cộng đồng".
 *
 * Props:
 *  - background : { type, color, gradientFrom, gradientTo, gradientDirection, imageUrl }
 *  - articles   : [{ image, date, title, excerpt, url }]
 */
const AdminNewsGridSmall = ({
  background = {},
  articles = [
    {
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop',
      date: '10/03/2026',
      title: 'Lan tỏa yêu thương thiện nguyện',
      excerpt: 'Các thành viên đã cùng chung tay tổ chức hoạt động trao tặng...',
      url: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop',
      date: '23/02/2026',
      title: 'Hợp tác giữa các doanh nghiệp',
      excerpt: 'Định hướng phát triển tương lai là mở rộng quan hệ hợp tác giữa các...',
      url: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&auto=format&fit=crop',
      date: '23/02/2026',
      title: 'Đẩy mạnh chuyển đổi số ...',
      excerpt: 'Sự phát triển hệ thống chuyển đổi đồng bộ nhằm tối ưu hóa...',
      url: '#',
    },
  ],
}) => {
  const getBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || '145deg'}, ${bg.gradientFrom || '#ede9fe'}, ${bg.gradientTo || '#dbeafe'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || '#ede9fe' };
  };

  return (
    <section style={{ padding: '40px 32px 64px', ...getBg() }}>
      <div className="admin-news-small-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {articles.map((a, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ height: 200, overflow: 'hidden' }}>
              <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: 20, position: 'relative' }}>
              <div style={{ fontSize: 12.5, color: '#64748b', marginBottom: 8 }}>{a.date}</div>
              <h3 style={{ fontSize: 15.5, fontWeight: 800, color: '#1A2B50', margin: '0 0 8px', lineHeight: 1.4 }}>
                {a.title}
              </h3>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: '0 0 8px', paddingRight: 40 }}>
                {a.excerpt}
              </p>

              {/* Nút mũi tên tròn góc dưới phải */}
              <a
                href={a.url || '#'}
                style={{
                  position: 'absolute', right: 18, bottom: 18,
                  width: 38, height: 38, borderRadius: '50%',
                  background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', color: '#1e3a8a', fontSize: 16,
                }}
                aria-label="Xem chi tiết"
              >
                →
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-news-small-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .admin-news-small-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default AdminNewsGridSmall;