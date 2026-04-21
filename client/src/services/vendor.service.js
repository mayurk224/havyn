import api from "./api";

export const vendorService = {
  async applyToSell(payload) {
    const response = await api.put("/vendor/apply", payload);
    return response.data;
  },
};
