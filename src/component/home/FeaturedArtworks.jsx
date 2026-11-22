"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiLoader } from "react-icons/fi";

 // আপনার ফাইলের পাথ ও ফাংশনের নাম মিলিয়ে নেবেন
import ArtworkCard from "../ArtworkCard";
import { GetHomePageData } from "@/utils/artworks";

export default function FeaturedArtworks() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await GetHomePageData();
        if (data?.success) {
          setFeatured(data.featuredArtworks || []);
        }
      } catch (error) {
        console.error("Error loading featured artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="">
          <h2 className="text-2xl sm:text-3xl font-bold items-center text-white">
            Featured Artworks
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Freshly curated pieces from our gallery
          </p>
        </div>
        <Link
          href="/artworks"
          className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition"
        >
          View All →
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <FiLoader className="animate-spin text-3xl text-purple-500" />
        </div>
      ) : featured.length === 0 ? (
        <div className="text-center py-14 bg-[#100D20] rounded-2xl border border-purple-500/20 text-gray-400">
          No artworks available yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {featured.map((art) => (
            <ArtworkCard key={art._id} artwork={art} />
          ))}
        </div>
      )}
    </section>
  );
}