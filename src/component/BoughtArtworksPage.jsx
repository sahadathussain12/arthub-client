
"use client";


import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { FiLoader, FiImage, FiTag } from "react-icons/fi";
import { toast } from "react-toastify";
import { GetBoughtArtworks } from "@/utils/user";
import { UserSidebarContent } from "@/component/UserSidebar";


export default function BoughtArtworksPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchBoughtArtworks = async () => {
      try {
        const result = await GetBoughtArtworks(userId);
        if (result.success) {
          setArtworks(result.data || []);
        } else {
          throw new Error(result.message || "Failed to fetch bought artworks");
        }
      } catch (error) {
        console.error("Bought Artworks Error:", error);
        toast.error(error.message || "Failed to load bought artworks");
      } finally {
        setLoading(false);
      }
    };

    fetchBoughtArtworks();
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-[#080714]">
      {/* বাম পাশে ইউজার সাইডবার */}
      <UserSidebarContent/>
       

      {/* ডান পাশে মূল গ্যালারি কন্টেন্ট */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="space-y-6 text-white max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Bought Artworks</h1>
            <p className="mt-1 text-sm text-gray-400">
              Browse through your personal collection of purchased artworks.
            </p>
          </div>

          {loading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <FiLoader className="text-4xl text-purple-500 animate-spin" />
            </div>
          ) : artworks.length === 0 ? (
            <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-12 text-center shadow-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 text-3xl mb-4">
                <FiImage />
              </div>
              <h3 className="text-lg font-bold">No Artworks Found</h3>
              <p className="text-sm text-gray-400 mt-1">
                You havent added any purchased artworks to your collection yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artworks.map((art) => (
                <div
                  key={art._id || art.id}
                  className="group rounded-2xl border border-purple-500/20 bg-[#100D20] overflow-hidden shadow-xl transition hover:border-purple-500/50 hover:shadow-purple-500/10 flex flex-col"
                >
                  {/* Artwork Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-purple-500/5">
                    <img
                      src={art.image || art.imageUrl || "/placeholder.png"}
                      alt={art.title || "Artwork"}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 rounded-xl bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-green-400 border border-green-500/20">
                      ${art.price || 0}
                    </div>
                  </div>

                  {/* Artwork Details */}
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg text-white line-clamp-1">
                        {art.title || "Untitled Artwork"}
                      </h3>
                      <p className="text-xs text-purple-400 flex items-center gap-1">
                        <FiTag size={12} /> {art.category || "General Art"}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between text-xs text-gray-400">
                      <span>Artist: <strong className="text-gray-200">{art.artistName || "Unknown"}</strong></span>
                      <span className="text-purple-400 font-medium">Owned</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}