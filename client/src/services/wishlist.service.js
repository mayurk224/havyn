import api from "./api";

const assertProductId = (productId) => {
  if (!productId) {
    throw new Error("A product id is required for wishlist actions.");
  }
};

const normalizeWishlistIds = (responseData) => {
  const rawItems = responseData?.data;
  if (!Array.isArray(rawItems)) {
    return [];
  }

  return rawItems
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      return item?._id || item?.id || null;
    })
    .filter(Boolean);
};

const wishlistService = {
  getWishlist: async () => {
    const response = await api.get("/wishlist");
    return {
      ...response.data,
      wishlistIds: normalizeWishlistIds(response.data),
    };
  },

  addToWishlist: async (productId) => {
    assertProductId(productId);
    const response = await api.post(`/wishlist/${productId}`);
    return {
      ...response.data,
      wishlistIds: normalizeWishlistIds(response.data),
    };
  },

  removeFromWishlist: async (productId) => {
    assertProductId(productId);
    const response = await api.delete(`/wishlist/${productId}`);
    return {
      ...response.data,
      wishlistIds: normalizeWishlistIds(response.data),
    };
  },
};

export default wishlistService;
