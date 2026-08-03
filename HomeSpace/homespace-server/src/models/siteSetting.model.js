/**
 * models/siteSetting.model.js
 * ------------------------------------------------------
 * Model SiteSetting - lưu cấu hình giao diện dạng key-value.
 * Dùng cho mục "Quản lý giao diện": logo, màu chủ đạo,
 * dark mode mặc định, bật/tắt các section trang chủ.
 * ------------------------------------------------------
 */

module.exports = (sequelize, DataTypes) => {
  const SiteSetting = sequelize.define(
    'SiteSetting',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      key: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'site_settings',
      timestamps: true,
      createdAt: false,
      updatedAt: 'updated_at',
    }
  );

  return SiteSetting;
};
