import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTopButton from './ScrollToTopButton'

// Ảnh dịch vụ dùng cho carousel sidebar - trùng với ảnh đã dùng ở trang Dịch vụ
import bg1 from '../assets/dichvu2.avif'
import bg2 from '../assets/dichvu2.avif'
import bg3 from '../assets/dichvu2.avif'
import bg4 from '../assets/dichvu2.avif'

const TRANSLATIONS = {
    vi: {
        nav: {
            home: 'Trang chủ',
            about: 'Giới thiệu',
            services: 'Dịch vụ',
            support: 'Hỗ trợ',
            contact: 'Liên hệ'
        },
        footer: {
            logoDesc: 'Hexagon Corporation - Công nghệ tiên phong, kiến tạo tương lai số với các giải pháp đổi mới và bền vững.',
            quickLinks: 'Liên kết nhanh',
            services: 'Dịch vụ',
            connect: 'Kết nối',
            copyright: 'Copyright 2026 © Hexagon Corporation. All rights reserved.'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            services: 'Services',
            support: 'Support',
            contact: 'Contact'
        },
        footer: {
            logoDesc: 'Hexagon Corporation - Pioneering technology, shaping digital future with innovative & sustainable solutions.',
            quickLinks: 'Quick Links',
            services: 'Services',
            connect: 'Connect',
            copyright: 'Copyright 2026 © Hexagon Corporation. All rights reserved.'
        }
    }
}

// Nội dung carousel "Dịch vụ của chúng tôi" hiển thị trong sidebar
const SERVICE_PREVIEWS = {
    vi: [
        { id: '1', image: bg1, title: 'Giải pháp công nghệ', desc: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất...' },
        { id: '2', image: bg2, title: 'Giải pháp thi công & lắp đặt', desc: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và...' },
        { id: '3', image: bg3, title: 'Cung cấp thiết bị CNTT', desc: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và...' },
        { id: '4', image: bg4, title: 'Dịch vụ Công nghệ thông tin', desc: 'Dịch vụ bảo mật, giám sát hệ thống 24/7 và hỗ trợ kỹ thuật, đảm bảo hoạt động doanh nghiệp luôn liên tục và...' }
    ],
    en: [
        { id: '1', image: bg1, title: 'Technology Solutions', desc: 'We design and deploy custom software solutions that optimize operations and boost performance...' },
        { id: '2', image: bg2, title: 'Construction & Installation', desc: 'Comprehensive digital transformation consulting to optimize workflows and elevate customer experience...' },
        { id: '3', image: bg3, title: 'IT Equipment Supply', desc: 'AI-powered solutions and data analytics that support smart decisions and process automation...' },
        { id: '4', image: bg4, title: 'IT Services', desc: 'Security, 24/7 system monitoring and technical support, keeping your business running continuously...' }
    ]
}

// Full article content for detail pages (keyed by article ID)
export const ARTICLE_CONTENT = {
    vi: {
        '1': {
            tag: 'Sự kiện',
            title: 'Ra mắt hệ sinh thái Hexagon 2026',
            date: '01/07/2026',
            time: '09:00',
            gradient: 'from-[#135237] to-[#196B49]',
            image: null,
            content: [
                'Hexagon Corporation chính thức giới thiệu hệ sinh thái công nghệ tích hợp mới với nhiều tính năng đột phá, đánh dấu bước ngoặt quan trọng trong chiến lược phát triển của tập đoàn.',
                'Hệ sinh thái mới bao gồm các nền tảng phần mềm, dịch vụ AI, giải pháp an ninh mạng và tư vấn chuyển đổi số — tất cả được kết nối liền mạch trên một nền tảng duy nhất.',
                'Với hệ sinh thái này, Hexagon hướng tới việc cung cấp giải pháp toàn diện cho doanh nghiệp, từ startup đến tập đoàn lớn, giúp tối ưu hóa quy trình và gia tăng hiệu suất vận hành.',
                '"Đây là kết quả của hơn 2 năm nghiên cứu và phát triển không ngừng. Chúng tôi tin rằng hệ sinh thái Hexagon 2026 sẽ mang đến giá trị vượt trội cho đối tác và khách hàng" — CEO Hexagon Corporation.'
            ]
        },
        '2': {
            tag: 'Công nghệ',
            title: 'Đổi mới trong AI và Chuyển đổi số',
            date: '15/06/2026',
            time: '10:30',
            gradient: 'from-[#0D5939] to-[#1A6B49]',
            image: null,
            content: [
                'Hexagon hợp tác cùng các đối tác chiến lược để thúc đẩy ứng dụng AI trong doanh nghiệp, mở ra kỷ nguyên mới cho chuyển đổi số tại Việt Nam.',
                'Các giải pháp AI của Hexagon được ứng dụng rộng rãi trong nhiều lĩnh vực: phân tích dữ liệu lớn, tự động hóa quy trình kinh doanh, dự đoán xu hướng thị trường và hỗ trợ ra quyết định chiến lược.',
                'Đặc biệt, nền tảng Hexagon AI Studio cho phép doanh nghiệp tùy chỉnh và triển khai các mô hình AI mà không cần đội ngũ chuyên gia kỹ thuật sâu, giúp rút ngắn thời gian từ ý tưởng đến sản phẩm.',
                'Hexagon cam kết đồng hành cùng cộng đồng doanh nghiệp Việt trên hành trình chuyển đổi số, mang đến những giải pháp công nghệ tiên tiến nhất với chi phí hợp lý.'
            ]
        },
        '3': {
            tag: 'Đối tác',
            title: 'Mở rộng mạng lưới đối tác toàn cầu',
            date: '10/06/2026',
            time: '14:00',
            gradient: 'from-[#1A6B49] to-[#41b67d]',
            image: null,
            content: [
                'Hexagon ký kết hợp tác với nhiều tập đoàn công nghệ hàng đầu thế giới, tạo nền tảng vững chắc cho sự phát triển toàn cầu.',
                'Trong quý II/2026, Hexagon đã thiết lập quan hệ đối tác chiến lược với hơn 15 tổ chức quốc tế từ châu Á, châu Âu và Bắc Mỹ, bao gồm các lĩnh vực cloud computing, cybersecurity và enterprise software.',
                'Mạng lưới đối tác toàn cầu giúp Hexagon mang đến cho khách hàng Việt Nam những giải pháp công nghệ chuẩn quốc tế, được bản địa hóa để phù hợp với thị trường nội địa.',
                'Hexagon cũng cam kết hỗ trợ các đối tác trong việc tiếp cận thị trường Đông Nam Á — một trong những thị trường công nghệ phát triển nhanh nhất thế giới.'
            ]
        },
        '4': {
            tag: 'Bảo mật',
            title: 'Giải pháp An ninh mạng thế hệ mới',
            date: '05/06/2026',
            time: '11:00',
            gradient: 'from-[#0D5939] to-[#135237]',
            image: null,
            content: [
                'Hexagon ra mắt bộ giải pháp bảo mật toàn diện cho doanh nghiệp vừa và lớn, ứng dụng công nghệ AI và Machine Learning để phát hiện và ngăn chặn các mối đe dọa mạng.',
                'Bộ giải pháp Hexagon Shield bao gồm: tường lửa thông minh, hệ thống phát hiện xâm nhập (IDS/IPS), mã hóa dữ liệu end-to-end và giám sát bảo mật 24/7.',
                'Với sự gia tăng của các cuộc tấn công mạng ngày càng tinh vi, Hexagon Shield được thiết kế để bảo vệ doanh nghiệp trước mọi hình thức tấn công, từ ransomware đến APT (Advanced Persistent Threat).',
                'Hexagon cung cấp dịch vụ tư vấn bảo mật miễn phí cho doanh nghiệp mới, giúp đánh giá rủi ro và xây dựng chiến lược bảo mật phù hợp.'
            ]
        },
        '5': {
            tag: 'Đào tạo',
            title: 'Chương trình đào tạo nhân lực công nghệ',
            date: '01/06/2026',
            time: '08:30',
            gradient: 'from-[#196B49] to-[#0D5939]',
            image: null,
            content: [
                'Hexagon hợp tác cùng các trường đại học hàng đầu để đào tạo nguồn nhân lực chất lượng cao, đáp ứng nhu cầu ngày càng tăng của ngành công nghệ thông tin.',
                'Chương trình Hexagon Academy cung cấp các khóa học chuyên sâu về phát triển phần mềm, trí tuệ nhân tạo, an ninh mạng và quản trị dữ liệu, do các chuyên gia hàng đầu trực tiếp giảng dạy.',
                'Sinh viên tham gia chương trình sẽ có cơ hội thực tập và làm việc trực tiếp tại các dự án thực tế của Hexagon, tích lũy kinh nghiệm quý báu trước khi tốt nghiệp.',
                'Hexagon cam kết tuyển dụng 100% sinh viên xuất sắc hoàn thành chương trình, với mức lương cạnh tranh và lộ trình phát triển sự nghiệp rõ ràng.'
            ]
        },
        '6': {
            tag: 'Sự kiện',
            title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá',
            date: '26/06/2026',
            time: '01:00',
            gradient: 'from-[#135237] to-[#41b67d]',
            image: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
            content: [
                'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé \'Lục Giác\' để chọn cho mình những siêu phẩm hỗ trợ đắc lực cho công việc và giải trí:',
                '• Hiệu năng đỉnh cao.\n• Thiết kế thời thượng.\n• Giá tốt bất ngờ kèm quà tặng Tết giá trị.',
                'Đừng chỉ bắt đầu năm mới - hãy chinh phục nó với những công cụ phù hợp!'
            ],
            hashtags: ['#HexagonCorporation', '#SGD', '#Technology']
        }
    },
    en: {
        '1': {
            tag: 'Event',
            title: 'Launch of Hexagon Ecosystem 2026',
            date: 'Jul 01, 2026',
            time: '09:00',
            gradient: 'from-[#135237] to-[#196B49]',
            image: null,
            content: [
                'Hexagon Corporation officially introduces an integrated technology ecosystem with breakthrough features, marking an important milestone in the group\'s development strategy.',
                'The new ecosystem includes software platforms, AI services, cybersecurity solutions, and digital transformation consulting — all seamlessly connected on a single platform.',
                'With this ecosystem, Hexagon aims to provide comprehensive solutions for businesses, from startups to large corporations, helping optimize processes and increase operational efficiency.',
                '"This is the result of over 2 years of continuous research and development. We believe the Hexagon 2026 ecosystem will deliver outstanding value to our partners and customers" — CEO Hexagon Corporation.'
            ]
        },
        '2': {
            tag: 'Technology',
            title: 'Innovation in AI & Digital Transformation',
            date: 'Jun 15, 2026',
            time: '10:30',
            gradient: 'from-[#0D5939] to-[#1A6B49]',
            image: null,
            content: [
                'Hexagon partners with strategic allies to accelerate AI adoption in businesses, opening a new era for digital transformation in Vietnam.',
                'Hexagon\'s AI solutions are widely applied across many fields: big data analytics, business process automation, market trend prediction, and strategic decision support.',
                'In particular, the Hexagon AI Studio platform allows businesses to customize and deploy AI models without deep technical expertise, shortening the time from idea to product.',
                'Hexagon is committed to accompanying the Vietnamese business community on their digital transformation journey, delivering the most advanced technology solutions at reasonable costs.'
            ]
        },
        '3': {
            tag: 'Partners',
            title: 'Expanding Global Partner Network',
            date: 'Jun 10, 2026',
            time: '14:00',
            gradient: 'from-[#1A6B49] to-[#41b67d]',
            image: null,
            content: [
                'Hexagon signs cooperation agreements with leading global technology groups, creating a solid foundation for global development.',
                'In Q2/2026, Hexagon established strategic partnerships with over 15 international organizations from Asia, Europe, and North America, including cloud computing, cybersecurity, and enterprise software domains.',
                'The global partner network helps Hexagon bring internationally standardized technology solutions to Vietnamese customers, localized to fit the domestic market.',
                'Hexagon also commits to supporting partners in accessing the Southeast Asian market — one of the fastest-growing technology markets in the world.'
            ]
        },
        '4': {
            tag: 'Security',
            title: 'Next-gen Cyber Security Solutions',
            date: 'Jun 05, 2026',
            time: '11:00',
            gradient: 'from-[#0D5939] to-[#135237]',
            image: null,
            content: [
                'Hexagon launches a comprehensive security suite for medium and large enterprises, applying AI and Machine Learning technology to detect and prevent cyber threats.',
                'The Hexagon Shield suite includes: smart firewalls, intrusion detection systems (IDS/IPS), end-to-end data encryption, and 24/7 security monitoring.',
                'With the increasing sophistication of cyber attacks, Hexagon Shield is designed to protect businesses against all forms of attack, from ransomware to APT (Advanced Persistent Threat).',
                'Hexagon provides free security consulting for new enterprises, assessing risks and building a suitable security strategy.'
            ]
        },
        '5': {
            tag: 'Training',
            title: 'Tech Talent Development Program',
            date: 'Jun 01, 2026',
            time: '08:30',
            gradient: 'from-[#196B49] to-[#0D5939]',
            image: null,
            content: [
                'Hexagon partners with top universities to train high-quality technology workforce, meeting the increasing demand of the IT industry.',
                'Hexagon Academy offers in-depth courses on software development, artificial intelligence, cybersecurity, and data management, taught directly by top experts.',
                'Students in the program will have the opportunity to intern and work on real Hexagon projects, gaining valuable experience before graduation.',
                'Hexagon commits to hiring 100% of outstanding graduates who complete the program, with competitive salaries and clear career development paths.'
            ]
        },
        '6': {
            tag: 'Event',
            title: 'Tech New Year Shopping - Upgrade Your Devices, Start Strong',
            date: 'Jun 26, 2026',
            time: '01:00',
            gradient: 'from-[#135237] to-[#41b67d]',
            image: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
            content: [
                'New year, new opportunities, new devices! Investing in technology is investing in the future. Visit \'Hexagon\' to pick the ultimate gadgets for work and entertainment:',
                '• Peak performance.\n• Trendy design.\n• Surprising prices with valuable gifts.',
                'Don\'t just start the new year — conquer it with the right tools!'
            ],
            hashtags: ['#HexagonCorporation', '#SGD', '#Technology']
        },

    }
}

// Get all article IDs for generating related articles
export const ALL_ARTICLE_IDS = ['1', '2', '3', '4', '5', '6']

// Carousel dịch vụ hiển thị trong sidebar, di chuyển cùng bài viết và dừng khi hết bài
function ServiceCarousel({ lang, onNavigate }) {
    const [index, setIndex] = useState(0)
    const items = SERVICE_PREVIEWS[lang] || SERVICE_PREVIEWS.vi
    const current = items[index]

    const goPrev = () => setIndex((prev) => (prev - 1 + items.length) % items.length)
    const goNext = () => setIndex((prev) => (prev + 1) % items.length)

    const goToService = (id) => {
        onNavigate(`/dichvu/${id}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-[#0F5A3A] py-3 px-5">
                <h3 className="text-white text-sm font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'Our Services' : 'Dịch vụ của chúng tôi'}
                </h3>
            </div>

            <div className="relative">
                <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-44 object-cover"
                />
                <button
                    onClick={goPrev}
                    aria-label="previous"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center cursor-pointer transition"
                >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={goNext}
                    aria-label="next"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center cursor-pointer transition"
                >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="px-5 pt-4 pb-3">
                <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {current.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-3">
                    {current.desc}
                </p>
                <button
                    onClick={() => goToService(current.id)}
                    className="inline-flex items-center gap-1 text-amber-500 font-semibold text-sm hover:gap-2 transition-all cursor-pointer"
                >
                    {lang === 'en' ? 'Learn more' : 'Tìm hiểu thêm'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 pb-4">
                {items.map((item, i) => (
                    <button
                        key={item.id}
                        onClick={() => setIndex(i)}
                        aria-label={`slide-${i}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            i === index ? 'w-6 bg-amber-400' : 'w-1.5 bg-gray-300'
                        }`}
                    />
                ))}
            </div>

            <button
                onClick={() => {
                    onNavigate('/')
                    setTimeout(() => {
                        const el = document.getElementById('dich-vu')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                }}
                className="w-full py-3 border-t border-gray-100 text-amber-500 font-semibold text-sm hover:bg-amber-50 transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
                {lang === 'en' ? 'View all services' : 'Xem tất cả dịch vụ'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    )
}

function TintucDetail({ articleId, t, lang, setLang, onNavigate }) {
    const localT = TRANSLATIONS[lang] || TRANSLATIONS.vi
    const articleData = ARTICLE_CONTENT[lang] || ARTICLE_CONTENT.vi
    const article = articleData[articleId]

    // Generate related articles (exclude current)
    const relatedIds = ALL_ARTICLE_IDS.filter(id => id !== articleId).slice(0, 4)
    const relatedArticles = relatedIds.map(id => ({ id, ...articleData[id] }))

    const handleShare = (platform) => {
        const url = encodeURIComponent(window.location.href)
        const title = encodeURIComponent(article?.title || '')
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            zalo: `https://zalo.me/share?url=${url}`
        }
        window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-white text-gray-800 antialiased overflow-x-hidden font-sans">
                <Header lang={lang} setLang={setLang} t={localT} />
                <main className="pt-24 pb-16">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                        <h1 className="text-3xl font-bold text-slate-800 mb-4">
                            {lang === 'en' ? 'Article not found' : 'Không tìm thấy bài viết'}
                        </h1>
                        <p className="text-gray-500 mb-8">
                            {lang === 'en' ? 'The article you are looking for does not exist.' : 'Bài viết bạn đang tìm kiếm không tồn tại.'}
                        </p>
                        <button
                            onClick={() => onNavigate('/')}
                            className="px-6 py-3 bg-[#1A6B49] hover:bg-[#135237] text-white rounded-lg font-medium text-sm transition-colors cursor-pointer"
                        >
                            {lang === 'en' ? '← Back to Home' : '← Quay lại Trang chủ'}
                        </button>
                    </div>
                </main>
                <Footer t={localT} />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-800 antialiased overflow-x-hidden font-sans">
            <Header lang={lang} setLang={setLang} t={localT} />

            <main className="pt-20">
                <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* Breadcrumb */}
                    <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1.5 flex-wrap">
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); onNavigate('/') }}
                            className="hover:text-yellow-500 transition-colors"
                        >
                            {lang === 'en' ? 'Home' : 'Trang chủ'}
                        </a>
                        <span>›</span>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); onNavigate('/') }}
                            className="hover:text-yellow-500 transition-colors"
                        >
                            {lang === 'en' ? 'Articles' : 'Bài viết'}
                        </a>
                        <span>›</span>
                        <span className="hover:text-yellow-500 transition-colors">{article.tag}</span>
                        <span>›</span>
                        <span className="text-gray-600 line-clamp-1 max-w-xs">{article.title}</span>
                    </nav>

                    {/* Article Layout */}
                    <div className="flex flex-col lg:flex-row gap-8 items-start">

                        {/* Main Article */}
                        <div className="flex-1 min-w-0">
                            <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">

                                {/* Article Header */}
                                <div className="px-6 sm:px-10 pt-8 pb-6 border-b border-gray-100">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span
                                            className="text-[0.7rem] font-bold py-[0.2rem] px-3 rounded-full uppercase tracking-wider text-white inline-block"
                                            style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}
                                        >
                                            {article.tag}
                                        </span>
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
                                        {article.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                        <span className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4 text-yellow-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {article.date}
                                        </span>
                                        {article.time && (
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-yellow-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {article.time}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4 text-yellow-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                            </svg>
                                            {lang === 'en' ? 'English' : 'Tiếng Việt'}
                                        </span>
                                    </div>
                                </div>

                                {/* Article Body */}
                                <div className="px-6 sm:px-10 py-10">
                                    <div className="space-y-5 text-gray-700 text-base leading-relaxed">
                                        {article.content.map((paragraph, idx) => (
                                            <p key={idx} className="whitespace-pre-line">
                                                {paragraph}
                                            </p>
                                        ))}

                                        {/* Article Image */}
                                        {article.image && (
                                            <div className="my-6">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full rounded-xl shadow-md"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}

                                        {/* Hashtags */}
                                        {article.hashtags && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {article.hashtags.map((tag, idx) => (
                                                    <span key={idx} className="text-yellow-600 font-medium text-sm hover:underline cursor-pointer">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Share Section */}
                                <div className="px-6 sm:px-10 py-6 border-t border-gray-100 bg-gray-50">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <span className="text-sm font-semibold text-gray-700">
                                            {lang === 'en' ? 'Share this article:' : 'Chia sẻ bài viết:'}
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => handleShare('facebook')}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2] text-white text-xs font-medium rounded-lg hover:bg-[#1565C0] transition-colors cursor-pointer"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                </svg>
                                                Facebook
                                            </button>
                                            <button
                                                onClick={() => handleShare('twitter')}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                </svg>
                                                Twitter
                                            </button>
                                            <button
                                                onClick={() => handleShare('linkedin')}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A66C2] text-white text-xs font-medium rounded-lg hover:bg-[#084E96] transition-colors cursor-pointer"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                                LinkedIn
                                            </button>
                                            <button
                                                onClick={() => handleShare('zalo')}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0068FF] text-white text-xs font-medium rounded-lg hover:bg-[#0050CC] transition-colors cursor-pointer"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12.031 3.213c-4.865 0-8.813 3.716-8.813 8.297 0 2.082.883 3.979 2.315 5.414l-1.126 4.2 4.117-2.13c1.102.392 2.286.604 3.507.604 4.865 0 8.813-3.716 8.813-8.297S16.896 3.213 12.031 3.213z" />
                                                </svg>
                                                Zalo
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </article>
                        </div>

                        {/* Sidebar - di chuyển theo bài viết bên trái, dừng lại khi hết bài (sticky trong cùng container) */}
                        <aside className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-24 self-start">
                            <button
                                onClick={() => onNavigate('/')}
                                className="inline-flex items-center gap-2 mb-4 text-yellow-600 font-semibold hover:gap-3 transition-all cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                {lang === 'en' ? 'Back to list' : 'Quay lại danh sách'}
                            </button>

                            <ServiceCarousel lang={lang} onNavigate={onNavigate} />
                        </aside>
                    </div>

                    {/* Related Articles */}
                    <section className="mt-12 pt-8 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <span className="w-1 h-7 bg-yellow-400 rounded-full inline-block shrink-0"></span>
                            {lang === 'en' ? 'Related Articles' : 'Bài viết liên quan'}
                        </h2>
                        <div className="mb-8">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {relatedArticles.map((related) => (
                                    <div
                                        key={related.id}
                                        onClick={() => {
                                            onNavigate(`/tin-tuc/${related.id}`)
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                        }}
                                        className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-yellow-300 transition-all cursor-pointer"
                                    >
                                        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                                            {related.image ? (
                                                <img
                                                    src={related.image}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br ${related.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                                                    <span className="text-white text-sm font-bold">Hexagon News</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-yellow-600 transition-colors leading-snug">
                                                {related.title}
                                            </h4>
                                            <p className="text-xs text-gray-400 mt-1.5">{related.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer t={localT} />
            <ScrollToTopButton />
        </div>
    )
}

export default TintucDetail