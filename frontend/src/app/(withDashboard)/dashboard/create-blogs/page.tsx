"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
    image: null as File | null,
  });

  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const editorRef = useRef<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl p-12 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center tracking-tight">
          Publish a Professional Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-white text-gray-900 placeholder-gray-500 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-white text-gray-900 placeholder-gray-500 font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-white text-gray-900 font-medium"
                required
              >
                <option value="">Select category</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Featured Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-4 border border-gray-300 rounded-lg file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition bg-white text-gray-900 font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Blog Content
            </label>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={formData.description}
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline strikethrough | \
                  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | \
                  link image blockquote code | removeformat",
                content_style: `
                  body { font-family: Arial, sans-serif; font-size: 16px; direction: ltr; text-align: left; }
                  p { margin: 0; }
                `,
                directionality: "ltr",
                placeholder: "Compose your blog content here...",
              }}
              onEditorChange={(content) => {
                setFormData((prev) => ({ ...prev, description: content }));
              }}
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-4 px-8 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed transition font-semibold text-lg tracking-wide"
          >
            {uploading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;