const express = require("express");
const cors = require("cors");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const uploadRoutes = require("./routes/upload.routes");
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// Error middleware
const errorMiddleware = require("./middleware/error.middleware");
app.use(errorMiddleware);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "VerseHaven API is running!", status: "healthy" });
});

// Database connection
async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to Neon Database");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
  }
}

main();

// Export for Vercel serverless
module.exports = app;

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 VerseHaven Backend running on http://localhost:${PORT}`);
  });
}
