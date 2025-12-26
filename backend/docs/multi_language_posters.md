# Multi-Language Poster Folder Structure

## Overview

VerseHaven supports multiple languages. When you change the language, not only does the UI text change, but the **entire product catalog** (verses, images, books) switches to that language.

## Recommended Folder Structure

```
posters/
├── en/                          # English
│   ├── genesis/
│   │   ├── genesis_1_1.jpg
│   │   ├── genesis_1_27.jpg
│   │   └── ...
│   ├── exodus/
│   ├── leviticus/
│   ├── ... (39 OT books)
│   ├── matthew/
│   ├── mark/
│   └── ... (27 NT books, 66 total)
│
├── hi/                          # Hindi (हिन्दी)
│   ├── utpatti/                 # Genesis in Hindi
│   │   ├── utpatti_1_1.jpg
│   │   └── ...
│   ├── nirgaman/                # Exodus
│   └── ... (66 books with Hindi names)
│
├── kn/                          # Kannada (ಕನ್ನಡ)
│   ├── aadikanda/               # Genesis
│   │   ├── aadikanda_1_1.jpg
│   │   └── ...
│   └── ... (66 books with Kannada names)
│
├── ta/                          # Tamil (தமிழ்)
│   ├── aathiyaakamam/           # Genesis
│   │   ├── aathiyaakamam_1_1.jpg
│   │   └── ...
│   └── ... (66 books with Tamil names)
│
└── te/                          # Telugu (తెలుగు)
    ├── aadikandamu/             # Genesis
    │   ├── aadikandamu_1_1.jpg
    │   └── ...
    └── ... (66 books with Telugu names)
```

## File Naming Convention

```
{book_name}_{chapter}_{verse}.jpg
```

Examples:

- English: `genesis_1_1.jpg`, `psalms_23_1.jpg`
- Hindi: `utpatti_1_1.jpg`, `bhajan_23_1.jpg`
- Kannada: `aadikanda_1_1.jpg`, `keertane_23_1.jpg`

## Book Name Mapping (66 Books)

Create a `books_mapping.json` file:

```json
{
  "genesis": {
    "en": "genesis",
    "hi": "utpatti",
    "kn": "aadikanda",
    "ta": "aathiyaakamam",
    "te": "aadikandamu"
  },
  "psalms": {
    "en": "psalms",
    "hi": "bhajan",
    "kn": "keertane",
    "ta": "sankeetham",
    "te": "keertanalu"
  }
  // ... all 66 books
}
```

## Database Schema Update

Products should store a `languageCode` field:

```prisma
model Product {
  id          String   @id @default(uuid())
  title       String   // Verse reference (e.g., "Genesis 1:1")
  titleLocal  String?  // Localized title (e.g., "उत्पत्ति 1:1")
  description String?
  price       Float
  images      String   // JSON array of image URLs
  category    String   // Book name in that language
  languageCode String  @default("en") // en, hi, kn, ta, te
  tags        String?
  stock       Int      @default(100)
  isAvailable Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## API Filter

Backend should filter products by language:

```javascript
// GET /api/products?lang=hi
const products = await prisma.product.findMany({
  where: {
    languageCode: req.query.lang || "en",
    isAvailable: true,
  },
});
```

## Cloudinary Organization

Upload images to language-specific folders:

```
versehaven/
├── en/
│   ├── genesis/
│   ├── exodus/
│   └── ...
├── hi/
│   ├── utpatti/
│   └── ...
└── ... (other languages)
```

## Migration Script

When adding a new language:

1. Create translated poster images
2. Add book mapping to `books_mapping.json`
3. Run upload script with language parameter
4. Seed products with `languageCode`

## Current Status

- [x] English folder structure exists
- [ ] Hindi translations needed
- [ ] Kannada translations needed
- [ ] Tamil translations needed
- [ ] Telugu translations needed
