import api from "./api";

const cartService = {
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  /**
   * Add a product variant to the current user's cart.
   * @param {string} productId - MongoDB ObjectId of the product
   * @param {string} size      - Selected size (e.g. "M")
   * @param {string} color     - Selected color (e.g. "Red")
   * @param {number} [quantity=1] - How many to add
   */
  addToCart: async ({ productId, size, color, quantity = 1 }) => {
    const response = await api.post("/cart", { productId, size, color, quantity });
    return response.data;
  },

  updateQuantity: async ({ productId, size, color, quantity }) => {
    const response = await api.patch("/cart/item", {
      productId,
      size,
      color,
      quantity,
    });
    return response.data;
  },

  removeFromCart: async ({ productId, size, color }) => {
    const response = await api.delete("/cart/item", {
      data: { productId, size, color },
    });
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete("/cart");
    return response.data;
  },
};

export default cartService;
