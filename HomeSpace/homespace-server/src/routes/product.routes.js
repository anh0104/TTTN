/**
 * routes/product.routes.js
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const { productValidator } = require('../validators/product.validator');
const validate = require('../middleware/validate.middleware');
const { verifyToken, authorize } = require('../middleware/auth.middleware');
const { uploadProductImages } = require('../middleware/upload.middleware');

// Multer field cấu hình: 1 thumbnail + tối đa 8 ảnh gallery
const productUploadFields = uploadProductImages.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 8 },
]);

// Public
router.get('/', productController.getProducts);
router.get('/:slug', productController.getProductBySlug);

// Admin/SuperAdmin only
router.post(
  '/',
  verifyToken,
  authorize('superadmin', 'admin'),
  productUploadFields,
  productValidator,
  validate,
  productController.createProduct
);
router.put(
  '/:id',
  verifyToken,
  authorize('superadmin', 'admin'),
  productUploadFields,
  productValidator,
  validate,
  productController.updateProduct
);
router.delete('/:id', verifyToken, authorize('superadmin', 'admin'), productController.deleteProduct);
router.delete(
  '/:id/images/:imageId',
  verifyToken,
  authorize('superadmin', 'admin'),
  productController.deleteProductImage
);

module.exports = router;
