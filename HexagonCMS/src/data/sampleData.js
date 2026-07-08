// ─────────────────────────────────────────────────────────────
// SAMPLE DATA — chỉ dùng để khởi tạo lần đầu nếu localStorage trống
// Sau đó mọi thao tác đều từ localStorage
// ─────────────────────────────────────────────────────────────

export const SAMPLE_PAGES = [
  {
    id: 'page-home-vi',
    title: 'Trang chủ',
    slug: 'home',
    language: 'vi',
    status: 'published',
    seoTitle: 'Hexagon – Giải pháp công nghệ',
    updatedAt: '1/7/2026',
    puckData: {
      content: [
        { type: 'HexHeader',     props: { lang: 'vi' } },
        { type: 'HexHero',       props: {} },
        { type: 'HexAbout',      props: {} },
        { type: 'HexServices',   props: {} },
        { type: 'HexNews',       props: {} },
        { type: 'HexPartners',   props: {} },
        { type: 'HexContact',    props: {} },
        { type: 'HexFooter',     props: { lang: 'vi' } },
      ],
      root: { props: {} },
    },
  },
  {
    id: 'page-news-vi',
    title: 'Tin tức',
    slug: 'tin-tuc',
    language: 'vi',
    status: 'published',
    seoTitle: 'Tin tức – Hexagon',
    updatedAt: '1/7/2026',
    puckData: {
      content: [
        { type: 'HexHeader',       props: { lang: 'vi' } },
        { type: 'HexNewsListPage', props: {} },
        { type: 'HexFooter',       props: { lang: 'vi' } },
      ],
      root: { props: {} },
    },
  },
]