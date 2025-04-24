import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Route mặc định để kiểm tra server
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// API routes
app.use("/api/todos", todoRoutes);

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
