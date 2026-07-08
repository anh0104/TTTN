import React, { useState } from 'react';
import { Render } from '@puckeditor/core';
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import { config } from '../utils/puckConfig';
import { getTranslationByGroupAndLang } from '../utils/cmsStore';

// Minimal translation strings for this layout wrapper.
// Full site translations live in App.jsx — this is only for header/footer on CMS pages.
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
};

/**
 * DynamicPage — renders a single CMS page built with the Puck visual editor.
 *
 * Props:
 *   page       — the CMS page object (from cmsStore)
 *   onNavigate — SPA navigation helper (path => void)
 *   lang       — global language state from App.jsx
 *   setLang    — global language setter from App.jsx
 */
function DynamicPage({ page, onNavigate, lang, setLang }) {
    // Use global lang if provided; fall back to this page's own language
    const [localLang, setLocalLang] = useState(lang || page.language || 'vi');

    // Resolve current language (prefer global, fallback to local state)
    const currentLang = lang || localLang;
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.vi;

    /**
     * Handle language switcher click in Header.
     *
     * Strategy:
     * 1. If this page has a translationGroupId, look for a sibling page
     *    with the same group and the requested language.
     * 2. If found → navigate to it (slug may be the same, but App.jsx will
     *    re-resolve via getPageBySlug(slug, newLang)).
     * 3. If not found → just toggle the UI language without navigating.
     */
    const handleSetLang = (newLang) => {
        if (newLang === currentLang) return;

        // Update global + local state
        if (setLang) setLang(newLang);
        setLocalLang(newLang);

        // Try to find the linked translation page
        if (page.translationGroupId) {
            const linked = getTranslationByGroupAndLang(page.translationGroupId, newLang);
            if (linked && linked.status === 'published') {
                // Navigate to the translation's slug with the new language
                onNavigate(linked.slug);
                return;
            }
        }

        // No translation found — stay on page, language UI has already updated
    };

    // Determine which content field to render
    // Support both 'content' (current) and legacy 'puckData' field names
    const puckData = page.content || page.puckData;
    const hasContent = puckData && puckData.content && puckData.content.length > 0;

    return (
        <div className="min-h-screen bg-white text-gray-800 antialiased overflow-x-hidden font-sans">
            {/* Navigation header with language switcher */}
            <Header lang={currentLang} setLang={handleSetLang} t={t} />

            <main className="pt-2">
                {hasContent ? (
                    /* Render visual blocks built with Puck editor */
                    <Render config={config} data={puckData} />
                ) : (
                    /* Fallback UI when page has no visual content yet */
                    <div className="py-32 px-6 text-center max-w-xl mx-auto">
                        <h1 className="text-3xl font-bold text-slate-800 mb-4">{page.title}</h1>
                        <p className="text-gray-500">
                            Trang này trống. Hãy mở admin dashboard để chỉnh sửa nội dung visual với Puck.
                        </p>
                        <button
                            onClick={() => onNavigate('/admin/pages')}
                            className="mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition"
                        >
                            Dashboard Quản trị
                        </button>
                    </div>
                )}
            </main>

            <Footer t={t} />
            <ScrollToTopButton />
        </div>
    );
}

export default DynamicPage;
