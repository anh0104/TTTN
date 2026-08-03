/**
 * models/productImage.model.js
 * ------------------------------------------------------
 * Model ProductImage - gallery nhiều ảnh cho 1 sản phẩm.
 * ------------------------------------------------------
 */

module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    'ProductImage',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id',
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      sortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'sort_order',
      },
    },
    {
      tableName: 'product_images',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false, // Bảng này chỉ cần created_at
    }
  );

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return ProductImage;
};
