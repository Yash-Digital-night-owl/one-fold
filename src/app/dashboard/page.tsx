"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { getToken } from "@/utils/auth";
import {
  Users,
  CheckCircle,
  XCircle,
  FileCheck,
  Activity,
  Shield,
  UserCheck,
  UserX,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Clock,
  AlertCircle,
  PieChart,
  Target,
  Sparkles,
  ArrowUp,
  ArrowDown,
  UserPlus,
  FileText,
  UsersIcon
} from "lucide-react";

interface AnalyticsData {
  users: {
    total: number;
    active: number;
    blocked: number;
  };
  verification: {
    verified: number;
    pending: number;
    documentUploaded: number;
  };
  profiles: {
    completed: number;
  };
  genderDistribution: {
    male?: number;
    female?: number;
  };
}

export default function Dashboard() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async () => {
    try {
      const token = getToken();
      if (!token) {
        router.replace("/login");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data: AnalyticsData = await res.json();
      setAnalytics(data);

    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load dashboard");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [router]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnalytics();
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 lg:p-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-gray-800 border-t-gradient-to-r border-t-orange-500 border-r-gradient-to-r border-r-pink-500 rounded-full animate-spin"></div>
                <BarChart3 className="w-10 h-10 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h3 className="text-xl font-semibold text-white mt-6">Loading Dashboard</h3>
              <p className="text-gray-400 mt-2">Analyzing platform data...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
          <div className="max-w-lg mx-auto mt-12">
            <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-2xl p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Error Loading Dashboard</h3>
                <p className="text-gray-300 mb-6">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-800 rounded-xl text-white font-medium transition-all duration-300"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!analytics) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
          <div className="max-w-lg mx-auto mt-12">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-800 rounded-2xl p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Data Found</h3>
                <p className="text-gray-400">Analytics data hasnot been collected yet.</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Calculate percentages
  const totalUsers = analytics.users.total;
  const activePercentage = totalUsers > 0 ? ((analytics.users.active / totalUsers) * 100).toFixed(1) : "0";
  const verifiedPercentage = totalUsers > 0 ? ((analytics.verification.verified / totalUsers) * 100).toFixed(1) : "0";
  const documentPercentage = totalUsers > 0 ? ((analytics.verification.documentUploaded / totalUsers) * 100).toFixed(1) : "0";
  const profileCompletionPercentage = totalUsers > 0 ? ((analytics.profiles.completed / totalUsers) * 100).toFixed(1) : "0";

  // Gender distribution
  const maleCount = analytics.genderDistribution.male || 0;
  const femaleCount = analytics.genderDistribution.female || 0;
  const malePercentage = totalUsers > 0 ? ((maleCount / totalUsers) * 100).toFixed(1) : "0";
  const femalePercentage = totalUsers > 0 ? ((femaleCount / totalUsers) * 100).toFixed(1) : "0";

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 lg:p-6">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-xl border border-gray-800">
                  <BarChart3 className="w-6 h-6 text-orange-400" />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                  Platform Analytics Dashboard
                </h1>
              </div>
              <p className="text-gray-400">
                Comprehensive overview of platform performance and user engagement
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-800">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  Real-time data
                </span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-800 rounded-xl text-white text-sm font-medium transition-all duration-300"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          
          {/* Total Users Card */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Total Users
                </p>
                <h2 className="text-3xl font-bold text-white">{analytics.users.total.toLocaleString()}</h2>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">Platform foundation</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">All registered accounts</span>
                <div className="text-white text-sm font-medium">
                  +12.5%
                </div>
              </div>
            </div>
          </div>

          {/* Active Users Card */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Active Users
                </p>
                <h2 className="text-3xl font-bold text-green-400">{analytics.users.active.toLocaleString()}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${activePercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-green-400 text-sm whitespace-nowrap">{activePercentage}%</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Currently engaging</span>
                <div className="text-green-400 text-sm font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  +15.7%
                </div>
              </div>
            </div>
          </div>

          {/* Verified Users Card */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Verified Users
                </p>
                <h2 className="text-3xl font-bold text-emerald-400">{analytics.verification.verified.toLocaleString()}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${verifiedPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-emerald-400 text-sm whitespace-nowrap">{verifiedPercentage}%</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Trust & Safety</span>
                <div className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  +8.2%
                </div>
              </div>
            </div>
          </div>

          {/* Documents Uploaded Card */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documents Uploaded
                </p>
                <h2 className="text-3xl font-bold text-purple-400">{analytics.verification.documentUploaded.toLocaleString()}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${documentPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-purple-400 text-sm whitespace-nowrap">{documentPercentage}%</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FileCheck className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Verification progress</span>
                <div className="text-purple-400 text-sm font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  +6.3%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* User Distribution */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Blocked Users */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                    <UserX className="w-5 h-5 text-rose-400" />
                    Blocked Users
                  </h3>
                  <p className="text-gray-400 text-sm">Safety moderation</p>
                </div>
                <div className="text-rose-400 font-bold text-2xl">
                  {analytics.users.blocked.toLocaleString()}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Platform security</span>
                  <div className="flex items-center gap-2">
                    <div className="text-rose-400 text-sm font-medium">Enforced</div>
                    <Shield className="w-4 h-4 text-rose-400" />
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-rose-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(analytics.users.blocked / totalUsers) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Pending Verification */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    Pending Verification
                  </h3>
                  <p className="text-gray-400 text-sm">Awaiting approval</p>
                </div>
                <div className="text-yellow-400 font-bold text-2xl">
                  {analytics.verification.pending.toLocaleString()}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Review queue</span>
                  <div className="text-yellow-400 text-sm font-medium">Active</div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(analytics.verification.pending / totalUsers) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Profiles Completed */}
            <div className="md:col-span-2 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-cyan-400" />
                    Profiles Completed
                  </h3>
                  <p className="text-gray-400 text-sm">Full user profiles</p>
                </div>
                <div className="text-cyan-400 font-bold text-2xl">
                  {analytics.profiles.completed.toLocaleString()}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Completion rate</span>
                  <div className="flex items-center gap-2">
                    <div className="text-cyan-400 text-sm font-medium">{profileCompletionPercentage}%</div>
                    <div className="flex items-center gap-1 text-green-400">
                      <ArrowUp className="w-3 h-3" />
                      <span className="text-xs">+4.2%</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${profileCompletionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-pink-400" />
                Gender Distribution
              </h3>
              <p className="text-gray-400 text-sm">Platform demographics</p>
            </div>
            
            <div className="space-y-6">
              {/* Male Users */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    <span className="text-white">Male</span>
                  </div>
                  <div className="text-white font-bold">{maleCount.toLocaleString()}</div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${malePercentage}%` }}
                  ></div>
                </div>
                <div className="text-right mt-1">
                  <span className="text-blue-400 text-sm">{malePercentage}%</span>
                </div>
              </div>

              {/* Female Users */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                    <span className="text-white">Female</span>
                  </div>
                  <div className="text-white font-bold">{femaleCount.toLocaleString()}</div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${femalePercentage}%` }}
                  ></div>
                </div>
                <div className="text-right mt-1">
                  <span className="text-pink-400 text-sm">{femalePercentage}%</span>
                </div>
              </div>

              {/* Summary */}
              <div className="pt-6 border-t border-gray-800">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-800">
                    <div className="text-blue-400 text-sm mb-1">Male Ratio</div>
                    <div className="text-white font-bold text-lg">{malePercentage}%</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-800">
                    <div className="text-pink-400 text-sm mb-1">Female Ratio</div>
                    <div className="text-white font-bold text-lg">{femalePercentage}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}