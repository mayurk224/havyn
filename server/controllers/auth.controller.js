import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

const serializeUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
  isOnboarded: user.isOnboarded,
  wishlist: (user.wishlist || []).map((item) => item.toString()),
});

const generateToken = (id, role, isOnboarded) => {
  return jwt.sign(
    {
      id,
      role,
      isOnboarded,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

const authCookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/**
 * @desc    Handle Google Auth (Register / Login)
 * @route   POST /api/auth/google
 * @access  Public
 */
export const googleAuthHandler = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res
        .status(400)
        .json({ success: false, message: "ID Token is required" });
    }

    // 1. Verify the Google ID Token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: config.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const { sub: googleId, email, name: fullName, picture: avatar } = payload;

    // 2. Check if user already exists (Login)
    let user = await userModel.findOne({ googleId });

    // 3. If user doesn't exist, create them (Registration)
    if (!user) {
      user = await userModel.create({
        googleId,
        email,
        fullName,
        avatar,
        role: "Customer", // Everyone defaults to Customer initially
        isOnboarded: false,
      });
    }

    // 4. Generate JWT containing vital routing info
    const token = generateToken(user._id, user.role, user.isOnboarded);

    // 5. Set auth cookie + send response
    res.cookie("token", token, authCookieOptions);

    return res.status(200).json({
      success: true,
      user: serializeUser(user),
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Authentication failed" });
  }
};

/**
 * @desc    Logout current user
 * @route   POST /api/auth/logout
 * @access  Public
 */
export const logout = async (req, res) => {
  res.clearCookie("token", authCookieOptions);
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

/**
 * @desc    Get Current Logged-in User
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: serializeUser(user),
    });
  } catch (error) {
    console.error("Get Me Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
