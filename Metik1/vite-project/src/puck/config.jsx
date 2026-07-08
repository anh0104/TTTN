import React from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import AboutMetik from './components/AboutMetik.jsx'
import AboutUs from './components/AboutUs.jsx'
import Testimonials from './components/Testimonials.jsx'
import Footer from './components/Footer.jsx'
import AboutPage from './components/AboutPage.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import NewsPage from './components/NewsPage.jsx'
import ContactPage from './components/ContactPage.jsx'
// Thêm ngay đầu file config.jsx, trước export const puckConfig
if (typeof window !== 'undefined') {
  // Xoá tất cả localStorage cũ mỗi lần load config
  localStorage.removeItem('metik_pages')
  localStorage.removeItem('metik_pages_v2')
  localStorage.removeItem('metikkk_v1')
  localStorage.removeItem('metikk')
  localStorage.removeItem('metik1')
  localStorage.removeItem('metik')
}
export const puckConfig = {
  components: {
    Header: {
      label: '🔝 Header – Thanh điều hướng',
      fields: {
        activePage: { type: 'text', label: 'Trang active (/, /gioi-thieu, /san-pham...)' },
      },
      defaultProps: { activePage: '/' },
      render: (props) => <Header {...props} />,
    },

    Hero: {
      label: '🎯 Hero – Banner Snack Pellets',
      fields: {
        slides: {
          type: 'array',
          label: 'Danh sách slide',
          arrayFields: {
            image: { type: 'text', label: 'URL ảnh banner' },
            fallbackBg: { type: 'text', label: 'Màu nền dự phòng' },
          },
          defaultItemProps: {
            image: '',
            fallbackBg: 'linear-gradient(135deg,#87CEEB,#E8F4F8)',
          },
        },
      },
      defaultProps: {
        slides: [{ image: '', fallbackBg: 'linear-gradient(135deg,#87CEEB,#E8F4F8)' }],
      },
      render: (props) => <Hero {...props} />,
    },

    ProductGrid: {
      label: '🍟 Sản phẩm mới – Grid 4 cột',
      fields: {
        title: { type: 'text', label: 'Tiêu đề section' },
        showTitle: {
          type: 'radio',
          label: 'Hiển thị tiêu đề',
          options: [{ label: 'Có', value: true }, { label: 'Không', value: false }],
        },
        products: {
          type: 'array',
          label: 'Danh sách sản phẩm',
          arrayFields: {
            name: { type: 'text', label: 'Tên sản phẩm' },
            image: { type: 'text', label: 'URL ảnh' },
            link: { type: 'text', label: 'Link chi tiết' },
          },
          defaultItemProps: { name: 'Sản phẩm mới', image: '', link: '/san-pham' },
        },
      },
      defaultProps: {
        title: 'SẢN PHẨM MỚI',
        showTitle: true,
        products: [
          { name: 'Snack vị Tảo biển', image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&q=80', link: '/san-pham/snack-vi-tao-bien' },
          { name: 'Snack vị BBQ', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80', link: '/san-pham/snack-vi-bbq' },
          { name: 'Snack vị Bắp', image: 'https://images.unsplash.com/photo-1608068811980-85bbc6cd5b9b?w=400&q=80', link: '/san-pham/snack-vi-bap' },
          { name: 'Snack vị Phô mai', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80', link: '/san-pham/snack-vi-pho-mai' },
        ],
      },
      render: (props) => <ProductGrid {...props} />,
    },

    AboutMetik: {
      label: '📖 Giới thiệu về Metik',
      fields: {
        sectionTitle: { type: 'text', label: 'Tiêu đề' },
        intro: { type: 'textarea', label: 'Đoạn giới thiệu' },
        image1: { type: 'text', label: 'URL ảnh 1 (snack)' },
        text1: { type: 'textarea', label: 'Đoạn text 1' },
        bullets: {
          type: 'array',
          label: 'Bullet points',
          arrayFields: { text: { type: 'textarea', label: 'Nội dung' } },
          defaultItemProps: { text: 'Nội dung...' },
        },
        image2: { type: 'text', label: 'URL ảnh 2 (nhà máy)' },
        image3: { type: 'text', label: 'URL ảnh 3 (cô gái)' },
        text2: { type: 'textarea', label: 'Đoạn text cuối' },
      },
      defaultProps: {
        sectionTitle: 'GIỚI THIỆU VỀ METIK',
        intro: 'metik là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nhịp sống hiện đại.',
        image1: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&q=80',
        text1: 'Ra đời từ nền tảng sản xuất bánh kẹo của OCHAO, METIK kế thừa hệ thống nhà máy hiện đại, quy trình sản xuất khép kín và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt.',
        bullets: [
          { text: 'Sử dụng nguyên liệu có nguồn gốc rõ ràng, phù hợp với tiêu chuẩn sản xuất thực phẩm.' },
          { text: 'Quy trình sản xuất hiện đại, khép kín và đảm bảo vệ sinh an toàn thực phẩm.' },
          { text: 'Kiểm soát chất lượng chặt chẽ trong từng công đoạn, từ nguyên liệu đầu vào đến thành phẩm.' },
        ],
        image2: 'https://images.unsplash.com/photo-1565793949368-c0c27272b394?w=600&q=80',
        image3: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600&q=80',
        text2: 'Với hương vị hấp dẫn, phong cách trẻ trung và tinh thần vui nhộn, METIK hướng đến hình ảnh một thương hiệu snack năng động, gần gũi và dễ tạo thiện cảm với người tiêu dùng Việt Nam.',
      },
      render: (props) => {
        const bullets = (props.bullets || []).map(b => typeof b === 'string' ? b : (b.text || b))
        return <AboutMetik {...props} bullets={bullets} />
      },
    },

    AboutUs: {
      label: '🎬 Về chúng tôi + Video',
      fields: {
        sectionTitle: { type: 'text', label: 'Tiêu đề' },
        text1: { type: 'textarea', label: 'Đoạn text 1' },
        text2: { type: 'textarea', label: 'Đoạn text 2' },
        videoUrl: { type: 'text', label: 'URL nhúng YouTube (embed)' },
        videoThumb: { type: 'text', label: 'URL ảnh thumbnail video' },
      },
      defaultProps: {
        sectionTitle: 'VỀ CHÚNG TÔI',
        text1: 'Với tinh thần "Chạm mê tít – Snap into Joy", metik mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày.',
        text2: 'metik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoThumb: '',
      },
      render: (props) => <AboutUs {...props} />,
    },

    Testimonials: {
      label: '⭐ Khách hàng nói gì',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        reviews: {
          type: 'array',
          label: 'Đánh giá',
          arrayFields: {
            name: { type: 'text', label: 'Tên khách hàng' },
            avatar: { type: 'text', label: 'URL avatar' },
            stars: { type: 'number', label: 'Số sao (1-5)' },
            text: { type: 'textarea', label: 'Nội dung đánh giá' },
          },
          defaultItemProps: { name: 'Khách hàng', avatar: 'https://i.pravatar.cc/80?img=1', stars: 5, text: 'Sản phẩm rất ngon!' },
        },
      },
      defaultProps: {
        title: 'KHÁCH HÀNG NÓI GÌ?',
        reviews: [
          { name: 'Sinh viên Huỳnh Vĩnh, TP.HCM', avatar: 'https://i.pravatar.cc/80?img=11', stars: 5, text: 'Snack metik ăn vừa giòn, vừa ngon vừa cuốn miệng. Em thường lựa chọn để mang theo tới trường"' },
          { name: 'Bạn Mỹ Duyên, Đồng Tháp', avatar: 'https://i.pravatar.cc/80?img=5', stars: 5, text: '"metik gợi nhớ cho em rất nhiều kỉ niệm thời thơ ấu. Hy vọng nhãn hàng trong tương lai sẽ ra nhiều sản phẩm độc đáo hơn nữa."' },
        ],
      },
      render: (props) => <Testimonials {...props} />,
    },

    AboutPage: {
      label: '📹 Trang Giới thiệu – Video + Text',
      fields: {
        text1: { type: 'textarea', label: 'Đoạn 1' },
        text2: { type: 'textarea', label: 'Đoạn 2' },
        videoUrl: { type: 'text', label: 'URL YouTube embed' },
        videoThumb: { type: 'text', label: 'URL thumbnail' },
      },
      defaultProps: {
        text1: 'Với tinh thần "Chạm mê tít – Snap into Joy", metik mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày.',
        text2: 'metik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoThumb: '',
      },
      render: (props) => <AboutPage {...props} />,
    },

    ProductList: {
      label: '📦 Trang Sản phẩm – Danh sách',
      fields: {
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        products: {
          type: 'array',
          label: 'Sản phẩm',
          arrayFields: {
            name: { type: 'text', label: 'Tên' },
            slug: { type: 'text', label: 'Slug URL' },
            image: { type: 'text', label: 'URL ảnh' },
          },
          defaultItemProps: { name: 'Sản phẩm', slug: 'san-pham', image: '' },
        },
      },
      defaultProps: {
        breadcrumb: 'TRANG CHỦ / SẢN PHẨM',
        products: [
          { name: 'Snack vị Bắp', slug: 'snack-vi-bap', image: 'https://images.unsplash.com/photo-1608068811980-85bbc6cd5b9b?w=400&q=80' },
          { name: 'Snack vị BBQ', slug: 'snack-vi-bbq', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80' },
          { name: 'Snack vị Phô mai', slug: 'snack-vi-pho-mai', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80' },
          { name: 'Snack vị Tảo biển', slug: 'snack-vi-tao-bien', image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&q=80' },
        ],
      },
      render: (props) => <ProductList {...props} />,
    },

    ProductDetail: {
      label: '🔍 Chi tiết sản phẩm',
      fields: {
        name: { type: 'text', label: 'Tên sản phẩm' },
        image: { type: 'text', label: 'URL ảnh chính' },
        image2: { type: 'text', label: 'URL ảnh thứ 2' },
        breadcrumbBg: { type: 'text', label: 'URL ảnh nền breadcrumb' },
        category: { type: 'text', label: 'Danh mục' },
        description: { type: 'textarea', label: 'Mô tả ngắn' },
        details: {
          type: 'array',
          label: 'Chi tiết sản phẩm',
          arrayFields: {
            bold: { type: 'text', label: 'Tiêu đề in đậm' },
            text: { type: 'textarea', label: 'Nội dung' },
          },
          defaultItemProps: { bold: 'Tiêu đề', text: 'Nội dung chi tiết...' },
        },
        related: {
          type: 'array',
          label: 'Sản phẩm liên quan',
          arrayFields: {
            name: { type: 'text', label: 'Tên' },
            slug: { type: 'text', label: 'Slug' },
            image: { type: 'text', label: 'URL ảnh' },
          },
          defaultItemProps: { name: 'SP liên quan', slug: 'san-pham', image: '' },
        },
      },
      defaultProps: {
        name: 'Snack vị BBQ',
        image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80',
        image2: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&q=80',
        breadcrumbBg: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=1200&q=60',
        category: 'Các sản phẩm bánh METIK',
        description: 'Snack METIK vị BBQ là dòng snack hiện đại kết hợp giữa nguyên liệu tự nhiên và công nghệ chế biến tiên tiến từ nhà máy OCHAO tại TPHCM.',
        details: [
          { bold: 'Hương vị BBQ đậm đà, kết cấu giòn', text: 'Snack có mùi thơm rõ của gia vị BBQ, vị mặn ngọt hài hòa, xen lẫn hậu vị khói nhẹ.' },
          { bold: 'Công thức được nghiên cứu bài bản', text: 'Sản phẩm trải qua quá trình nghiên cứu hương vị và hoàn thiện công thức bởi đội ngũ R&D.' },
          { bold: 'Đa dạng hình thức chế biến, phù hợp nhiều thị trường', text: 'Snack vị BBQ OCHAO có thể phát triển dạng phôi bánh, dòng chiên và không chiên, linh hoạt theo nhu cầu thị trường.' },
        ],
        related: [
          { name: 'Snack vị Bắp', slug: 'snack-vi-bap', image: 'https://images.unsplash.com/photo-1608068811980-85bbc6cd5b9b?w=400&q=80' },
          { name: 'Snack vị Phô mai', slug: 'snack-vi-pho-mai', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80' },
          { name: 'Snack vị Tảo biển', slug: 'snack-vi-tao-bien', image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&q=80' },
        ],
      },
      render: (props) => <ProductDetail {...props} />,
    },

    NewsPage: {
      label: '📰 Trang Tin tức',
      fields: {
        title: { type: 'text', label: 'Tiêu đề trang' },
        emptyMessage: { type: 'text', label: 'Thông báo trống' },
        emptyDesc: { type: 'text', label: 'Mô tả trống' },
        articles: {
          type: 'array',
          label: 'Bài viết (để trống = hiện "không tìm thấy")',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề' },
            date: { type: 'text', label: 'Ngày' },
            image: { type: 'text', label: 'URL ảnh' },
            excerpt: { type: 'textarea', label: 'Tóm tắt' },
            link: { type: 'text', label: 'Link' },
          },
          defaultItemProps: { title: 'Tin tức mới', date: '01/01/2026', image: '', excerpt: 'Mô tả...', link: '#' },
        },
      },
      defaultProps: {
        title: 'LƯU TRỮ DANH MỤC: TIN TỨC',
        emptyMessage: 'Không tìm thấy gì',
        emptyDesc: 'Dường như chúng tôi không thể tìm thấy những gì bạn đang tìm kiếm. Có lẽ tìm kiếm có thể giúp ích.',
        articles: [],
      },
      render: (props) => <NewsPage {...props} />,
    },

    ContactPage: {
      label: '🗺️ Trang Liên hệ – Bản đồ',
      fields: {
        mapSrc: { type: 'text', label: 'URL Google Maps embed (iframe src)' },
      },
      defaultProps: {
        mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610737765054!2d106.5310!3d10.9350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ8O0bmcgdHkgQ-G7lSBQaOG6p24gT0NIQU8!5e0!3m2!1svi!2svn',
      },
      render: (props) => <ContactPage {...props} />,
    },

    Footer: {
      label: '🟡 Footer – Vàng',
      fields: {
        description: { type: 'textarea', label: 'Mô tả thương hiệu' },
        phone: { type: 'text', label: 'Số điện thoại' },
        email: { type: 'text', label: 'Email' },
        address: { type: 'textarea', label: 'Địa chỉ' },
        contactTitle: { type: 'text', label: 'Tiêu đề liên hệ' },
      },
      defaultProps: {
        description: 'METIK – một thế giới snack dành cho những ai yêu sự giòn giòn ngất ngây, hương vị trẻ trung, đầy cảm hứng để mỗi ngày đều căng tràn sức sống.',
        phone: '(+84) 79 721 3333',
        email: 'sale@ochao.vn',
        address: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM..',
        contactTitle: 'THÔNG TIN LIÊN HỆ',
      },
      render: (props) => <Footer {...props} />,
    },
  },
}
