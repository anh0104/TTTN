import React from 'react';
import Trangchu from '../components/Trangchu';
import Gioithieu from '../components/Gioithieu';
import Dichvu from '../components/Dichvu';
import TintucPreview from '../components/TintucPreview';
import Member from '../components/Member';
import LienheMaps from '../components/LienheMaps';
import { SHARED_FIELDS, SHARED_DEFAULT_PROPS } from './sharedFields';

export const config = {
    components: {
        // ── Hero (Trang chủ) ────────────────────────────────────────────────
        Hero: {
            fields: {
                // Component-specific content fields
                tag: { type: 'text', label: 'Tag' },
                title: { type: 'text', label: 'Title' },
                desc: { type: 'textarea', label: 'Description' },
                ctaPrimary: { type: 'text', label: 'Primary CTA' },
                ctaSecondary: { type: 'text', label: 'Secondary CTA' },
                scrollDown: { type: 'text', label: 'Scroll Down Text' },
                // Shared fields: animate / background / gradient / colors / buttons
                ...SHARED_FIELDS
            },
            defaultProps: {
                tag: 'Công nghệ tương lai',
                title: 'HEXAGON Solutions',
                desc: 'Hexagon kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm, AI đến an ninh mạng, giúp doanh nghiệp bứt phá trong kỷ nguyên số.',
                ctaPrimary: 'Khám phá Dịch vụ',
                ctaSecondary: 'Liên hệ Tư vấn',
                scrollDown: 'Cuộn xuống để khám phá',
                ...SHARED_DEFAULT_PROPS
            },
            render: ({ tag, title, desc, ctaPrimary, ctaSecondary, scrollDown }) => {
                const t = {
                    hero: { tag, title, desc, ctaPrimary, ctaSecondary, scrollDown }
                };
                return <Trangchu t={t} lang="vi" />;
            }
        },

        // ── About (Giới thiệu) ───────────────────────────────────────────────
        About: {
            fields: {
                title: { type: 'text', label: 'Tiêu đề' },
                desc: { type: 'textarea', label: 'Mô tả' },
                cultureQuote: { type: 'text', label: 'Câu nói văn hóa' },
                cultureAuthor: { type: 'text', label: 'Tác giả câu nói' },
                missionTitle: { type: 'text', label: 'Tên Sứ mệnh' },
                missionDesc: { type: 'text', label: 'Mô tả Sứ mệnh' },
                visionTitle: { type: 'text', label: 'Tên Tầm nhìn' },
                visionDesc: { type: 'text', label: 'Mô tả Tầm nhìn' },
                valuesTitle: { type: 'text', label: 'Tên Giá trị' },
                valuesDesc: { type: 'text', label: 'Mô tả Giá trị' },
                foundationTitle: { type: 'text', label: 'Tên Nền tảng' },
                foundationDesc: { type: 'text', label: 'Mô tả Nền tảng' },
                ...SHARED_FIELDS
            },
            defaultProps: {
                title: 'Về Hexagon',
                desc: 'Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.',
                cultureQuote: 'Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^',
                cultureAuthor: 'Hexagon Culture',
                missionTitle: 'Sứ mệnh',
                missionDesc: 'Kiến tạo tương lai số bằng các giải pháp tiên tiến.',
                visionTitle: 'Tầm nhìn',
                visionDesc: 'Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.',
                valuesTitle: 'Giá trị cốt lõi',
                valuesDesc: 'Đổi mới - Đồng hành - Tiên phong - Minh bạch.',
                foundationTitle: 'Nền tảng',
                foundationDesc: 'Hệ sinh thái đa ngành, vững chắc và linh hoạt.',
                ...SHARED_DEFAULT_PROPS
            },
            render: (props) => {
                const t = { about: props };
                return <Gioithieu t={t} />;
            }
        },

        // ── Services (Dịch vụ) ───────────────────────────────────────────────
        Services: {
            fields: {
                title: { type: 'text', label: 'Tiêu đề' },
                subtitle: { type: 'textarea', label: 'Mô tả ngắn' },
                item1Title: { type: 'text', label: 'Lĩnh vực 1' },
                item1Desc: { type: 'text', label: 'Mô tả 1' },
                item2Title: { type: 'text', label: 'Lĩnh vực 2' },
                item2Desc: { type: 'text', label: 'Mô tả 2' },
                item3Title: { type: 'text', label: 'Lĩnh vực 3' },
                item3Desc: { type: 'text', label: 'Mô tả 3' },
                item4Title: { type: 'text', label: 'Lĩnh vực 4' },
                item4Desc: { type: 'text', label: 'Mô tả 4' },
                ...SHARED_FIELDS
            },
            defaultProps: {
                title: 'Lĩnh vực hoạt động',
                subtitle: 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:',
                item1Title: 'Phần mềm & Nền tảng',
                item1Desc: 'Phát triển phần mềm, ứng dụng di động và nền tảng số hóa doanh nghiệp.',
                item2Title: 'AI & Machine Learning',
                item2Desc: 'Ứng dụng trí tuệ nhân tạo trong phân tích dữ liệu, tự động hóa và dự đoán.',
                item3Title: 'An ninh mạng',
                item3Desc: 'Bảo vệ hệ thống, dữ liệu và hạ tầng số với các giải pháp bảo mật tiên tiến.',
                item4Title: 'Tư vấn Chiến lược',
                item4Desc: 'Đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số và đổi mới sáng tạo.',
                ...SHARED_DEFAULT_PROPS
            },
            render: (props) => {
                const t = { services: props };
                return <Dichvu t={t} />;
            }
        },

        // ── News (Tin tức) ───────────────────────────────────────────────────
        News: {
            fields: {
                title: { type: 'text', label: 'Tiêu đề' },
                subtitle: { type: 'textarea', label: 'Mô tả ngắn' },
                readMore: { type: 'text', label: 'Nút đọc tiếp' },
                item1Tag: { type: 'text', label: 'Tag Tin 1' },
                item1Title: { type: 'text', label: 'Tiêu đề Tin 1' },
                item1Desc: { type: 'text', label: 'Tóm tắt Tin 1' },
                item2Tag: { type: 'text', label: 'Tag Tin 2' },
                item2Title: { type: 'text', label: 'Tiêu đề Tin 2' },
                item2Desc: { type: 'text', label: 'Tóm tắt Tin 2' },
                item3Tag: { type: 'text', label: 'Tag Tin 3' },
                item3Title: { type: 'text', label: 'Tiêu đề Tin 3' },
                item3Desc: { type: 'text', label: 'Tóm tắt Tin 3' },
                ...SHARED_FIELDS
            },
            defaultProps: {
                title: 'Tin tức',
                subtitle: 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.',
                readMore: 'Đọc tiếp →',
                item1Tag: 'Sự kiện',
                item1Title: 'Ra mắt hệ sinh thái Hexagon 2026',
                item1Desc: 'Hexagon chính thức giới thiệu hệ sinh thái công nghệ tích hợp mới với nhiều tính năng đột phá.',
                item2Tag: 'Công nghệ',
                item2Title: 'Đổi mới trong AI và Chuyển đổi số',
                item2Desc: 'Hexagon hợp tác cùng các đối tác chiến lược để thúc đẩy ứng dụng AI trong doanh nghiệp.',
                item3Tag: 'Đối tác',
                item3Title: 'Mở rộng mạng lưới đối tác toàn cầu',
                item3Desc: 'Hexagon ký kết hợp tác với nhiều tập đoàn công nghệ hàng đầu thế giới.',
                ...SHARED_DEFAULT_PROPS
            },
            render: (props) => {
                const t = { news: props };
                return <TintucPreview t={t} />;
            }
        },

        // ── Sponsors (Đối tác) ───────────────────────────────────────────────
        Sponsors: {
            fields: {
                title: { type: 'text', label: 'Tiêu đề' },
                ...SHARED_FIELDS
            },
            defaultProps: {
                title: 'Các đối tác liên kết',
                ...SHARED_DEFAULT_PROPS
            },
            render: ({ title }) => {
                const t = { partners: { title } };
                return <Member t={t} />;
            }
        },

        // ── Contact (Liên hệ) ────────────────────────────────────────────────
        Contact: {
            fields: {
                title: { type: 'text', label: 'Tiêu đề' },
                subtitle: { type: 'textarea', label: 'Mô tả ngắn' },
                hqVal: { type: 'text', label: 'Địa chỉ Trụ sở' },
                email: { type: 'text', label: 'Email liên hệ' },
                hotline: { type: 'text', label: 'Hotline liên hệ' },
                ...SHARED_FIELDS
            },
            defaultProps: {
                title: 'Liên hệ với chúng tôi',
                subtitle: 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.',
                hqVal: '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh',
                email: 'contact@hexagon.xyz',
                hotline: '096 446 0333',
                ...SHARED_DEFAULT_PROPS
            },
            render: ({ title, subtitle, hqVal, email, hotline }) => {
                const t = {
                    contact: {
                        title,
                        subtitle,
                        hq: 'Trụ sở chính',
                        hqVal,
                        email: 'Email',
                        hotline: 'Hotline'
                    }
                };
                return <LienheMaps t={t} />;
            }
        }
    }
};

export default config;
