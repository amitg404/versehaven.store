const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductsByTags,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require('../controllers/product.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);
router.post('/by-tags', getProductsByTags);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
