import express, { Router } from "express";
import {
  googleAuthHandler,
  getMe,
  logout,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

// @route   POST /api/auth/google
authRoutes.post("/google", googleAuthHandler);

// @route   GET /api/auth/me
authRoutes.get("/me", protect, getMe);

// @route   POST /api/auth/logout
authRoutes.post("/logout", logout);

export default authRoutes;
