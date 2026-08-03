/**
 * routes/category.routes.js
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');
const { categoryValidator } = require('../validators/category.validator');
const validate = require('../middleware/validate.middleware');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

// Public
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);

// Admin/SuperAdmin only
router.post(
  '/',
  verifyToken,
  authorize('superadmin', 'admin'),
  categoryValidator,
  validate,
  categoryController.createCategory
);
router.put(
  '/:id',
  verifyToken,
  authorize('superadmin', 'admin'),
  categoryValidator,
  validate,
  categoryController.updateCategory
);
router.delete('/:id', verifyToken, authorize('superadmin', 'admin'), categoryController.deleteCategory);

module.exports = router;
