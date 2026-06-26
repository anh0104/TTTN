import React from 'react';

const AdminStatsLotus = ({
  background = {},
  title = 'HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ',
  showLotusWatermark = true,
  stats = [
    { number: '500+', label: 'Hội viên là các doanh nghiệp và doanh nhân tiêu biểu tại TP.HCM' },
    { number: '20+', label: 'Năm hình thành và phát triển mạng lưới kết nối đồng hương' },
    { number: '1.000+', label: 'Cơ hội giao thương và kết nối đầu tư được khởi tạo mỗi năm' },
    { number: '100+', label: 'Chương trình thiện nguyện và hoạt động hướng về quê hương' },
  ],
}) => {
  const getBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || '180deg'}, ${bg.gradientFrom || '#1e3a8a'}, ${bg.gradientTo || '#090710'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || '#ede9fe' };
  };

  return (
    <section style={{ position: 'relative', padding: '64px 32px', overflow: 'hidden', ...getBg() }}>
      

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 900,
            color: '#4d4bea',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            margin: '0 0 48px',
          }}
        >
          {title}
        </h2>

        <div
          className="admin-stats-row"
          style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ flex: '1 1 220px', textAlign: 'center', minWidth: 180 }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: '#100808', marginBottom: 12 }}>{s.number}</div>
              <p style={{ fontSize: 13.5, color: 'rgba(16, 8, 8, 0.85)', lineHeight: 1.6, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-stats-row { gap: 32px !important; }
        }
      `}</style>
    </section>
  );
};

export default AdminStatsLotus;