import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String, required: true },
    status: { type: String, default: "incomplete" },
    priority: { type: String, default: "medium" },
  },
  { timestamps: true }
);

todoSchema.set("toJSON", {
  virtuals: true, // Cho phép dùng virtuals
  versionKey: false, // Xóa __v
  transform: (doc, ret) => {
    ret.id = ret._id.toString(); // ép _id thành string rồi gán vào id
    delete ret._id; // Xóa _id
  },
});

export default mongoose.model("Todo", todoSchema);
