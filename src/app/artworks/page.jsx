"use client";

import { useState, useEffect } from "react";
import { FiLoader, FiFrown, FiSearch, FiFilter } from "react-icons/fi";
import { GetArtworkData } from "@/utils/artworks";
import ArtworkCard from "@/component/ArtworkCard";

const CATEGORIES = ["All", "Painting", "Digital Art", "Sculpture", "Photography"];

export default function BrowseArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      try {
        const data = await GetArtworkData(search, category);
        setArtworks(data);
      } catch (error) {
        console.error("Error loading artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    // টাইপ করার সাথে সাথে বারবার API কল আটকাতে 300ms ডেবাউন্স
    const debounceTimer = setTimeout(() => {
      loadArtworks();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search, category]);

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

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-[#100D20] p-4 rounded-2xl border border-purple-500/20">
          {/* Search Input */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search artwork by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#080714] border border-purple-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <FiFilter className="text-purple-400 hidden sm:inline mr-1" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  category === cat
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "bg-[#080714] text-gray-400 hover:text-white border border-purple-500/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
              Try searching with another keyword or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-2 px-5 py-2 rounded-xl bg-purple-600 text-sm font-semibold transition hover:bg-purple-700"
            >
              Reset Filters
            </button>
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