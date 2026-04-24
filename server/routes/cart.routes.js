import { Router } from "express";
import { addToCart } from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const cartRoutes = Router();

cartRoutes.use(protect);

cartRoutes.post("/", addToCart);

export default cartRoutes;
