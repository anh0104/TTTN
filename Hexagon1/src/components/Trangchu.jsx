import React, { useState, useEffect } from 'react'

const PHRASES = {
    vi: [
        "Hệ sinh thái Công nghệ",
        "Giải pháp Chuyển đổi số",
        "An ninh mạng Toàn diện",
        "Trí tuệ nhân tạo Đột phá"
    ],
    en: [
        "Technology Ecosystem",
        "Digital Transformation Solutions",
        "Comprehensive Cybersecurity",
        "Breakthrough Artificial Intelligence"
    ]
}

function Trangchu({ t, lang }) {
    const [currentText, setCurrentText] = useState('')
    const [phraseIndex, setPhraseIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [typingSpeed, setTypingSpeed] = useState(150)

    useEffect(() => {
        const activePhrases = PHRASES[lang] || PHRASES.vi
        const fullPhrase = activePhrases[phraseIndex % activePhrases.length]

        const handleType = () => {
            if (!isDeleting) {
                setCurrentText(fullPhrase.substring(0, currentText.length + 1))
                setTypingSpeed(100)

                if (currentText === fullPhrase) {
                    // Pause at full text
                    setTypingSpeed(2000)
                    setIsDeleting(true)
                }
            } else {
                setCurrentText(fullPhrase.substring(0, currentText.length - 1))
                setTypingSpeed(55)

                if (currentText === '') {
                    setIsDeleting(false)
                    setPhraseIndex((prev) => prev + 1)
                    setTypingSpeed(500)
                }
            }
        }

        const timer = setTimeout(handleType, typingSpeed)
        return () => clearTimeout(timer)
    }, [currentText, isDeleting, phraseIndex, typingSpeed, lang])

    return (
        <section
            id="trang-chu"
            className="fullscreen-section relative flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-br from-[#135237] via-[#196B49] to-[#41b67d]"
            style={{ backgroundColor: '#196849' }}
        >
            <div className="container max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Hero Left Content */}
                    <div className="flex flex-col items-start text-left space-y-6 lg:pr-8">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/50 bg-yellow-500/10 backdrop-blur-sm">
                            <span className="text-yellow-500 text-sm font-bold tracking-wider uppercase">
                                {t.hero.tag}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.15] tracking-tight">
                            <span className="min-h-[1.25em] inline-block font-sans text-white">
                                {currentText}
                                <span
                                    aria-hidden="true"
                                    className="inline-block w-[3px] h-[0.85em] ml-1 bg-current align-middle animate-pulse"
                                ></span>
                            </span>
                            <br />
                            <span className="inline-block mt-2 gradient-text">
                                {t.hero.title}
                            </span>
                        </h1>

                        <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-xl">
                            {t.hero.desc}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                            <a href="#dich-vu" className="btn-primary">
                                {t.hero.ctaPrimary}
                            </a>
                            <a href="#lien-he" className="btn-secondary">
                                {t.hero.ctaSecondary}
                            </a>
                        </div>
                    </div>

                    {/* Hero Right Media */}
                    <div className="relative w-full flex justify-center">
                        <div className="relative w-full max-w-none aspect-[4/3] sm:aspect-square flex justify-center items-center">
                            <img
                                src="https://metik.vn/wp-content/uploads/2026/06/globalmyc.webp"
                                alt="Hexagon Global"
                                className="w-full h-full object-contain"
                                loading="lazy"
                                onError={(e) => {
                                    // If metik image fails, fallback to a local svg or a reliable visual
                                    e.target.src = 'https://webdemo.hexagon.xyz/medias/Logo%20Khoi%20E.png'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bounce scroll down indicator */}
            <div className="absolute inset-x-0 bottom-8 flex justify-center animate-bounce z-20">
                <a
                    href="#gioi-thieu"
                    className="text-gray-300 hover:text-white flex flex-col items-center gap-1 transition-colors"
                >
                    <span className="text-sm font-medium tracking-wide">
                        {t.hero.scrollDown}
                    </span>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </a>
            </div>
        </section>
    )
}

export default Trangchu
