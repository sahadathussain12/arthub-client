"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { FiAward, FiCheck, FiZap, FiLoader, FiStar } from "react-icons/fi";
import { toast } from "react-toastify";
import { UserSidebarContent } from "@/component/UserSidebar";

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const [loadingTier, setLoadingTier] = useState(null);

  const handleUpgrade = async (tierName) => {
    try {
      setLoadingTier(tierName);
      setTimeout(() => {
        toast.success(`Successfully subscribed to ${tierName} Tier!`);
        setLoadingTier(null);
      }, 1000);
    } catch (error) {
      toast.error("Failed to process subscription");
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
              Manage your plan, check purchase limits, and upgrade to unlock more artworks.
            </p>
          </div>

          {/* Pricing Cards Grid (3 Tiers as per requirements) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 max-w-7xl">
            
            {/* 1. Free Tier */}
            <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                    Current Default
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
                disabled
                className="mt-8 w-full py-3 rounded-xl bg-purple-500/10 text-purple-400 font-semibold text-sm cursor-not-allowed opacity-75"
              >
                Active Plan
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
                  $9.99 <span className="text-sm font-normal text-gray-400">/ month</span>[cite: 2]
                </div>

                <ul className="space-y-3 pt-4 border-t border-purple-500/10 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-blue-400" /> Max Purchases: <b>9 paintings</b>[cite: 2]
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-blue-400" /> Priority Support
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleUpgrade("Pro")}
                disabled={loadingTier === "Pro"}
                className="mt-8 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loadingTier === "Pro" && <FiLoader className="animate-spin" />}
                Upgrade to Pro
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
                  $19.99 <span className="text-sm font-normal text-gray-400">/ month</span>[cite: 2]
                </div>

                <ul className="space-y-3 pt-4 border-t border-purple-500/10 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-green-400" /> Max Purchases: <b>Unlimited</b>[cite: 2]
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-green-400" /> Exclusive VIP Access & Support
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleUpgrade("Premium")}
                disabled={loadingTier === "Premium"}
                className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-sm transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loadingTier === "Premium" && <FiLoader className="animate-spin" />}
                Upgrade to Premium
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}