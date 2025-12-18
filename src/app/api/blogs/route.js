import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "../../models/Blog";

// MongoDB connection (production-safe)
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI missing (runtime)");
  }

  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(uri, {
    dbName: "yuvaans_thoughts",
  });
}

// GET all blogs
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("GET error:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST a new blog
export async function POST(req) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content required" },
        { status: 400 }
      );
    }

    await connectDB();

    const blog = await Blog.create({ title, content });
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("POST error:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE a blog
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID required" },
        { status: 400 }
      );
    }

    await connectDB();
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
