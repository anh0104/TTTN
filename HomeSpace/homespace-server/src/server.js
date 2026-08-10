/**
 * server.js
 * ------------------------------------------------------
 * Điểm khởi chạy (entry point) của backend HomeSpace.
 * Chịu trách nhiệm: kết nối database, lắng nghe port,
 * xử lý các sự kiện tắt ứng dụng an toàn (graceful shutdown).
 * ------------------------------------------------------
 */

require('dotenv').config();
const app = require('./app');
const { connectDB, sequelize } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Kết nối tới MySQL
    await connectDB();

    // 2. Đồng bộ models với database
    await sequelize.sync({ alter: true });
    console.log('✅ Synchronized database models with MySQL.');

    // 3. Khởi động server
    const server = app.listen(PORT, () => {
      console.log('========================================');
      console.log(`🚀 HomeSpace Server đang chạy tại cổng ${PORT}`);
      console.log(`📦 Môi trường: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 http://localhost:${PORT}/api/health`);
      console.log('========================================');
    });

    // Xử lý lỗi không được bắt (unhandled promise rejection)
    process.on('unhandledRejection', (err) => {
      console.error('❌ UNHANDLED REJECTION! Đang tắt server...', err);
      server.close(() => process.exit(1));
    });

    // Xử lý tắt server an toàn (Ctrl+C, hoặc tín hiệu từ hệ điều hành/Render)
    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM nhận được. Đang tắt server an toàn...');
      server.close(() => console.log('✅ Server đã tắt.'));
    });
  } catch (err) {
    console.error('❌ Không thể khởi động server:', err);
    process.exit(1);
  }
};

startServer();
