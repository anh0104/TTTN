/**
 * validators/news.validator.js
 * ------------------------------------------------------
 */

const { body } = require('express-validator');

const newsValidator = [
  body('title').trim().notEmpty().withMessage('Tiêu đề không được để trống').isLength({ max: 200 }),
  body('content').trim().notEmpty().withMessage('Nội dung không được để trống'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Trạng thái không hợp lệ'),
];

module.exports = { newsValidator };
