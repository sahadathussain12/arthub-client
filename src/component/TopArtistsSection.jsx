"use client";

import { GetTopArtistsData } from "@/utils/artworks";
import { useEffect, useState } from "react";
import { FiAward } from "react-icons/fi";


export default function TopArtistsSection() {
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopArtists = async () => {
      const data = await GetTopArtistsData();
      setTopArtists(data);
      setLoading(false);
    };

    fetchTopArtists();
  }, []);

  if (loading || topArtists.length === 0) return null;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-3">
          <FiAward className="text-base" /> Hall of Fame
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
          Top Artists
        </h2>
        <p className="mt-2 text-gray-400 text-sm sm:text-base">
          Discover the most successful creators making waves on ArtHub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topArtists.map((artist, index) => (
          <div
            key={artist.artistId}
            className="relative group rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 text-center shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-1"
          >
            {/* র‍্যাংক ব্যাজ */}
            <span className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/30">
              #{index + 1}
            </span>

            {/* আর্টিস্ট অ্যাভাটার (img ট্যাগসহ) */}
            <div className="relative mx-auto h-24 w-24 mb-4 overflow-hidden rounded-full border-2 border-purple-500/40 shadow-inner">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* নাম ও সেলস তথ্য */}
            <h3 className="text-lg font-bold text-white mb-1">{artist.name}</h3>
            <p className="text-xs text-purple-400 font-medium mb-4">
              {artist.totalSales} {artist.totalSales === 1 ? "Artwork Sold" : "Artworks Sold"}
            </p>

            <div className="inline-block text-xs font-semibold text-gray-300 bg-purple-500/10 py-1.5 px-4 rounded-lg border border-purple-500/20">
              Verified Creator
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}