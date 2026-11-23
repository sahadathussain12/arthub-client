"use client";

import Link from "next/link";
import { FiHome, FiCompass, FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080714] text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6 bg-[#100D20] p-8 sm:p-10 rounded-3xl border border-purple-500/20 shadow-2xl relative overflow-hidden">
        {/* Glow Background Effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Icon / Error Code */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 mx-auto">
          <FiAlertTriangle className="text-4xl animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold">Page Not Found</h2>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            Oops! The artwork or page you are looking for might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-sm font-semibold transition shadow-lg shadow-purple-600/30"
          >
            <FiHome /> Back to Home
          </Link>
          <Link
            href="/artworks"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#080714] hover:bg-purple-950/40 text-sm font-semibold border border-purple-500/30 transition text-gray-300 hover:text-white"
          >
            <FiCompass /> Explore Artworks
          </Link>
        </div>
      </div>
    </div>
  );
}