const express = require('express');
const router = express.Router();
const { createPaymentOrder, verifyPayment } = require('../controllers/payment.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/create-order', authMiddleware, createPaymentOrder);
router.post('/verify', authMiddleware, verifyPayment);

module.exports = router;
