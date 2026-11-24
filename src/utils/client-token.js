import { authClient } from "@/lib/auth-client";

// ১. ক্লায়েন্ট সাইড ("use client" ফাইল বা artworks.js) থেকে কল করার জন্য
export const getClientToken = async () => {
  try {
    const { data, error } = await authClient.token();
    
    if (error) {
      console.error("Token fetch error:", error);
      return null;
    }

    return data?.token || null;
  } catch (error) {
    console.error("Failed to get client token:", error);
    return null;
  }
};

 
