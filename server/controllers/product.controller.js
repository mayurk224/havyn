import { imagekit } from "../config/imagekit.js";
import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";
import mongoose from "mongoose";

const allowedCategories = new Set([
  "Shirts",
  "Pants",
  "Outerwear",
  "Accessories",
  "Footwear",
]);

const parseVariants = (rawVariants) => {
  const variants =
    typeof rawVariants === "string" ? JSON.parse(rawVariants) : rawVariants;

  if (!Array.isArray(variants) || variants.length === 0) {
    throw new Error("At least one product variant is required.");
  }

  return variants.map((variant) => ({
    size: variant.size,
    color: typeof variant.color === "string" ? variant.color.trim() : "",
    stock: Number(variant.stock),
    price: Number(variant.price),
  }));
};

/**
 * @desc    Create a new product with images
 * @route   POST /api/products
 * @access  Private (Vendor Only)
 */
export const createProduct = async (req, res) => {
  try {
    console.log(
      "Product Creation Request Body:",
      JSON.stringify(req.body, null, 2),
    );
    console.log("Product Creation Files Count:", req.files?.length || 0);

    // 1. Ensure the user is an approved vendor
    const user = await userModel.findById(req.user.id);
    if (!user || user.role !== "Vendor" || !user.vendorDetails?.isApproved) {
      return res
        .status(403)
        .json({ message: "Only approved vendors can list products." });
    }
    const vendorId = user._id;

    const { title, description, category, basePrice, variants } = req.body;

    // 2. Catch missing files
    if (!req.files || req.files.length === 0) {
      console.warn("Product Creation blocked: No files provided.");
      return res
        .status(400)
        .json({ message: "At least one product image is required." });
    }

    const normalizedTitle = title?.trim();
    const normalizedDescription = description?.trim();
    const normalizedCategory = category?.trim();

    if (!normalizedTitle || !normalizedDescription || !normalizedCategory) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and category are required.",
      });
    }

    if (!allowedCategories.has(normalizedCategory)) {
      return res.status(400).json({
        success: false,
        message: "Please choose a valid category.",
      });
    }

    let normalizedVariants;

    try {
      normalizedVariants = parseVariants(variants);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Variants payload is invalid.",
      });
    }

    const hasInvalidVariant = normalizedVariants.some(
      (variant) =>
        !variant.size ||
        !variant.color ||
        !Number.isFinite(variant.stock) ||
        variant.stock < 0 ||
        !Number.isFinite(variant.price) ||
        variant.price < 0,
    );

    if (hasInvalidVariant) {
      return res.status(400).json({
        success: false,
        message: "Each variant must include a size, color, stock, and price.",
      });
    }

    const normalizedBasePrice = Number(basePrice);
    const fallbackBasePrice = Math.min(
      ...normalizedVariants.map((variant) => variant.price),
    );
    const resolvedBasePrice = Number.isFinite(normalizedBasePrice)
      ? normalizedBasePrice
      : fallbackBasePrice;

    // 3. Upload all images to ImageKit concurrently
    const imageUploadPromises = req.files.map((file) => {
      return imagekit.upload({
        file: file.buffer, // The file buffer from Multer's memory storage
        fileName: `${Date.now()}-${file.originalname}`, // Ensure unique filenames
        folder: "/clothing-app/products", // Keeps your ImageKit dashboard organized
      });
    });

    const uploadResults = await Promise.all(imageUploadPromises);

    // 4. Map the ImageKit responses to our Mongoose schema format
    const productImages = uploadResults.map((result, index) => ({
      url: result.url,
      // The first uploaded image becomes the primary thumbnail
      isPrimary: index === 0,
    }));

    // 5. Save everything to MongoDB
    const product = await productModel.create({
      vendorId,
      title: normalizedTitle,
      description: normalizedDescription,
      category: normalizedCategory,
      basePrice: resolvedBasePrice,
      variants: normalizedVariants,
      images: productImages,
      status: "Active", // Or 'Draft' if you want them to review it first
    });

    return res.status(201).json({
      success: true,
      message: "Product listed successfully!",
      product,
    });
  } catch (error) {
    console.error("Product Creation Error:", error);

    // Handle Mongoose Validation Errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }

    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Failed to create product.",
      });
  }
};

/**
 * @desc    Get all active products (with pagination, filtering, and sorting)
 * @route   GET /api/products
 * @access  Public (Shoppers don't need to be logged in to browse)
 */
export const getProducts = async (req, res) => {
  try {
    // 1. Pagination Setup
    // Default to page 1, and 12 items per page (perfect for a 3x4 or 4x3 CSS grid)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // 2. Build the Filter Query
    // CRITICAL: We only want shoppers to see published items, never drafts.
    let query = { status: "Active" };

    // Optional: If the frontend passes a category (?category=Shirts)
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Optional: Search by title (basic regex search)
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" }; // 'i' makes it case-insensitive
    }

    // 3. Determine Sorting Logic
    let sortStage = { createdAt: -1 }; // Default: Newest arrivals first

    if (req.query.sort === "price_low") sortStage = { basePrice: 1 };
    if (req.query.sort === "price_high") sortStage = { basePrice: -1 };
    if (req.query.sort === "oldest") sortStage = { createdAt: 1 };

    // 4. Execute the Query
    const products = await productModel.find(query)
      // The Magic Trick: Pull the vendor's store name and avatar from the User collection
      .populate("vendorId", "vendorDetails.storeName avatar")
      .sort(sortStage)
      .skip(skip)
      .limit(limit);

    // 5. Get the total count of documents that match the filter for frontend math
    const totalProducts = await productModel.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalItems: totalProducts,
        hasNextPage: page * limit < totalProducts,
      },
    });
  } catch (error) {
    console.error("Fetch Products Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch product catalog." });
  }
};

/**
 * @desc    Get a single active product by id
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id.",
      });
    }

    const product = await productModel
      .findOne({ _id: id, status: "Active" })
      .populate("vendorId", "vendorDetails.storeName avatar");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Fetch Product By Id Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product details.",
    });
  }
};
