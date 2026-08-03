'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      name: { type: Sequelize.STRING(200), allowNull: false },
      slug: { type: Sequelize.STRING(220), allowNull: false, unique: true },
      price: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      sale_price: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
      quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      material: { type: Sequelize.STRING(100), allowNull: true },
      color: { type: Sequelize.STRING(100), allowNull: true },
      size: { type: Sequelize.STRING(100), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      thumbnail: { type: Sequelize.STRING(255), allowNull: true },
      is_new: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      is_sale: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      is_best: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });

    // Index phục vụ filter/sort trang danh sách sản phẩm
    await queryInterface.addIndex('products', ['category_id']);
    await queryInterface.addIndex('products', ['is_new']);
    await queryInterface.addIndex('products', ['is_sale']);
    await queryInterface.addIndex('products', ['is_best']);
    await queryInterface.addIndex('products', ['status']);
    await queryInterface.addIndex('products', ['price']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('products');
  },
};
