import React, { useState, useEffect } from 'react';
import { getPages, createPage, updatePage, deletePage, createTranslation } from '../utils/cmsStore';

function AdminPages({ onNavigate }) {
    const [pages, setPages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingPage, setEditingPage] = useState(null);

    // Form states for Create/Edit Modal
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [language, setLanguage] = useState('vi');
    const [seoTitle, setSeoTitle] = useState('');
    const [status, setStatus] = useState('published');

    // Filter states
    const [filterLang, setFilterLang] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDate, setFilterDate] = useState('');

    // Load pages initially
    useEffect(() => {
        setPages(getPages());
    }, []);

    const refreshPages = () => {
        setPages(getPages());
    };

    // Auto slug generation
    const handleTitleChange = (val) => {
        setTitle(val);
        if (!editingPage) {
            // Lowercase, remove accents, replace spaces with hyphens
            let clean = val.toLowerCase();
            clean = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
            clean = clean.replace(/[đĐ]/g, 'd');
            clean = clean.replace(/[^a-z0-9\s-]/g, ''); // remove special chars
            clean = clean.replace(/\s+/g, '-'); // replace spaces with hyphens
            clean = clean.replace(/-+/g, '-'); // collapse multiple hyphens
            setSlug('/' + clean.replace(/^-|-$/g, '')); // add leading slash, trim hyphens
        }
    };

    const handleOpenCreateModal = () => {
        // Navigate directly to editor for new page (no modal)
        onNavigate('/admin/pages/edit/new');
    };

    const handleOpenEditModal = (page) => {
        setEditingPage(page);
        setTitle(page.title);
        setSlug(page.slug);
        setLanguage(page.language);
        setSeoTitle(page.seoTitle || '');
        setStatus(page.status || 'published');
        setShowModal(true);
    };

    const handleSavePage = (e) => {
        e.preventDefault();
        if (!title || !slug) return;

        // Ensure slug starts with slash
        const formattedSlug = slug.startsWith('/') ? slug : '/' + slug;

        if (editingPage) {
            // Edit mode: just update metadata, stay on dashboard
            updatePage(editingPage.id, {
                title,
                slug: formattedSlug,
                language,
                seoTitle: seoTitle || title,
                status
            });
            setShowModal(false);
            refreshPages();
        } else {
            // Create mode: create page then immediately open editor
            // Language defaults to 'vi' per requirement #9
            const newPage = createPage({
                title,
                slug: formattedSlug,
                language, // 'vi' by default
                seoTitle: seoTitle || title,
                status,
                // Use root.props per Puck 0.19+ — avoids "Defining props on root is deprecated" warning
                content: { content: [], root: { props: {} } }
            });
            setShowModal(false);
            // Navigate directly to editor so user can start editing
            onNavigate(`/admin/pages/edit/${newPage.id}`);
        }
    };

    const handleDelete = (id, pageTitle) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa trang "${pageTitle}"?`)) {
            deletePage(id);
            refreshPages();
        }
    };

    const handleTranslate = (id, currLang) => {
        const newPage = createTranslation(id);
        if (newPage) {
            refreshPages();
            // Automatically navigate to Editor of new page clone without alert modal interruption
            onNavigate(`/admin/pages/edit/${newPage.id}`);
        } else {
            alert('Không thể tạo bản dịch (có thể bản dịch đã tồn tại).');
        }
    };

    // Helper date formatting function: displays as D/M/YYYY to match UX requirements
    const formatDate = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    // Helper date picker formatting (YYYY-MM-DD)
    const getYYYYMMDD = (isoString) => {
        if (!isoString) return '';
        try {
            const d = new Date(isoString);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } catch {
            return '';
        }
    };

    // Filter application logic
    const filteredPages = pages.filter((page) => {
        // 1. Language Filter
        if (filterLang !== 'all' && page.language !== filterLang) {
            return false;
        }
        // 2. Status Filter
        if (filterStatus !== 'all' && page.status !== filterStatus) {
            return false;
        }
        // 3. Date Filter (matches YYYY-MM-DD input date part)
        if (filterDate) {
            const pageDatePart = getYYYYMMDD(page.updatedAt || page.createdAt);
            if (pageDatePart !== filterDate) {
                return false;
            }
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 antialiased p-6 sm:p-10 font-sans mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3">
                            <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <h1 className="text-3xl font-bold text-slate-800">Quản lý Pages</h1>
                        </div>
                        <p className="text-gray-500 text-sm mt-1 sm:ml-11">Tạo và quản lý các trang với PUCK Visual Builder</p>
                    </div>
                    <button
                        onClick={handleOpenCreateModal}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center gap-2 cursor-pointer md:self-center"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Tạo Page Mới
                    </button>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-2 block uppercase tracking-wider">Ngôn ngữ</label>
                            <div className="relative">
                                <select
                                    value={filterLang}
                                    onChange={(e) => setFilterLang(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value="all">Tất cả</option>
                                    <option value="vi">Tiếng Việt (VI)</option>
                                    <option value="en">English (EN)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-2 block uppercase tracking-wider">Trạng thái</label>
                            <div className="relative">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value="all">Tất cả</option>
                                    <option value="published">Đã xuất bản</option>
                                    <option value="draft">Nháp</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-2 block uppercase tracking-wider">Ngày cập nhật</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    placeholder="dd/mm/yyyy"
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full mb-0 border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-widest">TIÊU ĐỀ</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-widest">SLUG</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-widest text-center">NGÔN NGỮ</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-widest text-center">TRẠNG THÁI</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-widest">CẬP NHẬT</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-widest text-right">THAO TÁC</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredPages.length > 0 ? (
                                    filteredPages.map((page) => (
                                        <tr key={page.id} className="hover:bg-slate-50/55 transition-colors">
                                            <td className="py-4.5 px-6">
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                                    </svg>
                                                    <div>
                                                        <span className="font-bold text-gray-800 text-[15px]">{page.title}</span>
                                                        <div className="text-gray-400 text-xs mt-0.5">SEO: {page.seoTitle || page.title}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4.5 px-6">
                                                <code className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded font-mono font-medium">{page.slug}</code>
                                            </td>
                                            <td className="py-4.5 px-6 text-center">
                                                <div className="inline-flex items-center justify-center">
                                                    <span className={`h-7 w-7 rounded-full text-xs font-bold flex items-center justify-center uppercase select-none ${page.language === 'en' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
                                                        {page.language}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4.5 px-6 text-center">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${page.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                                                    {page.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                                                </span>
                                            </td>
                                            <td className="py-4.5 px-6 text-gray-600 text-sm">
                                                {formatDate(page.updatedAt || page.createdAt)}
                                            </td>
                                            <td className="py-4.5 px-6 text-right">
                                                <div className="flex items-center justify-end gap-3.5">
                                                    {/* Create Translation action */}
                                                    <div className="relative group">
                                                        <button
                                                            onClick={() => handleTranslate(page.id, page.language)}
                                                            title={page.language === 'vi' ? 'Tạo bản dịch EN' : 'Tạo bản dịch VI'}
                                                            className="text-gray-500 hover:text-blue-600 transition-colors p-1.5 hover:bg-gray-100 rounded-lg cursor-pointer flex items-center justify-center"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                                                            </svg>
                                                        </button>
                                                        <span className="pointer-events-none absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[11px] py-1 px-2.5 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 font-normal">
                                                            {page.language === 'vi' ? 'Tạo bản dịch EN' : 'Tạo bản dịch VI'}
                                                        </span>
                                                    </div>

                                                    {/* Edit button */}
                                                    <button
                                                        onClick={() => onNavigate(`/admin/pages/edit/${page.id}`)}
                                                        title="Chỉnh sửa nội dung Visual"
                                                        className="text-blue-500 hover:text-blue-700 transition-colors p-1.5 hover:bg-blue-50 rounded-lg cursor-pointer flex items-center justify-center"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828L17.586 4.586z"></path>
                                                        </svg>
                                                    </button>

                                                    {/* Settings/Metadata Edit button */}
                                                    <button
                                                        onClick={() => handleOpenEditModal(page)}
                                                        title="Sửa thông tin thuộc tính"
                                                        className="text-amber-500 hover:text-amber-700 transition-colors p-1.5 hover:bg-amber-50 rounded-lg cursor-pointer flex items-center justify-center"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                        </svg>
                                                    </button>

                                                    {/* Delete button */}
                                                    <button
                                                        onClick={() => handleDelete(page.id, page.title)}
                                                        title="Xóa trang"
                                                        className="text-red-500 hover:text-red-700 transition-colors p-1.5 hover:bg-red-50 rounded-lg cursor-pointer flex items-center justify-center"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-8 px-6 text-center text-gray-400 text-sm">
                                            Không tìm thấy trang nào khớp với điều kiện lọc.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Slide-over / Modal Overlay for Create & Edit */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 transition-opacity">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-gray-100 overflow-hidden transform transition-all duration-300">
                        {/* Modal Header */}
                        <div className="bg-gray-50 border-b border-gray-100 px-6 py-4.5 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-800">
                                {editingPage ? 'Sửa thông tin Page' : 'Tạo Page Mới'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg cursor-pointer"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSavePage} className="px-6 py-5.5 space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1.5 uppercase tracking-wider">Tên trang</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    placeholder="Kiểm thử"
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1.5 uppercase tracking-wider">Đường dẫn (Slug)</label>
                                <input
                                    type="text"
                                    required
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="/kiem-thu"
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-[13px]"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1.5 uppercase tracking-wider font-sans">Tiêu đề SEO</label>
                                <input
                                    type="text"
                                    value={seoTitle}
                                    onChange={(e) => setSeoTitle(e.target.value)}
                                    placeholder="Tiêu đề hiển thị trên thanh tìm kiếm"
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 block mb-1.5 uppercase tracking-wider">Ngôn ngữ</label>
                                    <div className="relative">
                                        <select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            disabled={!!editingPage} // Lock language to preserve translation path
                                            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-750 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer disabled:bg-gray-50 disabled:text-gray-400"
                                        >
                                            <option value="vi">Tiếng Việt (vi)</option>
                                            <option value="en">English (en)</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-500 block mb-1.5 uppercase tracking-wider">Trạng thái</label>
                                    <div className="relative">
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-750 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer"
                                        >
                                            <option value="published">Đã xuất bản</option>
                                            <option value="draft">Nháp</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 pt-4.5 border-t border-gray-100 -mx-6 -mb-5 px-6 py-4 bg-gray-50">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4.5 py-2 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg font-medium text-sm transition-colors cursor-pointer"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer shadow-sm"
                                >
                                    {editingPage ? 'Lưu thay đổi' : 'Tạo trang'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPages;
