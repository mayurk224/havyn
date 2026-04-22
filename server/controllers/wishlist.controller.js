import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import mongoose from "mongoose";

const getWishlistIds = (wishlist = []) => wishlist.map((item) => item.toString());

const findUserById = (userId) => userModel.findById(userId);

/**
 * @desc    Get user's wishlist
 * @route   GET /api/wishlist
 * @access  Private
 */
export const getWishlist = async (req, res) => {
  try {
    const user = await findUserById(req.user.id).populate({
      path: "wishlist",
      populate: {
        path: "vendorId",
        select: "fullName vendorDetails.storeName",
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user.wishlist,
    });
  } catch (error) {
    console.error("Error in getWishlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc    Add product to wishlist
 * @route   POST /api/wishlist/:productId
 * @access  Private
 */
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    // Check if product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const wishlistIds = getWishlistIds(user.wishlist);

    // Check if already in wishlist
    if (wishlistIds.includes(productId)) {
      return res.status(200).json({
        success: true,
        message: "Product already in wishlist",
        data: wishlistIds,
      });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      data: getWishlistIds(user.wishlist),
    });
  } catch (error) {
    console.error("Error in addToWishlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc    Remove product from wishlist
 * @route   DELETE /api/wishlist/:productId
 * @access  Private
 */
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      data: getWishlistIds(user.wishlist),
    });
  } catch (error) {
    console.error("Error in removeFromWishlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
