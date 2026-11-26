"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "@/lib/auth-client";
import { FiDollarSign, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import { GetSalesHistory } from "@/utils/sales";


 export function SalesContent() {
  const { data: session } = useSession();
  const user = session?.user;
  const artistId = user?.id;

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!artistId) return;

    const fetchSales = async () => {
      try {
        const result = await GetSalesHistory(artistId);
        if (result.success) {
          setSales(result.data || []);
        }
      } catch (error) {
        toast.error(error.message || "Failed to load sales history");
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [artistId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <FiLoader className="text-4xl text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white p-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Sales History</h1>
        <p className="mt-1 text-sm text-gray-400">
          Track all your sold artworks, buyer details, and earnings.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-purple-500/20 bg-[#100D20] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-500/5 text-xs uppercase tracking-wider text-purple-400">
                <th className="p-4">Artwork Title</th>
                <th className="p-4">Buyer Name</th>
                <th className="p-4">Purchase Date</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10 text-sm">
              {sales.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-400">
                    No sales records found yet.
                  </td>
                </tr>
              ) : (
                sales.map((sale) => (
                  <tr key={sale._id} className="transition hover:bg-purple-500/5">
                    <td className="p-4 font-semibold text-white">
                      {sale.artworkTitle || sale.title}
                    </td>
                    <td className="p-4 text-gray-300">{sale.buyerName || "N/A"}</td>
                    <td className="p-4 text-gray-400">
                      {sale.purchaseDate
                        ? new Date(sale.purchaseDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-4 text-right font-bold text-green-400">
                      ${sale.amount || sale.price}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

