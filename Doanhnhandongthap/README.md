# CLB Doanh Nhân Đồng Tháp – Website + Puck Editor

Dự án website kéo thả với Puck Editor cho Câu lạc bộ Doanh Nhân Đồng Tháp tại TP.HCM.

## Công nghệ sử dụng

- **Vite** – Build tool
- **React 18** – UI framework
- **Tailwind CSS 4** – Styling
- **Puck Editor** – Drag-and-drop page builder
- **React Router v6** – Routing

## Cài đặt

```bash
npm install
npm run dev
```

## Cấu trúc dự án

```
src/
├── pages/
│   └── Editor.jsx          ← Trang chỉnh sửa Puck (/editor)
├── puck/
│   ├── config.jsx          ← Đăng ký các block với Puck
│   └── components/
│       ├── Header.jsx      ← Block: thanh điều hướng
│       ├── Hero.jsx        ← Block: banner hero
│       ├── About.jsx       ← Block: giới thiệu
│       ├── News.jsx        ← Block: tin tức & sự kiện
│       ├── Member.jsx      ← Block: hội viên
│       └── Footer.jsx      ← Block: chân trang
├── App.jsx                 ← Hiển thị public (3 trang)
└── main.jsx
```

## Các trang

| URL | Mô tả |
|-----|-------|
| `/` | Trang chủ |
| `/gioi-thieu` | Giới thiệu |
| `/hoi-vien` | Hội viên |
| `/editor` | **Trang chỉnh sửa Puck** |

## Cách sử dụng Editor

1. Truy cập `/editor`
2. Chọn trang muốn chỉnh sửa (Trang chủ / Giới thiệu / Hội viên)
3. **Kéo thả** các block từ panel trái vào trang
4. **Click vào block** để chỉnh sửa nội dung (text, ảnh, v.v.)
5. Nhấn **Publish** hoặc **Lưu trang** để lưu
6. Click "Xem trang" để xem kết quả

## Các block có sẵn

| Block | Chức năng | Tuỳ biến |
|-------|-----------|---------|
| **Header** | Thanh nav trên cùng | Logo, tên tổ chức |
| **Hero** | Banner chính | Tiêu đề, mô tả, ảnh nền, nút CTA |
| **About** | Giới thiệu tổ chức | Text, ảnh, số liệu thống kê |
| **News** | Tin tức & sự kiện | Danh sách bài viết (thêm/xoá/sửa) |
| **Member** | Danh sách hội viên | Avatar, tên, chức vụ, công ty |
| **Footer** | Chân trang | Địa chỉ, điện thoại, mạng xã hội |
