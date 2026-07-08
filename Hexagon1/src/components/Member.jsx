import React from 'react'

function Member({ t }) {
    const logos = [
        { type: 'img', src: 'https://webdemo.hexagon.xyz/medias/Logo%20Khoi%20E.png', alt: 'Logo Khối E' },
        { type: 'img', src: 'https://webdemo.hexagon.xyz/medias/Logo%20Khoi%20C.png', alt: 'Logo Khối C' },
        { type: 'img', src: 'https://webdemo.hexagon.xyz/medias/Logo%20Khoi%20D.png', alt: 'Logo Khối D' },
        { type: 'img', src: 'https://webdemo.hexagon.xyz/medias/Happy%20Food.png', alt: 'Logo Happy Food' },
        {
            type: 'custom',
            id: 'ecobook',
            theme: 'eco',
            svg: (
                <svg viewBox="0 0 80 40" width="80" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
                    <path d="M 15 25 C 25 15, 38 15, 40 20 C 42 15, 55 15, 65 25 C 55 18, 42 18, 40 23 C 38 18, 25 18, 15 25 Z" fill="#22c55e" />
                    <path d="M 18 18 C 26 10, 38 10, 40 15 C 42 10, 54 10, 62 18 C 54 12, 42 12, 40 17 C 38 12, 26 12, 18 18 Z" fill="#eab308" />
                    <path d="M 22 11 C 28 5, 38 5, 40 10 C 42 5, 52 5, 58 11 C 52 7, 42 7, 40 12 C 38 7, 28 7, 22 11 Z" fill="#22c55e" />
                </svg>
            ),
            text: 'ECOBOOK'
        },
        {
            type: 'custom',
            id: 'comoon',
            theme: 'comoon',
            svg: (
                <svg viewBox="0 0 80 40" width="80" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
                    <path d="M 20 12 C 30 5, 50 5, 60 12 C 55 18, 45 18, 40 18 C 35 18, 25 18, 20 12 Z" fill="#15803d" />
                    <path d="M 22 17 C 30 11, 50 11, 58 17 C 53 23, 47 23, 40 23 C 33 23, 27 23, 22 17 Z" fill="#eab308" />
                    <path d="M 25 22 C 32 17, 48 17, 55 22 C 50 30, 45 32, 40 32 C 35 32, 30 30, 25 22 Z" fill="#15803d" />
                </svg>
            ),
            text: 'COMOON'
        },
        { type: 'img', src: 'https://webdemo.hexagon.xyz/medias/B.png', alt: 'Binh Minh' },
        { type: 'img', src: 'https://webdemo.hexagon.xyz/medias/Logo%20Khoi%20F.png', alt: 'Logo Khối F' }
    ]

    // Double the list to support seamless infinite loops
    const marqueeItems = [...logos, ...logos]

    return (
        <div className="sponsor-bar">
            <div className="container max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">
                    {t.partners.title}
                </h2>
                <div className="logo-marquee">
                    <div className="marquee-track">
                        {marqueeItems.map((logo, idx) => (
                            <div key={idx} className="logo-card">
                                {logo.type === 'img' ? (
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        onError={(e) => {
                                            // Fallback dummy labels if images fail to load from network
                                            e.target.style.display = 'none'
                                            const span = document.createElement('span')
                                            span.innerText = logo.alt
                                            span.className = 'text-xs text-gray-500 font-bold'
                                            e.target.parentNode.appendChild(span)
                                        }}
                                    />
                                ) : (
                                    <div className={`custom-logo ${logo.theme}-logo`}>
                                        {logo.svg}
                                        <div className={`logo-text ${logo.theme}-text`}>{logo.text}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Member
