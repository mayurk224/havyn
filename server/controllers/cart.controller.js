import cartModel from "../models/cart.model.js";

const CART_PRODUCT_SELECT =
  "title description category basePrice images variants status";

const populateCart = (query) =>
  query.populate({
    path: "items.productId",
    select: CART_PRODUCT_SELECT,
  });

const getVariantPrice = (product, size, color) => {
  const matchedVariant = product?.variants?.find(
    (variant) => variant.size === size && variant.color === color,
  );

  return matchedVariant?.price ?? product?.basePrice ?? 0;
};

const formatCart = (cart) => ({
  items: (cart?.items || [])
    .map((item) => {
      const product = item.productId;

      if (!product?._id) {
        return null;
      }

      return {
        productId: product._id,
        title: product.title,
        description: product.description,
        category: product.category,
        image: product.images?.find((image) => image.isPrimary)?.url || product.images?.[0]?.url || "",
        price: getVariantPrice(product, item.variant.size, item.variant.color),
        size: item.variant.size,
        color: item.variant.color,
        quantity: item.quantity,
      };
    })
    .filter(Boolean),
});

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

    const populatedCart = await populateCart(cartModel.findOne({ userId }));

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: formatCart(populatedCart),
    });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add item to cart" });
  }
};

/**
 * @desc    Get the current user's cart
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await populateCart(cartModel.findOne({ userId }));

    return res.status(200).json({
      success: true,
      data: formatCart(cart),
    });
  } catch (error) {
    console.error("Get Cart Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to load cart" });
  }
};

/**
 * @desc    Update quantity for a cart item
 * @route   PATCH /api/cart/item
 * @access  Private
 */
export const updateCartItemQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, color, quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a whole number greater than 0",
      });
    }

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (entry) =>
        entry.productId.toString() === productId &&
        entry.variant.size === size &&
        entry.variant.color === color,
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await populateCart(cartModel.findOne({ userId }));

    return res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: formatCart(populatedCart),
    });
  } catch (error) {
    console.error("Update Cart Item Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update cart item" });
  }
};

/**
 * @desc    Remove an item from the cart
 * @route   DELETE /api/cart/item
 * @access  Private
 */
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, color } = req.body;
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Item removed from cart",
        data: { items: [] },
      });
    }

    const nextItems = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.variant.size === size &&
          item.variant.color === color
        ),
    );

    const removed = nextItems.length !== cart.items.length;
    cart.items = nextItems;
    await cart.save();

    const populatedCart = await populateCart(cartModel.findOne({ userId }));

    return res.status(200).json({
      success: true,
      message: removed ? "Item removed from cart" : "Cart item not found",
      data: formatCart(populatedCart),
    });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to remove cart item" });
  }
};

/**
 * @desc    Clear the current user's cart
 * @route   DELETE /api/cart
 * @access  Private
 */
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await cartModel.findOne({ userId });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: { items: [] },
    });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to clear cart" });
  }
};
