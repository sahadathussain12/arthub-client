import DashboardSidebar from "@/component/DashboardSideber";

import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0B0818]">
      <DashboardSidebar />
      <main className="flex-1 w-full p-4 md:p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
