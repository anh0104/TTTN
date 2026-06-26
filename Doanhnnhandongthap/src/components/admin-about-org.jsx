import React, { useState } from 'react';

const AdminAboutOrg = ({
  background = {},
  aboutTitle = 'VỀ CÂU LẠC BỘ',
  aboutParagraphs = [
    'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh.',
    'Với tinh thần kết nối – đồng hành – sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.',
  ],
  
  aboutImage = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop',
  orgTitle = 'CƠ CẤU TỔ CHỨC',
  members = [
    { avatar: 'https://randomuser.me/api/portraits/men/32.jpg',   name: 'Trần Văn Khang',  clbRole: 'Ủy viên BCH',   bizRole: 'Tổng Giám đốc',    company: 'Công ty CP Logistics Đồng Tháp' },
    { avatar: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Đỗ Thu Trang',    clbRole: 'Thủ quỹ CLB',  bizRole: 'Giám đốc Tài chính', company: 'Công ty TNHH Sen Việt' },
    { avatar: 'https://randomuser.me/api/portraits/women/65.jpg', name: 'Vũ Hoàng Long',   clbRole: 'Ủy viên BCH',   bizRole: 'Giám đốc Điều hành', company: 'Công ty Công nghệ số Mekong' },
    { avatar: 'https://randomuser.me/api/portraits/men/54.jpg',   name: 'Nguyễn Minh Tuấn',clbRole: 'Phó Chủ tịch', bizRole: 'Chủ tịch HĐQT',     company: 'Tập đoàn Đất Sen Xanh' },
    { avatar: 'https://randomuser.me/api/portraits/women/22.jpg', name: 'Lê Thị Hoa',      clbRole: 'Thư ký CLB',   bizRole: 'Giám đốc Marketing',  company: 'Công ty Sen Hồng Media' },
  ],
  membersPerPage = 3,
}) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(members.length / membersPerPage);
  const visible = members.slice(page * membersPerPage, page * membersPerPage + membersPerPage);

  // Nền section
  const getBg = () => {
    const bg = background || {};
    if (bg.type === 'gradient') {
      return { background: `linear-gradient(${bg.gradientDirection || '135deg'}, ${bg.gradientFrom || '#e8eeff'}, ${bg.gradientTo || '#f3e8ff'})` };
    }
    if (bg.type === 'image' && bg.imageUrl) {
      return { backgroundImage: `url('${bg.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: bg.color || '#f0edfb' };
  };

  return (
    <section style={{ ...getBg(), padding: '64px 32px' }}>
      <div
        className="admin-about-org-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, maxWidth: 1200, margin: '0 auto' }}
      >

        {/* LEFT — Về CLB */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1e293b', letterSpacing: 1, marginBottom: 4 }}>
            {aboutTitle}
          </h2>
          <div>
            {aboutParagraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 14, color: '#475569', lineHeight: 1.75, marginBottom: 12 }}>{p}</p>
            ))}
          </div>
          {/* Ảnh minh họa */}
          {aboutImage && (
            <div style={{ borderRadius: 14, overflow: 'hidden', marginTop: 'auto' }}>
              <img src={aboutImage} alt="Về CLB" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
            </div>
          )}
        </div>

        {/* RIGHT — Cơ cấu tổ chức */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1e293b', letterSpacing: 1, marginBottom: 24 }}>
            {orgTitle}
          </h2>

          {/* Member list — có viền ngăn cách giữa từng người, đúng thiết kế gốc */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {visible.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '18px 0',
                  borderBottom: i < visible.length - 1 ? '1px solid #e8eaf0' : 'none',
                }}
              >
                <img
                  src={m.avatar || 'https://via.placeholder.com/72'}
                  alt={m.name}
                  style={{ width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid #e2e8f0' }}
                />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 3 }}>
                    Họ tên: {m.name}
                  </p>
                  <p style={{ fontSize: 13, color: '#475569', marginBottom: 2 }}>
                    <strong>Chức vụ CLB:</strong> {m.clbRole}
                  </p>
                  <p style={{ fontSize: 13, color: '#475569', marginBottom: 2 }}>
                    <strong>Chức vụ Doanh nghiệp:</strong> {m.bizRole}
                  </p>
                  <p style={{ fontSize: 13, color: '#475569' }}>
                    <strong>Doanh nghiệp:</strong> {m.company}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots + arrows */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, marginTop: 28 }}>
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                style={{
                  width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #cbd5e1',
                  background: page === 0 ? '#f8fafc' : '#fff', cursor: page === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#64748b',
                }}
              >‹</button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => setPage(i)}
                  style={{
                    width: i === page ? 28 : 8, height: 8, borderRadius: 4,
                    background: i === page ? '#3b82f6' : '#cbd5e1', cursor: 'pointer',
                    transition: 'width .25s, background .25s',
                  }}
                />
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                style={{
                  width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #cbd5e1',
                  background: page === totalPages - 1 ? '#f8fafc' : '#fff',
                  cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#64748b',
                }}
              >›</button>
            </div>
          )}
        </div>

      </div>

      {/* Responsive: dưới 768px chuyển 2 cột thành 1 cột xếp dọc */}
      <style>{`
        @media (max-width: 768px) {
          .admin-about-org-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AdminAboutOrg;