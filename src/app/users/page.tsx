"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { getToken } from "@/utils/auth";
import { Users, Mail, MapPin, Shield, ChevronRight, ChevronLeft, Eye, Loader2, Search, Filter } from "lucide-react";

interface UserAuth {
  _id: string;
  email: string;
  verificationStatus: "Verified" | "Rejected" | "Not Verified";
}

interface User {
  _id: string;
  name: string;
  city: string | null;
  userId: UserAuth;
}

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchUsers = async (pageNo: number) => {
    try {
      const token = getToken();

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/all-users?page=${pageNo}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      setUsers(data.data || []);
      setTotalPages(data.meta?.totalPages || 1);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                         user.userId?.email.toLowerCase().includes(search.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "verified") return matchesSearch && user.userId?.verificationStatus === "Verified";
    if (filter === "rejected") return matchesSearch && user.userId?.verificationStatus === "Rejected";
    if (filter === "not-verified") return matchesSearch && user.userId?.verificationStatus === "Not Verified";
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-800 border-t-gradient-to-r border-t-orange-500 border-r-gradient-to-r border-r-pink-500 rounded-full animate-spin"></div>
              <Users className="w-8 h-8 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-gray-400">Loading users...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 lg:p-6 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        
        {/* Header Section */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-xl border border-gray-800">
                  <Users className="w-6 h-6 text-orange-400" />
                </div>
                User Management
              </h1>
              <p className="text-gray-400 text-sm lg:text-base">
                Manage and monitor all platform users
              </p>
            </div>
            
            <div className="text-sm px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-800">
              <span className="text-gray-400">Total: </span>
              <span className="text-white font-semibold ml-1">{users.length} users</span>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Filter className="w-5 h-5 text-gray-500" />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all duration-300 text-white appearance-none"
              >
                <option value="all">All Users</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
                <option value="not-verified">Not Verified</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-5 h-5 text-gray-500 rotate-90" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table/Grid */}
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">#</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">User</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Email</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Location</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Verification</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr 
                    key={user._id} 
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="text-gray-300 font-medium">
                        {(page - 1) * 10 + index + 1}
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-gray-800">
                          <Users className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">ID: {user._id.slice(-8)}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-300">{user.userId?.email || "N/A"}</span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-300">{user.city || "N/A"}</span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                        user.userId?.verificationStatus === "Verified"
                          ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30"
                          : user.userId?.verificationStatus === "Rejected"
                          ? "bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border border-red-500/30"
                          : "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}>
                        <Shield className="w-3.5 h-3.5" />
                        {user.userId?.verificationStatus}
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <button
                        onClick={() => router.push(`/users/${user.userId._id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-800 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:border-gray-700 group"
                      >
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-orange-400" />
                        View Details
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {filteredUsers.map((user, index) => (
              <div 
                key={user._id} 
                className="p-4 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-gray-800">
                      <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{user.name}</div>
                      <div className="text-gray-400 text-sm">#{index + 1}</div>
                    </div>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    user.userId?.verificationStatus === "Verified"
                      ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400"
                      : user.userId?.verificationStatus === "Rejected"
                      ? "bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400"
                      : "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400"
                  }`}>
                    {user.userId?.verificationStatus}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300 text-sm">{user.userId?.email || "N/A"}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300 text-sm">{user.city || "N/A"}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => router.push(`/users/${user.userId._id}`)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-800 rounded-xl text-white text-sm font-medium transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  View Profile
                </button>
              </div>
            ))}
          </div>
          {filteredUsers.length === 0 && (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl mb-4 border border-gray-800">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
              <p className="text-gray-400">
                {search ? "Try a different search term" : "No users match the selected filter"}
              </p>
            </div>
          )}
        </div>
        {filteredUsers.length > 0 && (
          <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              Showing <span className="text-white font-medium">{filteredUsers.length}</span> users
            </div>
            
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-800 rounded-xl text-white text-sm font-medium transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              <div className="px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-800 rounded-xl">
                <span className="text-white font-medium">{page}</span>
                <span className="text-gray-400 mx-1">of</span>
                <span className="text-white font-medium">{totalPages}</span>
              </div>
              
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-800 rounded-xl text-white text-sm font-medium transition-all duration-300"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}