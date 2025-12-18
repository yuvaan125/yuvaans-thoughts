import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "../../../models/Blog";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "yuvaans_thoughts",
  });
}

export async function GET(req, context) {
  try {
    await connectDB();

    // 🔑 FIX: params is async in Next.js 16
    const { id } = await context.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
