const express = require('express');
const router = express.Router();
const { upload, uploadCustomImage, uploadProductImage } = require('../controllers/upload.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');

// Custom image upload (authenticated users for POD)
router.post('/custom', authMiddleware, upload.single('image'), uploadCustomImage);

// Product image upload (admin only)
router.post('/product', authMiddleware, adminMiddleware, upload.single('image'), uploadProductImage);

module.exports = router;
