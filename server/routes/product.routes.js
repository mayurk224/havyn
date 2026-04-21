import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const productRoutes = Router();

// The "images" string must match the key name in your frontend FormData
productRoutes.post("/", protect, upload.array("images", 5), createProduct);
productRoutes.get("/", getProducts);

export default productRoutes;