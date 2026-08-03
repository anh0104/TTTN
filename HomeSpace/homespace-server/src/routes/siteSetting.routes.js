/**
 * routes/siteSetting.routes.js
 * ------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const siteSettingController = require('../controllers/siteSetting.controller');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

router.get('/', siteSettingController.getSettings);
router.put('/', verifyToken, authorize('superadmin', 'admin'), siteSettingController.updateSettings);

module.exports = router;
