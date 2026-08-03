'use strict';

/**
 * Mỗi sản phẩm (id 1-12, theo thứ tự seeder products) có thêm 2 ảnh gallery
 * ngoài thumbnail chính, phục vụ chức năng "Gallery nhiều ảnh + Zoom".
 */

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const images = [];

    for (let productId = 1; productId <= 12; productId += 1) {
      images.push(
        {
          product_id: productId,
          image: `/uploads/products/product-${productId}-gallery-1.jpg`,
          sort_order: 1,
          created_at: now,
        },
        {
          product_id: productId,
          image: `/uploads/products/product-${productId}-gallery-2.jpg`,
          sort_order: 2,
          created_at: now,
        }
      );
    }

    await queryInterface.bulkInsert('product_images', images);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('product_images', null, {});
  },
};
