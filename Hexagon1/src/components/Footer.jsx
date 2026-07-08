import React from 'react'

function Footer({ t }) {
    return (
        <footer className="w-full bg-[#0D5939] py-5">
            <div className="max-w-[1350px] mx-auto px-4 text-center">
                <p className="text-gray-300 text-sm md:text-base">
                    {t?.footer?.copyright ||
                        'Copyright 2026 © Hexagon Corporation. All rights reserved.'}
                </p>
            </div>
        </footer>
    )
}

export default Footer