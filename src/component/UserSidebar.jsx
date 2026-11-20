"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiGrid,
  FiShoppingBag,
  FiImage,
  FiAward,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export function UserSidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message || "Logout failed");
        return;
      }
      toast.success("Logout successful!");
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ইউজার ড্যাশবোর্ডের রিকোয়ারমেন্ট অনুযায়ী মেনু আইটেমগুলো
  const menuItems = [
    { name: "Overview", href: "/dashboard/user", icon: FiGrid },
    { name: "Purchase History", href: "/dashboard/user/orders", icon: FiShoppingBag },
    { name: "Bought Artworks", href: "/dashboard/user/bought-artworks", icon: FiImage },
    { name: "Subscription Tier", href: "/dashboard/user/subscription", icon: FiAward },
    { name: "Profile Management", href: "/dashboard/user/profile", icon: FiUser },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="flex lg:hidden items-center justify-between bg-[#100D20] p-4 border-b border-purple-500/20 text-white">
        <Link href="/" className="font-bold text-xl text-purple-400">
          Art<span className="text-white">Hub</span>.
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-purple-500/10 text-purple-400"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#100D20] border-r border-purple-500/20 p-6 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:static ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <Link
            href="/"
            className="hidden lg:flex items-center gap-2 text-2xl font-bold text-white"
          >
            Art<span className="text-purple-400">Hub</span>.
          </Link>

          <p className="text-xs font-semibold uppercase tracking-wider text-purple-400/80">
            Collector Dashboard
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive(item.href)
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                      : "text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-purple-500/20">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 transition"
          >
            <FiHome size={18} /> Back to Home
          </Link>

        </div>
      </aside>
    </>
  );
}

