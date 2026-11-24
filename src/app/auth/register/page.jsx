"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiBriefcase,
  FiUserCheck,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { getTokenData } from "@/utils/client-token";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill in all fields");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!["user", "artist"].includes(role)) {
      return toast.error("Invalid role selected");
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      // Save role in user additional field only if your
      // Better Auth schema has been configured to accept it.
      toast.success("Account created successfully!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080714] px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-2xl shadow-purple-900/10 sm:p-8">
        {/* Logo */}
        <div className="mb-7 text-center">
          <Link href="/" className="text-3xl font-bold text-white">
            Art<span className="text-purple-500">Hub</span>
          </Link>

          <h1 className="mt-5 text-2xl font-bold text-white">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Join ArtHub and discover a world of creativity.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border border-gray-700 bg-[#080714] px-4 focus-within:border-purple-500">
              <FiUser className="text-gray-400" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-gray-700 bg-[#080714] px-4 focus-within:border-purple-500">
              <FiMail className="text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-gray-700 bg-[#080714] px-4 focus-within:border-purple-500">
              <FiLock className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-purple-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Confirm Password
            </label>

            <div className="flex items-center rounded-xl border border-gray-700 bg-[#080714] px-4 focus-within:border-purple-500">
              <FiLock className="text-gray-400" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-purple-400"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Select Role */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-300">
              Choose Your Role
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* User */}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  formData.role === "user"
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-gray-700 hover:border-purple-500"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                  className="accent-purple-500"
                />

                <div>
                  <FiUserCheck className="mb-1 text-lg text-purple-400" />
                  <p className="text-sm font-semibold text-white">User</p>
                  <p className="text-xs text-gray-400">Buyer</p>
                </div>
              </label>

              {/* Artist */}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  formData.role === "artist"
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-gray-700 hover:border-purple-500"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="artist"
                  checked={formData.role === "artist"}
                  onChange={handleChange}
                  className="accent-purple-500"
                />

                <div>
                  <FiBriefcase className="mb-1 text-lg text-purple-400" />
                  <p className="text-sm font-semibold text-white">Artist</p>
                  <p className="text-xs text-gray-400">Sell Artwork</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-700" />
          <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-gray-700" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: "/",
            })
          }
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-700 py-3 font-medium text-white transition hover:border-purple-500 hover:bg-purple-500/5"
        >
          <span className="text-lg font-bold">G</span>
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-purple-400 hover:text-purple-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
