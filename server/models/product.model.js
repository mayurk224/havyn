import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // --- 1. The Vendor Ownership ---
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Ties this product directly to the seller
      required: true,
      index: true, // Crucial for quickly loading a specific vendor's store page
    },

    // --- 2. Core Product Details ---
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Shirts", "Pants", "Outerwear", "Accessories", "Footwear"], // Enforce categories for clean filtering
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // --- 3. Media ---
    images: [
      {
        url: { type: String, required: true }, // e.g., Cloudinary or S3 URL
        altText: { type: String },
        isPrimary: { type: Boolean, default: false }, // Determines which image shows on the main feed
      },
    ],

    // --- 4. Clothing Variations & Inventory ---
    // Instead of a flat stock number, clothing requires stock per size/color
    variants: [
      {
        size: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL", "OS"], // OS = One Size
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          required: true,
          min: 0,
          default: 0,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        sku: {
          type: String,
          unique: true,
          sparse: true, // Stock Keeping Unit for the vendor's own tracking
        },
      },
    ],

    // --- 5. Status & Visibility ---
    status: {
      type: String,
      enum: ["Draft", "Active", "Archived"],
      default: "Draft", // Vendors can save work without publishing immediately
    },

    // --- 6. Marketplace Metrics (Auto-updated later) ---
    salesCount: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("products", productSchema);

export default productModel;
