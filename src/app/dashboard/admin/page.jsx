"use client";

import { useState, useEffect } from "react";
import { FiLoader, FiMenu, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";
import { DeleteArtworkByAdmin, GetAdminDashboardData, UpdateUserRole } from "@/utils/admin";

import AdminSidebar from "@/component/admin/AdminSidebar";
import AdminStatsCards from "@/component/admin/AdminStatsCards";
import AdminCharts from "@/component/admin/AdminCharts";
import ManageUsersTable from "@/component/admin/ManageUsersTable";
import ManageArtworksTable from "@/component/admin/ManageArtworksTable";
import TransactionsTable from "@/component/admin/TransactionsTable";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-[#080714] text-white flex">
      {/* বাম পাশের সাইডবার */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* ডান পাশের মূল কন্টেন্ট */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* টপ হেডার (মোবাইল মেনু বার + টাইটেল) */}
        <header className="h-16 bg-[#100D20]/80 backdrop-blur-md border-b border-purple-500/20 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
            >
              <FiMenu className="text-xl" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <FiShield className="text-purple-400 hidden sm:inline" />
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "users" && `Manage Users (${users.length})`}
              {activeTab === "artworks" && `Manage Artworks (${artworks.length})`}
              {activeTab === "transactions" && `All Transactions (${transactions.length})`}
            </h1>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
            Admin Panel
          </span>
        </header>

        {/* মেইন কন্টেন্ট সেকশন */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* ১. ওভারভিউ ট্যাব (কার্ড এবং চার্ট একসাথে থাকবে) */}
          {activeTab === "overview" && (
            <>
              <AdminStatsCards stats={stats} />
              <AdminCharts charts={charts} />
            </>
          )}

          {/* ২. ইউজার ম্যানেজমেন্ট ট্যাব */}
          {activeTab === "users" && (
            <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
              <ManageUsersTable users={users} onRoleChange={handleRoleChange} />
            </div>
          )}

          {/* ৩. আর্টওয়ার্ক ম্যানেজমেন্ট ট্যাব */}
          {activeTab === "artworks" && (
            <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
              <ManageArtworksTable artworks={artworks} onDelete={handleDeleteArtwork} />
            </div>
          )}

          {/* ৪. ট্রানজেকশন ট্যাব */}
          {activeTab === "transactions" && (
            <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
              <TransactionsTable transactions={transactions} />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}