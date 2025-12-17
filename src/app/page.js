"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  async function fetchBlogs() {
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setBlogs(data);
    } catch {
      setError("Could not load blogs");
    }
  }

  async function addBlog() {
    if (!title || !content) return;

    try {
      await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      setTitle("");
      setContent("");
      fetchBlogs();
    } catch {
      setError("Could not post blog");
    }
  }

  async function deleteBlog(id) {
    await fetch("/api/blogs", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchBlogs();
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main>
      <h1>Yuvaan's Thoughts</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Content"
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={addBlog}>Post</button>

      <hr />

      <h3>All Blogs</h3>

      {blogs.length === 0 && <p>No blogs yet.</p>}

      {blogs.map((blog) => (
        <div key={blog._id}>
          <h4>{blog.title}</h4>
          <p>{blog.content}</p>
          <button onClick={() => deleteBlog(blog._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </main>
  );
}
