import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// সার্ভার সাইড থেকে টোকেন নেওয়ার জন্য
export const getServerToken = async () => {
  try {
    const sessionHeaders = await headers();
    const token = await auth.api.getToken({
      headers: sessionHeaders,
    });
    return token || null;
  } catch (error) {
    console.error("Server token error:", error);
    return null;
  }
};