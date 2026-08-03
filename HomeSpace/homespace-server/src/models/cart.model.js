/**
 * models/cart.model.js
 * ------------------------------------------------------
 * Model Cart - giỏ hàng. Mỗi user có đúng 1 cart (1-1).
 * ------------------------------------------------------
 */

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Đảm bảo 1 user chỉ có 1 giỏ hàng
        field: 'user_id',
      },
    },
    {
      tableName: 'carts',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Cart.hasMany(models.CartItem, { foreignKey: 'cartId', as: 'items', onDelete: 'CASCADE' });
  };

  return Cart;
};
