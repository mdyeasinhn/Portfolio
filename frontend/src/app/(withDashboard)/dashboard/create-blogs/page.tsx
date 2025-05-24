"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "", // Changed from 'content' to match backend
    author: "",
    category: "",
    image: null as File | null,
  });

  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    setUploading(true);

    try {
      // Upload image to Cloudinary
      const imageFormData = new FormData();
      imageFormData.append("file", formData.image);
      imageFormData.append("upload_preset", "Book-sell-shop");
      imageFormData.append("cloud_name", "dvcbclqid");

      const imageResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dvcbclqid/image/upload",
        {
          method: "POST",
          body: imageFormData,
        }
      );

      if (!imageResponse.ok) {
        throw new Error("Image upload failed");
      }

      const imgData = await imageResponse.json();
      const imageUrl = imgData.secure_url;

      // Prepare data matching backend structure
      const blogData = {
        title: formData.title,
        description: formData.description,
        author: formData.author,
        category: formData.category,
        image: imageUrl,
      };

      // Send to backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (!res.ok) {
        throw new Error("Failed to create blog");
      }

      alert("Blog added successfully!");
      router.push("/dashboard/all-blogs");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create New Blog
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Blog Title"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Blog Description"
              className="w-full p-2 border rounded min-h-[100px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author Name"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {uploading ? "Uploading..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;