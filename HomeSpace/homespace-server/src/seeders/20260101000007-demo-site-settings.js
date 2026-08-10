'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('site_settings', [
      { key: 'logo', value: '/uploads/site/logo.png', updated_at: now },
      { key: 'primary_color', value: '#0284c7', updated_at: now },
      { key: 'dark_mode_default', value: 'false', updated_at: now },
      { key: 'show_new_products', value: 'true', updated_at: now },
      { key: 'show_flash_sale', value: 'true', updated_at: now },
      { key: 'show_best_seller', value: 'true', updated_at: now },
      { key: 'show_news', value: 'true', updated_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('site_settings', null, {});
  },
};
