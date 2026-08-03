# HomeSpace Client (Frontend)

Frontend cho website thương mại điện tử nội thất **HomeSpace**, phong cách Minimal Luxury Interior.

## Công nghệ

- React 19 + Vite
- React Router DOM (routing)
- Redux Toolkit (state management: auth, cart, theme)
- Axios (gọi API, tự động refresh token khi hết hạn)
- TailwindCSS v4 (theme màu tùy chỉnh + Dark/Light mode)
- React Toastify (thông báo thành công/thất bại)
- Recharts (biểu đồ Dashboard - Bước 8)
- Lucide React (icon)

## Bảng màu (Minimal Luxury Interior)

| Tên | Mã màu | Utility class |
|---|---|---|
| White | `#FFFFFF` | `bg-white` |
| Wood Brown | `#8B5E3C` | `bg-wood`, `text-wood` |
| Dark | `#222222` | `bg-dark`, `text-dark` |
| Gray | `#F5F5F5` | `bg-gray-light` |
| Accent | `#C89B5B` | `bg-accent`, `text-accent` |

Dark mode dùng chiến lược `class` — bật/tắt bằng cách toggle class `dark` trên thẻ `<html>` (xử lý tự động qua `redux/slices/themeSlice.js`, chống nháy trắng nhờ script trong `index.html`).

## Cấu trúc thư mục

```
src/
  assets/       # Ảnh, icon tĩnh
  components/   # Component tái sử dụng (common, product, layout)
  layouts/      # ClientLayout, AdminLayout
  pages/        # client/, admin/, auth/ - các trang
  routes/       # Cấu hình React Router
  redux/        # Store + slices (auth, cart, theme)
  services/     # Axios instance + API service theo resource
  hooks/        # useAuth, useTheme, useDebounce
  utils/        # Hàm tiện ích (format tiền tệ, ngày tháng...)
  styles/       # index.css - Tailwind + theme + dark mode
```

## Cài đặt

```bash
cd homespace-client
npm install
cp .env.example .env
# Cập nhật VITE_API_BASE_URL trỏ tới backend (mặc định http://localhost:5000/api)
```

## Chạy dự án

```bash
npm run dev       # Development server (http://localhost:5173)
npm run build     # Build production vào thư mục dist/
npm run preview   # Xem thử bản build production
npm run lint      # Kiểm tra code với oxlint
```

## Trạng thái tiến độ dự án

- [x] Bước 6: Khởi tạo Frontend React
- [ ] Bước 7: Xây dựng Client
- [ ] Bước 8: Xây dựng Admin
- [ ] Bước 9-13: (Kết nối API, Responsive, Dark/Light Mode hoàn thiện, Deploy...)
