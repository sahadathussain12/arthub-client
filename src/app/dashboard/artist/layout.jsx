
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
