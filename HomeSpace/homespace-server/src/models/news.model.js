/**
 * models/news.model.js
 * ------------------------------------------------------
 * Model News - tin tức / bài viết.
 * ------------------------------------------------------
 */

module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
    'News',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(220),
        allowNull: false,
        unique: { msg: 'Slug tin tức đã tồn tại' },
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'author_id',
      },
      status: {
        type: DataTypes.ENUM('draft', 'published'),
        allowNull: false,
        defaultValue: 'published',
      },
    },
    {
      tableName: 'news',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  News.associate = (models) => {
    News.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
  };

  return News;
};
