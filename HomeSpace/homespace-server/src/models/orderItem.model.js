/**
 * models/orderItem.model.js
 * ------------------------------------------------------
 * Model OrderItem - snapshot sản phẩm tại thời điểm đặt hàng
 * (lưu lại product_name & price để không bị ảnh hưởng nếu
 * sản phẩm gốc sau này bị đổi giá hoặc xóa).
 * ------------------------------------------------------
 */

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'order_id',
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'product_id',
      },
      productName: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: 'product_name',
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: { args: [1], msg: 'Số lượng phải lớn hơn 0' } },
      },
    },
    {
      tableName: 'order_items',
      timestamps: false,
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return OrderItem;
};
