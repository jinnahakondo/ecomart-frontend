"use client";

import GiveAReviewBtn from "@/components/buttons/GiveAReviewBtn";
import ReviewModal from "@/components/modal/ReviewModal";
import { useAuth } from "@/lib/context/AuthProvider";
import { Product } from "@/lib/types/product";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

type ReviewSectionProps = {
  product: Product;
};

export default function ReviewSection({ product }: ReviewSectionProps) {
  const { user } = useAuth();

  const reviewModalRef = React.useRef<HTMLDialogElement>(null);

  const openModal = () => {
    reviewModalRef.current?.showModal();
  };

  const closeModal = () => {
    reviewModalRef.current?.close();
  };

  return (
    <div className="mt-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>

        <GiveAReviewBtn openModal={openModal} />
      </div>

      {/* Modal */}
      <ReviewModal
        reviewModalRef={reviewModalRef}
        closeModal={closeModal}
        user={user}
      />

      {/* Reviews */}
      <div className="space-y-4">
        {product.reviews.map((review) => (
          <div
            key={review._id}
            className="bg-base-200 p-5 rounded-xl"
          >
            {/* User Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="avatar bg-base-100  rounded-full overflow-hidden">
                  <div className="w-10 rounded-full">
                    <Image
                      alt={review.reviewerName}
                      src={review.avatar}
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
                    {(review.date).split("T")[0]}
                  </p>
                </div>
              </div>
              {/* Rating */}
              <span className="flex items-center gap-1 text-primary mt-2">
                <FaStar />
                {review.rating}
              </span>
            </div>


            {/* Comment */}
            <p className="text-base-content/80 mt-4 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}