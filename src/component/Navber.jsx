"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Site Name */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-wider">
              Art<span className="text-gray-800">Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                isActive("/") ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/artworks"
              className={`font-medium transition-colors ${
                isActive("/artworks") ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Browse Artworks
            </Link>

            {/* Dashboard Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 font-medium focus:outline-none"
              >
                <span>Dashboard</span>
                <FaChevronDown className="text-xs" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/dashboard/user"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    User Dashboard
                  </Link>
                  <Link
                    href="/dashboard/artist"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Artist Dashboard
                  </Link>
                  <Link
                    href="/dashboard/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                </div>
              )}
            </div>

            {/* Login / Auth */}
            <Link
              href="/login"
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              <FaUserCircle className="text-lg" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none text-2xl"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`block font-medium py-2 ${isActive("/") ? "text-indigo-600" : "text-gray-600"}`}
          >
            Home
          </Link>
          <Link
            href="/artworks"
            onClick={() => setIsOpen(false)}
            className={`block font-medium py-2 ${isActive("/artworks") ? "text-indigo-600" : "text-gray-600"}`}
          >
            Browse Artworks
          </Link>
          <div className="py-2 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Dashboards</p>
            <Link href="/dashboard/user" onClick={() => setIsOpen(false)} className="block py-1 text-sm text-gray-600 hover:text-indigo-600">
              User Dashboard
            </Link>
            <Link href="/dashboard/artist" onClick={() => setIsOpen(false)} className="block py-1 text-sm text-gray-600 hover:text-indigo-600">
              Artist Dashboard
            </Link>
            <Link href="/dashboard/admin" onClick={() => setIsOpen(false)} className="block py-1 text-sm text-gray-600 hover:text-indigo-600">
              Admin Dashboard
            </Link>
          </div>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;