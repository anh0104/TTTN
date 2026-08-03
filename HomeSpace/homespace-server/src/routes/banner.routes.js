/**
 * routes/banner.routes.js
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const bannerController = require('../controllers/banner.controller');
const { bannerValidator } = require('../validators/banner.validator');
const validate = require('../middleware/validate.middleware');
const { verifyToken, authorize } = require('../middleware/auth.middleware');
const { uploadBannerImage } = require('../middleware/upload.middleware');

router.get('/', bannerController.getBanners);
router.get('/:id', bannerController.getBannerById);

router.post(
  '/',
  verifyToken,
  authorize('superadmin', 'admin'),
  uploadBannerImage.single('image'),
  bannerValidator,
  validate,
  bannerController.createBanner
);
router.put(
  '/:id',
  verifyToken,
  authorize('superadmin', 'admin'),
  uploadBannerImage.single('image'),
  bannerValidator,
  validate,
  bannerController.updateBanner
);
router.delete('/:id', verifyToken, authorize('superadmin', 'admin'), bannerController.deleteBanner);

module.exports = router;
