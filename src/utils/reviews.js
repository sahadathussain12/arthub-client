const BaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// কোনো আর্টওয়ার্কের সব রিভিউ আনা
export const GetArtworkReviews = async (artworkId) => {
  const url = `${BaseURL}/api/artworks/${artworkId}/reviews`;
  console.log("Reviews URL:", url);

  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { success: false, data: [] };
  }
};

// নতুন রিভিউ যোগ করা
export const AddArtworkReview = async (artworkId, reviewData) => {
  try {
    const res = await fetch(`${BaseURL}/api/artworks/${artworkId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error adding review:", error);
    return { success: false, message: "Network error" };
  }
};