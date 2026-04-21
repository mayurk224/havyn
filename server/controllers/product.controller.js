
import { imagekit } from "../config/imagekit.js";
import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";

const allowedCategories = new Set([
  "Shirts",
  "Pants",
  "Outerwear",
  "Accessories",
  "Footwear",
]);

const parseVariants = (rawVariants) => {
  const variants = typeof rawVariants === "string" ? JSON.parse(rawVariants) : rawVariants;

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
    console.log("Product Creation Request Body:", JSON.stringify(req.body, null, 2));
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
        errors: messages 
      });
    }

    return res.status(500).json({ success: false, message: error.message || "Failed to create product." });
  }
};
