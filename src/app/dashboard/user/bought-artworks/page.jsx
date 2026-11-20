export const instant = false;

import BoughtArtworksPage from '@/component/BoughtArtworksPage';
import React, { Suspense } from 'react';

const page = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#080714]" />}>
             <BoughtArtworksPage/>
           </Suspense>
    );
};

export default page;