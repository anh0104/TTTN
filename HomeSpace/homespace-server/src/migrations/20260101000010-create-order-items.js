'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      product_name: { type: Sequelize.STRING(200), allowNull: false },
      price: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('order_items');
  },
};
