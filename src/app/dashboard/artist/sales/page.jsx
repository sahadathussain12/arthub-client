import { SalesContent } from '@/component/SalesContent';
import React, { Suspense } from 'react';


const page = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#080714]" />}>
      <SalesContent />
    </Suspense>
    );
};

export default page;<h1>hi</h1>