# VerseHaven Image Structure Guide

## How It Works

### Primary Category (Folder Names)

Each folder represents a **Book of the Bible** category:

```
backend/images/
├── psalms/
├── proverbs/
├── gospels/
├── pauline-epistles/
├── old-testament/
└── new-testament/
```

### File Naming Convention

```
{verse-reference}-{optional-description}.{ext}
```

Examples:

- `psalm-23-1.jpg`
- `proverbs-3-5-trust.png`
- `john-3-16.jpg`
- `romans-8-28-purpose.jpg`

### Tags (Metadata, NOT Folders)

Tags are stored in the database, not as folders. When adding products, you specify tags from the 8 vibe groups:

| Group        | Example Tags                                              |
| ------------ | --------------------------------------------------------- |
| Life Context | `hope-encouragement`, `peace-calm`, `strength-hard-times` |
| Emotion      | `joy`, `comfort`, `courage`                               |
| Audience     | `for-students`, `for-families`, `for-couples`             |
| Occasion     | `weddings`, `christmas`, `graduation`                     |
| Theme        | `love`, `faith`, `grace`, `prayer`                        |
| Style        | `minimal-typography`, `floral`, `nature-inspired`         |
| Placement    | `bedroom`, `office-study`, `prayer-room`                  |

## Quick Start

1. Create folders: `backend/images/{category}/`
2. Place your poster images inside
3. Run: `node scripts/migrate_to_cloudinary.js`
4. Run: `node scripts/seed_products.js`
