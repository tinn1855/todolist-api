import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, default: "incomplete" },
    priority: { type: String, default: "medium" },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
