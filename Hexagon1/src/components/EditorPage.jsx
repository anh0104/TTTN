import React from 'react';
import { Puck } from '@puckeditor/core';
import '@puckeditor/core/dist/index.css';
import { getPageById, updatePage, createPage } from '../utils/cmsStore';
import { config } from '../utils/puckConfig';

function EditorPage({ pageId, onNavigate }) {
    const isNew = pageId === 'new';
    const page = isNew ? null : getPageById(pageId);

    if (!isNew && !page) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-md text-center">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy trang</h2>
                    <p className="text-gray-600 mb-6">Trang thuộc tính bạn đang cố gắng truy cập không tồn tại hoặc đã bị xóa.</p>
                    <button
                        onClick={() => onNavigate('/admin/pages')}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer"
                    >
                        Quay lại Danh sách
                    </button>
                </div>
            </div>
        );
    }

    // Display values for the top bar
    const pageTitle = isNew ? 'Trang mới' : page.title;
    const pageSlug = isNew ? '/trang-moi' : page.slug;
    const pageLang = isNew ? 'vi' : page.language;
    const pageStatus = isNew ? 'draft' : page.status;
    const initialData = isNew
        ? { content: [], root: { props: {} } }
        : (page.content || { content: [], root: {} });

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden h-screen w-screen">
            {/* Dynamic top-bar metadata editor */}
            <div className="flex justify-between items-center bg-[#f8fafc] border-b border-gray-200 px-6 py-3 cursor-default select-none shrink-0 h-14">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onNavigate('/admin/pages')}
                        className="text-gray-500 hover:text-gray-800 transition flex items-center gap-1.5 text-sm cursor-pointer border border-gray-200 bg-white px-3 py-1 rounded hover:bg-slate-50 font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Quay lại dashboard
                    </button>
                    <div className="h-4 w-[1px] bg-gray-300"></div>
                    <span className="font-bold text-slate-800">
                        {pageTitle}
                    </span>
                    <span className="text-[13px] text-gray-500 font-mono bg-gray-100/80 px-1.5 py-0.5 rounded">
                        {pageSlug}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase ${pageLang === 'en' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
                        {pageLang}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${pageStatus === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                        {pageStatus === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                </div>
            </div>

            {/* Puck Editor Container */}
            <div className="flex-1 min-h-0 relative bg-slate-100 puck-editor-canvas">
                <Puck
                    config={config}
                    data={initialData}
                    onPublish={(data) => {
                        if (isNew) {
                            // Create new page on first publish
                            const timestamp = Date.now();
                            createPage({
                                title: 'Trang mới',
                                slug: '/trang-moi-' + timestamp,
                                language: 'vi',
                                seoTitle: 'Trang mới',
                                status: 'published',
                                content: data
                            });
                        } else {
                            // Update existing page
                            updatePage(page.id, {
                                content: data,
                                status: 'published'
                            });
                        }
                        alert('Trang đã được xuất bản thành công!');
                        onNavigate('/admin/pages');
                    }}
                />
            </div>
        </div>
    );
}

export default EditorPage;
