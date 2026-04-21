"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function ReviewSection({ productId, collectionName, productName }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ rating: 5, comment: "", userName: user?.name || "" });

  useEffect(() => {
    fetchReviews();
  }, [productId, collectionName]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}&collection=${collectionName}`);
      const data = await res.json();
      if (res.ok) {
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!user) {
        await Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login to submit a review",
          confirmButtonColor: "#2563eb",
        });
        return;
      }

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          collectionName,
          userName: user.name,
          rating: form.rating,
          comment: form.comment,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your review has been submitted",
          timer: 1500,
          showConfirmButton: false,
        });
        setForm({ rating: 5, comment: "", userName: user.name });
        fetchReviews();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.error,
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit review",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={() => interactive && setForm({ ...form, rating: star })}
            disabled={!interactive || submitting}
            className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"} ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 mt-8 pt-8 border-t border-gray-200">
      {/* Rating Summary */}
      <div className="flex items-center gap-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900">{averageRating}</div>
          <div className="mt-2">{renderStars(Math.round(averageRating))}</div>
          <div className="text-sm text-gray-500 mt-1">{totalReviews} reviews</div>
        </div>
      </div>

      {/* Review Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold">Write a Review</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            {renderStars(form.rating, true)}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              rows={4}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Share your experience with this product..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <div className="glass-card p-6 text-center">
          <p className="text-gray-600">Please log in to write a review.</p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Customer Reviews ({totalReviews})
        </h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review!
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="glass-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{review.userName}</div>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">({review.rating})</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
              <p className="mt-3 text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
