/**
 * models/user.model.js
 * ------------------------------------------------------
 * Model User - tài khoản người dùng & quản trị viên.
 * Phân quyền: superadmin, admin, editor, user
 * ------------------------------------------------------
 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { notEmpty: { msg: 'Tên không được để trống' } },
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: { msg: 'Email đã được sử dụng' },
        validate: { isEmail: { msg: 'Email không hợp lệ' } },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('superadmin', 'admin', 'editor', 'user'),
        allowNull: false,
        defaultValue: 'user',
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'refresh_token',
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      defaultScope: {
        // Mặc định KHÔNG trả về password và refreshToken khi query User
        attributes: { exclude: ['password', 'refreshToken'] },
      },
      scopes: {
        // Dùng scope này khi cần lấy password (VD: lúc login) : User.scope('withPassword').findOne(...)
        withPassword: {
          attributes: {},
        },
      },
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Cart, { foreignKey: 'userId', as: 'cart', onDelete: 'CASCADE' });
    User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders', onDelete: 'SET NULL' });
    User.hasMany(models.News, { foreignKey: 'authorId', as: 'newsList', onDelete: 'SET NULL' });
  };

  return User;
};
