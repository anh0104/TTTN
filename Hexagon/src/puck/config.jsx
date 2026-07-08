import React from 'react'
import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import NewsSection from './components/NewsSection.jsx'
import PartnersSection from './components/PartnersSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'
import NewsListPage from './components/NewsListPage.jsx'

export const puckConfig = {
  components: {
    Header: {
      label: '🔝 Header – Điều hướng',
      fields: { lang: { type: 'radio', label: 'Ngôn ngữ', options: [{ label: 'Tiếng Việt', value: 'vi' }, { label: 'English', value: 'en' }] } },
      defaultProps: { lang: 'vi' },
      render: (props) => <Header {...props} />,
    },
    HeroSection: {
      label: '🌍 Hero – Banner chính',
      fields: {
        title: { type: 'text', label: 'Dòng tiêu đề 1' },
        brandName: { type: 'text', label: 'Tên thương hiệu (màu xanh)' },
        subtitle: { type: 'text', label: 'Dòng tiêu đề 3' },
        description: { type: 'textarea', label: 'Mô tả' },
        btn1: { type: 'text', label: 'Nút 1' },
        btn2: { type: 'text', label: 'Nút 2' },
        scrollText: { type: 'text', label: 'Text scroll xuống' },
        backgroundImage: { type: 'text', label: 'URL ảnh nền (để trống = gradient xanh)' },
      },
      defaultProps: {
        title: 'Thi công & lắp đặt', brandName: 'HEXAGON', subtitle: 'Solutions',
        description: 'HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.',
        btn1: 'Khám phá Dịch vụ', btn2: 'Liên hệ Tư vấn', scrollText: 'Cuộn xuống để khám phá', backgroundImage: '',
      },
      render: (props) => <HeroSection {...props} />,
    },
    AboutSection: {
      label: '🏢 Về Hexagon',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        image: { type: 'text', label: 'URL ảnh' },
        description: { type: 'textarea', label: 'Mô tả' },
        missionTitle: { type: 'text', label: 'Tiêu đề Sứ mệnh' }, missionText: { type: 'textarea', label: 'Nội dung Sứ mệnh' },
        visionTitle: { type: 'text', label: 'Tiêu đề Tầm nhìn' }, visionText: { type: 'textarea', label: 'Nội dung Tầm nhìn' },
        valuesTitle: { type: 'text', label: 'Tiêu đề Giá trị' }, valuesText: { type: 'textarea', label: 'Nội dung Giá trị' },
        foundationTitle: { type: 'text', label: 'Tiêu đề Nền tảng' }, foundationText: { type: 'textarea', label: 'Nội dung Nền tảng' },
        quote: { type: 'text', label: 'Quote' }, quoteAuthor: { type: 'text', label: 'Tác giả quote' },
      },
      defaultProps: {
        title: 'Về Hexagon', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
        description: 'Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số.',
        missionTitle: 'Sứ mệnh', missionText: 'Kiến tạo tương lai số bằng các giải pháp tiên tiến.',
        visionTitle: 'Tầm nhìn', visionText: 'Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.',
        valuesTitle: 'Giá trị cốt lõi', valuesText: 'Đổi mới - Đồng hành - Tiên phong - Minh bạch.',
        foundationTitle: 'Nền tảng', foundationText: 'Hệ sinh thái đa ngành, vững chắc và linh hoạt.',
        quote: '"Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^"', quoteAuthor: '— HEXAGON CULTURE',
      },
      render: (props) => <AboutSection {...props} />,
    },
    ServicesSection: {
      label: '⚙️ Lĩnh vực hoạt động',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        subtitle: { type: 'textarea', label: 'Phụ đề' },
        services: {
          type: 'array', label: 'Dịch vụ',
          arrayFields: { title: { type: 'text', label: 'Tên dịch vụ' }, image: { type: 'text', label: 'URL ảnh' }, link: { type: 'text', label: 'Link' } },
          defaultItemProps: { title: 'Dịch vụ mới', image: '', link: '#' },
        },
      },
      defaultProps: {
        title: 'Lĩnh vực hoạt động',
        subtitle: 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:',
        services: [
          { title: 'Giải pháp công nghệ', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80', link: '#' },
          { title: 'Giải pháp thi công & lắp đặt', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80', link: '#' },
          { title: 'Cung cấp thiết bị CNTT', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80', link: '#' },
          { title: 'Dịch vụ Công nghệ thông tin', image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=80', link: '#' },
        ],
      },
      render: (props) => <ServicesSection {...props} />,
    },
    NewsSection: {
      label: '📰 Tin tức (trang chủ)',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        subtitle: { type: 'text', label: 'Phụ đề' },
        btnText: { type: 'text', label: 'Text nút xem tất cả' },
        news: {
          type: 'array', label: 'Tin tức',
          arrayFields: { title: { type: 'text', label: 'Tiêu đề' }, excerpt: { type: 'textarea', label: 'Tóm tắt' }, date: { type: 'text', label: 'Ngày' }, category: { type: 'text', label: 'Danh mục' }, image: { type: 'text', label: 'URL ảnh' }, slug: { type: 'text', label: 'Slug URL' } },
          defaultItemProps: { title: 'Tiêu đề bài viết', excerpt: 'Tóm tắt...', date: '01/07/2026', category: 'Tin tức', image: '', slug: 'bai-viet' },
        },
      },
      defaultProps: { title: 'Tin tức', subtitle: 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.', btnText: 'Xem tất cả bài viết', news: [] },
      render: (props) => <NewsSection {...props} />,
    },
    PartnersSection: {
      label: '🤝 Đối tác liên kết',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        partners: {
          type: 'array', label: 'Đối tác',
          arrayFields: { name: { type: 'text', label: 'Tên' }, logo: { type: 'text', label: 'URL logo' }, color: { type: 'text', label: 'Màu chữ (hex)' } },
          defaultItemProps: { name: 'PARTNER', logo: '', color: '#065F46' },
        },
      },
      defaultProps: {
        title: 'Các đối tác liên kết',
        partners: [
          { name: 'COMOON', logo: '', color: '#1565C0' }, { name: 'HEXAGON', logo: '', color: '#065F46' },
          { name: 'HUNO', logo: '', color: '#F59E0B' }, { name: 'HHA', logo: '', color: '#1565C0' },
          { name: 'HHF', logo: '', color: '#7C3AED' }, { name: 'HHE', logo: '', color: '#DC2626' },
          { name: 'MYH', logo: '', color: '#0891B2' }, { name: 'COWE', logo: '', color: '#059669' },
        ],
      },
      render: (props) => <PartnersSection {...props} />,
    },
    ContactSection: {
      label: '📞 Liên hệ',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        subtitle: { type: 'textarea', label: 'Mô tả' },
        addressLabel: { type: 'text', label: 'Nhãn địa chỉ' }, address: { type: 'text', label: 'Địa chỉ' },
        emailLabel: { type: 'text', label: 'Nhãn email' }, email: { type: 'text', label: 'Email' },
        hotlineLabel: { type: 'text', label: 'Nhãn hotline' }, hotline: { type: 'text', label: 'Hotline' },
        facebook: { type: 'text', label: 'Facebook URL' }, linkedin: { type: 'text', label: 'LinkedIn URL' },
        youtube: { type: 'text', label: 'YouTube URL' }, zalo: { type: 'text', label: 'Zalo URL' },
        mapSrc: { type: 'text', label: 'Google Maps embed URL' },
      },
      defaultProps: {
        title: 'Liên hệ với chúng tôi',
        subtitle: 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.',
        addressLabel: 'Trụ sở chính', address: '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh',
        emailLabel: 'Email', email: 'info@hexagon.xyz',
        hotlineLabel: 'Hotline', hotline: '096 446 0333',
        facebook: 'https://facebook.com', linkedin: 'https://linkedin.com',
        youtube: 'https://youtube.com', zalo: 'https://zalo.me',
        mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3!2d106.6297!3d10.7815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1d58d3abf7%3A0x7a27f0e9e4f68db3!2zNjE1IMOAdSBDxqEsIFTDom4gUGjDuiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2svn!4v1234567890',
      },
      render: (props) => <ContactSection {...props} />,
    },
    NewsListPage: {
      label: '📋 Trang Tin tức – Danh sách',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        subtitle: { type: 'text', label: 'Phụ đề' },
      },
      defaultProps: { title: 'Tin tức', subtitle: 'Tin tức mới nhất, cập nhật và thông tin từ Hexagon Corporation.' },
      render: (props) => <NewsListPage {...props} />,
    },
    Footer: {
      label: '⬇️ Footer – Chân trang',
      fields: { lang: { type: 'radio', label: 'Ngôn ngữ', options: [{ label: 'VI', value: 'vi' }, { label: 'EN', value: 'en' }] } },
      defaultProps: { lang: 'vi' },
      render: (props) => <Footer {...props} />,
    },
  },
}