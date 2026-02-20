"use client";

import { Bell, User, ChevronDown, LogOut, Settings, Shield, Sparkles, Mail } from "lucide-react";
import { removeToken } from "@/utils/auth";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [adminEmail] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminEmail") || "admin@twifold.in";
    }
    return "admin@twifold.in";
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [notifications] = useState([
    { id: 1, text: "New user report submitted", time: "2 min ago", read: false },
    { id: 2, text: "System backup completed", time: "10 min ago", read: true },
    { id: 3, text: "Profile verification required", time: "1 hour ago", read: false },
  ]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("isProfileCompleted");
    window.location.href = "/login";
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 lg:h-20 bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800 flex items-center justify-between px-4 lg:px-6 relative z-40">
      <div className="flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-semibold text-sm">Twofold</span>
        </div>
      </div>
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="relative" ref={notificationRef}>
          <button onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-2.5 bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-800 hover:to-gray-900 rounded-xl transition-all duration-300 border border-gray-800 group"
          >
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                {unreadNotifications}
              </span>
            )}
          </button>
          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 lg:w-96 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">Notifications</h3>
                  <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-lg">
                    {unreadNotifications} new
                  </span>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id}
                    className={`p-4 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${
                      !notification.read ? 'bg-gradient-to-r from-orange-500/5 to-pink-500/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        !notification.read 
                          ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20' 
                          : 'bg-gray-800/50'
                      }`}>
                        <Bell className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{notification.text}</p>
                        <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-800">
                <button className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors py-2">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 lg:gap-3 p-2 lg:p-2.5 bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-800 hover:to-gray-900 rounded-xl transition-all duration-300 border border-gray-800 group"
          >
            <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-gray-400 text-xs">Super Admin</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 ${
              dropdownOpen ? 'rotate-180' : ''
            }`} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 lg:w-64 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Admin User</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <p className="text-gray-400 text-xs">{adminEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}