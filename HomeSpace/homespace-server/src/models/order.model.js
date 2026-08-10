/**
 * models/order.model.js
 * ------------------------------------------------------
 * Model Order - đơn hàng (bổ sung để phục vụ Dashboard doanh thu).
 * ------------------------------------------------------
 */

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'user_id',
      },
      orderCode: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        field: 'order_code',
      },
      fullName: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: 'full_name',
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false,
        field: 'total_amount',
      },
      paymentMethod: {
        type: DataTypes.ENUM('cod', 'bank_transfer'),
        allowNull: false,
        defaultValue: 'cod',
        field: 'payment_method',
      },
      paymentStatus: {
        type: DataTypes.ENUM('unpaid', 'paid'),
        allowNull: false,
        defaultValue: 'unpaid',
        field: 'payment_status',
      },
      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'paid_at',
      },
      sepayTransactionId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'sepay_transaction_id',
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'shipping', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      tableName: 'orders',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      indexes: [{ fields: ['status'] }, { fields: ['user_id'] }],
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items', onDelete: 'CASCADE' });
  };

  return Order;
};
