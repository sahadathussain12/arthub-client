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



export const GetUserSubscription = async (userId) => {
  const res = await fetch(`${BaseURL}/api/user/subscription?userId=${userId}`, {
    cache: "no-store",
  });
  const result = await res.json()
  return result
};

export const UpdateUserSubscription = async (userId, tier) => {
  const res = await fetch(`${BaseURL}/api/user/subscription`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, tier }),
  });
  const result = await res.json()
  return result
};

export const UpdateUserProfile = async (userId, name) => {
  const res = await fetch(`${BaseURL}/api/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, name }),
  });
  return res.json();
};