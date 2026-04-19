import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
  loginWithGoogle: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await authService.getMe();
          if (data.success) {
            setUser(data.user);
          } else {
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error("Auth initialization failed:", err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const loginWithGoogle = async (idToken) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.googleLogin(idToken);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        setError(data.message || 'Login failed');
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Google login error:', err);
      const errMsg = err.response?.data?.message || 'Authentication error';
      setError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
