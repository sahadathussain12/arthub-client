"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { FiShoppingBag, FiAward, FiLayers, FiLoader } from "react-icons/fi";
import { UserSidebarContent } from "@/component/UserSidebar";
import { GetUserSubscription, GetUserOrders } from "@/utils/user"; // আপনার আগে থেকে থাকা ফাংশন দুটি ইমপোর্ট করা হলো

export default function DashboardOverview() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const userEmail = session?.user?.email;

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPurchased: 0,
    currentPlan: "Free",
    remainingLimit: 3,
  });

  useEffect(() => {
    if (!userId) return;

    const loadOverviewData = async () => {
      try {
        // সাবস্ক্রিপশন এবং অর্ডার ডেটা একসাথে ফেচ করা হচ্ছে
        const [subRes, ordersRes] = await Promise.all([
          GetUserSubscription(userId),
          userEmail ? GetUserOrders(userEmail) : Promise.resolve([]),
        ]);

        const currentPlan = subRes?.tier || "Free";
        const maxLimit =
          currentPlan === "Pro" ? 9 : currentPlan === "Premium" ? "Unlimited" : 3;

        // অর্ডারের সংখ্যা বের করা (অ্যারে বা data অবজেক্ট যেভাবেই আসুক)
        const ordersList = Array.isArray(ordersRes)
          ? ordersRes
          : ordersRes?.data || ordersRes?.orders || [];
        const totalPurchased = ordersList.length;

        const remainingLimit =
          maxLimit === "Unlimited"
            ? "Unlimited"
            : Math.max(0, maxLimit - totalPurchased);

        setStats({
          totalPurchased,
          currentPlan,
          remainingLimit,
        });
      } catch (err) {
        console.error("Overview fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOverviewData();
  }, [userId, userEmail]);

  return (
    <div className="flex min-h-screen bg-[#080714] text-white">
      {/* বাম পাশে ইউজার সাইডবার */}
      <UserSidebarContent />

      {/* ডান পাশে সিম্পল ওভারভিউ কন্টেন্ট */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome back,{" "}
              <span className="text-purple-400">
                {session?.user?.name || "User"}
              </span>
              !
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Here is a quick summary of your account status.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <FiLoader className="animate-spin text-4xl text-purple-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* 1. Active Plan */}
              <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Active Plan
                  </span>
                  <FiAward className="text-xl text-purple-400" />
                </div>
                <div className="mt-4 text-3xl font-extrabold text-purple-400">
                  {stats.currentPlan}
                </div>
              </div>

              {/* 2. Total Purchases */}
              <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Purchased Artworks
                  </span>
                  <FiShoppingBag className="text-xl text-blue-400" />
                </div>
                <div className="mt-4 text-3xl font-extrabold">
                  {stats.totalPurchased}
                </div>
              </div>

              {/* 3. Remaining Limit */}
              <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Remaining Limit
                  </span>
                  <FiLayers className="text-xl text-green-400" />
                </div>
                <div className="mt-4 text-3xl font-extrabold text-green-400">
                  {stats.remainingLimit}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}