# HomeSpace — Thiết kế Database (Bước 2)

Database: MySQL 8.x, charset `utf8mb4_unicode_ci`.

## 1. Ghi chú bổ sung so với yêu cầu gốc

Yêu cầu gốc liệt kê 8 bảng: `users, categories, products, product_images, banners, news, carts, cart_items`.
Để Admin Dashboard có thể hiển thị **"Tổng đơn hàng", "Doanh thu", biểu đồ đơn hàng**, hệ thống bắt buộc phải có bảng lưu đơn hàng — nếu không sẽ không có dữ liệu nguồn cho các biểu đồ này. Vì vậy tôi bổ sung thêm 3 bảng sau (sẽ nêu rõ để bạn duyệt):

| Bảng thêm | Lý do |
|---|---|
| `orders` | Lưu đơn hàng khi checkout giỏ hàng — cần cho thống kê doanh thu/đơn hàng ở Dashboard |
| `order_items` | Chi tiết từng sản phẩm trong đơn hàng (snapshot giá tại thời điểm mua) |
| `site_settings` | Lưu cấu hình "Quản lý giao diện": logo, màu chủ đạo, dark mode mặc định, bật/tắt các section trang chủ (key-value) |

Nếu bạn muốn giữ đúng 8 bảng gốc và bỏ phần đơn hàng, cho tôi biết — nhưng tôi khuyến nghị giữ `orders`/`order_items` vì Dashboard đã yêu cầu rõ các số liệu này.

## 2. Danh sách bảng đầy đủ

### `users`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | INT PK AI | |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(150) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | Hash bcrypt |
| phone | VARCHAR(20) | NULL |
| avatar | VARCHAR(255) | NULL |
| role | ENUM('superadmin','admin','editor','user') | DEFAULT 'user' |
| refresh_token | TEXT | NULL — lưu refresh token JWT hiện hành |
| status | ENUM('active','inactive') | DEFAULT 'active' |
| created_at / updated_at | DATETIME | |

### `categories`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | INT PK AI | |
| name | VARCHAR(100) | NOT NULL |
| slug | VARCHAR(120) | UNIQUE — dùng cho URL |
| description | TEXT | NULL |
| status | ENUM('active','inactive') | DEFAULT 'active' |
| created_at / updated_at | DATETIME | |

### `products`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | INT PK AI | |
| category_id | INT FK → categories.id | ON DELETE SET NULL |
| name | VARCHAR(200) | NOT NULL |
| slug | VARCHAR(220) | UNIQUE |
| price | DECIMAL(12,2) | NOT NULL |
| sale_price | DECIMAL(12,2) | NULL — giá khuyến mãi |
| quantity | INT | DEFAULT 0 |
| material | VARCHAR(100) | NULL — chất liệu |
| color | VARCHAR(100) | NULL |
| size | VARCHAR(100) | NULL — VD: "120x60x75 cm" |
| description | TEXT | NULL |
| thumbnail | VARCHAR(255) | Ảnh đại diện |
| is_new | BOOLEAN | DEFAULT false |
| is_sale | BOOLEAN | DEFAULT false |
| is_best | BOOLEAN | DEFAULT false — Best Seller |
| status | ENUM('active','inactive') | DEFAULT 'active' |
| created_at / updated_at | DATETIME | |

### `product_images`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | INT PK AI | |
| product_id | INT FK → products.id | ON DELETE CASCADE |
| image | VARCHAR(255) | NOT NULL |
| sort_order | INT | DEFAULT 0 — thứ tự hiển thị trong gallery |
| created_at | DATETIME | |

### `banners`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | INT PK AI | |
| title | VARCHAR(200) | NOT NULL |
| image | VARCHAR(255) | NOT NULL |
| link | VARCHAR(255) | NULL |
| sort_order | INT | DEFAULT 0 |
| status | ENUM('active','inactive') | DEFAULT 'active' |
| created_at / updated_at | DATETIME | |

### `news`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | INT PK AI | |
| title | VARCHAR(200) | NOT NULL |
| slug | VARCHAR(220) | UNIQUE |
| image | VARCHAR(255) | NULL |
| content | LONGTEXT | NOT NULL |
| author_id | INT FK → users.id | ON DELETE SET NULL |
| status | ENUM('draft','published') | DEFAULT 'published' |
| created_at / updated_at | DATETIME | |

### `carts`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | INT PK AI | |
| user_id | INT FK → users.id | UNIQUE — mỗi user 1 giỏ hàng, ON DELETE CASCADE |
| created_at / updated_at | DATETIME | |

### `cart_items`
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | INT PK AI | |
| cart_id | INT FK → carts.id | ON DELETE CASCADE |
| product_id | INT FK → products.id | ON DELETE CASCADE |
| quantity | INT | DEFAULT 1, CHECK > 0 |
| created_at / updated_at | DATETIME | |
| | | UNIQUE(cart_id, product_id) — 1 sản phẩm chỉ có 1 dòng trong giỏ |

### `orders` *(bổ sung)*
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | INT PK AI | |
| user_id | INT FK → users.id | ON DELETE SET NULL |
| order_code | VARCHAR(30) | UNIQUE — mã đơn hiển thị cho khách |
| full_name | VARCHAR(150) | Snapshot thông tin giao hàng |
| phone | VARCHAR(20) | |
| address | VARCHAR(255) | |
| note | TEXT | NULL |
| total_amount | DECIMAL(14,2) | NOT NULL |
| payment_method | ENUM('cod','bank_transfer') | DEFAULT 'cod' |
| status | ENUM('pending','confirmed','shipping','completed','cancelled') | DEFAULT 'pending' |
| created_at / updated_at | DATETIME | |

### `order_items` *(bổ sung)*
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | INT PK AI | |
| order_id | INT FK → orders.id | ON DELETE CASCADE |
| product_id | INT FK → products.id | ON DELETE SET NULL |
| product_name | VARCHAR(200) | Snapshot tên SP tại thời điểm mua |
| price | DECIMAL(12,2) | Snapshot giá tại thời điểm mua |
| quantity | INT | NOT NULL |

### `site_settings` *(bổ sung)*
| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | INT PK AI | |
| key | VARCHAR(100) | UNIQUE — VD: 'logo', 'primary_color', 'dark_mode_default', 'show_new_products', 'show_flash_sale', 'show_best_seller', 'show_news' |
| value | TEXT | Giá trị (string/JSON tuỳ key) |
| updated_at | DATETIME | |

## 3. Quan hệ (Relationships)

- `categories (1) — (N) products`
- `products (1) — (N) product_images`
- `users (1) — (1) carts`
- `carts (1) — (N) cart_items — (N) products` (many-to-many qua bảng trung gian cart_items)
- `users (1) — (N) orders`
- `orders (1) — (N) order_items — (N) products`
- `users (1) — (N) news` (author_id)

## 4. Index quan trọng

- `products`: index trên `category_id`, `is_new`, `is_sale`, `is_best`, `status`, `price` (phục vụ filter/sort trang sản phẩm)
- `products.slug`, `categories.slug`, `news.slug`: UNIQUE index (phục vụ URL SEO-friendly)
- `users.email`: UNIQUE index
- `orders.order_code`: UNIQUE index
