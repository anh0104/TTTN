import React from 'react';


const AdminStatsCardsWhite = ({
  background = {},
  stats = [
    { number: '500+', label: 'Doanh nghiệp tham gia' },
    { number: '50+', label: 'Sự kiện kết nối mỗi năm' },
    { number: '100%', label: 'Hướng đến phát triển bền vững' },
  ],
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
    <section style={{ padding: '0 32px 56px', ...getBg() }}>
      <div
        className="admin-stats-white-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
          gap: 20,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: '#f8fafc',
              borderRadius: 14,
              padding: '32px 20px',
              textAlign: 'center',
              border: '1px solid #eef2f7',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 900, color: '#1A2B50', marginBottom: 10 }}>{s.number}</div>
            <p style={{ fontSize: 13.5, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-stats-white-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .admin-stats-white-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default AdminStatsCardsWhite;