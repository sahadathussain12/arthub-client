"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { FiLoader } from "react-icons/fi";

export default function UserDashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    // সেশন চেক করা শেষ হলে রোল ভেরিফাই করবে
    if (!isPending) {
      if (!user) {
        // লগইন করা না থাকলে লগইন পেজে পাঠিয়ে দেবে
        router.replace("/auth/login");
      } else if (user.role === "artist") {
        // যদি ইউজার আর্টিস্ট হন, তবে আর্টিস্ট ড্যাশবোর্ডে পাঠিয়ে দেবে
        router.replace("/dashboard/artist");
      }
    }
  }, [user, isPending, router]);

  // রোল চেক চলাকালীন লোডিং দেখাবে যাতে ভেতরের কন্টেন্ট দেখা না যায়
  if (isPending || !user || user.role === "artist") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080714]">
        <FiLoader className="text-4xl text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#080714]">
      {/* ইউজার সাইডবার */}
 

      {/* মূল পেজ কন্টেন্ট */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}