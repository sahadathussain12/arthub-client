"use client";

import { useState, useEffect } from "react";
import { FiStar, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import { AddArtworkReview, GetArtworkReviews } from "@/utils/reviews";

export default function ArtworkReviews({ artworkId, session }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  // ব্যাকএন্ড থেকে রিভিউ ফেচ করা
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await GetArtworkReviews(artworkId);
        if (data.success) {
          setReviews(data.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (artworkId) {
      fetchReviews();
    }
  }, [artworkId]);

  // রিভিউ সাবমিট হ্যান্ডলার
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      return toast.error("Please write a review before submitting.");
    }

    setSubmittingReview(true);
    try {
      const reviewData = {
        userName: session?.user?.name || "Anonymous User",
        userImage: session?.user?.image || null,
        rating: Number(rating),
        comment: comment.trim(),
      };

      const result = await AddArtworkReview(artworkId, reviewData);

      if (result.success) {
        toast.success("Review submitted successfully!");
        setReviews([result.review, ...reviews]); // নতুন রিভিউ সাথে সাথে UI-তে দেখাবে
        setComment("");
        setRating("5");
      } else {
        toast.error(result.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Review submit error:", error);
      toast.error("Something went wrong while submitting review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="bg-[#100D20] p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>

      {/* Write a Review Form */}
      <form onSubmit={handleReviewSubmit} className="space-y-4 pt-2">
        <h3 className="text-lg font-semibold text-purple-300">Write a Review</h3>

        <div className="max-w-xs">
          <label className="block text-xs font-medium text-gray-400 mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-[#080714] px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500"
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Your Review</label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="w-full rounded-xl border border-gray-700 bg-[#080714] p-4 text-white text-sm outline-none focus:border-purple-500 placeholder:text-gray-500 resize-none"
            maxLength={1000}
            required
          />
          <div className="text-right text-xs text-gray-500 mt-1">{comment.length}/1000</div>
        </div>

        <button
          type="submit"
          disabled={submittingReview}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm flex items-center gap-2 transition disabled:opacity-50 shadow-lg shadow-purple-600/20"
        >
          <FiSend /> {submittingReview ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* All Reviews List */}
      <div className="border-t border-purple-500/20 pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">
          All Reviews ({reviews.length})
        </h3>

        {reviews.length === 0 ? (
          <p className="text-gray-400 text-sm py-4">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev, index) => (
              <div key={rev._id || index} className="p-4 rounded-2xl bg-[#080714] border border-purple-500/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-600/30 border border-purple-500 flex items-center justify-center font-bold text-purple-300 text-sm">
                      {rev.userName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{rev.userName}</h4>
                      <span className="text-[10px] text-gray-500">
                        {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {[...Array(Number(rev.rating) || 5)].map((_, i) => (
                      <FiStar key={i} className="fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-sm pl-12">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}