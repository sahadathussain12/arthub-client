export const instant = false;

import DashboardOverview from "@/component/DashboardOverview";
import React, { Suspense } from "react";


const UserDashboardPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080714]" />}>
      <DashboardOverview />
    </Suspense>
  );
};

export default UserDashboardPage;