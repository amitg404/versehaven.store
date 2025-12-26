const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Register with email or mobile
const register = async (req, res, next) => {
  try {
    const { email, mobile, password, name } = req.body;

    if (!email && !mobile) {
      return res.status(400).json({ message: 'Email or mobile is required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          ...(email ? [{ email }] : []),
          ...(mobile ? [{ mobile }] : []),
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email || null,
        mobile: mobile || null,
        password: hashedPassword,
        name: name || null,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, mobile: user.mobile, name: user.name, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// Login with email or mobile
const login = async (req, res, next) => {
  try {
    const { email, mobile, password } = req.body;

    if (!email && !mobile) {
      return res.status(400).json({ message: 'Email or mobile is required' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          ...(email ? [{ email }] : []),
          ...(mobile ? [{ mobile }] : []),
        ],
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, mobile: user.mobile, name: user.name, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// Get current user profile
const getProfile = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile };
