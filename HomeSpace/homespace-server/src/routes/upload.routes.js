/**
 * routes/upload.routes.js
 * ------------------------------------------------------
 * POST /api/upload?folder=products|banners|news|avatars|site
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/upload.controller');
const { verifyToken, authorize } = require('../middleware/auth.middleware');
const { dynamicSingleUpload, dynamicMultipleUpload } = require('../middleware/upload.middleware');

router.post('/', verifyToken, authorize('superadmin', 'admin', 'editor'), dynamicSingleUpload, uploadController.uploadSingle);
router.post(
  '/multiple',
  verifyToken,
  authorize('superadmin', 'admin', 'editor'),
  dynamicMultipleUpload,
  uploadController.uploadMultiple
);

module.exports = router;
