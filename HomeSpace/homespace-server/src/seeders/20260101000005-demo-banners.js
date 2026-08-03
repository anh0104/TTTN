'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('banners', [
      {
        title: 'Bộ sưu tập nội thất mùa hè 2026',
        image: '/uploads/banners/banner-summer-2026.jpg',
        link: '/san-pham?collection=summer-2026',
        sort_order: 1,
        status: 'active',
        created_at: now,
        updated_at: now,
      },
      {
        title: 'Sale toàn bộ sofa lên đến 30%',
        image: '/uploads/banners/banner-sofa-sale.jpg',
        link: '/san-pham?category=sofa',
        sort_order: 2,
        status: 'active',
        created_at: now,
        updated_at: now,
      },
      {
        title: 'Không gian sống tối giản - Minimal Luxury',
        image: '/uploads/banners/banner-minimal-luxury.jpg',
        link: '/san-pham',
        sort_order: 3,
        status: 'active',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('banners', null, {});
  },
};
