"use client";
import ProjectTable from "@/components/ProjectTable";
import { TProject } from "@/types/projectType";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AllProjects: React.FC = () => {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`);
        
        if (!res.ok) {
          throw new Error(res.statusText || "Failed to fetch projects");
        }

        const response = await res.json();
        
        // Validate the response data matches TProject structure
        if (Array.isArray(response?.data)) {
          setProjects(response.data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/edit-project/${id}`);
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(res.statusText || "Failed to delete project");
      }

      // Optimistic update
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(error instanceof Error ? error.message : "Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-10 text-red-500">
        <p>Error loading projects: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="text-center my-10">
        <h2 className="text-4xl my-4 md:my-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 leading-tight uppercase">
          Projects
        </h2>
      </div>

      <div className="max-w-screen-lg mx-auto">
        {projects.length > 0 ? (
          <ProjectTable
            data={projects}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No projects found</p>
            <button
              onClick={() => router.push("/dashboard/create-project")}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded hover:opacity-90"
            >
              Create New Project
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProjects;