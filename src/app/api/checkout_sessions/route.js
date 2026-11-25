import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/utils/stripe";


export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    const { artworkId, title, price, image, userId, artistId } = await req.json();

    if (!artworkId || !price) {
      return NextResponse.json(
        { success: false, message: "Artwork ID and price are required" },
        { status: 400 }
      );
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid price amount" },
        { status: 400 }
      );
    }

    const hasValidImage =
      typeof image === "string" &&
      (image.startsWith("http://") || image.startsWith("https://"));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // 👉 পুরনো payment_method_types এর বদলে এটি ব্যবহার করা হয়েছে
      allowed_payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(numericPrice * 100),
            product_data: {
              name: title || "ArtHub Artwork",
              ...(hasValidImage && { images: [image] }),
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        artworkId: String(artworkId),
        userId: String(userId || ""),
        artistId: String(artistId || ""),
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/artworks/${artworkId}`,
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Stripe session failed" },
      { status: err.statusCode || 500 }
    );
  }
}