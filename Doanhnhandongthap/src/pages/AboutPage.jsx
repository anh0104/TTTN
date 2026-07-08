import React from 'react';
import AdminHeader from '../components/admin-header.jsx';
import AdminPageHeroBanner from '../components/admin-page-hero-banner.jsx';
import AdminContentWithQuote from '../components/admin-content-with-quote.jsx';
import AdminStatsCardsWhite from '../components/admin-stats-cards-white.jsx';
import AdminFooter from '../components/admin-footer.jsx';

function AboutPage() {
  return (
    <>
      <AdminHeader />

      <AdminPageHeroBanner
        title="GIỚI THIỆU DOANH NHÂN ĐỒNG THÁP"
      />

      <AdminContentWithQuote
        image="https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=700&auto=format&fit=crop"
        heading="Kết nối – Đồng hành – Phát triển"
        paragraphs={[
          'Cộng đồng Doanh nhân Đồng Tháp hướng đến việc xây dựng môi trường kết nối giữa các doanh nghiệp, thúc đẩy hợp tác và tạo ra nhiều giá trị bền vững cho địa phương.',
          'Với tinh thần đổi mới, sáng tạo và phát triển lâu dài, cộng đồng doanh nhân luôn đóng vai trò quan trọng trong việc thúc đẩy kinh tế, hỗ trợ khởi nghiệp và nâng cao năng lực cạnh tranh.',
        ]}
        quoteMode="quote"
        quoteItems={[
          { label: 'Tầm nhìn:', text: 'Xây dựng mạng lưới doanh nhân năng động, hiện đại và hội nhập.' },
          { label: 'Sứ mệnh:', text: 'Kết nối doanh nghiệp – chia sẻ tri thức – tạo giá trị phát triển bền vững.' },
        ]}
      />

      <AdminStatsCardsWhite
        stats={[
          { number: '500+', label: 'Doanh nghiệp tham gia' },
          { number: '50+', label: 'Sự kiện kết nối mỗi năm' },
          { number: '100%', label: 'Hướng đến phát triển bền vững' },
        ]}
      />

      <AdminFooter />
    </>
  );
}

export default AboutPage;