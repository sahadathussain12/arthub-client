const BaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const GetSalesHistory = async (artistId) => {
  try {
    const res = await fetch(`${BaseURL}/api/sales?artistId=${encodeURIComponent(artistId)}`);
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch sales history");
    return result;
  } catch (error) {
    console.error("GetSalesHistory Error:", error);
    throw error;
  }
};