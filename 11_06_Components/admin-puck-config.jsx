import React from 'react';
import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection from './components/admin-section';
import AdminHero from './components/admin-hero';
import AdminHeroSenHong from './components/admin-hero-senhong';
import AdminDepartmentCards from './components/admin-department-cards';
import AdminAboutOrg from './components/admin-about-org';

const backgroundField = {
  type: 'object',
  label: 'Nền phía sau',
  objectFields: {
    type: {
      type: 'select',
      label: 'Loại nền',
      options: [
        { label: 'Màu đơn',   value: 'color'    },
        { label: 'Gradient',  value: 'gradient'  },
        { label: 'Hình ảnh',  value: 'image'     },
      ],
    },
    color:              { type: 'text',   label: 'Màu nền (hex / rgba)',   default: '#ffffff' },
    gradientFrom:       { type: 'text',   label: 'Gradient từ màu',         default: '#3b82f6' },
    gradientTo:         { type: 'text',   label: 'Gradient đến màu',        default: '#a78bfa' },
    gradientDirection:  { type: 'text',   label: 'Hướng gradient',          default: 'to right' },
    imageUrl:           { type: 'text',   label: 'URL hình ảnh nền'                           },
  },
};

// ─────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────
export const puckConfig = {
  components: {

    // ── 1. HEADING ───────────────────────────────────────────────
    Heading: {
      label: 'Tiêu đề',
      fields: {
        content: { type: 'text',   label: 'Nội dung', contentEditable: true },
        level: {
          type: 'select', label: 'Cấp độ',
          options: [
            { label: 'H1', value: 1 }, { label: 'H2', value: 2 },
            { label: 'H3', value: 3 }, { label: 'H4', value: 4 },
            { label: 'H5', value: 5 }, { label: 'H6', value: 6 },
          ],
        },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái',  value: 'left'   },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right'  },
          ],
        },
      },
      defaultProps: { content: 'Tiêu đề', level: 2, align: 'left' },
      render: (props) => <AdminHeading {...props} />,
    },

    // ── 2. TEXT ──────────────────────────────────────────────────
    Text: {
      label: 'Văn bản',
      fields: {
        content: { type: 'textarea', label: 'Nội dung', contentEditable: true },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái',  value: 'left'    },
            { label: 'Giữa', value: 'center'  },
            { label: 'Phải', value: 'right'   },
            { label: 'Đều',  value: 'justify' },
          ],
        },
      },
      defaultProps: { content: 'Nhập văn bản ở đây...', align: 'left' },
      render: (props) => <AdminText {...props} />,
    },

    // ── 3. IMAGE ─────────────────────────────────────────────────
    Image: {
      label: 'Ảnh',
      fields: {
        src:          { type: 'text', label: 'URL ảnh'      },
        alt:          { type: 'text', label: 'Alt text'     },
        width:        { type: 'text', label: 'Chiều rộng',  default: '100%'  },
        height:       { type: 'text', label: 'Chiều cao',   default: 'auto'  },
        borderRadius: { type: 'text', label: 'Bo góc',      default: '0'     },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái',  value: 'left'   },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right'  },
          ],
        },
      },
      defaultProps: {
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '0', align: 'center',
      },
      render: (props) => <AdminImage {...props} />,
    },

    // ── 4. SECTION ───────────────────────────────────────────────
    Section: {
      label: 'Khoảng (Section)',
      fields: {
        container: {
          type: 'select', label: 'Chiều rộng',
          options: [
            { label: 'Small (640px)',  value: 'sm' },
            { label: 'Medium (768px)', value: 'md' },
            { label: 'Large (1024px)', value: 'lg' },
            { label: 'XL (1280px)',    value: 'xl' },
          ],
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu',      value: 'color'    },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh',      value: 'image'    },
              ],
            },
            color:      { type: 'text',   label: 'Màu nền',        default: '#ffffff' },
            fromColor:  { type: 'text',   label: 'Gradient từ',    default: '#667eea' },
            toColor:    { type: 'text',   label: 'Gradient đến',   default: '#764ba2' },
            direction:  { type: 'text',   label: 'Hướng gradient', default: 'to right' },
            bg_image:   { type: 'text',   label: 'URL ảnh nền'                       },
            opacity:    { type: 'number', label: 'Độ mờ', min: 0, max: 1, step: 0.1, default: 1 },
          },
        },
        padding_x: { type: 'number', label: 'Padding ngang', min: 0, max: 16, default: 4 },
        padding_y: { type: 'number', label: 'Padding dọc',   min: 0, max: 16, default: 4 },
        content:   { type: 'slot'  },
      },
      defaultProps: {
        container: 'lg',
        background: { type: 'color', color: '#ffffff' },
        padding_x: 4, padding_y: 4,
        content: [],
      },
      render: (props) => <AdminSection {...props} />,
    },

    // ── 5. HERO (gốc) ────────────────────────────────────────────
    Hero: {
      label: 'Hero Banner',
      fields: {
        title:    { type: 'text',     label: 'Tiêu đề',    contentEditable: true },
        subtitle: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        buttons: {
          type: 'array', label: 'Danh sách nút',
          arrayFields: {
            text:  { type: 'text',   label: 'Text nút', contentEditable: true },
            url:   { type: 'text',   label: 'URL'                              },
            style: {
              type: 'select', label: 'Style',
              options: [
                { label: 'Primary',   value: 'primary'   },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Outline',   value: 'outline'   },
              ],
            },
          },
          getItemSummary: (item) => item.text,
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu',      value: 'color'    },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh',      value: 'image'    },
              ],
            },
            color:             { type: 'text', label: 'Màu nền',       default: '#ffffff'          },
            gradientFrom:      { type: 'text', label: 'Gradient từ',   default: '#667eea'          },
            gradientTo:        { type: 'text', label: 'Gradient đến',  default: '#764ba2'          },
            gradientDirection: { type: 'text', label: 'Hướng',         default: 'to bottom right'  },
            imageUrl:          { type: 'text', label: 'URL ảnh nền'                                },
          },
        },
        layout: {
          type: 'object', label: 'Bố cục',
          objectFields: {
            align: {
              type: 'select', label: 'Căn lề',
              options: [
                { label: 'Trái',  value: 'left'   },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right'  },
              ],
            },
          },
        },
      },
      defaultProps: {
        title: 'Chào mừng đến với website',
        subtitle: 'Chúng tôi cung cấp những sản phẩm và dịch vụ tốt nhất',
        buttons: [
          { text: 'Tìm hiểu thêm', url: '#',        style: 'primary' },
          { text: 'Liên hệ',       url: '#contact', style: 'outline'  },
        ],
        background: { type: 'gradient', gradientFrom: '#667eea', gradientTo: '#764ba2', gradientDirection: 'to bottom right' },
        layout: { align: 'center' },
      },
      render: (props) => <AdminHero {...props} />,
    },

    // ── 6. HERO SEN HỒNG ─────────────────────────────────────────
    HeroSenHong: {
      label: 'Hero Sen Hồng',
      fields: {
        // Nền phía sau
        background: backgroundField,

        // Glassmorphism card
        cardPosition: {
          type: 'select', label: 'Vị trí cụm Sen Hồng',
          options: [
            { label: 'Bên trái',  value: 'left'   },
            { label: 'Giữa',     value: 'center' },
            { label: 'Bên phải', value: 'right'  },
          ],
        },
        cardBorderRadius: { type: 'number', label: 'Bo góc card (px)',      min: 0, max: 60, default: 24  },
        cardOpacity:      { type: 'number', label: 'Độ trong suốt nền card (0–1)', min: 0, max: 1, step: 0.05, default: 0.55 },

        // Nội dung
        eyebrow:   { type: 'text',     label: 'Dòng nhỏ phía trên tiêu đề', contentEditable: true },
        title:     { type: 'text',     label: 'Tiêu đề lớn',                contentEditable: true },
        titleColor:{ type: 'text',     label: 'Màu tiêu đề (hex)',           default: '#F5C842'    },
        titleSize: { type: 'number',   label: 'Cỡ chữ tiêu đề (px)',        min: 20, max: 120, default: 56 },
        description:{ type: 'textarea', label: 'Đoạn mô tả',               contentEditable: true },
        descColor: { type: 'text',     label: 'Màu chữ mô tả (hex)',        default: '#ffffff'    },

        // Buttons
        buttons: {
          type: 'array', label: 'Danh sách nút',
          arrayFields: {
            text:         { type: 'text',   label: 'Chữ trong nút',        contentEditable: true },
            url:          { type: 'text',   label: 'Đường dẫn (URL)'                            },
            bgColor:      { type: 'text',   label: 'Màu nền nút (hex)',     default: '#2563eb'   },
            textColor:    { type: 'text',   label: 'Màu chữ nút (hex)',     default: '#ffffff'   },
            borderRadius: { type: 'number', label: 'Bo góc nút (px)',       min: 0, max: 60, default: 8 },
            fontSize:     { type: 'number', label: 'Cỡ chữ nút (px)',      min: 10, max: 32, default: 15 },
          },
          getItemSummary: (item) => item.text || 'Nút',
        },
      },
      defaultProps: {
        background:        { type: 'image', imageUrl: 'https://images.unsplash.com/photo-1557683304-673a23048d34?w=1400&auto=format&fit=crop' },
        cardPosition:      'left',
        cardBorderRadius:  24,
        cardOpacity:       0.55,
        eyebrow:           'LAN TỎA GIÁ TRỊ ĐẤT',
        title:             'Sen Hồng',
        titleColor:        '#F5C842',
        titleSize:         56,
        description:       'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác – Đổi mới – Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.',
        descColor:         '#ffffff',
        buttons: [
          { text: 'Tham gia cộng đồng', url: '#', bgColor: '#2563eb', textColor: '#ffffff', borderRadius: 8, fontSize: 15 },
        ],
      },
      render: (props) => <AdminHeroSenHong {...props} />,
    },

    // ── 7. DEPARTMENT CARDS ──────────────────────────────────────
    DepartmentCards: {
      label: 'Các Ban Chuyên Môn',
      fields: {
        // Nền
        background: backgroundField,

        // Tiêu đề section
        sectionTitle:    { type: 'text', label: 'Tiêu đề section',   contentEditable: true, default: 'CÁC BAN CHUYÊN MÔN' },
        sectionSubtitle: { type: 'text', label: 'Phụ đề section',    contentEditable: true, default: 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH' },

        // Màu card
        cardGradientFrom: { type: 'text',   label: 'Card gradient từ (hex)',   default: '#3b82f6' },
        cardGradientTo:   { type: 'text',   label: 'Card gradient đến (hex)',  default: '#1e40af' },
        cardBorderRadius: { type: 'number', label: 'Bo góc card (px)', min: 0, max: 48, default: 20 },

        // Mảng cards
        cards: {
          type: 'array',
          label: 'Danh sách card (tối thiểu 3)',
          arrayFields: {
            icon:              { type: 'text',   label: 'URL icon (SVG / PNG / JPG)'             },
            name:              { type: 'text',   label: 'Tên ban',                contentEditable: true },
            buttonText:        { type: 'text',   label: 'Chữ nút',                default: 'Xem hoạt động →' },
            buttonUrl:         { type: 'text',   label: 'URL nút'                                },
            buttonBorderRadius:{ type: 'number', label: 'Bo góc nút (px)', min: 0, max: 60, default: 24 },
            buttonTextColor:   { type: 'text',   label: 'Màu chữ nút',   default: '#ffffff'      },
            buttonBgColor:     { type: 'text',   label: 'Màu nền nút (để trống = trong suốt)', default: 'transparent' },
          },
          getItemSummary: (item) => item.name || 'Card',
        },
      },
      defaultProps: {
        background:       { type: 'gradient', gradientFrom: '#dbeafe', gradientTo: '#ede9fe', gradientDirection: '135deg' },
        sectionTitle:     'CÁC BAN CHUYÊN MÔN',
        sectionSubtitle:  'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        cardGradientFrom: '#3b82f6',
        cardGradientTo:   '#1e40af',
        cardBorderRadius: 20,
        cards: [
          { icon: '', name: 'Ban Kinh tế - Đầu tư',     buttonText: 'Xem hoạt động →', buttonUrl: '#', buttonBorderRadius: 24, buttonTextColor: '#fff', buttonBgColor: 'transparent' },
          { icon: '', name: 'Ban Văn hóa - Thể thao',   buttonText: 'Xem hoạt động →', buttonUrl: '#', buttonBorderRadius: 24, buttonTextColor: '#fff', buttonBgColor: 'transparent' },
          { icon: '', name: 'Ban Xã hội - Cộng đồng',  buttonText: 'Xem hoạt động →', buttonUrl: '#', buttonBorderRadius: 24, buttonTextColor: '#fff', buttonBgColor: 'transparent' },
          { icon: '', name: 'Ban Khởi nghiệp',          buttonText: 'Xem hoạt động →', buttonUrl: '#', buttonBorderRadius: 24, buttonTextColor: '#fff', buttonBgColor: 'transparent' },
          { icon: '', name: 'Ban Giao thương quốc tế',  buttonText: 'Xem hoạt động →', buttonUrl: '#', buttonBorderRadius: 24, buttonTextColor: '#fff', buttonBgColor: 'transparent' },
        ],
      },
      render: (props) => <AdminDepartmentCards {...props} />,
    },

    // ── 8. ABOUT + ORG ───────────────────────────────────────────
    AboutOrg: {
      label: 'Về CLB & Cơ Cấu Tổ Chức',
      fields: {
        // Nền
        background: backgroundField,

        // Cột trái
        aboutTitle:      { type: 'text',  label: 'Tiêu đề cột trái', contentEditable: true, default: 'VỀ CÂU LẠC BỘ' },
        aboutParagraphs: {
          type: 'array', label: 'Các đoạn văn giới thiệu',
          arrayFields: {
            text: { type: 'textarea', label: 'Nội dung đoạn', contentEditable: true },
          },
          getItemSummary: (item) => (item.text || '').substring(0, 40) + '...',
        },
        aboutImage: { type: 'text', label: 'URL ảnh minh họa bên trái' },

        // Cột phải
        orgTitle:       { type: 'text',   label: 'Tiêu đề cột phải', contentEditable: true, default: 'CƠ CẤU TỔ CHỨC' },
        membersPerPage: { type: 'number', label: 'Số người mỗi trang slider', min: 1, max: 10, default: 3 },
        members: {
          type: 'array', label: 'Danh sách thành viên',
          arrayFields: {
            avatar:  { type: 'text', label: 'URL ảnh đại diện'             },
            name:    { type: 'text', label: 'Họ và tên',    contentEditable: true },
            clbRole: { type: 'text', label: 'Chức vụ CLB', contentEditable: true },
            bizRole: { type: 'text', label: 'Chức vụ Doanh nghiệp', contentEditable: true },
            company: { type: 'text', label: 'Doanh nghiệp',         contentEditable: true },
          },
          getItemSummary: (item) => item.name || 'Thành viên',
        },
      },
      defaultProps: {
        background: { type: 'gradient', gradientFrom: '#EDE9FA', gradientTo: '#F5EEFF', gradientDirection: '145deg' },
        aboutTitle: 'VỀ CÂU LẠC BỘ',
        aboutParagraphs: [
          { text: 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh.' },
          { text: 'Với tinh thần kết nối – đồng hành – sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.' },
        ],
        aboutImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop',
        orgTitle: 'CƠ CẤU TỔ CHỨC',
        membersPerPage: 3,
        members: [
          { avatar: 'https://randomuser.me/api/portraits/men/32.jpg',   name: 'Trần Văn Khang',   clbRole: 'Ủy viên BCH',   bizRole: 'Tổng Giám đốc',     company: 'Công ty CP Logistics Đồng Tháp' },
          { avatar: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Đỗ Thu Trang',     clbRole: 'Thủ quỹ CLB',  bizRole: 'Giám đốc Tài chính', company: 'Công ty TNHH Sen Việt' },
          { avatar: 'https://randomuser.me/api/portraits/women/65.jpg', name: 'Vũ Hoàng Long',    clbRole: 'Ủy viên BCH',   bizRole: 'Giám đốc Điều hành', company: 'Công ty Công nghệ số Mekong' },
          { avatar: 'https://randomuser.me/api/portraits/men/54.jpg',   name: 'Nguyễn Minh Tuấn', clbRole: 'Phó Chủ tịch', bizRole: 'Chủ tịch HĐQT',      company: 'Tập đoàn Đất Sen Xanh' },
          { avatar: 'https://randomuser.me/api/portraits/women/22.jpg', name: 'Lê Thị Hoa',       clbRole: 'Thư ký CLB',   bizRole: 'Giám đốc Marketing',  company: 'Công ty Sen Hồng Media' },
        ],
      },
      // render: truyền members & aboutParagraphs cần flatten
      render: ({ aboutParagraphs, ...rest }) => (
        <AdminAboutOrg
          {...rest}
          aboutParagraphs={(aboutParagraphs || []).map(p => (typeof p === 'string' ? p : p.text))}
        />
      ),
    },

  }, // end components

  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản',   components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout',   components: ['Section'] },
    { title: 'Nâng cao', components: ['Hero', 'HeroSenHong', 'DepartmentCards', 'AboutOrg'] },
  ],

  // Root
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    ),
  },
};

export default puckConfig;