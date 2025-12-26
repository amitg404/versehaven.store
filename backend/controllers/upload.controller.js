const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary config is auto-loaded from CLOUDINARY_URL env var

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'versehaven_custom',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ quality: 'auto' }],
  },
});

const upload = multer({ storage });

// Upload custom image (for POD)
const uploadCustomImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      message: 'Image uploaded successfully',
      url: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    next(error);
  }
};

// Upload product image (Admin)
const uploadProductImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      message: 'Product image uploaded',
      url: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { upload, uploadCustomImage, uploadProductImage };
