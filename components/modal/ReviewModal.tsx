import { User } from "@/lib/context/AuthProvider";
import React, { useState } from "react";

interface ReviewModalProps {
    reviewModalRef: React.RefObject<HTMLDialogElement | null>;
    closeModal: () => void;
    user: User | null;
}

export default function ReviewModal({
    reviewModalRef,
    closeModal,
    user

}: ReviewModalProps) {
    const [rating, setRating] = useState<number>(0);
    const [comment, setReview] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            alert("You must be logged in to submit a review.");
            return;
        }
        const reviewData = {
            reviewerName: user.name,
            email: user.email,
            avatar: user.avatar,
            rating,
            comment
        }
        //  send the review data to your backend API
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData)
            })
            const result = await res.json()
            setRating(0);
            setReview("");
            closeModal();
            alert(result.message || "Review submitted successfully!");
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    }

    return (
        <dialog ref={reviewModalRef} className="modal">
            <div className="modal-box max-w-96 p-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-primary font-semibold text-lg">
                        Give a Review
                    </h2>

                    <button
                        className="btn btn-sm btn-circle btn-ghost"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    {/*  Rating */}
                    <div>
                        <p className="mb-2 text-sm font-medium">Rating</p>

                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <input
                                    key={star}
                                    type="radio"
                                    name="rating"
                                    className="mask mask-star-2 bg-orange-400"
                                    checked={rating === star}
                                    onChange={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Review Text */}
                    <div>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Write your review..."
                            value={comment}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-full">
                        Submit Review
                    </button>
                </form>
            </div>
        </dialog>
    );
}