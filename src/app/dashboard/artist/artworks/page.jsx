"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FiPackage, FiPlus, FiLoader, FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { GetMyArtworks } from "@/utils/artworks";

export default function ManageArtworks() {
  const { data: session, isPending } = authClient.useSession();

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const artistId = session?.user?.id;

  const fetchArtworks = async () => {
    if (!artistId) return;
    try {
      setLoading(true);
      const result = await GetMyArtworks(artistId);

      if (result.success) {
        setArtworks(result.data || []);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Fetch Artworks Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPending) return;

    if (!artistId) {
      setLoading(false);
      return;
    }

    fetchArtworks();
  }, [artistId, isPending]);

  // ডিলিট করার ফাংশন
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const res = `http://localhost:5000/api/artworks/${id}`; // আপনার ব্যাকএন্ড ডিলিট রাউট অনুযায়ী চেক করে নেবেন
      const response = await fetch(res, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Artwork deleted successfully!");
        setArtworks(artworks.filter((art) => art._id !== id));
      } else {
        toast.error(data.message || "Failed to delete artwork");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong during deletion!");
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080714]">
        <FiLoader className="text-4xl text-purple-500 animate-spin" />
      </div>
    );
  }

  if (!artistId) {
    return (
      <div className="min-h-screen bg-[#080714] flex items-center justify-center text-white">
        Please login first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080714] p-4 sm:p-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Artworks</h1>
          <p className="text-gray-400 mt-2">
            View and manage your uploaded artworks.
          </p>
        </div>

        <Link
          href="/dashboard/artist/add-artwork"
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl transition"
        >
          <FiPlus />
          Add Artwork
        </Link>
      </div>

      {/* Total Artwork */}
      <div className="bg-[#100D20] border border-purple-500/20 rounded-2xl p-5 mb-8">
        <p className="text-gray-400">Total Artworks</p>
        <h2 className="text-3xl font-bold mt-2 text-purple-400">
          {artworks.length}
        </h2>
      </div>

      {/* Artwork Table */}
      <div className="bg-[#100D20] border border-purple-500/20 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-purple-500/20">
          <h2 className="text-lg font-semibold">My Artworks</h2>
        </div>

        {artworks.length === 0 ? (
          <div className="text-center py-20">
            <FiPackage className="text-5xl text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No Artworks Found</h3>
            <p className="text-gray-400 mt-2">
              Start by uploading your first artwork.
            </p>
            <Link
              href="/dashboard/artist/add-artwork"
              className="inline-flex items-center gap-2 mt-5 bg-purple-600 px-5 py-3 rounded-xl"
            >
              <FiPlus />
              Add Artwork
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-[#17122A] text-gray-400 text-sm">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-purple-500/10 text-sm">
                {artworks.map((artwork) => (
                  <tr key={artwork._id} className="hover:bg-purple-500/5 transition">
                    {/* Image Column */}
                    <td className="px-6 py-4">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-14 h-14 rounded-xl object-cover border border-purple-500/20"
                      />
                    </td>

                    {/* Title Column */}
                    <td className="px-6 py-4 font-medium text-white">
                      {artwork.title}
                    </td>

                    {/* Price Column */}
                    <td className="px-6 py-4 text-purple-400 font-semibold">
                      ${Number(artwork.price).toFixed(2)}
                    </td>

                    {/* Actions Column (Edit & Delete) */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        {/* Edit Button */}
                        <Link
                          href={`/dashboard/artist/edit/${artwork._id}`}
                          className="flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 py-2 rounded-xl transition border border-blue-500/20 font-medium"
                        >
                          <FiEdit size={16} /> Edit
                        </Link>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(artwork._id)}
                          className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-2 rounded-xl transition border border-red-500/20 font-medium"
                        >
                          <FiTrash2 size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}