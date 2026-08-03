'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      order_code: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      full_name: { type: Sequelize.STRING(150), allowNull: false },
      phone: { type: Sequelize.STRING(20), allowNull: false },
      address: { type: Sequelize.STRING(255), allowNull: false },
      note: { type: Sequelize.TEXT, allowNull: true },
      total_amount: { type: Sequelize.DECIMAL(14, 2), allowNull: false },
      payment_method: {
        type: Sequelize.ENUM('cod', 'bank_transfer'),
        allowNull: false,
        defaultValue: 'cod',
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'shipping', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });

    await queryInterface.addIndex('orders', ['status']);
    await queryInterface.addIndex('orders', ['user_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('orders');
  },
};
