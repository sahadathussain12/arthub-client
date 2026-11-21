"use client";

import { useState, useEffect } from "react";
import { FiLoader, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";
import { DeleteArtworkByAdmin, GetAdminDashboardData, UpdateUserRole } from "@/utils/admin";
import AdminStatsCards from "@/component/admin/AdminStatsCards";
import AdminCharts from "@/component/admin/AdminCharts";
import ManageUsersTable from "@/component/admin/ManageUsersTable";
import ManageArtworksTable from "@/component/admin/ManageArtworksTable";
import TransactionsTable from "@/component/admin/TransactionsTable";



export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtists: 0,
    totalArtworksSold: 0,
    totalRevenue: "0.00",
  });
  const [users, setUsers] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [charts, setCharts] = useState({ categoryData: [], salesData: [] });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await GetAdminDashboardData();
        if (data.success) {
          setStats(data.stats);
          setUsers(data.users);
          setArtworks(data.artworks);
          setTransactions(data.transactions);
          setCharts(data.charts);
        } else {
          toast.error("Failed to load admin data");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const data = await UpdateUserRole(userId, newRole);
      if (data.success) {
        toast.success(`User role updated to ${newRole}`);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteArtwork = async (artworkId) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const data = await DeleteArtworkByAdmin(artworkId);
      if (data.success) {
        toast.success("Artwork deleted successfully");
        setArtworks((prev) => prev.filter((art) => art._id !== artworkId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete artwork");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080714] flex items-center justify-center text-white">
        <FiLoader className="animate-spin text-4xl text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080714] text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* হেডার */}
        <div className="border-b border-purple-500/20 pb-5">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <FiShield className="text-purple-500" /> Admin Control Center
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your platform&apos;s users, artworks, and view financial analytics.
          </p>
        </div>

        {/* ১. কার্ড কম্পোনেন্ট */}
        <AdminStatsCards stats={stats} />

        {/* ২. চার্ট কম্পোনেন্ট */}
        <AdminCharts charts={charts} />

        {/* ৩. ট্যাব ও টেবিল সেকশন */}
        <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
          <div className="flex flex-wrap gap-3 border-b border-purple-500/20 pb-4 mb-6">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === "users"
                  ? "bg-purple-600 text-white"
                  : "bg-[#080714] text-gray-400 hover:text-white"
              }`}
            >
              Manage Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab("artworks")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === "artworks"
                  ? "bg-purple-600 text-white"
                  : "bg-[#080714] text-gray-400 hover:text-white"
              }`}
            >
              Manage Artworks ({artworks.length})
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === "transactions"
                  ? "bg-purple-600 text-white"
                  : "bg-[#080714] text-gray-400 hover:text-white"
              }`}
            >
              All Transactions ({transactions.length})
            </button>
          </div>

          {activeTab === "users" && (
            <ManageUsersTable users={users} onRoleChange={handleRoleChange} />
          )}
          {activeTab === "artworks" && (
            <ManageArtworksTable artworks={artworks} onDelete={handleDeleteArtwork} />
          )}
          {activeTab === "transactions" && (
            <TransactionsTable transactions={transactions} />
          )}
        </div>

      </div>
    </div>
  );
}