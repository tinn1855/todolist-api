import mongoose from "mongoose";
import { env } from "./environment.js";

// Kết nối MongoDB bằng Mongoose
export const CONNECT_DB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      dbName: env.DATABASE_NAME,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Thoát nếu không kết nối được
  }
};

// Lấy instance của database
export const GET_DB = () => mongoose.connection;

// Đóng kết nối MongoDB
export const CLOSE_DB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
};
