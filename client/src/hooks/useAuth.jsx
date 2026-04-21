import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";

const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
  loginWithGoogle: async () => {},
  logout: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await authService.getMe();
        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        // No valid cookie/session yet; keep user logged out silently.
        setUser(null);
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
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        setError(data.message || "Login failed");
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Google login error:", err);
      const errMsg = err.response?.data?.message || "Authentication error";
      setError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, loginWithGoogle, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
