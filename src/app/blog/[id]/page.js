"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`/api/blogs/${id}`);
      const data = await res.json();
      setBlog(data);
    }

    fetchBlog();
  }, [id]);

  async function deleteBlog() {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    setLoading(true);

    await fetch("/api/blogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    router.push("/");
  }

  if (!blog) return <p>Loading...</p>;

  return (
    <main className="main-container">
      <h1 className="site-title">{blog.title}</h1>

      <p className="site-subtitle">
        {new Date(blog.createdAt).toDateString()}
      </p>

      <article className="blog-post">
        <p>{blog.content}</p>
      </article>

      <button
        className="delete-btn"
        onClick={deleteBlog}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete this blog"}
      </button>
    </main>
  );
}
