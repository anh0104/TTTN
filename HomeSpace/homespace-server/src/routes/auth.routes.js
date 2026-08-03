/**
 * routes/auth.routes.js
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
  changePasswordValidator,
} = require('../validators/auth.validator');
const validate = require('../middleware/validate.middleware');
const { verifyToken } = require('../middleware/auth.middleware');
const { loginLimiter, registerLimiter } = require('../middleware/rateLimiter.middleware');

router.post('/register', registerLimiter, registerValidator, validate, authController.register);
router.post('/login', loginLimiter, loginValidator, validate, authController.login);
router.post('/refresh-token', refreshTokenValidator, validate, authController.refreshToken);
router.post('/logout', verifyToken, authController.logout);
router.get('/me', verifyToken, authController.getMe);
router.put(
  '/change-password',
  verifyToken,
  changePasswordValidator,
  validate,
  authController.changePassword
);

module.exports = router;
