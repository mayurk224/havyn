import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "../config/config.js";
import authRoutes from "../routes/auth.routes.js";
import vendorRoutes from "../routes/vendor.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: config.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);

export default app;
