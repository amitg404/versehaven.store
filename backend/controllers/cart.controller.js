const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get user's cart
const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch product details for each cart item
    const itemsWithProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        return {
          ...item,
          product,
        };
      })
    );

    const total = itemsWithProducts.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);

    res.json({ items: itemsWithProducts, total });
  } catch (error) {
    next(error);
  }
};

// Add item to cart
const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1, customImage } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Upsert cart item
    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: { userId, productId },
      },
      update: {
        quantity: { increment: quantity },
        ...(customImage && { customImage }),
      },
      create: {
        userId,
        productId,
        quantity,
        customImage: customImage || null,
      },
    });

    res.json({ message: 'Added to cart', cartItem });
  } catch (error) {
    next(error);
  }
};

// Update cart item quantity
const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      // Remove item if quantity is less than 1
      await prisma.cartItem.delete({ where: { id } });
      return res.json({ message: 'Item removed from cart' });
    }

    const cartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });

    res.json({ message: 'Cart updated', cartItem });
  } catch (error) {
    next(error);
  }
};

// Remove item from cart
const removeFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.cartItem.delete({ where: { id } });

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
};

// Clear cart
const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    await prisma.cartItem.deleteMany({ where: { userId } });

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
