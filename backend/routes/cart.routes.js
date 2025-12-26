const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cart.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

// All cart routes require authentication
router.use(authMiddleware);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', removeFromCart);
router.delete('/', clearCart);

module.exports = router;
