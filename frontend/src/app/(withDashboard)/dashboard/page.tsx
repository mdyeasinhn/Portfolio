"use client";
import { useEffect, useState } from "react";
import { JwtPayload } from "jsonwebtoken";
import { getCurrentUser } from "@/service/auth";

interface CustomJwtPayload extends JwtPayload {
  id?: string;
  role?: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const decodedToken = (await getCurrentUser()) as CustomJwtPayload;

      if (decodedToken?.id) {
        try {
          // Fetch user data
          const userRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${decodedToken.id}`
          );
          const userData = await userRes.json();

          if (userRes.ok && userData?.data) {
            setUser(userData.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h1 className="text-2xl text-gray-600">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 px-6 rounded-b-2xl shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">
            Welcome, {user?.name || 'Yeasin'}!
          </h1>
          <p className="text-center text-purple-100 text-lg">
            Your account information
          </p>
        </div>
      </div>

      {/* User Info Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {user && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-900">{user?.name || 'Yeasin'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Role</p>
                  <p className="font-semibold text-gray-900 capitalize">{user.role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Login</p>
                  <p className="font-semibold text-gray-900">{new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;