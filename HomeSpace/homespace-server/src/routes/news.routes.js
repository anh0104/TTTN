/**
 * routes/news.routes.js
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const newsController = require('../controllers/news.controller');
const { newsValidator } = require('../validators/news.validator');
const validate = require('../middleware/validate.middleware');
const { verifyToken, authorize } = require('../middleware/auth.middleware');
const { uploadNewsImage } = require('../middleware/upload.middleware');

router.get('/', newsController.getNewsList);
router.get('/:slug', newsController.getNewsBySlug);

// Admin/SuperAdmin/Editor được quản lý tin tức
router.post(
  '/',
  verifyToken,
  authorize('superadmin', 'admin', 'editor'),
  uploadNewsImage.single('image'),
  newsValidator,
  validate,
  newsController.createNews
);
router.put(
  '/:id',
  verifyToken,
  authorize('superadmin', 'admin', 'editor'),
  uploadNewsImage.single('image'),
  newsValidator,
  validate,
  newsController.updateNews
);
router.delete('/:id', verifyToken, authorize('superadmin', 'admin', 'editor'), newsController.deleteNews);

module.exports = router;
