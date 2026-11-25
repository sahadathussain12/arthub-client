"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const verifyPayment = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL 
        const res = await fetch(`${API_URL}/api/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-[#080714] text-white flex flex-col items-center justify-center space-y-4">
        <FiLoader className="animate-spin text-5xl text-purple-500" />
        <p className="text-gray-300">Verifying your payment...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-[#080714] text-white flex flex-col items-center justify-center space-y-4 text-center px-4">
        <FiAlertCircle className="text-6xl text-red-500" />
        <h1 className="text-2xl font-bold">Payment Verification Failed</h1>
        <p className="text-gray-400 text-sm">Something went wrong verifying your payment.</p>
        <Link href="/artworks" className="px-6 py-2.5 rounded-xl bg-purple-600 text-sm font-semibold">
          Back to Artworks
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080714] text-white flex flex-col items-center justify-center space-y-5 text-center px-4">
      <FiCheckCircle className="text-6xl text-emerald-400" />
      <h1 className="text-3xl font-extrabold">Payment Successful!</h1>
      <p className="text-gray-400 text-sm max-w-md">
        Thank you for your purchase. Your artwork order has been confirmed.
      </p>
      <div className="flex gap-4 pt-2">
        <Link href="/" className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-sm font-semibold transition">
          Go to Home
        </Link>
        <Link href="/artworks" className="px-6 py-3 rounded-xl bg-[#100D20] border border-purple-500/30 text-sm font-semibold transition">
          Explore More
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080714] flex items-center justify-center"><FiLoader className="animate-spin text-5xl text-purple-500" /></div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}