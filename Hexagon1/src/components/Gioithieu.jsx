import React from 'react'
import gioithieu from '../assets/gioithieu.jpg';
function Gioithieu({ t }) {
    return (
        <section id="gioi-thieu" className="py-16 lg:py-24 bg-[#FFFFFF]">
            <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Office Image and quote card */}
                    <div className="w-full h-full flex items-center justify-center order-2 md:order-1 relative">
                        <div className="relative p-3 w-full">
                            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl transform rotate-2"></div>
                            <img
    src={gioithieu}
    alt="Văn phòng Hexagon"
    className="relative rounded-lg shadow-2xl object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[500px] w-full"
/>
                        </div>
                        <div className="absolute -bottom-4 right-4 md:bottom-8 md:-right-8 bg-white p-5 rounded-xl shadow-[0_10px_40px_rgba(217,119,6,0.3)] max-w-[280px] z-10 transition-transform hover:-translate-y-2 duration-300">
                            <p className="text-sm md:text-base italic text-gray-900 font-medium leading-relaxed">
                                "{t.about.cultureQuote}"
                            </p>
                            <p className="text-yellow-500 text-xs mt-2 font-bold uppercase tracking-wider text-right">
                                — {t.about.cultureAuthor}
                            </p>
                        </div>
                    </div>

                    {/* Description and cards grid */}
                    <div className="text-left order-1 md:order-2">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {t.about.title}
                        </h2>
                        <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
                            {t.about.desc}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                            <div className="bg-slate-50 rounded-lg p-4 card-hover">
                                <h3 className="font-semibold text-[#1D6A49] text-base sm:text-lg mb-2">
                                    {t.about.missionTitle}
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                    {t.about.missionDesc}
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-4 card-hover">
                                <h3 className="font-semibold text-[#1D6A49] text-base sm:text-lg mb-2">
                                    {t.about.visionTitle}
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                    {t.about.visionDesc}
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-4 card-hover">
                                <h3 className="font-semibold text-[#1D6A49] text-base sm:text-lg mb-2">
                                    {t.about.valuesTitle}
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                    {t.about.valuesDesc}
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-4 card-hover">
                                <h3 className="font-semibold text-[#1D6A49] text-base sm:text-lg mb-2">
                                    {t.about.foundationTitle}
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                    {t.about.foundationDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Gioithieu
