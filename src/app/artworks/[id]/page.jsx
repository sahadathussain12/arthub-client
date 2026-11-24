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
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { GetSingleArtwork, DeleteArtwork } from "@/utils/artworks";

function ArtworkDetailsContent({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("user");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    // লোকালস্টোরেজ বা আপনার প্রজেক্টের সিস্টেম অনুযায়ী ইউজারের রোল ও ইমেল ফেচ করা
    const role = localStorage.getItem("userRole") || "artist"; 
    const email = localStorage.getItem("userEmail") || "";
    
    setUserRole(role);
    setCurrentUserEmail(email);

    const fetchDetails = async () => {
      setLoading(true);
      const data = await GetSingleArtwork(id);
      console.log(data,'data');
      setArtwork(data.data);
      setLoading(false);
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  // artworks.js থেকে DeleteArtwork কল করে ডিলিট হ্যান্ডেল করা
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      try {
        const result = await DeleteArtwork(id);
        if (result && result.success) {
          alert("Artwork deleted successfully!");
          router.push("/artworks");
        } else {
          alert(result?.message || "Failed to delete artwork");
        }
      } catch (err) {
        console.error("Delete error:", err);
        alert("Something went wrong while deleting.");
      }
    }
  };

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
          The artwork you are looking for may have been removed or the ID is invalid.
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

  // রোল চেক: ইউজার বা আর্টিস্ট রোল অনুযায়ী বাটন দেখানোর লজিক
  // চাইলে এখানে ইমেল ম্যাচিং ও যুক্ত করতে পারেন: userRole === "artist"
  const isArtist = userRole?.toLowerCase() === "artist";

  return (
    <div className="min-h-screen bg-[#080714] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back Button */}
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-[#100D20] px-4 py-2 rounded-xl border border-purple-500/20 transition"
          >
            <FiArrowLeft /> Back to artworks
          </button>
        </div>

        {/* Top Grid Section: Left Big Image & Right Pricing/Action Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Big Featured Image (Spans 2 columns) */}
          <div className="lg:col-span-2 relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-purple-500/20 bg-[#100D20] shadow-2xl">
            <img
              src={artwork.image || artwork.imageUrl}
              alt={artwork?.title || "Artwork Detail Image"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Price & Owner/Artist Controls Card (Spans 1 column) */}
          <div className="bg-[#100D20] p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Price Tag */}
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Price</span>
                <div className="flex items-center text-4xl font-extrabold text-purple-400 mt-1">
                  <FiDollarSign className="mr-[-6px]" />
                  {artwork.price || "0"}
                </div>
              </div>

              {/* Edit & Delete Controls (Only visible if user role is artist) */}
              {isArtist ? (
                <div className="space-y-3 pt-2 border-t border-purple-500/20">
                  <span className="text-xs text-purple-400 font-semibold block">
                    Manage Artwork
                  </span>
                  <button
                    onClick={() => router.push(`/artworks/edit/${id}`)}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-purple-600/30"
                  >
                    <FiEdit /> Edit Artwork
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 font-semibold text-sm flex items-center justify-center gap-2 transition"
                  >
                    <FiTrash2 /> Delete Artwork
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 text-xs text-gray-400 text-center">
                  Viewer Mode
                </div>
              )}
            </div>

            {/* Listed By Info */}
            <div className="border-t border-purple-500/20 pt-4">
              <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                Listed By
              </span>
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <FiUser className="text-purple-400" />
                <span className="text-purple-300 font-semibold">
                  {artwork.artistName || artwork.userName || "Artist"}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Category, Title & Description Card */}
        <div className="bg-[#100D20] p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
              <FiTag /> {artwork.category || "General"}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              Approved
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {artwork.title}
          </h1>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Description
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {artwork.description || "No description provided."}
            </p>
          </div>

          <div className="border-t border-purple-500/20 pt-4 flex items-center gap-3 text-sm text-gray-400">
            <FiCalendar className="text-purple-400 text-lg" />
            <span>
              Date Uploaded:{" "}
              <strong className="text-white">
                {new Date(artwork.createdAt || Date.now()).toLocaleDateString()}
              </strong>
            </span>
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