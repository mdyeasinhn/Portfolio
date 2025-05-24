"use client";
import React, { useEffect, useState } from "react";
import BlogTable from "@/components/BlogTable";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  description: string;
  author: string;
  category: "Technology" | "Health" | "Lifestyle" | "Business";
  image: string;
}

const AllBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs`
        );
        console.log(res)
        
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();
        setBlogs(data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  return (
    <section className="p-8">
      <h2 className="text-3xl text-center font-bold text-purple-600 mb-4">
        Manage Blogs
      </h2>

      <div className="mt-6 max-w-screen-lg mx-auto">
        <BlogTable
          data={blogs}
          onDelete={handleDelete}
          onEdit={(id) => router.push(`/dashboard/edit-blog/${id}`)}
        />
      </div>
    </section>
  );
};

export default AllBlogs;
