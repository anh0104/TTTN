/**
 * models/notification.model.js
 * ------------------------------------------------------
 * Model Thông Báo (Notification)
 * Quản lý thông báo thực tế về Đơn hàng, Thanh toán SePay,
 * và Thông báo Hệ thống do Admin phát hành.
 * ------------------------------------------------------
 */

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // null = Thông báo chung cho tất cả người dùng
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('order', 'system', 'promo'),
        defaultValue: 'system',
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'notifications',
      timestamps: true,
    }
  );

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Notification;
};
