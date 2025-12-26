/**
 * Poster Upload & Seed Script
 * 
 * Uploads posters from downloaded_images_new to Cloudinary
 * and seeds the database with product entries.
 * 
 * Usage: node scripts/upload_posters.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;

const prisma = new PrismaClient();

// Configuration
const POSTER_DIR = path.join(__dirname, '../../pinterest_scraper/downloaded_images/English');
const PRICE = 99; // ₹99 per poster
const BATCH_SIZE = 10;

// Cloudinary config from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dsrun1xw6',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Parse CLOUDINARY_URL if present
if (process.env.CLOUDINARY_URL) {
  const match = process.env.CLOUDINARY_URL.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);
  if (match) {
    cloudinary.config({
      api_key: match[1],
      api_secret: match[2],
      cloud_name: match[3],
    });
  }
}

// Bible book display names
const BOOK_NAMES = {
  'genesis': 'Genesis', 'exodus': 'Exodus', 'leviticus': 'Leviticus',
  'numbers': 'Numbers', 'deuteronomy': 'Deuteronomy', 'joshua': 'Joshua',
  'judges': 'Judges', 'ruth': 'Ruth', '1_samuel': '1 Samuel', '2_samuel': '2 Samuel',
  '1_kings': '1 Kings', '2_kings': '2 Kings', '1_chronicles': '1 Chronicles',
  '2_chronicles': '2 Chronicles', 'ezra': 'Ezra', 'nehemiah': 'Nehemiah',
  'esther': 'Esther', 'job': 'Job', 'psalms': 'Psalms', 'proverbs': 'Proverbs',
  'ecclesiastes': 'Ecclesiastes', 'song_of_solomon': 'Song of Solomon',
  'isaiah': 'Isaiah', 'jeremiah': 'Jeremiah', 'lamentations': 'Lamentations',
  'ezekiel': 'Ezekiel', 'daniel': 'Daniel', 'hosea': 'Hosea', 'joel': 'Joel',
  'amos': 'Amos', 'obadiah': 'Obadiah', 'jonah': 'Jonah', 'micah': 'Micah',
  'nahum': 'Nahum', 'habakkuk': 'Habakkuk', 'zephaniah': 'Zephaniah',
  'haggai': 'Haggai', 'zechariah': 'Zechariah', 'malachi': 'Malachi',
  'matthew': 'Matthew', 'mark': 'Mark', 'luke': 'Luke', 'john': 'John',
  'acts': 'Acts', 'romans': 'Romans', '1_corinthians': '1 Corinthians',
  '2_corinthians': '2 Corinthians', 'galatians': 'Galatians', 'ephesians': 'Ephesians',
  'philippians': 'Philippians', 'colossians': 'Colossians',
  '1_thessalonians': '1 Thessalonians', '2_thessalonians': '2 Thessalonians',
  '1_timothy': '1 Timothy', '2_timothy': '2 Timothy', 'titus': 'Titus',
  'philemon': 'Philemon', 'hebrews': 'Hebrews', 'james': 'James',
  '1_peter': '1 Peter', '2_peter': '2 Peter', '1_john': '1 John',
  '2_john': '2 John', '3_john': '3 John', 'jude': 'Jude', 'revelation': 'Revelation'
};

async function uploadToCloudinary(filePath, folder) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `versehaven/${folder}`,
      resource_type: 'image',
      transformation: [
        { quality: 'auto:good', fetch_format: 'auto' }
      ]
    });
    return result.secure_url;
  } catch (error) {
    console.error(`   ❌ Upload failed: ${path.basename(filePath)}`);
    return null;
  }
}

async function processBook(bookFolder) {
  const bookName = path.basename(bookFolder);
  const displayName = BOOK_NAMES[bookName] || bookName;
  const files = fs.readdirSync(bookFolder).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  
  console.log(`\n📖 ${displayName} (${files.length} posters)`);
  
  let processed = 0;
  
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    
    for (const file of batch) {
      const filePath = path.join(bookFolder, file);
      
      // Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(filePath, bookName);
      if (!imageUrl) continue;
      
      // Generate title from filename
      const baseName = path.basename(file, path.extname(file));
      const title = `${displayName} Verse Poster`;
      
      // Create product in database
      try {
        await prisma.product.create({
          data: {
            title,
            description: `Beautiful Bible verse poster from ${displayName}`,
            price: PRICE,
            images: JSON.stringify([imageUrl]),
            category: bookName,
            tags: `${bookName},bible,verse,poster,scripture`,
            stock: 100,
            isAvailable: true,
          }
        });
        processed++;
        process.stdout.write(`   ✓ ${processed}/${files.length}\r`);
      } catch (dbError) {
        console.error(`   ❌ DB error: ${file}`);
      }
    }
  }
  
  console.log(`   ✅ Completed: ${processed} posters`);
  return processed;
}

async function main() {
  console.log('═'.repeat(50));
  console.log('🖼️  VerseHaven Poster Upload & Seed');
  console.log('═'.repeat(50));
  console.log(`Source: ${POSTER_DIR}`);
  console.log(`Price: ₹${PRICE} per poster\n`);

  if (!fs.existsSync(POSTER_DIR)) {
    console.error('❌ Poster directory not found!');
    console.log('   Expected:', POSTER_DIR);
    process.exit(1);
  }

  // Get all book folders
  const bookFolders = fs.readdirSync(POSTER_DIR)
    .map(f => path.join(POSTER_DIR, f))
    .filter(f => fs.statSync(f).isDirectory());

  console.log(`Found ${bookFolders.length} book folders\n`);

  let totalProcessed = 0;

  for (const folder of bookFolders) {
    const count = await processBook(folder);
    totalProcessed += count;
  }

  console.log('\n' + '═'.repeat(50));
  console.log(`✅ COMPLETE: ${totalProcessed} posters uploaded and seeded`);
  console.log('═'.repeat(50));

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
