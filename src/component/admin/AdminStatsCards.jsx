"use client";

import { FiUsers, FiPenTool, FiShoppingBag, FiDollarSign } from "react-icons/fi";

export default function AdminStatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
        <div className="flex justify-between items-center text-gray-400 text-xs font-semibold uppercase">
          <span>Total Users</span>
          <FiUsers className="text-xl text-purple-400" />
        </div>
        <div className="mt-4 text-3xl font-extrabold">{stats.totalUsers}</div>
      </div>

      <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
        <div className="flex justify-between items-center text-gray-400 text-xs font-semibold uppercase">
          <span>Total Artists</span>
          <FiPenTool className="text-xl text-pink-400" />
        </div>
        <div className="mt-4 text-3xl font-extrabold text-pink-400">{stats.totalArtists}</div>
      </div>

      <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
        <div className="flex justify-between items-center text-gray-400 text-xs font-semibold uppercase">
          <span>Artworks Sold</span>
          <FiShoppingBag className="text-xl text-cyan-400" />
        </div>
        <div className="mt-4 text-3xl font-extrabold text-cyan-400">{stats.totalArtworksSold}</div>
      </div>

      <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
        <div className="flex justify-between items-center text-gray-400 text-xs font-semibold uppercase">
          <span>Total Revenue</span>
          <FiDollarSign className="text-xl text-green-400" />
        </div>
        <div className="mt-4 text-3xl font-extrabold text-green-400">${stats.totalRevenue}</div>
      </div>
    </div>
  );
}