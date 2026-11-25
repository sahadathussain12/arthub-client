import { toast } from "react-toastify";

export const handleStripePayment = async (artwork, session) => {
  try {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artworkId: artwork._id || artwork.id,
        title: artwork.title,
        price: artwork.price,
        image: artwork.image || artwork.imageUrl,
        userId: session?.user?.id || "",
        artistId: artwork.artistId || "",
      }),
    });

    const data = await res.json();

    if (data.success && data.url) {
      window.location.href = data.url;
    } else {
      toast.error(data.message || "Failed to initiate payment");
    }
  } catch (error) {
    console.error("Payment error:", error);
    toast.error("Something went wrong with payment.");
  }
};