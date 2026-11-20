const BaseURL = process.env.NEXT_PUBLIC_API_URL;

export const GetUserOrders = async (userId) => {
  try {
    const res = await fetch(`${BaseURL}/api/orders?userId=${encodeURIComponent(userId)}`);
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch purchase history");
    return result;
  } catch (error) {
    console.error("GetUserOrders Error:", error);
    throw error;
  }
};

export const GetBoughtArtworks = async (userId) => {
  try {
    const res = await fetch(`${BaseURL}/api/user/bought-artworks?userId=${encodeURIComponent(userId)}`);
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch bought artworks");
    return result;
  } catch (error) {
    console.error("GetBoughtArtworks Error:", error);
    throw error;
  }
};