'use strict';

/**
 * author_id = 2 tương ứng "Quản trị viên" (admin@homespace.vn) trong seeder users.
 */

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('news', [
      {
        title: '5 xu hướng nội thất Minimal Luxury được yêu thích năm 2026',
        slug: '5-xu-huong-noi-that-minimal-luxury-2026',
        image: '/uploads/news/news-1.jpg',
        content:
          'Phong cách Minimal Luxury đang lên ngôi nhờ sự kết hợp giữa đường nét tối giản và chất liệu cao cấp. Bài viết chia sẻ 5 xu hướng nổi bật mà bạn có thể áp dụng cho không gian sống của mình trong năm 2026.',
        author_id: 2,
        status: 'published',
        created_at: now,
        updated_at: now,
      },
      {
        title: 'Cách chọn sofa phù hợp với diện tích phòng khách',
        slug: 'cach-chon-sofa-phu-hop-voi-dien-tich-phong-khach',
        image: '/uploads/news/news-2.jpg',
        content:
          'Chọn sofa không chỉ dựa vào sở thích mà còn cần cân nhắc diện tích phòng khách, phong cách tổng thể và nhu cầu sử dụng. Cùng HomeSpace tìm hiểu bí quyết chọn sofa chuẩn không gian.',
        author_id: 2,
        status: 'published',
        created_at: now,
        updated_at: now,
      },
      {
        title: 'Bí quyết phối màu nội thất theo phong thủy',
        slug: 'bi-quyet-phoi-mau-noi-that-theo-phong-thuy',
        image: '/uploads/news/news-3.jpg',
        content:
          'Màu sắc nội thất không chỉ ảnh hưởng đến thẩm mỹ mà còn tác động đến phong thủy căn nhà. Bài viết gợi ý cách phối màu hài hoà, mang lại năng lượng tích cực cho không gian sống.',
        author_id: 2,
        status: 'published',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('news', null, {});
  },
};
