// ============================================================
// PAGE DATA - Mỗi trang chỉ có đúng 1 Header và 1 Footer
// Puck yêu cầu mỗi block phải có props object (dù rỗng)
// ============================================================

export const PAGE_DATA = {
  home: {
    content: [
      { type: 'Header',      props: { activePage: '/' } },
      { type: 'Hero',        props: {} },
      { type: 'ProductGrid', props: {} },
      { type: 'AboutMetik',  props: {} },
      { type: 'AboutUs',     props: {} },
      { type: 'Testimonials',props: {} },
      { type: 'Footer',      props: {} },
    ],
    root: { props: {} },
  },

  'gioi-thieu': {
    content: [
      { type: 'Header',    props: { activePage: '/gioi-thieu' } },
      { type: 'AboutPage', props: {} },
      { type: 'Footer',    props: {} },
    ],
    root: { props: {} },
  },

  'san-pham': {
    content: [
      { type: 'Header',      props: { activePage: '/san-pham' } },
      { type: 'Hero',        props: {} },
      { type: 'ProductList', props: {} },
      { type: 'Footer',      props: {} },
    ],
    root: { props: {} },
  },

  'chi-tiet': {
    content: [
      { type: 'Header',        props: { activePage: '/san-pham' } },
      { type: 'ProductDetail', props: {} },
      { type: 'Footer',        props: {} },
    ],
    root: { props: {} },
  },

  'tin-tuc': {
    content: [
      { type: 'Header',   props: { activePage: '/tin-tuc' } },
      { type: 'NewsPage', props: {} },
      { type: 'Footer',   props: {} },
    ],
    root: { props: {} },
  },

  'lien-he': {
    content: [
      { type: 'Header',      props: { activePage: '/lien-he' } },
      { type: 'ContactPage', props: {} },
      { type: 'Footer',      props: {} },
    ],
    root: { props: {} },
  },
}

// Key lưu localStorage - đổi key mới hoàn toàn
export const STORAGE_KEY = 'metikkk_v1'

// Lấy data an toàn từ localStorage
// Nếu data lỗi (nhiều footer, content rỗng...) → trả về null → dùng default
export function getSavedData(pageKey) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const all = JSON.parse(raw)
    const data = all[pageKey]
    if (!data || !Array.isArray(data.content) || data.content.length === 0) return null
    // Validate: chỉ cho phép đúng 1 Header và 1 Footer
    const headers = data.content.filter(c => c.type === 'Header').length
    const footers = data.content.filter(c => c.type === 'Footer').length
    if (headers > 1 || footers > 1) return null
    return data
  } catch {
    return null
  }
}

// Lưu data vào localStorage
export function saveData(pageKey, newData) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const all = raw ? JSON.parse(raw) : {}
    all[pageKey] = newData
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    return true
  } catch {
    return false
  }
}

// Xoá toàn bộ data đã lưu
export function clearAllData() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    // Xoá cả các key cũ nếu có
    localStorage.removeItem('metik_pages')
    localStorage.removeItem('metik_pages_v2')
    return true
  } catch {
    return false
  }
}