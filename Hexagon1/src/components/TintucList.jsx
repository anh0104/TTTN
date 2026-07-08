import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTopButton from './ScrollToTopButton'
import { ARTICLE_CONTENT, ALL_ARTICLE_IDS } from './TintucDetail'

function TintucList({ lang, setLang, onNavigate }) {
    const listData = ARTICLE_CONTENT[lang] || ARTICLE_CONTENT.vi
    
    // Fetch all articles
    const articles = ALL_ARTICLE_IDS.map(id => ({
        id,
        ...listData[id]
    })).filter(a => a.title) // filter out stub/unpopulated items if any

    const filteredArticles = articles

    const handleArticleClick = (id) => {
        if (onNavigate) {
            onNavigate(`/tin-tuc/${id}`)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const ui = {
        title: lang === 'en' ? 'News & Events' : 'Tin tức & Sự kiện',
        subtitle: lang === 'en' ? 'Stay updated with the latest news, announcements, and insights from Hexagon.' : 'Cập nhật tin tức, sự kiện và các công bố mới nhất từ Hexagon Corporation.',
        breadcrumbHome: lang === 'en' ? 'Home' : 'Trang chủ',
        readMore: lang === 'en' ? 'Read more →' : 'Đọc tiếp →',
        categoryAll: lang === 'en' ? 'All' : 'Tất cả'
    }

    // Dummy translations object matching what Header expects to avoid translation crashes
    const headerT = {
        nav: {
            home: lang === 'en' ? 'Home' : 'Trang chủ',
            about: lang === 'en' ? 'About' : 'Giới thiệu',
            services: lang === 'en' ? 'Services' : 'Dịch vụ',
            support: lang === 'en' ? 'Support' : 'Hỗ trợ',
            contact: lang === 'en' ? 'Contact' : 'Liên hệ'
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-800 antialiased overflow-x-hidden font-sans">
            <Header lang={lang} setLang={setLang} t={headerT} />


            <main className="py-10">
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
                        <span className="text-gray-600">{ui.title}</span>
                    </nav>

                    <div className="mb-10">
    <h1 className="text-5xl font-extrabold text-yellow-500">
        Tin tức
    </h1>

    <p className="text-gray-600 mt-4 text-lg">
        Tin tức mới nhất, cập nhật và thông tin từ Hexagon Corporation.
    </p>

    <div className="w-24 h-1 bg-yellow-400 rounded-full mt-6"></div>
</div>

                    {/* Articles Grid */}
                    {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.map((article) => (
                                <div
                                    key={article.id}
                                    onClick={() => handleArticleClick(article.id)}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 cursor-pointer group transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                        {article.image ? (
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient || 'from-[#0D5939] to-[#1A6B49]'} flex items-center justify-center group-hover:scale-102 transition-transform duration-500`}>
                                                <span className="text-white text-sm font-bold">Hexagon News</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <span className="text-xs text-yellow-600 font-bold uppercase tracking-wider">
                                            {article.tag}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2.5 group-hover:text-[#1A6B49] transition-colors line-clamp-2 leading-snug">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                            {article.content && article.content[0]}
                                        </p>
                                        <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-50">
                                            <span className="text-xs text-gray-400 font-medium">
                                                {article.date}
                                            </span>
                                            <span className="text-yellow-600 font-semibold text-xs group-hover:text-yellow-700 transition">
                                                {ui.readMore}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-150 text-gray-400">
                            No articles found.
                        </div>
                    )}
                </div>
            </main>

            <Footer t={headerT} />
            <ScrollToTopButton />
        </div>
    )
}

export default TintucList
