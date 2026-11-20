"use client";

import { useState, useEffect } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { FiUser, FiMail, FiImage, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";

export function ProfileContent() {
  const { data: session, refetch } = useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.error("Name cannot be empty!");
    }

    setUpdating(true);

    try {
      // Better Auth দিয়ে সরাসরি ডাটাবেসে ইউজারের নাম ও ছবি আপডেট করা
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      // সেশন রিফ্রেশ করা যাতে Navbar ও Profile-এ সাথে সাথে নতুন নাম দেখায়
      if (refetch) await refetch();

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-white p-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Profile Management</h1>
        <p className="mt-1 text-sm text-gray-400">
          View and update your personal account information.
        </p>
      </div>

      <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-purple-500/20">
          {image || user?.image ? (
            <img
              src={image || user.image}
              alt={user?.name || "Profile"}
              className="h-20 w-20 rounded-full border-2 border-purple-500 object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-800 text-2xl font-bold text-white">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm text-gray-400">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold capitalize bg-purple-500/20 text-purple-400 rounded-full">
              Role: {user?.role || "artist"}
            </span>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Full Name *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <FiUser />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-purple-500/20 bg-[#080714] pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Profile Photo URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Profile Photo URL (Optional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <FiImage />
              </span>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-xl border border-purple-500/20 bg-[#080714] pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Address (Read-only)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <FiMail />
              </span>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full rounded-xl border border-purple-500/10 bg-[#080714]/50 pl-11 pr-4 py-3 text-sm text-gray-500 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={updating}
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50"
            >
              <FiSave />
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}