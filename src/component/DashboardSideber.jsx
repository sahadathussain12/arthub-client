"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiBox,
  FiPlusCircle,
  FiDollarSign,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiHome,
} from "react-icons/fi";
// তোমার lib/auth-client.js থেকে export নামটা মিলিয়ে নিও
import { authClient } from "@/lib/auth-client";

const NAV_LINKS = [
  { href: "/dashboard/artist/artworks", label: "Manage Artworks", icon: <FiBox /> },
  { href: "/dashboard/artist/add-artwork", label: "Add Artwork", icon: <FiPlusCircle /> },
  { href: "/dashboard/artist/sales", label: "Sales History", icon: <FiDollarSign /> },
  { href: "/dashboard/artist/profile", label: "Profile", icon: <FiUser /> },
];

const ROOT_HREF = "/dashboard/artist";

// রুট পেজে exact match, বাকিগুলোতে nested রুটও ধরবে
function isLinkActive(pathname, href) {
  if (href === ROOT_HREF) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

function NavList({ pathname, onNavigate }) {
  return (
    <nav className="space-y-2" aria-label="Dashboard navigation">
      {NAV_LINKS.map((link) => {
        const active = isLinkActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-sm ${
              active
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "text-gray-400 hover:bg-purple-500/10 hover:text-white"
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function FooterActions({ onNavigate, onLogout }) {
  return (
    <div className="pt-4 border-t border-purple-500/20 space-y-2">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-purple-500/10 hover:text-white transition text-sm font-medium"
      >
        <FiHome className="text-lg" /> Back to Home
      </Link>
      {/* <button
        type="button"
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition text-sm font-medium"
      >
        <FiLogOut className="text-lg" /> Logout
      </button> */}
    </div>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = async () => {
    closeMenu();
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push("/") },
    });
  };

  return (
    <>
      {/* মোবাইল/ট্যাবলেট: শুধু হ্যামবার্গার আইকন */}
      <div className="md:hidden sticky top-0 z-40 bg-[#100D20] border-b border-purple-500/20">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-white text-2xl p-2 rounded-lg hover:bg-purple-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="px-4 pb-4 space-y-2 max-h-[80vh] overflow-y-auto">
            <NavList pathname={pathname} onNavigate={closeMenu} />
            <FooterActions onNavigate={closeMenu} onLogout={handleLogout} />
          </div>
        )}
      </div>

      {/* ডেস্কটপ: sticky সাইডবার (navbar এর উচ্চতা বাদ দিয়ে) */}
      <aside className="hidden md:flex w-64 shrink-0 sticky top-0 h-[calc(100vh-88px)] flex-col justify-between bg-[#100D20] border-r border-purple-500/20 p-6 overflow-y-auto">
        <div>
          <Link href={ROOT_HREF} className="block mb-8">
            <h2 className="text-2xl font-bold text-purple-400">
              Art<span className="text-white">Hub</span>
            </h2>
            <span className="text-xs text-purple-300 block font-normal mt-1">
              Artist Panel
            </span>
          </Link>

          <NavList pathname={pathname} />
        </div>

        <FooterActions onLogout={handleLogout} />
      </aside>
    </>
  );
}