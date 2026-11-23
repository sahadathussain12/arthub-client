"use client";

import { useState, useEffect, use, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiArrowLeft,
  FiLoader,
  FiTag,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiAlertCircle,
} from "react-icons/fi";
import { GetSingleArtwork } from "@/utils/artworks";

function ArtworkDetailsContent({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await GetSingleArtwork(id);
      console.log(data, "data is hare");
      setArtwork(data.data);
      setLoading(false);
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080714] text-white flex items-center justify-center">
        <FiLoader className="animate-spin text-5xl text-purple-500" />
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-[#080714] text-white flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <FiAlertCircle className="text-6xl text-purple-400" />
        <h2 className="text-2xl font-bold">Artwork not found</h2>
        <p className="text-gray-400 text-sm max-w-md">
          The artwork you are looking for may have been removed or the ID is
          invalid.
        </p>
        <Link
          href="/artworks"
          className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-sm font-semibold transition"
        >
          Back to Artworks
        </Link>
      </div>
    );
  }

  const artistEmail = artwork.userEmail || artwork.artistEmail || "";

  return (
    <div className="min-h-screen bg-[#080714] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back Button */}
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-[#100D20] px-4 py-2 rounded-xl border border-purple-500/20 transition"
          >
            <FiArrowLeft /> Back to Artworks
          </button>
        </div>

        {/* Main Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#100D20] p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-2xl">
          {/* Artwork Image using standard <img> tag */}
          <div className="relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-purple-500/30 bg-[#080714]">
            <img
              src={artwork.image || artwork.imageUrl}
              alt={artwork?.title || "Artwork Detail Image"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Artwork Information */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
                <FiTag /> {artwork.category || "General"}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {artwork.title}
              </h1>

              {/* Price */}
              <div className="flex items-center text-3xl font-extrabold text-purple-400">
                <FiDollarSign className="mr-0.5" />
                {artwork.price || "150"}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {artwork.description ||
                  "No description provided for this artwork."}
              </p>
            </div>

            {/* Metadata (Artist & Date) */}
            <div className="border-t border-purple-500/20 pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <FiUser className="text-purple-400 text-lg" />
                <span>
                  Artist:{" "}
                  <Link
                    href={`/artists/${encodeURIComponent(artistEmail)}`}
                    className="text-purple-300 hover:underline font-semibold"
                  >
                    {artwork.artistName ||
                      artwork.userName ||
                      "Anonymous Artist"}
                  </Link>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <FiCalendar className="text-purple-400 text-lg" />
                <span>
                  Date Uploaded:{" "}
                  <strong className="text-white">
                    {new Date(
                      artwork.createdAt || Date.now(),
                    ).toLocaleDateString()}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArtworkDetailsPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080714] text-white flex items-center justify-center">
          <FiLoader className="animate-spin text-5xl text-purple-500" />
        </div>
      }
    >
      <ArtworkDetailsContent params={params} />
    </Suspense>
  );
}
