/**
 * config/db.js
 * ------------------------------------------------------
 * Khởi tạo và cấu hình kết nối Sequelize tới MySQL.
 * File này export một instance Sequelize duy nhất (singleton)
 * để toàn bộ models trong dự án dùng chung.
 * ------------------------------------------------------
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  NODE_ENV,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST || '127.0.0.1',
  port: DB_PORT || 3306,
  dialect: DB_DIALECT || 'mysql',
  logging: NODE_ENV === 'development' ? console.log : false,
  timezone: '+07:00', // Múi giờ Việt Nam
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    // Tự động thêm createdAt, updatedAt
    timestamps: true,
    // Không tự động chuyển tên bảng sang số nhiều (giữ đúng theo thiết kế DB)
    freezeTableName: false,
    underscored: false,
  },
});

/**
 * Kiểm tra kết nối tới MySQL.
 * Được gọi khi khởi động server (src/server.js).
 */
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối MySQL thành công (Sequelize).');
  } catch (error) {
    console.error('❌ Không thể kết nối MySQL:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
