"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { FiUser, FiMail, FiEdit3, FiLoader, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { UserSidebarContent } from "@/component/UserSidebar";
import { GetUserSubscription, UpdateUserProfile } from "@/utils/user"; // ফাংশন ইমপোর্ট

export default function UserProfile() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    subscriptionTier: "Free",
    maxPurchases: 3,
  });

  // পেজ লোড হলে ইউজারের ডেটা ও সাবস্ক্রিপশন স্ট্যাটাস ফেচ করা
  useEffect(() => {
    if (!userId) return;

    GetUserSubscription(userId)
      .then((data) => {
        if (data.success) {
          setUserData({
            name: session?.user?.name || "",
            email: session?.user?.email || "",
            subscriptionTier: data.tier || "Free",
            maxPurchases: data.maxPurchases || 3,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, session]);

  // প্রোফাইল আপডেট হ্যান্ডলার
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      setUpdating(true);
      const data = await UpdateUserProfile(userId, userData.name);

      if (data.success) {
        toast.success("Profile updated successfully!");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#080714] text-white">
      <UserSidebarContent />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">My Profile</h1>
            <p className="mt-1 text-sm text-gray-400">
              Manage your personal information and check your active subscription tier.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <FiLoader className="animate-spin text-4xl text-purple-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* ইউজার সামারি কার্ড */}
              <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 flex flex-col items-center text-center shadow-xl md:col-span-1">
                <div className="w-24 h-24 rounded-full bg-purple-600/20 border-2 border-purple-500 flex items-center justify-center text-3xl font-bold text-purple-400 mb-4 shadow-inner">
                  {userData.name ? userData.name.charAt(0).toUpperCase() : <FiUser />}
                </div>
                <h3 className="text-xl font-bold">{userData.name || "Art Enthusiast"}</h3>
                <p className="text-xs text-gray-400 mt-1">{userData.email}</p>

                <div className="mt-6 w-full pt-6 border-t border-purple-500/10 space-y-2 text-left">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Plan:</span>
                    <span className="text-purple-400 font-semibold">{userData.subscriptionTier}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Max Purchases:</span>
                    <span className="text-white font-semibold">{userData.maxPurchases}</span>
                  </div>
                </div>
              </div>

              {/* এডিট ফর্ম */}
              <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 sm:p-8 shadow-xl md:col-span-2">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <FiEdit3 className="text-purple-400" /> Edit Profile Details
                </h3>

                <form onSubmit={handleUpdateProfile} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <FiUser />
                      </span>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#080714] border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500 text-sm"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Email Address (Read-only)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <FiMail />
                      </span>
                      <input
                        type="email"
                        value={userData.email}
                        disabled
                        className="w-full pl-10 pr-4 py-3 bg-[#080714]/50 border border-purple-500/10 rounded-xl text-gray-400 cursor-not-allowed text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={updating}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {updating ? <FiLoader className="animate-spin" /> : <FiSave />}
                    Save Changes
                  </button>
                </form>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}