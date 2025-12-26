const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all products with optional filters
const getAllProducts = async (req, res, next) => {
  try {
    const { category, tag, search, sort, limit = 50, offset = 0 } = req.query;

    const where = { isAvailable: true };

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = { contains: tag };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    let orderBy = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };
    if (sort === 'title') orderBy = { title: 'asc' };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      take: parseInt(limit),
      skip: parseInt(offset),
    });

    const total = await prisma.product.count({ where });

    res.json({ products, total, limit: parseInt(limit), offset: parseInt(offset) });
  } catch (error) {
    next(error);
  }
};

// Get single product by ID
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    next(error);
  }
};

// Get products by tags (for Vibe filtering)
const getProductsByTags = async (req, res, next) => {
  try {
    const { tags } = req.body; // Array of tags

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: 'Tags array is required' });
    }

    const products = await prisma.product.findMany({
      where: {
        isAvailable: true,
        OR: tags.map((tag) => ({ tags: { contains: tag } })),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ products });
  } catch (error) {
    next(error);
  }
};

// Create product (Admin)
const createProduct = async (req, res, next) => {
  try {
    const { title, description, price, images, category, tags, stock } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({ message: 'Title, price, and category are required' });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description: description || '',
        price: parseFloat(price),
        images: JSON.stringify(images || []),
        category,
        tags: JSON.stringify(tags || []),
        stock: stock || 100,
      },
    });

    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    next(error);
  }
};

// Update product (Admin)
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, images, category, tags, stock, isAvailable } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(images && { images: JSON.stringify(images) }),
        ...(category && { category }),
        ...(tags && { tags: JSON.stringify(tags) }),
        ...(stock !== undefined && { stock }),
        ...(isAvailable !== undefined && { isAvailable }),
      },
    });

    res.json({ message: 'Product updated', product });
  } catch (error) {
    next(error);
  }
};

// Delete product (Admin)
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({ where: { id } });

    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

// Get all unique categories
const getCategories = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { isAvailable: true },
      select: { category: true },
      distinct: ['category'],
    });

    const categories = products.map((p) => p.category);
    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByTags,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
