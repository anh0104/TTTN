import React from 'react'

// Đặt 4 ảnh nền màu xanh (isometric) vào thư mục assets rồi import vào đây,
// ví dụ: import bg1 from '../assets/dichvu/giai-phap-cong-nghe.png'
import bg1 from '../assets/dichvu2.avif'
import bg2 from '../assets/dichvu2.avif'
import bg3 from '../assets/dichvu2.avif'
import bg4 from '../assets/dichvu2.avif'

function Dichvu({ t, onNavigate }) {
    const handleCardClick = (id) => {
        if (onNavigate) {
            onNavigate(`/dichvu/${id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const services = [
        { id: '1', bg: bg1, title: t.services.item1Title, desc: t.services.item1Desc },
        { id: '2', bg: bg2, title: t.services.item2Title, desc: t.services.item2Desc },
        { id: '3', bg: bg3, title: t.services.item3Title, desc: t.services.item3Desc },
        { id: '4', bg: bg4, title: t.services.item4Title, desc: t.services.item4Desc },
    ];

    return (
        <section id="dich-vu" className="py-16 bg-slate-50">
            <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">
                        {t.services.title}
                    </h2>
                    <p className="text-gray-700 mt-2 text-sm sm:text-base leading-relaxed px-4">
                        {t.services.subtitle}
                    </p>
                    <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((s) => (
                        <div
                            key={s.id}
                            onClick={() => handleCardClick(s.id)}
                            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer h-[370px] group"
                        >
                            {/* Lớp nền ảnh xanh - luôn hiển thị, mờ dần khi hover */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-out group-hover:opacity-0"
                                style={{ backgroundImage: `url(${s.bg})` }}
                            />

                            {/* Lớp overlay trắng khi hover - hiện mô tả + link */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-orange-50 opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 p-6 flex flex-col">
                                {/* Icon nhỏ góc phải trên, giống ảnh mẫu */}
                                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4"
                                        />
                                    </svg>
                                </div>

                                <h3 className="text-lg font-bold text-amber-600 mb-3 pr-8">
                                    {s.title}
                                </h3>
                                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                                    {s.desc}
                                </p>
                                <span className="text-blue-600 text-sm font-medium mt-3 inline-flex items-center gap-1">
                                    Xem chi tiết
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>

                            {/* Tiêu đề luôn hiển thị ở trạng thái bình thường, mờ dần khi hover */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-start pointer-events-none transition-opacity duration-500 ease-out group-hover:opacity-0">
                                <h3 className="text-lg font-bold text-amber-400 leading-snug">
                                    {s.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Dichvu