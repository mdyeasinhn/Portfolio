"use client";
import { useEffect, useState } from "react";
import { User, Shield, Mail, Crown, Activity, Settings, Bell, Search } from "lucide-react";

interface CustomJwtPayload {
  id?: string;
  role?: string;
}

interface UserData {
  _id: string;
  email: string;
  name: string;
  role: string;
}

const DashboardPage = () => {
  const [tokenInfo, setTokenInfo] = useState<CustomJwtPayload | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [stats, setStats] = useState<{totalProjects: number, totalBlogs: number} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // Replace with your actual getCurrentUser import
        // const decodedToken = (await getCurrentUser()) as CustomJwtPayload;
        
        // Mock for demo - replace with actual getCurrentUser call
        const decodedToken = { id: "demo123", role: "admin" } as CustomJwtPayload;

        if (decodedToken?.id) {
          setTokenInfo(decodedToken);

          // Fetch user data
          const userRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${decodedToken.id}`
          );
          const userData = await userRes.json();

          if (userRes.ok && userData?.data) {
            setUser(userData.data);
          }

          // Fetch stats data
          const statsRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats`
          );
          const statsData = await statsRes.json();

          if (statsRes.ok && statsData?.data) {
            setStats({
              totalProjects: statsData.data.totalProjects || 0,
              totalBlogs: statsData.data.totalBlogs || 0
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
      case 'administrator':
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'moderator':
        return <Shield className="w-5 h-5 text-blue-500" />;
      default:
        return <User className="w-5 h-5 text-green-500" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
      case 'administrator':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'moderator':
        return 'bg-gradient-to-r from-blue-400 to-purple-500';
      default:
        return 'bg-gradient-to-r from-green-400 to-teal-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h2 className="text-2xl font-bold text-white mt-6 mb-2">Loading Dashboard</h2>
          <p className="text-purple-200">Preparing your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {user ? (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4">
                Welcome Back, {user.name}!
              </h1>
              <p className="text-xl text-purple-200">
                Ready to manage your workspace with style
              </p>
            </div>

            {/* User Profile Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white flex items-center">
                  <User className="w-6 h-6 mr-3 text-purple-400" />
                  Profile Information
                </h2>
                <div className={`px-4 py-2 rounded-full text-white font-medium ${getRoleBadgeColor(user.role)} shadow-lg`}>
                  <div className="flex items-center space-x-2">
                    {getRoleIcon(user.role)}
                    <span>{user.role}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-3">
                    <Mail className="w-5 h-5 text-blue-400 mr-3" />
                    <h3 className="text-lg font-medium text-white">Email Address</h3>
                  </div>
                  <p className="text-2xl font-semibold text-blue-300">{user.email}</p>
                </div>

                <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-3">
                    <Shield className="w-5 h-5 text-green-400 mr-3" />
                    <h3 className="text-lg font-medium text-white">Access Level</h3>
                  </div>
                  <p className="text-2xl font-semibold text-green-300">{user.role}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-300/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm font-medium">Total Projects</p>
                    <p className="text-3xl font-bold text-white">{stats?.totalProjects || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-300" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-300/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Total Blogs</p>
                    <p className="text-3xl font-bold text-white">{stats?.totalBlogs || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-red-400 mb-4">
              No User Data Found
            </h1>
            <p className="text-red-200 text-lg">
              Unable to load your profile information. Please try refreshing the page.
            </p>
            <button className="mt-6 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-400/30 transition-colors">
              Retry
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;