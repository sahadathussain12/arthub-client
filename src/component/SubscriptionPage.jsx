"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { FiAward, FiCheck, FiZap, FiLoader, FiStar } from "react-icons/fi";
import { toast } from "react-toastify";
import { UserSidebarContent } from "@/component/UserSidebar";
import {  GetUserSubscription, UpdateUserSubscription } from "@/utils/user"; // ১. ফাংশন ইমপোর্ট

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [currentTier, setCurrentTier] = useState("Free");
  const [loadingTier, setLoadingTier] = useState(null);

  // ২. পেজ লোড হলে ডাটাবেস থেকে ইউজারের বর্তমান প্ল্যান ফেচ করা
  useEffect(() => {
    if (!userId) return;
    GetUserSubscription(userId)
      .then((res) => {
        if (res.success && res.tier) {
          setCurrentTier(res.tier);
        }
      })
      .catch((err) => console.error("Subscription fetch error:", err));
  }, [userId]);

  // ৩. বাটনে ক্লিক করলে ডাটাবেসে নতুন প্ল্যান সেভ করা
  const handleUpgrade = async (tierName) => {
    if (!userId) {
      toast.error("Please login first!");
      return;
    }

    try {
      setLoadingTier(tierName);
      const res = await UpdateUserSubscription(userId, tierName);

      if (res.success) {
        setCurrentTier(tierName);
        toast.success(`Successfully subscribed to ${tierName} Tier!`);
      } else {
        throw new Error(res.message || "Failed to update subscription");
      }
    } catch (error) {
      toast.error(error.message || "Failed to process subscription");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#080714]">
      {/* বাম পাশে ইউজার সাইডবার */}
      <UserSidebarContent />

      {/* ডান পাশে মূল সাবস্ক্রিপশন কন্টেন্ট */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="space-y-8 text-white max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Subscription Tier Overview</h1>
            <p className="mt-1 text-sm text-gray-400">
              Current Active Plan: <span className="text-purple-400 font-bold">{currentTier}</span> — Manage your plan and purchase limits.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 max-w-7xl">
            
            {/* 1. Free Tier */}
            <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                    Default
                  </span>
                  <FiAward className="text-2xl text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-xs text-gray-400 mt-1">For casual art explorers.</p>
                </div>
                <div className="text-3xl font-extrabold text-white">
                  $0 <span className="text-sm font-normal text-gray-400">/ forever</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-purple-500/10 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-purple-400" /> Max Purchases: <b>3 paintings</b>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-purple-400" /> Standard Support
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleUpgrade("Free")}
                disabled={currentTier === "Free" || loadingTier === "Free"}
                className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
                  currentTier === "Free"
                    ? "bg-purple-500/10 text-purple-400 cursor-not-allowed opacity-75"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {loadingTier === "Free" && <FiLoader className="animate-spin" />}
                {currentTier === "Free" ? "Active Plan" : "Switch to Free"}
              </button>
            </div>

            {/* 2. Pro Tier */}
            <div className="rounded-2xl border border-purple-500/40 bg-[#100D20] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
                    Popular
                  </span>
                  <FiZap className="text-2xl text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-xs text-gray-400 mt-1">For regular art collectors.</p>
                </div>
                <div className="text-3xl font-extrabold text-white">
                  $9.99 <span className="text-sm font-normal text-gray-400">/ month</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-purple-500/10 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-blue-400" /> Max Purchases: <b>9 paintings</b>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-blue-400" /> Priority Support
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleUpgrade("Pro")}
                disabled={currentTier === "Pro" || loadingTier === "Pro"}
                className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
                  currentTier === "Pro"
                    ? "bg-blue-500/10 text-blue-400 cursor-not-allowed opacity-75"
                    : "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/30"
                }`}
              >
                {loadingTier === "Pro" && <FiLoader className="animate-spin" />}
                {currentTier === "Pro" ? "Active Plan" : "Upgrade to Pro"}
              </button>
            </div>

            {/* 3. Premium Tier */}
            <div className="rounded-2xl border border-purple-500/60 bg-gradient-to-b from-purple-900/20 via-[#100D20] to-[#100D20] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-bl-xl">
                Best Value
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                    Unlimited
                  </span>
                  <FiStar className="text-2xl text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <p className="text-xs text-gray-400 mt-1">For elite art investors & enthusiasts.</p>
                </div>
                <div className="text-3xl font-extrabold text-white">
                  $19.99 <span className="text-sm font-normal text-gray-400">/ month</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-purple-500/10 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-green-400" /> Max Purchases: <b>Unlimited</b>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-green-400" /> Exclusive VIP Access & Support
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleUpgrade("Premium")}
                disabled={currentTier === "Premium" || loadingTier === "Premium"}
                className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
                  currentTier === "Premium"
                    ? "bg-green-500/10 text-green-400 cursor-not-allowed opacity-75"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-600/30"
                }`}
              >
                {loadingTier === "Premium" && <FiLoader className="animate-spin" />}
                {currentTier === "Premium" ? "Active Plan" : "Upgrade to Premium"}
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}