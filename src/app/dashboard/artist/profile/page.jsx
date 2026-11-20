import { ProfileContent } from '@/component/ProfileContent';
import React, { Suspense } from 'react';

const page = () => {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#080714]" />}>
      <ProfileContent />
    </Suspense>
    );
};

export default page;