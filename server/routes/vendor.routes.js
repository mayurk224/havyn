import express from 'express';
import { applyToSell } from '../controllers/vendor.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const vendorRoutes = express.Router();

vendorRoutes.put('/apply', protect, applyToSell);

export default vendorRoutes;
