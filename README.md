# 🕊️ VerseHaven - Bible Verse Poster Store

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-18%2B-green)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

A beautiful e-commerce platform for premium A3 Bible verse posters. Built with Next.js 15, Express, Prisma, and Cloudinary.

![VerseHaven Preview](https://res.cloudinary.com/dsrun1xw6/image/upload/v1/versehaven/logo.jpg)

## ✨ Features

### 🛒 E-Commerce

- **Premium A3 Posters** - 300gsm matte art paper
- **66 Bible Books** - Complete Protestant Canon
- **Smart Search** - Search by book, verse, or vibe
- **Custom Print** - Upload your own design with A3 crop tool
- **Cart & Checkout** - Razorpay payment integration
- **Order Tracking** - Email notifications

### 🎨 User Experience

- **Multi-Language UI** - English, Hindi, Kannada, Tamil, Telugu
- **Light/Dark Mode** - System preference aware
- **"Vibe Check"** - Shop by emotion (Peace, Hope, Strength...)
- **Elder-Friendly** - Larger touch targets, clear fonts
- **Mobile-First** - Scroll-based blur effects

### 🔧 Technical

- **Next.js 15** - App Router, Server Components
- **Express.js** - RESTful API backend
- **Prisma + NeonDB** - PostgreSQL database
- **Cloudinary** - Image hosting & optimization
- **Framer Motion** - Smooth animations
- **Razorpay** - Payment processing

## 📁 Project Structure

```
versehaven.store/
├── frontend/          # Next.js 15 app
│   ├── src/
│   │   ├── app/       # Pages (catalog, cart, custom, etc.)
│   │   ├── components/# Reusable components
│   │   └── lib/       # Translations, utilities
│   └── public/        # Static assets
│
├── backend/           # Express.js API
│   ├── controllers/   # Route handlers
│   ├── routes/        # API routes
│   ├── prisma/        # Database schema
│   └── scripts/       # Upload & seed scripts
│
└── pinterest_scraper/ # Image tools (not in production)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (NeonDB recommended)
- Cloudinary account
- Razorpay account

### Installation

```bash
# Clone the repo
git clone https://github.com/amitg404/versehaven.store.git
cd versehaven.store

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Setup database
npx prisma generate
npx prisma db push
```

### Environment Variables

Create `.env` files in both `frontend/` and `backend/`:

**backend/.env**

```env
PORT=5005
NODE_ENV=development
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
JWT_SECRET="your-secret-key"
RAZORPAY_KEY_ID="rzp_test_xxxxx"
RAZORPAY_KEY_SECRET="your-secret"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your@email.com"
EMAIL_PASS="app-password"
```

**frontend/.env.local**

```env
NEXT_PUBLIC_API_URL=http://localhost:5005
```

### Running Locally

```bash
# Terminal 1 - Backend (port 5005)
cd backend
npm run dev

# Terminal 2 - Frontend (port 4005)
cd frontend
npm run dev
```

Visit: http://localhost:4005

## 📖 API Endpoints

| Method | Endpoint               | Description             |
| ------ | ---------------------- | ----------------------- |
| GET    | `/api/products`        | List all products       |
| GET    | `/api/products/:id`    | Get single product      |
| GET    | `/api/products/search` | Search products         |
| POST   | `/api/auth/register`   | Register user           |
| POST   | `/api/auth/login`      | Login user              |
| POST   | `/api/cart/add`        | Add to cart             |
| POST   | `/api/orders/create`   | Create order            |
| POST   | `/api/payment/verify`  | Verify Razorpay payment |

## 🌍 Translations

UI text is available in 5 languages:

| Code | Language | Status      |
| ---- | -------- | ----------- |
| `en` | English  | ✅ Complete |
| `hi` | Hindi    | ✅ Complete |
| `kn` | Kannada  | ✅ Complete |
| `ta` | Tamil    | ✅ Complete |
| `te` | Telugu   | ✅ Complete |

## 🎯 Scripts

```bash
# Seed database with posters
cd backend
node scripts/upload_posters.js

# Sync poster folders
cd pinterest_scraper
python sync_poster_folders.py
```

## 🛡️ Security

- All secrets stored in `.env` files (gitignored)
- Passwords hashed with bcrypt
- JWT authentication
- Razorpay webhook verification
- CORS configured for production

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Bible verses from public domain translations
- Icons by [Lucide](https://lucide.dev)
- Fonts by [Google Fonts](https://fonts.google.com)

---

Made with ❤️ for His glory
