"use client";

import { logout } from "@/service/auth";
import SecondaryButton from "@/shared/SecondaryButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaProjectDiagram, FaBloggerB } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { IoIosContact } from "react-icons/io";
import { TbLogs } from "react-icons/tb";

const Sidebar = () => {
  const routes = useRouter();

  const handleLogout = () => {
    logout();
    routes.push("/");
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6 rounded-xl shadow-md">
      <ul className="space-y-4">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-gray-100 transition duration-200"
          >
            <FaHome className="h-5 w-5 text-gray-400" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/create-project"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-gray-100 transition duration-200"
          >
            <FaProjectDiagram className="h-5 w-5 text-gray-400" />
            <span>Create project</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/all-project"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-gray-100 transition duration-200"
          >
            <GrProjects className="h-5 w-5 text-gray-400" />
            <span>Projects</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/create-blogs"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-gray-100 transition duration-200"
          >
            <FaBloggerB className="h-5 w-5 text-gray-400" />
            <span>Create Blogs</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/contact"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-gray-100 transition duration-200"
          >
            <IoIosContact className="h-5 w-5 text-gray-400" />
            <span>Contact</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/all-blogs"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-gray-100 transition duration-200"
          >
            <TbLogs className="h-5 w-5 text-gray-400" />
            <span>Blogs</span>
          </Link>
        </li>
        <li>
          <div className="sm:flex sm:gap-4">
            <SecondaryButton handler={handleLogout} className="w-full sm:w-auto text-gray-300 hover:text-gray-100 border-gray-600 hover:border-gray-400">
              Logout
            </SecondaryButton>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;