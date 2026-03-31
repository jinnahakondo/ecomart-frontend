"use client"
import GiveAReviewBtn from '@/components/buttons/GiveAReviewBtn'
import ReviewModal from '@/components/modal/ReviewModal';
import { useAuth } from '@/lib/context/AuthProvider';
import { Product } from '@/lib/types/product';
import React from 'react'
import { FaStar } from 'react-icons/fa';

type ReviewSectionProps = {
  product: Product;
};

export default function ReviewSection({ product }: ReviewSectionProps) {

  const { user } = useAuth()

  const reviewModalRef = React.useRef<HTMLDialogElement>(null);

  const openModal = () => {
    reviewModalRef.current?.showModal();
  };

  const closeModal = () => {
    reviewModalRef.current?.close();
  };

  return (
    <div className="mt-14">
      <div className='flex items-center justify-between mb-4'>
        <h2 className="text-xl font-semibold mb-6">
          Customer Reviews
        </h2>
        {/* give review button  */}
        {/* <button className='btn btn-primary'>Give A Review</button> */}

        <GiveAReviewBtn openModal={openModal} />

      </div>
      <ReviewModal reviewModalRef={reviewModalRef} closeModal={closeModal} user={user} />

      <div className="space-y-4">
        {product.reviews.map((review) => (
          <div
            key={review._id}
            className="bg-base-200 p-5 rounded-xl"
          >

            {/* User Info */}
            <div className="flex items-start justify-between ">

              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div className="avatar bg-base-100 border rounded-full overflow-hidden">
                  <div className="w-10 rounded-full">
                    {/* <Image
                                                    width={100}
                                                    height={100}
                                                    src={''}
                                                    }

                                                alt={review.reviewerName}
                                                /> */}
                  </div>
                </div>

                {/* Name + Date */}
                <div>
                  <h4 className="font-medium text-base-content">
                    {review.reviewerName}
                  </h4>

                  {/* <p className="text-xs text-base-content/60">
                {formatDate(review.date)}
              </p> */}
                </div>

              </div>

              {/* Rating */}
              <span className="flex items-center gap-1 text-primary">
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
  )
}
