const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} = require('../controllers/order.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');

// User routes
router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrderById);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, getAllOrders);
router.put('/:id', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
