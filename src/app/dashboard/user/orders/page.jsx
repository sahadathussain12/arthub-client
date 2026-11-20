export const instant = false;

import { UserOrdersContent } from "@/component/UserOrdersContent";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080714]" />}>
      <UserOrdersContent />
    </Suspense>
  );
};

export default page;