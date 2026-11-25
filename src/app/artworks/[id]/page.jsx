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
} from "react-icons/fi";
import { GetSingleArtwork } from "@/utils/artworks";

import { authClient } from "@/lib/auth-client";
import ArtworkReviews from "@/component/ArtworkReviews";
import { handleStripePayment } from "@/utils/prement";

function ArtworkDetailsContent({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("user");
  const [processingPayment, setProcessingPayment] = useState(false);

  // Better Auth থেকে সেশন চেক
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      const currentPath = window.location.pathname + window.location.search;
      router.replace(`/auth/login?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }

    const fetchDetails = async () => {
      if (!session) return;

      try {
        const role = session?.user?.role || localStorage.getItem("userRole") || "user";
        setUserRole(role);

        const data = await GetSingleArtwork(id);
        setArtwork(data.artwork || data.data || data);
      } catch (error) {
        console.error("Error fetching artwork:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && session) {
      fetchDetails();
    }
  }, [id, session, isPending, router]);

  // পেমেন্ট হ্যান্ডলার
  const onPaymentClick = async () => {
    if (!artwork) return;
    setProcessingPayment(true);
    await handleStripePayment(artwork, session);
    setProcessingPayment(false);
  };

  if (isPending || loading) {
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

  const isArtist = userRole?.toLowerCase() === "artist";

  return (
    <div className="min-h-screen bg-[#080714] text-white py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Button */}
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-[#100D20] px-4 py-2 rounded-xl border border-purple-500/20 transition"
          >
            <FiArrowLeft /> Back to artworks
          </button>
        </div>

        {/* Top Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* বামপাশে: বড় ফিচারড ইমেজ এবং ডেসক্রিপশন */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-purple-500/20 bg-[#100D20] shadow-2xl">
              <img
                src={artwork.image || artwork.imageUrl}
                alt={artwork?.title || "Artwork Detail Image"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Info Section */}
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

          {/* ডানপাশ: পেমেন্ট এবং বুকিং কার্ড */}
          <div className="space-y-6">
            <div className="bg-[#100D20] p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-2xl space-y-6">
              
              {/* Price Display */}
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Price</span>
                <div className="flex items-center text-4xl font-extrabold text-purple-400 mt-1">
                  <FiDollarSign className="mr-[-6px]" />
                  {artwork.price || "0"}
                </div>
              </div>

              {/* Payment / Buy Button */}
              <div className="space-y-3 pt-2 border-t border-purple-500/20">
                <button
                  onClick={onPaymentClick}
                  disabled={processingPayment}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {processingPayment ? (
                    <>
                      <FiLoader className="animate-spin text-lg" /> Redirecting to Stripe...
                    </>
                  ) : (
                    "Book Now / Pay Now"
                  )}
                </button>
              </div>

              {/* Artist / Owner Info */}
              <div className="border-t border-purple-500/20 pt-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                  Listed By
                </span>
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <FiUser className="text-purple-400" />
                  <span className="text-purple-300 font-semibold">
                    {artwork.artistName || artwork.userName || "Owner / Artist"}
                  </span>
                </div>
              </div>

              {/* শুধুমাত্র আর্টিস্ট হলে শুধু Edit বাটন দেখাবে */}
              {isArtist && (
                <div className="space-y-3 pt-4 border-t border-purple-500/20">
                  <span className="text-xs text-purple-400 font-semibold block">
                    Manage Artwork
                  </span>
                  <button
                    onClick={() => router.push(`/dashboard/artist/edit/${id}`)}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <FiEdit /> Edit Artwork
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* 🟢 নিচের সেকশন: Customer Reviews & Comments Component */}
        <ArtworkReviews artworkId={id} session={session} />

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