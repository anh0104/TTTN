/**
 * app.js
 * ------------------------------------------------------
 * Cấu hình Express application: middlewares toàn cục,
 * static files (ảnh upload), routes chính, error handler.
 * Tách riêng khỏi server.js để dễ viết test (supertest) sau này.
 * ------------------------------------------------------
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

// ============ SECURITY & LOGGING MIDDLEWARES ============
app.use(helmet({ crossOriginResourcePolicy: false })); // Cho phép load ảnh cross-origin từ client
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// ============ BODY PARSERS ============
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============ STATIC FILES (ảnh upload) ============
// Ảnh sẽ truy cập được qua: http://localhost:5000/uploads/products/xxx.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'HomeSpace API đang hoạt động bình thường 🚀',
    timestamp: new Date().toISOString(),
  });
});

// ============ API ROUTES ============
app.use('/api', routes);

// ============ 404 & ERROR HANDLER (luôn đặt cuối cùng) ============
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
