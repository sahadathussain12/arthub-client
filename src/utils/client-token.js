import { authClient } from "@/lib/auth-client";

export const getClientToken = async () => {
  try {
    const response = await authClient.token();
    
    if (!response || response.error) {
      return null;
    }
    

    return response.data?.token || response.data || null;
  } catch (err) {
    return null;
  }

};