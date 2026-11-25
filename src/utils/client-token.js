import { authClient } from "@/lib/auth-client";

export const getClientToken = async () => {
  try {
    const response = await authClient.token();
    
    // ইউজার লগইন করা না থাকলে সাইলেন্টলি null রিটার্ন করবে, কোনো এরর থ্রো করবে না
    if (!response || response.error) {
      return null;
    }

    return response.data?.token || response.data || null;
  } catch (err) {
    // লগআউট অবস্থায় এক্সেপশন হ্যান্ডেল করার জন্য
    return null;
  }
};