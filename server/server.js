import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to start server:", error);
  }
});
