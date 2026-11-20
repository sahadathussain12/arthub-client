"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { GetMyArtworks } from "@/utils/artworks";
import Link from "next/link";
import { FiBox, FiDollarSign, FiPlusCircle, FiTrendingUp, FiLoader } from "react-icons/fi";

export default function ArtistDashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const artistId = user?.id;

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!artistId) return;

    const fetchArtistData = async () => {
      try {
        const result = await GetMyArtworks(artistId);
        if (result.success) {
          setArtworks(result.data || []);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [artistId]);

  // কিছু স্ট্যাটিস্টিক্স হিসাব করা
  const totalArtworks = artworks.length;
  const totalStock = artworks.reduce((acc, curr) => acc + Number(curr.stock || 0), 0);
  const totalValue = artworks.reduce((acc, curr) => acc + (Number(curr.price || 0) * Number(curr.stock || 0)), 0);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <FiLoader className="text-4xl text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-white p-6 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/20 via-[#100D20] to-[#080714] p-6 sm:p-8 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Welcome back, <span className="text-purple-400">{user?.name || "Artist"}</span>! 👋
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Here is an overview of your artworks, performance, and quick management tools.
          </p>
        </div>

        <Link
          href="/dashboard/artist/add-artwork"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 transition hover:bg-purple-700"
        >
          <FiPlusCircle size={18} /> Add New Artwork
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Total Artworks */}
        <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 text-2xl">
            <FiBox />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Artworks</p>
            <h3 className="text-2xl font-bold text-white mt-1">{totalArtworks}</h3>
          </div>
        </div>

        {/* Total Stock */}
        <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 text-2xl">
            <FiTrendingUp />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Available Stock</p>
            <h3 className="text-2xl font-bold text-white mt-1">{totalStock}</h3>
          </div>
        </div>

        {/* Portfolio Value */}
        <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl flex items-center gap-4 sm:col-span-2 lg:col-span-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-400 text-2xl">
            <FiDollarSign />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Portfolio Value</p>
            <h3 className="text-2xl font-bold text-white mt-1">${totalValue.toFixed(2)}</h3>
          </div>
        </div>

      </div>

      {/* Recent Artworks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Artworks</h2>
          <Link
            href="/dashboard/artist"
            className="text-xs font-semibold text-purple-400 hover:underline"
          >
            Manage All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {artworks.slice(0, 4).map((art) => (
            <div
              key={art._id}
              className="group rounded-2xl border border-purple-500/20 bg-[#100D20] overflow-hidden shadow-lg transition hover:border-purple-500/50"
            >
              <div className="h-40 w-full overflow-hidden bg-gray-900">
                <img
                  src={art.image}
                  alt={art.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300">
                  {art.category}
                </span>
                <h3 className="font-semibold truncate text-white">{art.title}</h3>
                <div className="flex items-center justify-between pt-1 text-sm">
                  <span className="font-bold text-purple-400">${art.price}</span>
                  <span className="text-xs text-gray-400">Stock: {art.stock}</span>
                </div>
              </div>
            </div>
          ))}

          {artworks.length === 0 && (
            <div className="col-span-full py-10 text-center text-gray-400 bg-[#100D20] rounded-2xl border border-purple-500/20">
              No artworks added yet. Start by adding your first masterpiece!
            </div>
          )}
        </div>
      </div>

    </div>
  );
}