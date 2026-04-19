import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

/**
 * @desc    Middleware to verify JWT and attach user to request object
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify token
      const decoded = jwt.verify(token, config.JWT_SECRET);

      // 4. Attach user data to request
      req.user = decoded;
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error);
      res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};
