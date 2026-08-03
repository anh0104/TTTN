# HomeSpace Server (Backend)

Backend API cho website thương mại điện tử nội thất **HomeSpace**.

## Công nghệ

- Node.js + Express.js
- MySQL + Sequelize ORM
- JWT + bcrypt (Authentication)
- Multer (Upload ảnh)

## Cấu trúc thư mục

```
src/
  config/       # Cấu hình DB, Sequelize CLI
  controllers/  # Xử lý logic request/response
  middleware/   # Auth, phân quyền, error handler, upload
  models/       # Sequelize models
  routes/       # Định nghĩa REST API endpoints
  services/     # Business logic tách khỏi controller
  uploads/      # Nơi lưu ảnh upload (products, banners, news, avatars)
  utils/        # Helper functions (ApiError, apiResponse, catchAsync)
  migrations/   # Sequelize migrations (sẽ tạo ở bước 3)
  seeders/      # Sequelize seeders (sẽ tạo ở bước 3)
  app.js        # Cấu hình Express app
  server.js     # Điểm khởi chạy server
```

## Cài đặt

```bash
cd homespace-server
npm install
cp .env.example .env
# Cập nhật thông tin MySQL trong file .env
```

## Tạo database MySQL

```sql
CREATE DATABASE homespace_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Chạy migration & seed (sau khi hoàn thành Bước 3)

```bash
npm run migrate
npm run seed
```

## Chạy server

```bash
# Development (auto reload với nodemon)
npm run dev

# Production
npm start
```

Server mặc định chạy tại: `http://localhost:5000`

Kiểm tra: `GET http://localhost:5000/api/health`

## Trạng thái tiến độ dự án

- [x] Bước 1: Khởi tạo Backend
- [ ] Bước 2: Thiết kế Database
- [ ] Bước 3: Tạo Sequelize Models
- [ ] Bước 4: Tạo REST API
- [ ] Bước 5: Tạo Authentication
- [ ] Bước 6-13: (Frontend, Admin, Responsive, Dark Mode, Deploy...)
