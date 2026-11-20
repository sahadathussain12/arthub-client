export const instant = false;

import SubscriptionPage from '@/component/SubscriptionPage';
import React, { Suspense } from 'react';

const page = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#080714]" />}>
             <SubscriptionPage/>
            </Suspense>
    );
};

export default page;