import React, { useState, useEffect } from 'react'
import Logo from '../assets/logo-hhc.png';
function Header({ lang, setLang, t }) {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            id="navbar"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1A6B49]/95 backdrop-blur-md shadow-lg py-1' : 'bg-[#1A6B49] py-2'
                }`}
        >
            <nav
                className="mx-auto flex justify-between items-center"
                style={{ paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}
            >
                {/* Logo and Brand */}
                <div className="flex items-center space-x-2">
                    <div className="w-16 h-16">
                        <a href="#trang-chu" className="block">
                            <img
                                src={Logo}
                                alt="Hexagon Logo"
                                className="w-full h-full object-contain"
                            />
                        </a>
                    </div>
                    <span className="text-xl font-bold text-white tracking-widest text-[#FFF]">HEXAGON</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="/#trang-chu" className="text-gray-300 hover:text-gold-accent transition">
                        {t.nav.home}
                    </a>
                    <a href="/#gioi-thieu" className="text-gray-300 hover:text-gold-accent transition">
                        {t.nav.about}
                    </a>
                    <a href="/#dich-vu" className="text-gray-300 hover:text-gold-accent transition">
                        {t.nav.services}
                    </a>
                    <a
                        href="https://support.hexagon.xyz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-gold-accent transition"
                    >
                        {t.nav.support}
                    </a>
                    <a href="/#lien-he" className="text-gray-300 hover:text-gold-accent transition">
                        {t.nav.contact}
                    </a>

                    {/* Language Switcher */}
                    <div className="lang-switcher flex items-center gap-2 ml-4">
                        <button
                            type="button"
                            title="Tiếng Việt"
                            onClick={() => setLang('vi')}
                            className={`transition-opacity cursor-pointer border-none bg-none p-0 ${lang === 'vi' ? 'lang-btn-active opacity-100' : 'lang-btn-inactive opacity-45'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-6 h-4 object-cover rounded-sm">
                                <defs>
                                    <clipPath id="vn-a">
                                        <path fillOpacity=".7" d="M-85.3 0h682.6v512H-85.3z"></path>
                                    </clipPath>
                                </defs>
                                <g fillRule="evenodd" clipPath="url(#vn-a)" transform="translate(80)scale(.9375)">
                                    <path fill="#da251d" d="M-128 0h768v512h-768z"></path>
                                    <path fill="#ff0" d="M349.6 381 260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1.1-88.5 68.4 33.9 109.6z"></path>
                                </g>
                            </svg>
                        </button>
                        <button
                            type="button"
                            title="English"
                            onClick={() => setLang('en')}
                            className={`transition-opacity cursor-pointer border-none bg-none p-0 ${lang === 'en' ? 'lang-btn-active opacity-100' : 'lang-btn-inactive opacity-45'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-6 h-4 object-cover rounded-sm">
                                <path fill="#012169" d="M0 0h640v480H0z"></path>
                                <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"></path>
                                <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"></path>
                                <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"></path>
                                <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer Menu */}
            <div
                className={`md:hidden fixed top-20 left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-40 transition-all duration-300 ease-in-out ${isOpen ? 'block opacity-100 h-auto py-2 pb-4' : 'hidden opacity-0 h-0 pointer-events-none'
                    }`}
            >
                <a
                    href="/#trang-chu"
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-6 text-base font-medium text-gray-800 hover:text-gold-accent hover:bg-gray-50 transition"
                >
                    {t.nav.home}
                </a>
                <a
                    href="/#gioi-thieu"
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-6 text-base font-medium text-gray-800 hover:text-gold-accent hover:bg-gray-50 transition"
                >
                    {t.nav.about}
                </a>
                <a
                    href="/#dich-vu"
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-6 text-base font-medium text-gray-800 hover:text-gold-accent hover:bg-gray-50 transition"
                >
                    {t.nav.services}
                </a>
                <a
                    href="https://support.hexagon.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-6 text-base font-medium text-gray-800 hover:text-gold-accent hover:bg-gray-50 transition"
                >
                    {t.nav.support}
                </a>
                <a
                    href="/#lien-he"
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-6 text-base font-medium text-gray-800 hover:text-gold-accent hover:bg-gray-50 transition"
                >
                    {t.nav.contact}
                </a>

                {/* Mobile Language Switcher */}
                <div className="lang-switcher flex items-center gap-4 px-6 pt-4 mt-2 pb-2 border-t border-gray-100">
                    <button
                        type="button"
                        title="Tiếng Việt"
                        onClick={() => {
                            setLang('vi')
                            setIsOpen(false)
                        }}
                        className={`transition-opacity cursor-pointer border-none bg-none p-0 ${lang === 'vi' ? 'lang-btn-active opacity-100' : 'lang-btn-inactive opacity-45'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-6 h-4 object-cover rounded-sm">
                            <defs>
                                <clipPath id="vn-b">
                                    <path fillOpacity=".7" d="M-85.3 0h682.6v512H-85.3z"></path>
                                </clipPath>
                            </defs>
                            <g fillRule="evenodd" clipPath="url(#vn-b)" transform="translate(80)scale(.9375)">
                                <path fill="#da251d" d="M-128 0h768v512h-768z"></path>
                                <path fill="#ff0" d="M349.6 381 260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1.1-88.5 68.4 33.9 109.6z"></path>
                            </g>
                        </svg>
                    </button>
                    <button
                        type="button"
                        title="English"
                        onClick={() => {
                            setLang('en')
                            setIsOpen(false)
                        }}
                        className={`transition-opacity cursor-pointer border-none bg-none p-0 ${lang === 'en' ? 'lang-btn-active opacity-100' : 'lang-btn-inactive opacity-45'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-6 h-4 object-cover rounded-sm">
                            <path fill="#012169" d="M0 0h640v480H0z"></path>
                            <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"></path>
                            <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"></path>
                            <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"></path>
                            <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
