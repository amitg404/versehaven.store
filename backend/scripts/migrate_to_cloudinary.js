/**
 * VerseHaven - Cloudinary Migration Script
 * 
 * Uploads all images from backend/images/{category}/ to Cloudinary
 * under the folder: versehaven/{category}/
 * 
 * Usage: node scripts/migrate_to_cloudinary.js
 */

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Cloudinary config is auto-loaded from CLOUDINARY_URL env var

const IMAGES_DIR = path.join(__dirname, '..', 'images');
const OUTPUT_FILE = path.join(__dirname, 'cloudinary_manifest.json');

// Allowed image extensions
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

async function uploadImage(filePath, category, filename) {
  const publicId = `versehaven/${category}/${path.parse(filename).name}`;
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: '', // Already included in public_id
      resource_type: 'image',
      overwrite: true,
      quality: 'auto',
      fetch_format: 'auto',
    });
    
    console.log(`✓ Uploaded: ${category}/${filename}`);
    return {
      filename,
      category,
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error(`✗ Failed: ${category}/${filename} - ${error.message}`);
    return null;
  }
}

async function migrate() {
  console.log('='.repeat(50));
  console.log('VerseHaven Cloudinary Migration');
  console.log('='.repeat(50));
  
  // Check if images directory exists
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log(`\nNo images directory found at: ${IMAGES_DIR}`);
    console.log('Creating directory structure...\n');
    
    // Create sample structure
    const categories = ['psalms', 'proverbs', 'gospels', 'pauline-epistles', 'old-testament', 'new-testament'];
    categories.forEach(cat => {
      const catDir = path.join(IMAGES_DIR, cat);
      fs.mkdirSync(catDir, { recursive: true });
      console.log(`  Created: images/${cat}/`);
    });
    
    console.log('\nPlease add your poster images to these folders and run this script again.');
    return;
  }
  
  const manifest = [];
  const categories = fs.readdirSync(IMAGES_DIR).filter(item => {
    const itemPath = path.join(IMAGES_DIR, item);
    return fs.statSync(itemPath).isDirectory();
  });
  
  if (categories.length === 0) {
    console.log('\nNo category folders found. Create folders like:');
    console.log('  images/psalms/');
    console.log('  images/proverbs/');
    return;
  }
  
  console.log(`\nFound ${categories.length} categories: ${categories.join(', ')}\n`);
  
  for (const category of categories) {
    const categoryPath = path.join(IMAGES_DIR, category);
    const files = fs.readdirSync(categoryPath).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ALLOWED_EXTENSIONS.includes(ext);
    });
    
    if (files.length === 0) {
      console.log(`Skipping ${category}/ (no images)`);
      continue;
    }
    
    console.log(`\nUploading ${category}/ (${files.length} images)`);
    console.log('-'.repeat(40));
    
    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const result = await uploadImage(filePath, category, file);
      if (result) {
        manifest.push(result);
      }
    }
  }
  
  // Save manifest
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Migration complete! ${manifest.length} images uploaded.`);
  console.log(`Manifest saved to: scripts/cloudinary_manifest.json`);
  console.log(`\nNext step: node scripts/seed_products.js`);
}

migrate().catch(console.error);
