import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const cartRoutes = Router();

cartRoutes.use(protect);

cartRoutes.get("/", getCart);
cartRoutes.post("/", addToCart);
cartRoutes.patch("/item", updateCartItemQuantity);
cartRoutes.delete("/item", removeCartItem);
cartRoutes.delete("/", clearCart);

export default cartRoutes;
