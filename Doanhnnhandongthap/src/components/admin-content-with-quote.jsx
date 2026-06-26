import React from 'react';


const AdminContentWithQuote = ({
  background = {},
  image = 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=700&auto=format&fit=crop',
  imageBorderRadius = 16,
  heading = 'Kết nối – Đồng hành – Phát triển',
  paragraphs = [
    'Cộng đồng Doanh nhân Đồng Tháp hướng đến việc xây dựng môi trường kết nối giữa các doanh nghiệp, thúc đẩy hợp tác và tạo ra nhiều giá trị bền vững cho địa phương.',
    'Với tinh thần đổi mới, sáng tạo và phát triển lâu dài, cộng đồng doanh nhân luôn đóng vai trò quan trọng trong việc thúc đẩy kinh tế, hỗ trợ khởi nghiệp và nâng cao năng lực cạnh tranh.',
  ],
  quoteMode = 'quote',
  quoteItems = [
    { label: 'Tầm nhìn:', text: 'Xây dựng mạng lưới doanh nhân năng động, hiện đại và hội nhập.' },
    { label: 'Sứ mệnh:', text: 'Kết nối doanh nghiệp – chia sẻ tri thức – tạo giá trị phát triển bền vững.' },
  ],
  listTitle = 'Quyền lợi hội viên',
  listItems = [
    'Tham gia các chương trình kết nối doanh nghiệp',
    'Tiếp cận hoạt động đào tạo và hội thảo chuyên đề',
    'Nhận thông tin thị trường và cơ hội hợp tác',
    'Tham gia các hoạt động cộng đồng doanh nhân',
    'Đồng hành cùng các chương trình phát triển địa phương',
  ],
  quoteBorderColor = '#F0B429',
}) => {
  const getBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || 'to right'}, ${bg.gradientFrom || '#ffffff'}, ${bg.gradientTo || '#ffffff'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || '#ffffff' };
  };

  return (
    <section style={{ padding: '24px 32px 56px', ...getBg() }}>
      <div className="admin-content-quote-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 48, alignItems: 'start' }}>
        {/* Ảnh bên trái */}
        <div style={{ borderRadius: imageBorderRadius, overflow: 'hidden' }}>
          <img src={image} alt={heading} style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }} />
        </div>

        {/* Nội dung bên phải */}
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1A2B50', margin: '0 0 18px' }}>{heading}</h2>

          {paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.8, margin: '0 0 16px' }}>
              {p}
            </p>
          ))}

          {quoteMode === 'quote' ? (
            <div
              style={{
                background: '#f8fafc',
                borderLeft: `4px solid ${quoteBorderColor}`,
                borderRadius: '0 12px 12px 0',
                padding: '20px 24px',
                marginTop: 8,
              }}
            >
              {quoteItems.map((q, i) => (
                <p key={i} style={{ fontSize: 14.5, color: '#1A2B50', lineHeight: 1.8, margin: i === 0 ? '0 0 12px' : 0 }}>
                  <strong>{q.label}</strong> {q.text}
                </p>
              ))}
            </div>
          ) : (
            <div
              style={{
                background: '#f8fafc',
                borderRadius: 14,
                padding: '24px 28px',
                marginTop: 8,
              }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1A2B50', margin: '0 0 16px' }}>{listTitle}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {listItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: quoteBorderColor, fontWeight: 800, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-content-quote-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default AdminContentWithQuote;