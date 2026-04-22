import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect); // All wishlist routes are protected

router.route("/").get(getWishlist);
router.route("/:productId").post(addToWishlist).delete(removeFromWishlist);

export default router;
