import React from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import MemberLogos from './components/MemberLogos.jsx'
import About from './components/About.jsx'
import AboutPage from './components/AboutPage.jsx'
import Committees from './components/Committees.jsx'
import Stats from './components/Stats.jsx'
import News from './components/News.jsx'
import Values from './components/Values.jsx'
import Contact from './components/Contact.jsx'
import Member from './components/Member.jsx'
import Footer from './components/Footer.jsx'

export const puckConfig = {
  components: {
    Header: {
      label: '🔵 Header – Thanh điều hướng',
      fields: {
        logo: { type: 'text', label: 'Tên CLB (dòng 1)' },
        logoSub: { type: 'text', label: 'Địa danh (dòng 2)' },
      },
      defaultProps: { logo: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP', logoSub: 'TẠI TP.HỒ CHÍ MINH' },
      render: (props) => <Header {...props} />,
    },

    Hero: {
      label: '🎯 Hero – Banner chính (Sen Hồng)',
      fields: {
        eyebrow: { type: 'text', label: 'Dòng nhỏ trên tiêu đề' },
        title: { type: 'text', label: 'Tiêu đề lớn (vàng)' },
        description: { type: 'textarea', label: 'Mô tả' },
        buttonText: { type: 'text', label: 'Text nút CTA' },
        buttonLink: { type: 'text', label: 'Link nút CTA' },
        backgroundImage: { type: 'text', label: 'URL ảnh nền hero' },
      },
      defaultProps: {
        eyebrow: 'LAN TỎA GIÁ TRỊ ĐẤT',
        title: 'Sen Hồng',
        description: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác – Đổi mới – Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.',
        buttonText: 'Tham gia cộng đồng',
        buttonLink: '/hoi-vien',
        backgroundImage: 'https://webdemo.hexagon.xyz/medias/hieuunghero.webp',
      },
      render: (props) => <Hero {...props} />,
    },

    MemberLogos: {
      label: '🏢 Logo Hội viên – Chạy ngang',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        logos: {
          type: 'array', label: 'Danh sách logo hội viên',
          arrayFields: {
            name: { type: 'text', label: 'Tên công ty' },
            color: { type: 'text', label: 'Màu chữ (hex)' },
            initials: { type: 'text', label: 'Ký tự viết tắt' },
          },
          defaultItemProps: { name: 'COMPANY', color: '#1565c0', initials: 'C' },
        },
      },
      defaultProps: {
        title: 'HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        logos: [
          { name: 'ECOBOOK', color: '#2e7d32', initials: 'ECO' },
          { name: 'COMOON', color: '#1565c0', initials: 'COM' },
          { name: 'HEXAGON', color: '#0d47a1', initials: 'H' },
          { name: 'HUNO', color: '#e65100', initials: 'H' },
          { name: 'HHA', color: '#1565c0', initials: 'H' },
          { name: 'MYH', color: '#6a1b9a', initials: 'M' },
          { name: 'COWE', color: '#c62828', initials: 'C' },
          { name: 'HHN', color: '#4527a0', initials: 'H' },
        ],
      },
      render: (props) => <MemberLogos {...props} />,
    },

    About: {
      label: '📋 Về CLB – 2 Card (Giới thiệu + Cơ cấu)',
      fields: {
        pageTitle: { type: 'text', label: 'Tiêu đề card trái' },
        description: { type: 'textarea', label: 'Mô tả về CLB' },
        image: { type: 'text', label: 'URL ảnh' },
        orgTitle: { type: 'text', label: 'Tiêu đề card phải' },
        members: {
          type: 'array', label: 'Danh sách ban lãnh đạo',
          arrayFields: {
            name: { type: 'text', label: 'Họ tên' },
            clbRole: { type: 'text', label: 'Chức vụ CLB' },
            bizRole: { type: 'text', label: 'Chức vụ doanh nghiệp' },
            company: { type: 'text', label: 'Tên doanh nghiệp' },
            avatar: { type: 'text', label: 'URL ảnh đại diện' },
          },
          defaultItemProps: { name: 'Họ Tên', clbRole: 'Hội viên', bizRole: 'Giám đốc', company: 'Công ty', avatar: 'https://i.pravatar.cc/100?img=1' },
        },
      },
      defaultProps: {
        pageTitle: 'VỀ CÂU LẠC BỘ',
        description: 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
        orgTitle: 'CƠ CẤU TỔ CHỨC',
        members: [
          { name: 'Trần Văn Khang', clbRole: 'Ủy viên BCH', bizRole: 'Tổng Giám đốc', company: 'Công ty CP Logistics Đồng Tháp', avatar: 'https://i.pravatar.cc/100?img=11' },
          { name: 'Đỗ Thu Trang', clbRole: 'Thủ quỹ CLB', bizRole: 'Giám đốc Tài chính', company: 'Công ty TNHH Sen Việt', avatar: 'https://i.pravatar.cc/100?img=5' },
          { name: 'Vũ Hoàng Long', clbRole: 'Ủy viên BCH', bizRole: 'Giám đốc Điều hành', company: 'Công ty Công nghệ số Mekong', avatar: 'https://i.pravatar.cc/100?img=8' },
        ],
      },
      render: (props) => <About {...props} />,
    },

    Committees: {
      label: '🏛️ Các Ban chuyên môn',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        subtitle: { type: 'text', label: 'Phụ đề' },
        items: {
          type: 'array', label: 'Danh sách ban',
          arrayFields: {
            icon: { type: 'text', label: 'Emoji icon' },
            label: { type: 'text', label: 'Tên ban' },
            link: { type: 'text', label: 'Link xem hoạt động' },
          },
          defaultItemProps: { icon: '⭐', label: 'Ban mới', link: '#' },
        },
      },
      defaultProps: {
        title: 'CÁC BAN CHUYÊN MÔN',
        subtitle: 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        items: [
          { icon: '📊', label: 'Ban Kinh tế – Đầu tư', link: '#' },
          { icon: '🎭', label: 'Ban Văn hóa – Thể thao', link: '#' },
          { icon: '🤝', label: 'Ban Xã hội – Cộng đồng', link: '#' },
          { icon: '🚀', label: 'Ban Khởi nghiệp', link: '#' },
          { icon: '🌐', label: 'Ban Giao thương quốc tế', link: '#' },
        ],
      },
      render: (props) => <Committees {...props} />,
    },

    Stats: {
      label: '📈 Hành trình – Số liệu thống kê',
      fields: {
        title: { type: 'text', label: 'Tiêu đề section' },
        items: {
          type: 'array', label: 'Các số liệu',
          arrayFields: {
            number: { type: 'text', label: 'Con số (VD: 500+)' },
            label: { type: 'text', label: 'Mô tả' },
          },
          defaultItemProps: { number: '0+', label: 'Mô tả số liệu' },
        },
      },
      defaultProps: {
        title: 'HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ',
        items: [
          { number: '500+', label: 'Hội viên là các doanh nghiệp và doanh nhân tiêu biểu tại TP.HCM' },
          { number: '20+', label: 'Năm hình thành và phát triển mạng lưới kết nối đồng hương' },
          { number: '1.000+', label: 'Cơ hội giao thương và kết nối đầu tư được khởi tạo mỗi năm' },
          { number: '100+', label: 'Chương trình thiện nguyện và hoạt động hướng về quê hương' },
        ],
      },
      render: (props) => <Stats {...props} />,
    },

    News: {
      label: '📰 Tin tức & Sự kiện (2 trên + 3 dưới)',
      fields: {
        title: { type: 'text', label: 'Tiêu đề section' },
        items: {
          type: 'array', label: 'Danh sách tin tức',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề bài' },
            date: { type: 'text', label: 'Ngày đăng' },
            image: { type: 'text', label: 'URL ảnh' },
            excerpt: { type: 'textarea', label: 'Tóm tắt' },
            isNew: { type: 'radio', label: 'Badge "Mới nhất"', options: [{ label: 'Có', value: true }, { label: 'Không', value: false }] },
          },
          defaultItemProps: { title: 'Tiêu đề tin tức', date: '01/01/2026', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80', excerpt: 'Mô tả bài viết...', isNew: false },
        },
      },
      defaultProps: {
        title: 'TIN TỨC & SỰ KIỆN',
        items: [
          { title: 'Hội thảo kết nối doanh nghiệp chia sẻ xu hướng phát triển', date: '20/03/2026', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', excerpt: 'Sự kiện quy tụ nhiều chuyên gia và doanh nhân, cùng thảo luận về chiến lược phát triển, chuyển đổi số và cơ hội hợp tác trong thời đại mới.', isNew: true },
          { title: 'Kết nối và chia sẻ niềm vui là cách phát triển sự hiệu quả...', date: '20/03/2026', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80', excerpt: 'Khi chúng ta làm việc với một trái tim mở lòng và tinh thần sẻ chia, áp lực sẽ biến thành động lực.', isNew: true },
          { title: 'Lan tỏa yêu thương thiện nguyện', date: '10/03/2026', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', excerpt: 'Các thành viên đã cùng chung tay tổ chức hoạt động trao tặng...', isNew: false },
          { title: 'Hợp tác giữa các doanh nghiệp', date: '23/02/2026', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', excerpt: 'Định hướng phát triển tương lai là mở rộng quan hệ hợp tác...', isNew: false },
          { title: 'Đẩy mạnh chuyển đổi số ...', date: '23/02/2026', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80', excerpt: 'Sự phát triển hệ thống chuyển đổi đồng bộ nhằm tối ưu hóa...', isNew: false },
        ],
      },
      render: (props) => <News {...props} />,
    },

    Values: {
      label: '💎 Giá trị khi tham gia cộng đồng',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        items: {
          type: 'array', label: 'Danh sách giá trị',
          arrayFields: {
            icon: { type: 'text', label: 'Emoji icon' },
            title: { type: 'text', label: 'Tên giá trị' },
            desc: { type: 'textarea', label: 'Mô tả' },
          },
          defaultItemProps: { icon: '⭐', title: 'Giá trị', desc: 'Mô tả giá trị...' },
        },
      },
      defaultProps: {
        title: 'GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG',
        items: [
          { icon: '🌐', title: 'Kết nối chất lượng', desc: 'Tiếp cận mạng lưới doanh nhân uy tín, mở rộng cơ hội hợp tác thực tế.' },
          { icon: '📈', title: 'Phát triển kiến thức', desc: 'Cập nhật xu hướng, nâng cao tư duy quản trị và kỹ năng kinh doanh.' },
          { icon: '🤝', title: 'Cơ hội hợp tác', desc: 'Tham gia các dự án, hoạt động kết nối và xúc tiến thương mại.' },
        ],
      },
      render: (props) => <Values {...props} />,
    },

    Contact: {
      label: '📞 Liên hệ & Hợp tác',
      fields: {
        title: { type: 'textarea', label: 'Tiêu đề (xuống dòng bằng \\n)' },
        email: { type: 'text', label: 'Email' },
        phone: { type: 'text', label: 'Hotline' },
        buttonText: { type: 'text', label: 'Text nút đăng ký' },
      },
      defaultProps: {
        title: 'QUAN TÂM VÀ HỢP TÁC\nVỚI CÁC CHƯƠNG TRÌNH HOẠT ĐỘNG\nCỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM',
        email: 'info@dte.hunghau.vn',
        phone: '1800 1568',
        buttonText: 'Đăng ký hội viên',
      },
      render: (props) => <Contact {...props} />,
    },

    Member: {
      label: '👥 Trang Hội viên',
      fields: {
        pageTitle: { type: 'text', label: 'Tiêu đề trang' },
        heroTitle: { type: 'text', label: 'Tiêu đề section' },
        heroDesc: { type: 'textarea', label: 'Đoạn mô tả 1' },
        heroDesc2: { type: 'textarea', label: 'Đoạn mô tả 2' },
        heroImage: { type: 'text', label: 'URL ảnh' },
        benefits: {
          type: 'array', label: 'Quyền lợi hội viên',
          arrayFields: { text: { type: 'text', label: 'Quyền lợi' } },
          defaultItemProps: { text: 'Quyền lợi mới' },
        },
        stats: {
          type: 'array', label: 'Số liệu',
          arrayFields: {
            number: { type: 'text', label: 'Con số' },
            label: { type: 'text', label: 'Nhãn' },
          },
          defaultItemProps: { number: '0+', label: 'Label' },
        },
      },
      defaultProps: {
        pageTitle: 'HỘI VIÊN',
        heroTitle: 'Cộng đồng doanh nhân cùng phát triển',
        heroDesc: 'Hội viên là lực lượng nòng cốt tạo nên sự kết nối, chia sẻ và phát triển trong cộng đồng doanh nghiệp Đồng Tháp.',
        heroDesc2: 'Việc tham gia hội viên mở ra cơ hội mở rộng mạng lưới, trao đổi kinh nghiệm, tiếp cận chương trình hỗ trợ và đồng hành trong các hoạt động xúc tiến thương mại.',
        heroImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700&q=80',
        benefits: [
          'Tham gia các chương trình kết nối doanh nghiệp',
          'Tiếp cận hoạt động đào tạo và hội thảo chuyên đề',
          'Nhận thông tin thị trường và cơ hội hợp tác',
          'Tham gia các hoạt động cộng đồng doanh nhân',
          'Đồng hành cùng các chương trình phát triển địa phương',
        ],
        stats: [
          { number: '800+', label: 'Hội viên' },
          { number: '120+', label: 'Đối tác' },
          { number: '40+', label: 'Sự kiện / năm' },
          { number: '12', label: 'Nhóm kết nối' },
        ],
      },
      render: (props) => <Member {...props} />,
    },

    AboutPage: {
      label: '📖 Trang Giới thiệu',
      fields: {
        pageTitle: { type: 'text', label: 'Tiêu đề trang' },
        image: { type: 'text', label: 'URL ảnh' },
        heading: { type: 'text', label: 'Tiêu đề section' },
        body1: { type: 'textarea', label: 'Đoạn 1' },
        body2: { type: 'textarea', label: 'Đoạn 2' },
        vision: { type: 'text', label: 'Tầm nhìn' },
        mission: { type: 'text', label: 'Sứ mệnh' },
        stats: {
          type: 'array', label: 'Số liệu',
          arrayFields: { number: { type: 'text', label: 'Con số' }, label: { type: 'text', label: 'Nhãn' } },
          defaultItemProps: { number: '0+', label: 'Label' },
        },
      },
      defaultProps: {
        pageTitle: 'GIỚI THIỆU DOANH NHÂN ĐỒNG THÁP',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80',
        heading: 'Kết nối – Đồng hành – Phát triển',
        body1: 'Cộng đồng Doanh nhân Đồng Tháp hướng đến việc xây dựng môi trường kết nối giữa các doanh nghiệp, thúc đẩy hợp tác và tạo ra nhiều giá trị bền vững cho địa phương.',
        body2: 'Với tinh thần đổi mới, sáng tạo và phát triển lâu dài, cộng đồng doanh nhân luôn đóng vai trò quan trọng trong việc thúc đẩy kinh tế, hỗ trợ khởi nghiệp và nâng cao năng lực cạnh tranh.',
        vision: 'Xây dựng mạng lưới doanh nhân năng động, hiện đại và hội nhập.',
        mission: 'Kết nối doanh nghiệp – chia sẻ tri thức – tạo giá trị phát triển bền vững.',
        stats: [
          { number: '500+', label: 'Doanh nghiệp tham gia' },
          { number: '50+', label: 'Sự kiện kết nối mỗi năm' },
          { number: '100%', label: 'Hướng đến phát triển bền vững' },
        ],
      },
      render: (props) => <AboutPage {...props} />,
    },

    Footer: {
      label: '⬇️ Footer – Chân trang',
      fields: {
        orgName: { type: 'text', label: 'Tên tổ chức' },
        orgSub: { type: 'text', label: 'Phụ đề' },
        address: { type: 'textarea', label: 'Địa chỉ' },
        email: { type: 'text', label: 'Email' },
        hotline: { type: 'text', label: 'Hotline' },
      },
      defaultProps: {
        orgName: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
        orgSub: 'TẠI TP. HỒ CHÍ MINH',
        address: 'Phòng Đồng Tháp, HungHau Campus, Trường Đại học Văn Hiến, Đại lộ Nguyễn Văn Linh, Khu đô thị Nam Thành Phố, TP.HCM',
        email: 'info@dte.hunghau.vn',
        hotline: '1800 1568',
      },
      render: (props) => <Footer {...props} />,
    },
  },
}