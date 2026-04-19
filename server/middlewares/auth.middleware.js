import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

/**
 * @desc    Middleware to verify JWT and attach user to request object
 */
export const protect = async (req, res, next) => {
  let token = req.cookies?.token;

  // Fallback to bearer token to remain backward compatible.
  if (!token && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};
