/**
 * models/cartItem.model.js
 * ------------------------------------------------------
 * Model CartItem - từng dòng sản phẩm trong giỏ hàng.
 * ------------------------------------------------------
 */

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    'CartItem',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'cart_id',
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { min: { args: [1], msg: 'Số lượng phải lớn hơn 0' } },
      },
    },
    {
      tableName: 'cart_items',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      indexes: [{ unique: true, fields: ['cart_id', 'product_id'] }],
    }
  );

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
    CartItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return CartItem;
};
