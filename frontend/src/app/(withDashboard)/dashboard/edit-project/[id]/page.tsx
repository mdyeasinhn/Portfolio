"use client";
//@ts-ignore
import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { TProject } from "@/types/projectType";

const EditProject = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [existingData, setExistingData] = useState<TProject | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm<TProject>();

  // Watch image changes for preview
  const imageFile = watch("image");

  const fetchProject = useCallback(async (projectId: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${projectId}`
      );

      if (!res.ok) throw new Error("Failed to fetch project");

      const { data } = await res.json();
      setExistingData(data);
      reset(data); // Pre-populate form with existing data
      if (data?.image) setImagePreview(data.image);
    } catch (error) {
      console.error("Error fetching project:", error);
      alert("Failed to load project data");
      router.push("/dashboard/all-project");
    } finally {
      setLoading(false);
    }
  }, [reset, router]);

  useEffect(() => {
    if (id) {
      fetchProject(String(id));
    }
  }, [id, fetchProject]);

  const handleImagePreview = useCallback((files: FileList | null) => {
    if (files?.[0]) {
      const file = files[0];
      //@ts-ignore
      if (typeof Blob !== 'undefined' && file instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        console.warn("Selected image is not a Blob:", file);
        setImagePreview(existingData?.image || null);
      }
    } else {
      setImagePreview(existingData?.image || null);
    }
  }, [existingData?.image]);

  // Handle image preview
  useEffect(() => {
    // 'imageFile' from watch might be FileList[] | undefined
    if (Array.isArray(imageFile) && imageFile.length > 0) {
      handleImagePreview(imageFile as unknown as FileList);
    } else if (imageFile === undefined) {
      handleImagePreview(null);
    }
  }, [imageFile, handleImagePreview]);

  // Handle form submission
  const onSubmit = async (data: TProject) => {
    if (!isDirty && !data.image?.[0]) {
      alert("No changes detected");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("category", data.category);
      //@ts-ignore
      if (data.github) formData.append("github", data.github);
      //@ts-ignore
      if (data.link) formData.append("link", data.link);
      //@ts-ignore
      if (data.techStack) formData.append("techStack", Array.isArray(data.techStack) ? data.techStack.join(",") : data.techStack || "");
      //@ts-ignore
      formData.append("features", Array.isArray(data.features) ? data.features.join(",") : data.features || "");
      // Handle image upload if new image was selected
      if (data.image && data.image[0]) {
        formData.append("file", data.image[0]);
        formData.append("upload_preset", "Book-sell-shop");
        formData.append("cloud_name", "dvcbclqid");
      }

      // Send updated data to backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`,
        {
          method: "PATCH",
          body: formData, // Send as FormData
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update project");
      }

      alert("Project updated successfully!");
      router.push("/dashboard/all-project");
    } catch (error) {
      console.error("Update error:", error);
      alert(error instanceof Error ? error.message : "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !existingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!existingData) {
    return <div className="text-center py-10">Project not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
        Edit Project
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title*
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            rows={4}
            {...register("content", { required: "Description is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category*
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a category</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Mobile">Mobile</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        {/* GitHub Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Repository
          </label>
          <input
            type="url"
            //@ts-ignore
            {...register("github")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Live Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Live URL
          </label>
          <input
            type="url"
            //@ts-ignore
            {...register("link")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tech Stack (comma separated)
          </label>
          <input
            type="text"
            //@ts-ignore
            {...register("techStack")}
            //@ts-ignore
            defaultValue={existingData?.techStack?.join(", ")}
            placeholder="React, Node.js, MongoDB"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Features (comma separated)
          </label>
          <input
            type="text"
            //@ts-ignore
            {...register("features")}
            //@ts-ignore
            defaultValue={existingData?.features?.join(", ")}
            placeholder="User authentication, Responsive design"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Image
          </label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    handleImagePreview(e.target.files);
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-40 object-contain rounded-md border"
                    />
                    <p className="mt-1 text-xs text-gray-500">Image Preview</p>
                  </div>
                )}
              </div>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/all-project")}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || (!isDirty && !watch("image")?.[0])}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading || (!isDirty && !watch("image")?.[0]) ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;