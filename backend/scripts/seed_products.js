/**
 * VerseHaven - Product Seeding Script (Metadata Version)
 * 
 * Reads from product_metadata.json and cloudinary_manifest.json
 * to create product entries with user-defined tags.
 * 
 * Usage: node scripts/seed_products.js
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const MANIFEST_FILE = path.join(__dirname, 'cloudinary_manifest.json');
const METADATA_FILE = path.join(__dirname, 'product_metadata.json');

async function seedProducts() {
  console.log('='.repeat(50));
  console.log('VerseHaven Product Seeding');
  console.log('='.repeat(50));
  
  // Check files exist
  if (!fs.existsSync(MANIFEST_FILE)) {
    console.log('\nNo manifest file. Run migrate_to_cloudinary.js first.');
    return;
  }
  
  if (!fs.existsSync(METADATA_FILE)) {
    console.log('\nNo metadata file. Create product_metadata.json first.');
    console.log('See product_metadata.json for the template format.');
    return;
  }
  
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'));
  const metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
  
  // Create lookup map from manifest (filename -> cloudinary data)
  const cloudinaryMap = {};
  for (const item of manifest) {
    cloudinaryMap[item.filename] = item;
  }
  
  console.log(`\nManifest: ${manifest.length} images`);
  console.log(`Metadata: ${metadata.products.length} products defined\n`);
  
  let created = 0;
  let skipped = 0;
  let notFound = 0;
  
  for (const product of metadata.products) {
    // Find corresponding Cloudinary entry
    const cloudinaryData = cloudinaryMap[product.filename];
    
    if (!cloudinaryData) {
      console.log(`✗ Image not found: ${product.filename}`);
      notFound++;
      continue;
    }
    
    // Check if already exists
    const existing = await prisma.product.findFirst({
      where: { title: product.title },
    });
    
    if (existing) {
      console.log(`⊘ Exists: ${product.title}`);
      skipped++;
      continue;
    }
    
    // Convert tags object to array of true keys
    const tags = Object.entries(product.tags)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);
    
    // Create product
    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description || `Beautiful Bible verse poster: ${product.title}`,
        price: product.price || 299,
        images: JSON.stringify([cloudinaryData.url]),
        category: product.category,
        tags: JSON.stringify(tags),
        stock: 100,
        isAvailable: true,
      },
    });
    
    console.log(`✓ Created: ${product.title} (${tags.length} tags)`);
    created++;
  }
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Done!`);
  console.log(`  Created: ${created}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Not found: ${notFound}`);
  
  await prisma.$disconnect();
}

seedProducts().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
