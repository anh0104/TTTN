'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('site_settings', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      key: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      value: { type: Sequelize.TEXT, allowNull: true },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('site_settings');
  },
};
