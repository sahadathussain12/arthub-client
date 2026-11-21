import UserProfile from "@/component/UserProfile";
import { Suspense } from "react";

export const instant = false;


const page = () => {
    return (
         <Suspense fallback={<div className="min-h-screen bg-[#080714]" />}>
            <UserProfile/>
           </Suspense>
    );
};

export default page;