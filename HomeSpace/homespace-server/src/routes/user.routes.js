/**
 * routes/user.routes.js
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { createUserValidator, updateUserValidator } = require('../validators/user.validator');
const validate = require('../middleware/validate.middleware');
const { verifyToken, authorize } = require('../middleware/auth.middleware');
const { uploadAvatar } = require('../middleware/upload.middleware');

// Toàn bộ route quản lý user chỉ dành cho Admin/SuperAdmin
router.use(verifyToken, authorize('superadmin', 'admin'));

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', createUserValidator, validate, userController.createUser);
router.put('/:id', uploadAvatar.single('avatar'), updateUserValidator, validate, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
