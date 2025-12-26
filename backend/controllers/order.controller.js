const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { notifyNewOrder } = require('../services/telegram.service');

// Create order from cart
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { shippingFee = 0 } = req.body;

    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate totals
    let totalAmount = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) continue;

      totalAmount += product.price * item.quantity;
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        customImage: item.customImage,
      });
    }

    const finalAmount = totalAmount + shippingFee;

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        shippingFee,
        finalAmount,
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
    });

    // Clear cart after order
    await prisma.cartItem.deleteMany({ where: { userId } });

    // Send Telegram notification
    const user = await prisma.user.findUnique({ where: { id: userId } });
    notifyNewOrder({
      id: order.id,
      user,
      items: orderItems,
      total: finalAmount,
      status: 'PENDING',
      shippingAddress: req.body.shippingAddress || '',
      phone: user?.mobile || req.body.phone || '',
    }).catch(err => console.error('Telegram notification failed:', err));

    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    next(error);
  }
};

// Get user's orders
const getOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ orders });
  } catch (error) {
    next(error);
  }
};

// Get single order
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await prisma.order.findFirst({
      where: { id, userId },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    next(error);
  }
};

// Update order status (Admin)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, paymentId } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(paymentId && { paymentId }),
      },
    });

    res.json({ message: 'Order updated', order });
  } catch (error) {
    next(error);
  }
};

// Get all orders (Admin)
const getAllOrders = async (req, res, next) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    const where = {};
    if (status) where.status = status;

    const orders = await prisma.order.findMany({
      where,
      include: { items: true, user: { select: { id: true, name: true, email: true, mobile: true } } },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset),
    });

    const total = await prisma.order.count({ where });

    res.json({ orders, total });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, getAllOrders };
