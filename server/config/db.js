import mongoose from "mongoose";
import { setServers } from "node:dns/promises";
import { config } from "./config.js";
setServers(["1.1.1.1", "8.8.8.8"]);

function connectDB() {
  if (!config.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }
  mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
}

export default connectDB;
