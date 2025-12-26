const Razorpay = require('razorpay');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
const createPaymentOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.id;

    // Get order
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.paymentId) {
      return res.status(400).json({ message: 'Order already paid' });
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(order.finalAmount * 100), // Amount in paise
      currency: 'INR',
      receipt: orderId,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    next(error);
  }
};

// Verify payment
const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Update order
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentId: razorpay_payment_id,
        status: 'CONFIRMED',
      },
    });

    res.json({ message: 'Payment verified successfully', order });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPaymentOrder, verifyPayment };
