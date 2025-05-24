"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ProjectFormData {
  title: string;
  content: string;
  image: string; // Changed from FileList to string
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'Other';
  link?: string;
  github?: string;
  techStack?: string;
  features?: string;
  challenges?: string;
  solutions?: string;
}

const CreateProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ProjectFormData) => {
    if (!data.image) {
      alert("Please provide an image URL.");
      return;
    }

    setLoading(true);

    try {
      // Prepare project data matching TProject interface
      const projectData = {
        title: data.title,
        content: data.content,
        image: data.image,
        category: data.category,
        link: data.link,
        github: data.github,
        techStack: data.techStack ? data.techStack.split(',').map(item => item.trim()) : [],
        features: data.features ? data.features.split(',').map(item => item.trim()) : [],
        challenges: data.challenges,
        solutions: data.solutions
      };

      // Send to backend
      const projectResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );

      if (!projectResponse.ok) {
        const errorData = await projectResponse.json();
        alert(`Project creation failed: ${errorData?.message || projectResponse.statusText}`);
        return;
      }

      alert("Project created successfully!");
      setTimeout(() => {
        reset();
        router.push("/dashboard/all-project");
      }, 1000);
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl lg:my-4 my-2">
      <div className="text-center my-10">
        <h2 className="text-4xl my-4 md:my-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 leading-tight uppercase">
          Create Project
        </h2>
      </div>
      <div className="mx-auto max-w-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Add a New Project</p>

          {/* Title (Required) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase">
              Title*
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:to-indigo-600 from-purple-600 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Content/Description (Required) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase">
              Description*
            </label>
            <textarea
              {...register("content", { required: "Description is required" })}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:to-indigo-600 from-purple-600 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Category (Required) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase">
              Category*
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="block w-full py-3 text-gray-700 uppercase bg-white border rounded-lg pl-4 focus:to-indigo-600 from-purple-600 focus:outline-none focus:ring focus:ring-opacity-40"
            >
              <option value="">Select a category</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Mobile">Mobile</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Image URL (Required) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase">
              Image URL*
            </label>
            <input
              type="url"
              {...register("image", { 
                required: "Image URL is required",
                pattern: {
                  value: /^(https?:\/\/).+\.(jpg|jpeg|png|gif|bmp|webp)$/i,
                  message: "Please enter a valid image URL"
                }
              })}
              placeholder="https://example.com/image.jpg"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:to-indigo-600 from-purple-600 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Live Link (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase">
              Live Link
            </label>
            <input
              type="url"
              {...register("link")}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:to-indigo-600 from-purple-600 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {/* GitHub Link (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase">
              GitHub Link
            </label>
            <input
              type="url"
              {...register("github")}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:to-indigo-600 from-purple-600 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {/* Tech Stack (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              {...register("techStack")}
              placeholder="React, Node.js, MongoDB"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:to-indigo-600 from-purple-600 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {/* Features (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase">
              Features (comma separated)
            </label>
            <input
              type="text"
              {...register("features")}
              placeholder="User authentication, Dashboard, API integration"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:to-indigo-600 from-purple-600 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {/* Challenges (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase">
              Challenges
            </label>
            <textarea
              {...register("challenges")}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:to-indigo-600 from-purple-600 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {/* Solutions (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase">
              Solutions
            </label>
            <textarea
              {...register("solutions")}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:to-indigo-600 from-purple-600 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-60 px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500 ${
                loading ? "cursor-not-allowed opacity-75" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;