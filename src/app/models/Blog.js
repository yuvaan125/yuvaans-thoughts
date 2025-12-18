import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev / hot reload
export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);
