import api from "./api";

export const productService = {
  async createProduct(formData) {
    const response = await api.post("/products", formData);
    return response.data;
  },
};
