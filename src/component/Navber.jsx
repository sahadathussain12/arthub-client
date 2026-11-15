"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX, FiChevronDown, FiShoppingBag, FiArrowUpRight } from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Artworks", href: "/artworks" },
  { name: "Artists", href: "/artists" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080714]/90 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        
        {/* Logo / Site Name */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-800 shadow-lg shadow-purple-500/25 transition duration-300 group-hover:rotate-6 group-hover:scale-105">
            <FiShoppingBag className="text-xl text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Art<span className="text-purple-400">Hub</span>
              <span className="text-purple-400">.</span>
            </h1>
            <p className="text-[9px] font-medium uppercase tracking-[3px] text-gray-400">
              Discover Original Art
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative py-2 text-sm font-medium transition duration-300 ${
                isActive(link.href) ? "text-purple-400 font-semibold" : "text-gray-300 hover:text-purple-400"
              }`}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-purple-500 transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 hover:w-full"
                }`}
              />
            </Link>
          ))}

          {/* Dashboard Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 py-2 text-sm font-medium text-gray-300 transition hover:text-purple-400 focus:outline-none"
            >
              <span>Dashboard</span>
              <FiChevronDown className={`text-xs transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-white/10 bg-[#0D0B1B] p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl z-50">
                <Link
                  href="/dashboard/user"
                  onClick={() => setDropdownOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-purple-500/15 hover:text-purple-300"
                >
                  User Dashboard
                </Link>
                <Link
                  href="/dashboard/artist"
                  onClick={() => setDropdownOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-purple-500/15 hover:text-purple-300"
                >
                  Artist Dashboard
                </Link>
                <Link
                  href="/dashboard/admin"
                  onClick={() => setDropdownOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-purple-500/15 hover:text-purple-300"
                >
                  Admin Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-gray-300 transition hover:text-white"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-purple-500 hover:to-violet-500 hover:shadow-purple-500/40"
          >
            Get Started
            <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-purple-500/40 hover:bg-purple-500/10 lg:hidden"
        >
          {menuOpen ? <FiX size={23} /> : <FiMenu size={23} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0D0B1B] transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="space-y-2 px-5 py-5 sm:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive(link.href) ? "bg-purple-500/20 text-purple-400 font-semibold" : "text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Dashboards Links */}
          <div className="border-t border-white/10 pt-3 mt-3">
            <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1">Dashboards</p>
            <Link
              href="/dashboard/user"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-xs font-medium text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-400"
            >
              User Dashboard
            </Link>
            <Link
              href="/dashboard/artist"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-xs font-medium text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-400"
            >
              Artist Dashboard
            </Link>
            <Link
              href="/dashboard/admin"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-xs font-medium text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-400"
            >
              Admin Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-5 mt-3">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-white/15 py-3 text-center text-sm font-semibold text-white transition hover:border-purple-500"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
            >
              Get Started
              <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}