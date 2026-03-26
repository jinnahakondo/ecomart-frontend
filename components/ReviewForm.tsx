"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa6";

/*
  Props
*/
type Props = {
  productId: string;
};

export default function ReviewForm({ productId }: Props) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  /*
    Submit review
  */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          reviewerName: name,
          rating,
          comment,
        }),
      });

      setName("");
      setComment("");
      setRating(5);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" rounded-xl space-y-4 w-full max-w-96 mt-20"
    >
      <h3 className="text-lg font-semibold">
        Write a Review
      </h3>

      {/* Name */}

      {/* Rating */}
      <div>
        <p className="text-sm mb-2">Rating</p>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className={`text-xl ${star <= rating
                ? "text-primary"
                : "text-base-content/30"
                }`}
            >
              <FaStar />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <textarea
        className="textarea textarea-bordered w-full bg-base-200"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />

      {/* Submit */}
      <button
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}