import React from 'react'
import tintuc1 from "../assets/tintuc1.jpg";
import tintuc2 from "../assets/tintuc2.jpg";
import tintuc3 from "../assets/tintuc3.jpg";
import tintuc4 from "../assets/tintuc4.png";
import tintuc5 from "../assets/tintuc5.jpg";

function TintucPreview({ t, onNavigate }) {
    const articles = [
    {
        id: "1",
        tag: t.news.item1Tag,
        title: t.news.item1Title,
        desc: t.news.item1Desc,
        image: tintuc1,
    },
    {
        id: "2",
        tag: t.news.item2Tag,
        title: t.news.item2Title,
        desc: t.news.item2Desc,
        image: tintuc2,
    },
    {
        id: "3",
        tag: t.news.item3Tag,
        title: t.news.item3Title,
        desc: t.news.item3Desc,
        image: tintuc3,
    },
    {
        id: "4",
        tag: t.news.item4Tag,
        title: t.news.item4Title,
        desc: t.news.item4Desc,
        image: tintuc4,
    },
    {
        id: "5",
        tag: t.news.item5Tag,
        title: t.news.item5Title,
        desc: t.news.item5Desc,
        image: tintuc5,
    },
];

    const handleClick = (articleId) => {
        if (onNavigate) {
            onNavigate(`/tin-tuc/${articleId}`)
        }
    }

    const topRow = articles.slice(0, 2)
    const bottomRow = articles.slice(2, 5)
    const extraRow = articles.slice(5, 8)

    return (
        <section id="tin-tuc" className="py-10 md:py-16 bg-white">
            <div className="container max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                <div className="mb-8 md:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">
                        {t.news.title}
                    </h2>
                    <p className="text-gray-700 mt-2 text-sm sm:text-base leading-relaxed px-4">
                        {t.news.subtitle}
                    </p>
                    <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Top Row — 2 Featured Articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-6">
                    {topRow.map((article) => (
                        <div
                            key={article.id}
                            onClick={() => handleClick(article.id)}
                            className="bg-white rounded-xl overflow-hidden shadow-lg card-hover border border-gray-100 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-56 overflow-hidden">
    <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition duration-500"></div>
</div>

<div className="p-5">

    <span className="text-xs text-yellow-500 font-semibold uppercase tracking-wider">
        {article.tag}
    </span>

    <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 group-hover:text-[#1A6B49] transition-colors">
        {article.title}
    </h3>

    <p className="text-gray-600 text-sm leading-relaxed">
        {article.desc}
    </p>

    <span className="inline-block mt-4 text-yellow-500 font-medium text-sm">
        {t.news.readMore}
    </span>

</div>
                            
                        </div>
                    ))}
                </div>

                {/* Middle Row — 3 Articles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-6">
                    {bottomRow.map((article) => (
                        <div
                            key={article.id}
                            onClick={() => handleClick(article.id)}
                            className="bg-white rounded-xl overflow-hidden shadow-lg card-hover border border-gray-100 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-48 overflow-hidden">
    <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition duration-500"></div>
</div>
                            <div className="p-5">
                                <span className="text-xs text-yellow-500 font-semibold uppercase tracking-wider">
                                    {article.tag}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 group-hover:text-[#1A6B49] transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {article.desc}
                                </p>
                                <span className="inline-block mt-4 text-yellow-500 font-medium text-sm group-hover:text-yellow-600 transition">
                                    {t.news.readMore}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => onNavigate && onNavigate('/tin-tuc')}
                        className="inline-flex items-center gap-2 bg-[#0D5939] hover:bg-[#196B49] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    >
                        <span>{t.news.title === 'News' ? 'See all news' : 'Xem tất cả các bài viết'}</span>
                        <span className="text-lg">&gt;</span>
                    </button>
                </div>

            </div>
        </section>
    )
}

export default TintucPreview
