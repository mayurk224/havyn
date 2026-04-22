import React, { useState, useEffect, useCallback } from "react";
import { authService } from "../services/auth.service";
import { AuthContext } from "./auth-context-value";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshUser = useCallback(async ({ silent = false } = {}) => {
    if (!silent) {
      setLoading(true);
    }

    try {
      const data = await authService.getMe();
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await authService.getMe();
        if (data.success) {
          setUser(data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
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
      }

      setError(data.message || "Login failed");
      return { success: false, message: data.message };
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
      value={{ user, loading, error, loginWithGoogle, logout, setUser, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
