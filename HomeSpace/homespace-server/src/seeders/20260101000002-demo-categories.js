'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Sofa',
        slug: 'sofa',
        description: 'Sofa phòng khách hiện đại, sang trọng',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bàn ăn',
        slug: 'ban-an',
        description: 'Bàn ăn gỗ tự nhiên cao cấp',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Giường ngủ',
        slug: 'giuong-ngu',
        description: 'Giường ngủ thiết kế tối giản',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tủ quần áo',
        slug: 'tu-quan-ao',
        description: 'Tủ quần áo thông minh, tối ưu không gian',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Đèn trang trí',
        slug: 'den-trang-tri',
        description: 'Đèn trang trí nội thất phong cách Bắc Âu',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Kệ & Tủ trang trí',
        slug: 'ke-tu-trang-tri',
        description: 'Kệ trang trí, tủ trưng bày phong cách tối giản',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
