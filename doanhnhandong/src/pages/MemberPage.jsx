import React from 'react';
import AdminHeader from '../components/admin-header.jsx';
import AdminPageHeroBanner from '../components/admin-page-hero-banner.jsx';
import AdminContentWithQuote from '../components/admin-content-with-quote.jsx';
import AdminStatsCardsWhite from '../components/admin-stats-cards-white.jsx';
import AdminFooter from '../components/admin-footer.jsx';

/**
 * MemberPage
 * Trang "Hội viên" — khớp https://demo.doanhnhandongthap.vn/hoi-vien
 *
 * Thứ tự: Header → Banner tiêu đề → Ảnh + Danh sách quyền lợi hội viên
 *  → Số liệu card trắng (4 card) → Footer
 */
function MemberPage() {
  return (
    <>
      <AdminHeader />

      <AdminPageHeroBanner
        title="HỘI VIÊN"
      />

      <AdminContentWithQuote
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop"
        heading="Cộng đồng doanh nhân cùng phát triển"
        paragraphs={[
          'Hội viên là lực lượng nòng cốt tạo nên sự kết nối, chia sẻ và phát triển trong cộng đồng doanh nghiệp Đồng Tháp.',
          'Việc tham gia hội viên mở ra cơ hội mở rộng mạng lưới, trao đổi kinh nghiệm, tiếp cận chương trình hỗ trợ và đồng hành trong các hoạt động xúc tiến thương mại.',
        ]}
        quoteMode="list"
        listTitle="Quyền lợi hội viên"
        listItems={[
          'Tham gia các chương trình kết nối doanh nghiệp',
          'Tiếp cận hoạt động đào tạo và hội thảo chuyên đề',
          'Nhận thông tin thị trường và cơ hội hợp tác',
          'Tham gia các hoạt động cộng đồng doanh nhân',
          'Đồng hành cùng các chương trình phát triển địa phương',
        ]}
      />

      <AdminStatsCardsWhite
        stats={[
          { number: '800+', label: 'Hội viên' },
          { number: '120+', label: 'Đối tác' },
          { number: '40+', label: 'Sự kiện / năm' },
          { number: '12', label: 'Nhóm kết nối' },
        ]}
      />

      <AdminFooter />
    </>
  );
}

export default MemberPage;