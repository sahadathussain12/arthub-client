"use client";

import Link from "next/link";
import {
  FiShield,
  FiGrid,
  FiUsers,
  FiImage,
  FiDollarSign,
  FiHome,
  FiX,
} from "react-icons/fi";

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
}) {
  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: FiGrid },
    { id: "users", label: "Manage Users", icon: FiUsers },
    { id: "artworks", label: "Manage Artworks", icon: FiImage },
    { id: "transactions", label: "Transactions", icon: FiDollarSign },
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#100D20] border-r border-purple-500/20 flex flex-col justify-between transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Top Brand */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-purple-500/20">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 text-white">
                <FiShield className="text-lg" />
              </div>
              <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ArtHub Admin
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600/30 to-pink-500/20 text-white border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon
                    className={`text-lg ${
                      isActive ? "text-purple-400" : "text-gray-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Back to Home */}
        <div className="p-4 border-t border-purple-500/20">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/[0.04] hover:text-white transition"
          >
            <FiHome className="text-lg text-cyan-400" />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>
    </>
  );
}