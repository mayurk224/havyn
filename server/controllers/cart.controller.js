import cartModel from "../models/cart.model.js";

/**
 * @desc    Add an item to the cart
 * @route   POST /api/cart
 * @access  Private
 */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, color, quantity = 1 } = req.body;

    // 1. Find the user's cart
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      // 2. If no cart exists, create a new one
      cart = await cartModel.create({
        userId,
        items: [{ productId, variant: { size, color }, quantity }],
      });
    } else {
      // 3. If cart exists, check if this EXACT variant is already in it
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.variant.size === size &&
          item.variant.color === color,
      );

      if (itemIndex > -1) {
        // Variant exists, just update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // New variant, push it to the array
        cart.items.push({ productId, variant: { size, color }, quantity });
      }
      await cart.save();
    }

    return res
      .status(200)
      .json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add item to cart" });
  }
};
