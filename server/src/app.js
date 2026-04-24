import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "../config/config.js";
import authRoutes from "../routes/auth.routes.js";
import vendorRoutes from "../routes/vendor.routes.js";
import productRoutes from "../routes/product.routes.js";
import wishlistRoutes from "../routes/wishlist.routes.js";
import cartRoutes from "../routes/cart.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: config.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);

  // Multer Specific Errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ 
      success: false, 
      message: "File too large. Maximum limit is 1MB per image." 
    });
  }
  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({ 
      success: false, 
      message: "Too many files uploaded or invalid field name." 
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server.",
  });
});

export default app;
