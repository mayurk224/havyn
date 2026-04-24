import api from "./api";

const cartService = {
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
};

export default cartService;
