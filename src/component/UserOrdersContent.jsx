"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import { GetUserOrders } from "@/utils/user";
import { UserSidebarContent } from "@/component/UserSidebar"; // সাইডবার ইম্পোর্ট করা হলো

export function UserOrdersContent() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const result = await GetUserOrders(userId);
        console.log(result, 'resul');
        if (result.success) {
          setOrders(result.data || []);
        } else {
          throw new Error(result.message || "Failed to fetch orders");
        }
      } catch (error) {
        console.error("Orders Error:", error);
        toast.error(error.message || "Failed to load purchase history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-[#080714]">
      {/* বাম পাশে ইউজার সাইডবার */}
      <UserSidebarContent />

      {/* ডান পাশে মূল কন্টেন্ট */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="space-y-6 text-white max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Purchase History</h1>
            <p className="mt-1 text-sm text-gray-400">
              View all the artworks you have purchased and their transaction details.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-purple-500/20 bg-[#100D20] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-purple-500/20 bg-purple-500/5 text-xs uppercase tracking-wider text-purple-400">
                    <th className="p-4">Artwork Name</th>
                    <th className="p-4">Artist</th>
                    <th className="p-4">Purchase Date</th>
                    <th className="p-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/10 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="p-8 text-center">
                        <div className="flex items-center justify-center">
                          <FiLoader className="text-3xl text-purple-500 animate-spin" />
                        </div>
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-gray-400">
                        You haven,t purchased any artworks yet.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id || order.id} className="transition hover:bg-purple-500/5">
                        <td className="p-4 font-semibold text-white">
                          {order.artworkTitle || order.title || "Untitled Artwork"}
                        </td>
                        <td className="p-4 text-gray-300">
                          {order.artistName || "Unknown Artist"}
                        </td>
                        <td className="p-4 text-gray-400">
                          {order.purchaseDate || order.createdAt
                            ? new Date(order.purchaseDate || order.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="p-4 text-right font-bold text-green-400">
                          ${order.price || 0}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}