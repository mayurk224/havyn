import api from "./api";

export const productService = {
  async createProduct(formData) {
    const response = await api.post("/products", formData);
    return response.data;
  },

  async getProducts(params = {}) {
    const response = await api.get("/products", { params });
    return response.data;
  },

  async getProductById(productId) {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },
};
