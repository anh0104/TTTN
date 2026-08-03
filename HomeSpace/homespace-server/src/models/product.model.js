/**
 * models/product.model.js
 * ------------------------------------------------------
 * Model Product - sản phẩm nội thất.
 * Chứa các cờ (flags) is_new / is_sale / is_best để phục vụ
 * các section "Sản phẩm mới", "Flash Sale", "Best Seller" ở trang chủ.
 * ------------------------------------------------------
 */

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'category_id',
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: { notEmpty: { msg: 'Tên sản phẩm không được để trống' } },
      },
      slug: {
        type: DataTypes.STRING(220),
        allowNull: false,
        unique: { msg: 'Slug sản phẩm đã tồn tại' },
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: { min: { args: [0], msg: 'Giá phải lớn hơn hoặc bằng 0' } },
      },
      salePrice: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
        field: 'sale_price',
        validate: { min: { args: [0], msg: 'Giá khuyến mãi phải lớn hơn hoặc bằng 0' } },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { min: { args: [0], msg: 'Số lượng không được âm' } },
      },
      material: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      isNew: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_new',
      },
      isSale: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_sale',
      },
      isBest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_best',
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      tableName: 'products',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      indexes: [
        { fields: ['category_id'] },
        { fields: ['is_new'] },
        { fields: ['is_sale'] },
        { fields: ['is_best'] },
        { fields: ['status'] },
        { fields: ['price'] },
      ],
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    Product.hasMany(models.ProductImage, {
      foreignKey: 'productId',
      as: 'images',
      onDelete: 'CASCADE',
    });
    Product.hasMany(models.CartItem, { foreignKey: 'productId', as: 'cartItems', onDelete: 'CASCADE' });
    Product.hasMany(models.OrderItem, { foreignKey: 'productId', as: 'orderItems' });
  };

  return Product;
};
