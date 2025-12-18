"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function fetchBlogs() {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    fetchBlogs();
  }

  return (
    <main className="main-container">
      <h1 className="site-title">Yuvaan’s Thoughts</h1>
      <p className="site-subtitle">A personal space to write and reflect.</p>

      <form className="blog-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Post</button>
      </form>

      {blogs.length === 0 && <p>No blogs yet.</p>}

      {blogs.map((blog) => (
        <div key={blog._id} className="blog-post">
          <h2>
            <Link href={`/blog/${blog._id}`}>
              {blog.title}
            </Link>
          </h2>
          <p className="site-subtitle">
            {new Date(blog.createdAt).toDateString()}
          </p>
        </div>
      ))}
    </main>
  );
}
