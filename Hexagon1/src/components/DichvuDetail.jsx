import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTopButton from './ScrollToTopButton'

// Ảnh minh họa cho từng dịch vụ - đặt file vào src/assets/dichvu/ rồi sửa tên cho khớp
import bg1 from '../assets/dichvu2.avif'
import bg2 from '../assets/dichvu2.avif'
import bg3 from '../assets/dichvu2.avif'
import bg4 from '../assets/dichvu2.avif'

const SERVICES_DATA = {
    vi: {
        '1': {
            title: 'Giải pháp công nghệ',
            heroDesc: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.',
            image: bg1,
            content: [
                'Hexagon cung cấp dịch vụ phát triển phần mềm theo yêu cầu (Custom Software Development) từ đầu đến cuối, giúp các tổ chức và doanh nghiệp số hóa toàn diện quy trình vận hành.',
                'Chúng tôi chuyên sâu trong việc xây dựng các hệ thống quản trị doanh nghiệp (ERP), quản lý quan hệ khách hàng (CRM), cổng thông tin điện tử, và các giải pháp thương mại điện tử quy chuẩn quốc tế.',
                'Đội ngũ kỹ sư giàu kinh nghiệm của chúng tôi luôn áp dụng các công nghệ tiên tiến nhất (Node.js, React, Python, Go) kết hợp quy trình quản lý dự án Agile/Scrum linh hoạt, đảm bảo sản phẩm được chuyển giao đúng hạn với chất lượng tối ưu nhất, dễ dàng mở rộng và bảo mật tuyệt đối.'
            ],
            features: [
                'Thiết kế và phát triển Web App & Mobile App chuyên nghiệp.',
                'Xây dựng hệ thống quản trị dữ liệu tập trung ERP/CRM.',
                'Tích hợp hệ thống, API bên thứ ba mượt mà và an toàn.',
                'Nâng cấp, bảo trì và tối ưu hiệu năng ứng dụng định kỳ.'
            ],
            benefits: [
                'Tự động hóa 80% quy trình làm việc thủ công.',
                'Tiết kiệm chi phí vận hành và tối ưu hóa nhân sự.',
                'Dữ liệu đồng bộ theo thời gian thực giúp đưa ra quyết định nhanh hơn.',
                'Giao diện hiện đại, thân thiện, mang lại trải nghiệm tối ưu.'
            ]
        },
        '2': {
            title: 'AI & Machine Learning',
            heroDesc: 'Xây dựng các giải pháp tự động hóa bằng AI, xử lý ngôn ngữ tự nhiên và thị giác máy tính, biến dữ liệu lớn của doanh nghiệp thành tài sản có giá trị dự báo cao.',
            image: bg2,
            content: [
                'Tại Hexagon, chúng tôi đưa AI từ lý thuyết vào ứng dụng thực tế một cách hiệu quả nhất, biến dữ liệu lớn của doanh nghiệp thành các tài sản có giá trị dự báo cao.',
                'Chúng tôi xây dựng các giải pháp tự động hóa bằng AI, Xử lý ngôn ngữ tự nhiên (NLP), Thị giác máy tính (Computer Vision), phân tích hành vi và dự báo thị trường.',
                'Nhờ vào các mô hình Machine Learning được tối ưu hóa liên tục, doanh nghiệp có thể đưa ra các quyết định thông minh hơn, dự báo các biến động rủi ro, và cá nhân hóa trải nghiệm khách hàng tối đa.'
            ],
            features: [
                'Xây dựng trợ lý ảo Chatbot thông minh hỗ trợ 24/7.',
                'Thị giác máy tính: nhận diện khuôn mặt, phát hiện lỗi sản phẩm.',
                'Phân tích dữ liệu lớn và dự báo xu hướng thị trường.',
                'Hệ thống gợi ý thông minh tăng tỷ lệ chuyển đổi doanh số.'
            ],
            benefits: [
                'Nâng cao 40% doanh số nhờ hệ thống tiếp cận khách hàng cá nhân hóa.',
                'Tự động trả lời và giải quyết khiếu nại khách hàng tức thì.',
                'Giảm thiểu tối đa lỗi trong khâu kiểm soát chất lượng sản xuất.',
                'Khai thác tối đa nguồn dữ liệu chưa được sử dụng của doanh nghiệp.'
            ]
        },
        '3': {
            title: 'An ninh mạng',
            heroDesc: 'Giải pháp an ninh mạng toàn diện giúp doanh nghiệp phòng ngừa, phát hiện và ứng phó tức thời với các cuộc tấn công mạng, bảo vệ dữ liệu và uy tín thương hiệu.',
            image: bg3,
            content: [
                'Trong kỷ nguyên số, dữ liệu là tài sản quý giá nhất. Hexagon cung cấp giải pháp an ninh mạng toàn diện giúp doanh nghiệp phòng ngừa, phát hiện và ứng phó tức thời với các cuộc tấn công mạng.',
                'Dịch vụ của chúng tôi bao gồm đánh giá lỗ hổng bảo mật (Pentest), giám sát hệ thống 24/7, và xây dựng hạ tầng bảo mật thông tin chuẩn ISO 27001.',
                'Với đội ngũ chuyên gia bảo mật hàng đầu, chúng tôi luôn đi trước một bước trước các hacker, đảm bảo hệ thống dịch vụ của bạn hoạt động liên tục và thông tin khách hàng được bảo vệ tuyệt đối.'
            ],
            features: [
                'Đánh giá và kiểm thử xâm nhập hệ thống (Pentest) định kỳ.',
                'Giám sát an ninh mạng và phát hiện đe dọa thời thực (Cyber SOC).',
                'Tư vấn và xây dựng kiến trúc mạng bảo mật Zero Trust.',
                'Khôi phục hệ thống và ứng phó sự cố rò rỉ dữ liệu khẩn cấp.'
            ],
            benefits: [
                'Bảo vệ uy tín thương hiệu doanh nghiệp trước các rủi ro bảo mật.',
                'Tuân thủ đầy đủ các tiêu chuẩn pháp lý về bảo vệ dữ liệu cá nhân.',
                'Giảm thiểu tối đa thiệt hại tài chính khi có sự cố tấn công mạng xảy ra.',
                'Giúp hệ thống luôn duy trì trạng thái sẵn sàng cao (Uptime 99.99%).'
            ]
        },
        '4': {
            title: 'Tư vấn Chiến lược',
            heroDesc: 'Tư vấn lộ trình chuyển đổi số chi tiết, phù hợp với năng lực tài chính và định hướng phát triển riêng của doanh nghiệp bạn.',
            image: bg4,
            content: [
                'Chuyển đổi số không đơn thuần là áp dụng công nghệ, mà là sự thay đổi toàn diện về tư duy và mô hình vận hành doanh nghiệp.',
                'Bằng sự hiểu biết sâu sắc về xu hướng thị trường và năng lực kỹ thuật vững chắc, Hexagon tư vấn lộ trình chuyển đổi số chi tiết, phù hợp với năng lực tài chính và định hướng phát triển của riêng bạn.',
                'Chúng tôi phối hợp chặt chẽ với ban quản trị để tái thiết quy trình, đào tạo kỹ năng số cho nhân viên, và lựa chọn giải pháp công nghệ mang lại chỉ số hoàn vốn (ROI) cao nhất.'
            ],
            features: [
                'Đánh giá mức độ trưởng thành số hiện tại của doanh nghiệp.',
                'Thiết lập kiến trúc thông tin và lộ trình chuyển đổi số tổng thể.',
                'Tư vấn lựa chọn và đấu thầu giải pháp phần mềm phù hợp.',
                'Quản lý thay đổi và đào tạo phát triển văn hóa số nội bộ.'
            ],
            benefits: [
                'Tránh lãng phí hàng tỷ đồng đầu tư vào các giải pháp công nghệ không phù hợp.',
                'Rút ngắn thời gian đưa sản phẩm và dịch vụ mới ra thị trường.',
                'Tăng tốc năng suất lao động và gắn kết nội bộ.',
                'Đón đầu các cơ hội phát triển mới trong nền kinh tế số.'
            ]
        }
    },
    en: {
        '1': {
            title: 'Technology Solutions',
            heroDesc: 'We design and deploy custom software solutions that optimize business operations, boost performance, and flexibly adapt to your long-term growth strategy.',
            image: bg1,
            content: [
                'Hexagon offers comprehensive custom software development services from end-to-end, helping organizations and enterprises digitize operational workflows.',
                'We specialize in building ERP (Enterprise Resource Planning), CRM (Customer Relationship Management), web portals, and international-standard e-commerce solutions.',
                'Our experienced engineer team utilizes modern technologies (Node.js, React, Python, Go) combined with Agile/Scrum project management, ensuring secure and scalable deliverables on time.'
            ],
            features: [
                'Professional Web App & Mobile App design and development.',
                'Centralized data management systems (ERP/CRM).',
                'Seamless and secure integration of third-party APIs and systems.',
                'Regular application maintenance, upgrades, and performance tuning.'
            ],
            benefits: [
                'Automate up to 80% of repetitive manual workflows.',
                'Reduce operating costs and optimize team efficiency.',
                'Real-time data synchronization for faster decision-making.',
                'Modern, intuitive user interfaces for optimal user experiences.'
            ]
        },
        '2': {
            title: 'AI & Machine Learning',
            heroDesc: 'We build AI-powered automation, natural language processing and computer vision solutions, turning enterprise big data into high-value predictive assets.',
            image: bg2,
            content: [
                'At Hexagon, we bring AI models from concept into practical business value, turning big data into predictive assets.',
                'We construct automation solutions powered by Artificial Intelligence, Natural Language Processing (NLP), Computer Vision, and consumer behavior analysis.',
                'Through continuously optimized Machine Learning modeling, enterprises can make smarter decisions, forecast risks, and hyper-personalize customer journeys.'
            ],
            features: [
                'Intelligent AI virtual assistants and chatbots supporting 24/7.',
                'Computer Vision services: face detection and quality inspection.',
                'Big data analytics and market trend forecasting models.',
                'Smart recommendation engines designed to boost sales conversion rates.'
            ],
            benefits: [
                'Boost sales by 40% using automated personalized targeting systems.',
                'Improve retention by resolving buyer inquiries immediately.',
                'Minimize defect rates in manufacturing quality checkpoints.',
                'Unearth and monetize previously unused enterprise data.'
            ]
        },
        '3': {
            title: 'Cyber Security',
            heroDesc: 'All-inclusive cyber security solutions that help enterprises prevent, detect, and respond to attacks in real time, protecting both data and brand reputation.',
            image: bg3,
            content: [
                'In the digital age, information is the most precious asset. Hexagon provides all-inclusive security defense to prevent, identify, and address cyber attacks in real-time.',
                'Our services include penetration testing (Pentest), round-the-clock security monitoring, and constructing systems compliant with ISO 27001.',
                'With certified security veterans, we stay one step ahead of bad actors to ensure continuous service availability and absolute customer privacy.'
            ],
            features: [
                'Periodic vulnerability assessments and system penetration testing.',
                'Real-time threat monitoring and response (Security Operations Center).',
                'Consulting and designing secure Zero Trust configurations.',
                'Emergency disaster recovery and data breach incident response.'
            ],
            benefits: [
                'Protect your brand reputation against cyber attacks and outages.',
                'Fully comply with local and global personal data regulations.',
                'Reduce the financial impact when a security incident occurs.',
                'Keep applications highly available at 99.99% uptime.'
            ]
        },
        '4': {
            title: 'Strategic Consulting',
            heroDesc: 'We design detailed digital transformation roadmaps tailored to your budget, capabilities, and long-term growth direction.',
            image: bg4,
            content: [
                'Digital transformation is more than adopting new tech; it is a fundamental shift in company culture and operational methods.',
                'With deep industry insight and solid technical experience, Hexagon designs custom roadmaps tailored to your budget and key milestones.',
                'We work close with leadership teams to re-engineer workflows, train internal champions, and select platforms providing the highest ROI.'
            ],
            features: [
                'Assessing current digital maturity levels of the organization.',
                'Designing information architecture and the enterprise digital roadmap.',
                'Software vendor selection and RFP management consulting.',
                'Change management and digital workplace training.'
            ],
            benefits: [
                'Save resources by avoiding mismatched or redundant technology investments.',
                'Accelerate Time-To-Market for new products and service lines.',
                'Enhance team productivity and multi-department communication.',
                'Capture new business opportunities in a digital economy.'
            ]
        }
    }
}

// Nội dung dùng chung cho mọi trang chi tiết dịch vụ (không đổi theo id)
const SHARED_UI = {
    vi: {
        breadcrumbHome: 'Trang chủ',
        breadcrumbService: 'Dịch vụ',
        heroCta: 'Liên hệ tư vấn',
        highlightsTitle: 'Giải pháp nổi bật',
        highlights: [
            {
                title: 'Phát triển phần mềm theo yêu cầu',
                desc: 'Thiết kế và xây dựng phần mềm "đo ni đóng giày" theo quy trình vận hành riêng của doanh nghiệp, giúp tối ưu hiệu suất và tăng khả năng cạnh tranh.'
            },
            {
                title: 'Giải pháp chuyển đổi số doanh nghiệp',
                desc: 'Tích hợp công nghệ vào toàn bộ hoạt động (quản lý, bán hàng, vận hành), giúp doanh nghiệp tự động hóa quy trình và nâng cao trải nghiệm khách hàng.'
            },
            {
                title: 'Xây dựng hệ thống nền tảng & tích hợp',
                desc: 'Phát triển hệ thống trung tâm (CRM, ERP, Dashboard…) và kết nối các nền tảng hiện có thành một hệ sinh thái đồng bộ, dữ liệu xuyên suốt.'
            }
        ],
        processTitle: 'Quy trình thực hiện',
        processSubtitle: 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
        process: [
            { number: '01', title: 'Khảo sát & phân tích yêu cầu' },
            { number: '02', title: 'Thiết kế giải pháp & kiến trúc hệ thống' },
            { number: '03', title: 'Phát triển & Thử nghiệm' },
            { number: '04', title: 'Triển khai & Bảo trì' }
        ],
        ctaTitle: 'Sẵn sàng triển khai?',
        ctaDesc: 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
        ctaHome: 'Về trang chủ',
        ctaContact: 'Liên hệ ngay',
        footerCopyright: 'Copyright 2026 © Hexagon Corporation. All rights reserved.'
    },
    en: {
        breadcrumbHome: 'Home',
        breadcrumbService: 'Services',
        heroCta: 'Get Consultation',
        highlightsTitle: 'Featured Solutions',
        highlights: [
            {
                title: 'Custom Software Development',
                desc: 'We design and build made-to-measure software matched to your own operating workflow, optimizing performance and boosting competitiveness.'
            },
            {
                title: 'Enterprise Digital Transformation',
                desc: 'We integrate technology across every operation (management, sales, workflow), helping your business automate processes and elevate the customer experience.'
            },
            {
                title: 'Platform Development & Integration',
                desc: 'We build central systems (CRM, ERP, Dashboard...) and connect existing platforms into one unified ecosystem with seamless data flow.'
            }
        ],
        processTitle: 'Our Process',
        processSubtitle: 'A professional, transparent, and effective process.',
        process: [
            { number: '01', title: 'Survey & Requirement Analysis' },
            { number: '02', title: 'Solution Design & System Architecture' },
            { number: '03', title: 'Development & Testing' },
            { number: '04', title: 'Deployment & Maintenance' }
        ],
        ctaTitle: 'Ready to grow?',
        ctaDesc: "Don't let technology be a barrier. Turn it into your competitive edge with Hexagon.",
        ctaHome: 'Back to Home',
        ctaContact: 'Contact Us',
        footerCopyright: 'Copyright 2026 © Hexagon Corporation. All rights reserved.'
    }
}

function DichvuDetail({ serviceId, lang, setLang, onNavigate }) {
    const tLang = SERVICES_DATA[lang] || SERVICES_DATA.vi
    const service = tLang[serviceId]
    const ui = SHARED_UI[lang] || SHARED_UI.vi

    const headerT = {
        nav: {
            home: lang === 'en' ? 'Home' : 'Trang chủ',
            about: lang === 'en' ? 'About' : 'Giới thiệu',
            services: lang === 'en' ? 'Services' : 'Dịch vụ',
            support: lang === 'en' ? 'Support' : 'Hỗ trợ',
            contact: lang === 'en' ? 'Contact' : 'Liên hệ'
        }
    }

    const scrollToContact = () => {
        onNavigate('/')
        setTimeout(() => {
            const el = document.getElementById('lien-he')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-white text-gray-800 antialiased overflow-x-hidden font-sans">
                <Header lang={lang} setLang={setLang} t={headerT} />
                <main className="pt-24 pb-16">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                        <h1 className="text-3xl font-bold text-slate-800 mb-4">
                            {lang === 'en' ? 'Service Not Found' : 'Không tìm thấy dịch vụ'}
                        </h1>
                        <button
                            onClick={() => onNavigate('/')}
                            className="px-6 py-3 bg-[#1A6B49] text-white rounded-lg font-medium hover:bg-[#135237] transition"
                        >
                            {lang === 'en' ? '← Back to Home' : '← Quay lại Trang chủ'}
                        </button>
                    </div>
                </main>
                <Footer t={headerT} />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white text-gray-800 antialiased overflow-x-hidden font-sans">
            <Header lang={lang} setLang={setLang} t={headerT} />

            {/* Hero Section */}
            <section className="pt-28 pb-16 bg-slate-50">
                <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="text-sm text-gray-400 mb-8 flex items-center gap-1.5 flex-wrap">
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); onNavigate('/') }}
                            className="hover:text-yellow-600 transition-colors"
                        >
                            {ui.breadcrumbHome}
                        </a>
                        <span>›</span>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); onNavigate('/#dich-vu') }}
                            className="hover:text-yellow-600 transition-colors"
                        >
                            {ui.breadcrumbService}
                        </a>
                        <span>›</span>
                        <span className="text-gray-600">{service.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        {/* Left: title + desc + cta */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-500 leading-tight mb-6">
                                {service.title}
                            </h1>
                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                                {service.heroDesc}
                            </p>
                            <button
                                onClick={scrollToContact}
                                className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-white font-bold rounded-lg shadow-sm transition cursor-pointer"
                            >
                                {ui.heroCta}
                            </button>
                        </div>

                        {/* Right: illustration */}
                        <div className="rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-72 sm:h-80 lg:h-96 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Giải pháp nổi bật */}
            <section className="py-16 bg-slate-50">
                <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                            {ui.highlightsTitle}
                        </h2>
                        <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ui.highlights.map((h, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100"
                            >
                                <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                                    {h.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {h.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quy trình thực hiện */}
            <section className="py-16 bg-slate-50">
                <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                            {ui.processTitle}
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm sm:text-base">
                            {ui.processSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {ui.process.map((step) => (
                            <div
                                key={step.number}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center"
                            >
                                <span className="block text-3xl font-extrabold text-amber-400 mb-4">
                                    {step.number}
                                </span>
                                <h3 className="text-base font-bold text-slate-900 leading-snug">
                                    {step.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pb-16 bg-slate-50">
                <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#0F5A3A] rounded-2xl px-6 sm:px-12 py-14 text-center">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
                            {ui.ctaTitle}
                        </h2>
                        <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
                            {ui.ctaDesc}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => onNavigate('/')}
                                className="w-full sm:w-auto px-7 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition cursor-pointer"
                            >
                                {ui.ctaHome}
                            </button>
                            <button
                                onClick={scrollToContact}
                                className="w-full sm:w-auto px-7 py-3 bg-amber-400 hover:bg-amber-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(251,191,36,0.5)] transition cursor-pointer"
                            >
                                {ui.ctaContact}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer t={headerT} />
            <ScrollToTopButton />
        </div>
    )
}

export default DichvuDetail