export const instant = false

import { UserSidebarContent } from '@/component/UserSidebar';
import React, { Suspense } from 'react';

const UserDashboardPage = () => {
    return (
        <Suspense fallback={<div className="w-64 bg-[#100D20] min-h-screen" />}>
      <UserSidebarContent />
    </Suspense>
  
    );
};

export default UserDashboardPage;