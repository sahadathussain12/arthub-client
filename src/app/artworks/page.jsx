"use client";

import { useState, useEffect } from "react";
import { FiLoader, FiFrown } from "react-icons/fi";

 // ইউটিলিটি ফাইল থেকে ইমপোর্ট করা হলো
import { GetArtworkData } from "@/utils/artworks";
import ArtworkCard from "@/component/ArtworkCard";

export default function BrowseArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const data = await GetArtworkData();
        setArtworks(data);
      } catch (error) {
        console.error("Error loading artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  return (
    <div className="min-h-screen bg-[#080714] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="border-b border-purple-500/20 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold">All Artworks</h1>
          <p className="text-sm text-gray-400 mt-1">
            Browse our complete collection of digital and physical artwork
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-24">
            <FiLoader className="animate-spin text-4xl text-purple-500" />
          </div>
        ) : artworks.length === 0 ? (
          <div className="text-center py-20 bg-[#100D20] rounded-2xl border border-purple-500/20 space-y-3">
            <FiFrown className="text-5xl text-purple-400 mx-auto" />
            <h3 className="text-xl font-bold">No artworks found</h3>
            <p className="text-sm text-gray-400">
              There are no artworks stored in the database yet.
            </p>
          </div>
        ) : (
          /* Artworks Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {artworks.map((art) => (
              <ArtworkCard key={art._id} artwork={art} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}