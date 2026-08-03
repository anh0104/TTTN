/**
 * models/index.js
 * ------------------------------------------------------
 * Tự động load toàn bộ file model trong thư mục này,
 * khởi tạo với sequelize instance, và thiết lập associations
 * giữa các model thông qua hàm .associate() của từng model.
 * ------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.endsWith('.model.js')
    );
  })
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, file));
    const model = modelDefiner(sequelize, DataTypes);
    db[model.name] = model;
  });

// Thiết lập associations sau khi tất cả models đã được load
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
