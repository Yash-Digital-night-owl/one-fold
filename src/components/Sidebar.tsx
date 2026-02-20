"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Menu,
  X,
  Flame,
  LogOut,
  Sparkles,
  Lock,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { removeToken } from "@/utils/auth";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("isProfileCompleted");
    window.location.href = "/login";
  };

  const navItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      badge: null
    },
    {
      href: "/users",
      icon: Users,
      label: "Users",
      badge: "12+"
    },
    {
      href: "/privacy-policy",
      icon: Lock,
      label: "Privacy Policy",
      badge: null
    },
    {
      href: "/chat-privacy-policy",
      icon: Lock,
      label: "Chat Privacy Policy",
      badge: null
    },
  ];

  const adminEmail = typeof window !== "undefined" ? localStorage.getItem("adminEmail") || "admin@twifold.in" : "admin@twifold.in";

  return (
    <>
      <button 
        className="fixed top-4 left-4 z-50 lg:hidden bg-gradient-to-r from-orange-500 to-pink-500 text-white p-2.5 rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} />
      </button>
      
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
          onClick={() => setOpen(false)}
        />
      )}
      
      <aside
        className={`
          fixed lg:relative top-0 left-0 z-50
          ${collapsed ? "w-16" : "w-56"}
          bg-gradient-to-b from-gray-900/95 to-gray-950/95 backdrop-blur-xl
          border-r border-gray-800
          min-h-screen p-4
          transform transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          hover:${!collapsed ? "lg:w-56" : "lg:w-16"}
          group
          flex flex-col
        `}
        onMouseEnter={() => !collapsed && setCollapsed(false)}
        onMouseLeave={() => !collapsed && setCollapsed(false)}
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-1.5 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 z-10"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <div className="flex justify-between items-center mb-8 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Twofold Admin
              </h1>
              <p className="text-gray-400 text-xs">Control Panel</p>
            </div>
          </div>
          <button 
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Logo Section - Desktop */}
        <div className="hidden lg:flex items-center gap-3 mb-8 overflow-hidden justify-center lg:justify-start">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 flex-shrink-0">
            <Flame className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden animate-fadeIn">
              <h1 className="text-base font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent whitespace-nowrap">
                Twofold Admin
              </h1>
              <p className="text-gray-400 text-xs whitespace-nowrap">Dating Platform</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-grow">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`
                  flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group/item relative
                  ${isActive 
                    ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-l-2 border-orange-500' 
                    : 'hover:bg-gray-800/50'
                  }
                  justify-center lg:justify-start
                `}
                onClick={() => setOpen(false)}
                title={collapsed ? item.label : ""}
              >
                <div className={`relative ${isActive ? 'text-orange-400' : 'text-gray-400 group-hover/item:text-white'}`}>
                  <Icon size={18} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <span className={`
                    text-sm font-medium whitespace-nowrap overflow-hidden animate-fadeIn
                    ${isActive ? 'text-white' : 'text-gray-300 group-hover/item:text-white'}
                  `}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto space-y-2">
          {/* Logout Button */}
          <div className={`
            transition-all duration-300 overflow-hidden
            ${!collapsed ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0 lg:max-h-12 lg:opacity-100'}
          `}>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-xl w-full text-red-400 hover:text-red-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-rose-500/10 transition-all duration-300 group/logout justify-center lg:justify-start"
              title={collapsed ? "Logout" : ""}
            >
              <div className="relative">
                <LogOut className="w-4 h-4 group-hover/logout:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg opacity-0 group-hover/logout:opacity-20 blur-sm"></div>
              </div>
              {!collapsed && (
                <span className="text-sm font-medium whitespace-nowrap overflow-hidden animate-fadeIn">
                  Logout
                </span>
              )}
            </button>
          </div>

          {/* Version Info */}
          {!collapsed && (
            <div className="pt-3 border-t border-gray-800 animate-fadeIn">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">v2.1.4</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 text-xs">Secure</span>
                </div>
              </div>
              <div className="text-gray-600 text-xs text-center">
                © {new Date().getFullYear()} Twofold
              </div>
            </div>
          )}
        </div>
      </aside>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        aside {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 65, 108, 0.3) rgba(31, 41, 55, 0.1);
        }
        aside::-webkit-scrollbar {
          width: 4px;
        }
        aside::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.1);
        }
        aside::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ff416c, #ff4b2b);
          border-radius: 2px;
        }
      `}</style>
    </>
  );
}