"use client";

import GiveAReviewBtn from "@/components/buttons/GiveAReviewBtn";
import ReviewModal from "@/components/modal/ReviewModal";
import { Review } from "@/lib/types/product";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

type ReviewSectionProps = {
  id: string
};

const ReviewSkeleton = () => (
  <div className="bg-base-200 p-5 rounded-xl animate-pulse">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3 flex-1">
        <div className="skeleton w-10 h-10 rounded-full" />
        <div className="flex-1">
          <div className="skeleton h-4 w-24 mb-2" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
      <div className="skeleton h-4 w-12" />
    </div>
    <div className="skeleton h-12 w-full mt-4" />
  </div>
);

export default function ReviewSection({ id }: ReviewSectionProps) {
  const [displayCount, setDisplayCount] = useState(5);
  const reviewModalRef = React.useRef<HTMLDialogElement>(null);

  const { data: reviews = [], isLoading, refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/reviews/${id}`)
      if (!res.ok) {
        throw new Error('Failed to fetch reviews')
      }
      const result = await res.json()
      return result?.data || []
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })

  const openModal = () => {
    reviewModalRef.current?.showModal();
  };

  const closeModal = () => {
    reviewModalRef.current?.close();
  };

  const displayedReviews = reviews.slice(0, displayCount);
  const hasMore = displayCount < reviews.length;

  return (
    <div className="mt-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Customer Reviews {reviews.length > 0 && `(${reviews.length})`}
        </h2>
        <GiveAReviewBtn openModal={openModal} />
      </div>

      {/* Modal */}
      <ReviewModal
        reviewModalRef={reviewModalRef}
        closeModal={closeModal}
        id={id}
        refetchReviews={refetchReviews}
      />

      {/* Reviews */}
      <div className="space-y-4">
        {isLoading ? (
          <>
            <ReviewSkeleton />
            <ReviewSkeleton />
            <ReviewSkeleton />
          </>
        ) : reviews.length === 0 ? (
          <p className='text-base-content/80 text-center py-8'>No reviews yet. Be the first to review!</p>
        ) : (
          <>
            {displayedReviews.map((review: Review) => (
              <div
                key={review._id}
                className="bg-base-200 p-5 rounded-xl"
              >
                {/* User Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="avatar bg-base-100 rounded-full overflow-hidden">
                      <div className="w-10 rounded-full">
                        <Image
                          alt={review.reviewerName}
                          src={review?.avatar || 'https://i.ibb.co/v3X7699/user-placeholder.png'}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium">
                        {review.reviewerName}
                      </h4>

                      <p className="text-xs text-base-content/60">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {/* Rating */}
                  <span className="flex items-center gap-1 text-yellow-500">
                    <FaStar size={14} />
                    <span className="text-sm font-medium">{review.rating}</span>
                  </span>
                </div>

                {/* Comment */}
                <p className="text-base-content/80 mt-4 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}

            {/* Load More Button */}
            {hasMore && (
              <button
                onClick={() => setDisplayCount(c => c + 5)}
                className="btn btn-outline btn-sm w-full mt-6"
              >
                Load more reviews
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}