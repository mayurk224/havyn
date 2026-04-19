import api from './api';

export const authService = {
  async googleLogin(idToken) {
    const response = await api.post('/auth/google', { idToken });
    return response.data;
  },
  
  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
