import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Trangchu from './components/Trangchu'
import Gioithieu from './components/Gioithieu'
import Dichvu from './components/Dichvu'
import TintucPreview from './components/TintucPreview'
import Member from './components/Member'
import LienheMaps from './components/LienheMaps'
import ScrollToTopButton from './components/ScrollToTopButton'
import Footer from './components/Footer'

// CMS Custom additions
import AdminPages from './components/AdminPages'
import EditorPage from './components/EditorPage'
import DynamicPage from './components/DynamicPage'
import TintucDetail from './components/TintucDetail'
import DichvuDetail from './components/DichvuDetail'
import TintucList from './components/TintucList'
import { getPageBySlug } from './utils/cmsStore'


const TRANSLATIONS = {
  vi: {
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      services: "Dịch vụ",
      support: "Hỗ trợ",
      contact: "Liên hệ"
    },
    hero: {
      tag: "Công nghệ tương lai",
      title: "HEXAGON Solutions",
      desc: "Hexagon kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm, AI đến an ninh mạng, giúp doanh nghiệp bứt phá trong kỷ nguyên số.",
      ctaPrimary: "Khám phá Dịch vụ",
      ctaSecondary: "Liên hệ Tư vấn",
      scrollDown: "Cuộn xuống để khám phá"
    },
    about: {
      title: "Về Hexagon",
      desc: "Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.",
      cultureQuote: "Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^",
      cultureAuthor: "Hexagon Culture",
      missionTitle: "Sứ mệnh",
      missionDesc: "Kiến tạo tương lai số bằng các giải pháp tiên tiến.",
      visionTitle: "Tầm nhìn",
      visionDesc: "Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.",
      valuesTitle: "Giá trị cốt lõi",
      valuesDesc: "Đổi mới - Đồng hành - Tiên phong - Minh bạch.",
      foundationTitle: "Nền tảng",
      foundationDesc: "Hệ sinh thái đa ngành, vững chắc và linh hoạt."
    },
    services: {
      title: "Lĩnh vực hoạt động",
      subtitle: "Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:",
      item1Title: "Phần mềm & Nền tảng",
      item1Desc: "Phát triển phần mềm, ứng dụng di động và nền tảng số hóa doanh nghiệp.",
      item2Title: "AI & Machine Learning",
      item2Desc: "Ứng dụng trí tuệ nhân tạo trong phân tích dữ liệu, tự động hóa và dự đoán.",
      item3Title: "An ninh mạng",
      item3Desc: "Bảo vệ hệ thống, dữ liệu và hạ tầng số với các giải pháp bảo mật tiên tiến.",
      item4Title: "Tư vấn Chiến lược",
      item4Desc: "Đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số và đổi mới sáng tạo."
    },
    news: {
      title: "Tin tức",
      subtitle: "Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.",
      readMore: "Đọc tiếp →",
      item1Tag: "Sự kiện",
      item1Title: "Ra mắt hệ sinh thái Hexagon 2026",
      item1Desc: "Hexagon chính thức giới thiệu hệ sinh thái công nghệ tích hợp mới với nhiều tính năng đột phá.",
      item2Tag: "Công nghệ",
      item2Title: "Đổi mới trong AI và Chuyển đổi số",
      item2Desc: "Hexagon hợp tác cùng các đối tác chiến lược để thúc đẩy ứng dụng AI trong doanh nghiệp.",
      item3Tag: "Đối tác",
      item3Title: "Mở rộng mạng lưới đối tác toàn cầu",
      item3Desc: "Hexagon ký kết hợp tác với nhiều tập đoàn công nghệ hàng đầu thế giới.",
      item4Tag: "Bảo mật",
      item4Title: "Giải pháp An ninh mạng thế hệ mới",
      item4Desc: "Hexagon ra mắt bộ giải pháp bảo mật toàn diện cho doanh nghiệp vừa và lớn.",
      item5Tag: "Đào tạo",
      item5Title: "Chương trình đào tạo nhân lực công nghệ",
      item5Desc: "Hexagon hợp tác cùng các trường đại học hàng đầu để đào tạo nguồn nhân lực chất lượng cao."
    },
    partners: {
      title: "Các đối tác liên kết"
    },
    contact: {
      title: "Liên hệ với chúng tôi",
      subtitle: "Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.",
      hq: "Trụ sở chính",
      hqVal: "615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh",
      email: "Email",
      hotline: "Hotline"
    },
    footer: {
      logoDesc: "Hexagon Corporation - Công nghệ tiên phong, kiến tạo tương lai số với các giải pháp đổi mới và bền vững.",
      quickLinks: "Liên kết nhanh",
      services: "Dịch vụ",
      connect: "Kết nối",
      copyright: "Copyright 2026 © Hexagon Corporation. All rights reserved."
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      support: "Support",
      contact: "Contact"
    },
    hero: {
      tag: "Future Technology",
      title: "HEXAGON Solutions",
      desc: "Hexagon creates comprehensive digital transformation solutions, from software, AI to cyber security, helping businesses break through in the digital age.",
      ctaPrimary: "Explore Services",
      ctaSecondary: "Get Consultation",
      scrollDown: "Scroll down to explore"
    },
    about: {
      title: "About Hexagon",
      desc: "Hexagon Corporation – Pioneering technology, where we constantly innovate and create to deliver outstanding values in the digital era. With multi-dimensional vision and aspiration, Hexagon is proud to be a trusted partner, accompanying you on the journey to conquer technology peaks.",
      cultureQuote: "Work day, work night, work extra on holidays ^_^",
      cultureAuthor: "Hexagon Culture",
      missionTitle: "Mission",
      missionDesc: "Creating the digital future through advanced solutions.",
      visionTitle: "Vision",
      visionDesc: "Become a benchmark symbol of the innovative tech ecosystem.",
      valuesTitle: "Core Values",
      valuesDesc: "Innovation - Accompany - Pioneer - Transparency.",
      foundationTitle: "Foundation",
      foundationDesc: "Multi-industry ecosystem, solid and flexible."
    },
    services: {
      title: "Core Fields",
      subtitle: "At Hexagon, we focus on developing a comprehensive technology ecosystem, including:",
      item1Title: "Software & Platform",
      item1Desc: "Developing software, mobile applications, and enterprise digitization platforms.",
      item2Title: "AI & Machine Learning",
      item2Desc: "Applying AI in data analysis, automation, and predictive modelling.",
      item3Title: "Cyber Security",
      item3Desc: "Protecting systems, data, and digital infrastructure with advanced security.",
      item4Title: "Strategic Consulting",
      item4Desc: "Accompanying enterprises on their digital transformation and innovation journey."
    },
    news: {
      title: "News",
      subtitle: "Update on the latest news, events, and information from Hexagon Corporation.",
      readMore: "Read more →",
      item1Tag: "Event",
      item1Title: "Launch of Hexagon Ecosystem 2026",
      item1Desc: "Hexagon officially introduces integrated technology ecosystem with breakthrough features.",
      item2Tag: "Technology",
      item2Title: "Innovation in AI & Digital Transformation",
      item2Desc: "Hexagon partners with strategic allies to accelerate AI adoption in businesses.",
      item3Tag: "Partners",
      item3Title: "Expanding Global Partner Network",
      item3Desc: "Hexagon signs cooperation agreements with leading global technology groups.",
      item4Tag: "Security",
      item4Title: "Next-gen Cyber Security Solutions",
      item4Desc: "Hexagon launches a comprehensive security suite for medium and large enterprises.",
      item5Tag: "Training",
      item5Title: "Tech Talent Development Program",
      item5Desc: "Hexagon partners with top universities to train high-quality technology workforce."
    },
    partners: {
      title: "Sponsors & Associates"
    },
    contact: {
      title: "Contact Us",
      subtitle: "Ready for the next project? Hexagon's expert team is always here to listen and provide you with the best solutions.",
      hq: "Headquarters",
      hqVal: "615 Au Co, Tan Phu District, Ho Chi Minh City",
      email: "Email",
      hotline: "Hotline"
    },
    footer: {
      logoDesc: "Hexagon Corporation - Pioneering technology, shaping digital future with innovative & sustainable solutions.",
      quickLinks: "Quick Links",
      services: "Services",
      connect: "Connect",
      copyright: "Copyright 2026 © Hexagon Corporation. All rights reserved."
    }
  }
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('hhc_lang') || 'vi'
  })

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('pushstate', handleLocationChange)
    window.addEventListener('replacestate', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('pushstate', handleLocationChange)
      window.removeEventListener('replacestate', handleLocationChange)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('hhc_lang', lang)
  }, [lang])

  const navigateTo = (path) => {
    window.history.pushState(null, '', path)
    window.dispatchEvent(new Event('pushstate'))
  }

  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi

  // CMS custom routes
  if (currentPath === '/admin/pages') {
    return <AdminPages onNavigate={navigateTo} />
  }

  if (currentPath.startsWith('/admin/pages/edit/')) {
    const pageId = currentPath.substring('/admin/pages/edit/'.length)
    return <EditorPage pageId={pageId} onNavigate={navigateTo} />
  }

  // Services detail route
  if (currentPath.startsWith('/dichvu/')) {
    const serviceId = currentPath.substring('/dichvu/'.length)
    return <DichvuDetail serviceId={serviceId} lang={lang} setLang={setLang} onNavigate={navigateTo} />
  }

  // Centralized news list route
  if (currentPath === '/tin-tuc') {
    return <TintucList lang={lang} setLang={setLang} onNavigate={navigateTo} />
  }

  // News article detail route
  if (currentPath.startsWith('/tin-tuc/')) {
    const articleId = currentPath.substring('/tin-tuc/'.length)
    return <TintucDetail articleId={articleId} t={t} lang={lang} setLang={setLang} onNavigate={navigateTo} />
  }

  // Render visual page from storage if slug matches
  const cmsPage = getPageBySlug(currentPath, lang)
  if (cmsPage && cmsPage.status === 'published') {
    // Pass lang/setLang so the Header language switcher on CMS pages is globally synced
    return <DynamicPage page={cmsPage} onNavigate={navigateTo} lang={lang} setLang={setLang} />
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased overflow-x-hidden font-sans">
      <Header lang={lang} setLang={setLang} t={t} />

      <main>
        <Trangchu t={t} lang={lang} />
        <Gioithieu t={t} />
        <Dichvu t={t} onNavigate={navigateTo} />
        <TintucPreview t={t} onNavigate={navigateTo} />
        <Member t={t} />
        <LienheMaps t={t} />
      </main>

      <Footer t={t} />
      <ScrollToTopButton />
    </div>
  )
}

export default App
