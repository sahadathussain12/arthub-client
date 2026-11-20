
import { Suspense } from "react";
import DashboardSidebar from "@/component/DashboardSideber";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#080714] md:flex">
      <Suspense fallback={<div className="w-64" />}>
        <DashboardSidebar />
      </Suspense>

      <main className="min-w-0 flex-1 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "@/lib/auth-client";
// import DashboardSidebar from "@/component/DashboardSideber";
// import { FiLoader } from "react-icons/fi";

// export default function DashboardLayout({ children }) {
//   const { data: session, isPending } = useSession();
//   const router = useRouter();
//   const user = session?.user;

//   useEffect(() => {
//     // সেশন লোড হওয়া শেষ হলে চেক করবে
//     if (!isPending) {
//       if (!user) {
//         // লগইন করা না থাকলে লগইন পেজে পাঠিয়ে দেবে
//         router.replace("/auth/login");
//       } else if (user.role !== "artist") {
//         // আর্টিস্ট না হলে হোম বা ইউজার ড্যাশবোর্ডে পাঠিয়ে দেবে
//         router.replace("/dashboard/user");
//       }
//     }
//   }, [user, isPending, router]);

//   // চেক চলাকালীন লোডিং দেখাবে যাতে ভেতরের কন্টেন্ট দেখা না যায়
//   if (isPending || !user || user.role !== "artist") {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#080714]">
//         <FiLoader className="text-4xl text-purple-500 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-[#080714]">
//       <DashboardSidebar />
//       <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
//         {children}
//       </main>
//     </div>
//   );
// }