/**
 * models/category.model.js
 * ------------------------------------------------------
 * Model Category - danh mục sản phẩm.
 * ------------------------------------------------------
 */

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { notEmpty: { msg: 'Tên danh mục không được để trống' } },
      },
      slug: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: { msg: 'Slug danh mục đã tồn tại' },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      tableName: 'categories',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products', onDelete: 'SET NULL' });
  };

  return Category;
};
