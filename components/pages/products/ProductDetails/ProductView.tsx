'use client'

import { Product } from '@/lib/types/product'
import Image from 'next/image'
import { useState } from 'react'
import OrderNowBtn from '@/components/buttons/OrderNowBtn'
import {
    FaBangladeshiTakaSign,
    FaStar,
} from 'react-icons/fa6'

type Props = {
    product: Product
}

export default function ProductView({
    product,
}: Props) {
    const [selectedImage, setSelectedImage] = useState(
        product.images?.[0] || product.thumbnail
    )

    return (
        <div className="grid lg:grid-cols-2 gap-10 mb-14">
            {/* LEFT SIDE */}
            <div>
                {/* Main Image */}
                <div className="bg-base-200 rounded-2xl p-5 mb-4">
                    <Image
                        src={selectedImage}
                        alt={product.title}
                        width={700}
                        height={700}
                        className="w-full h-112.5 object-contain rounded-xl"
                    />
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                    {product.images?.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(img)}
                            className={`border rounded-xl p-2 transition ${selectedImage === img
                                ? 'border-primary ring-2 ring-primary'
                                : 'border-base-300'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`thumb-${index}`}
                                width={100}
                                height={100}
                                className="w-full h-20 object-cover rounded-lg"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-5">
                {/* Category */}
                <p className="text-sm text-primary uppercase font-medium">
                    {product.category}
                </p>

                {/* Title */}
                <h1 className="text-4xl font-bold">
                    {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={`${star <= Math.round(product.rating)
                                    ? 'text-yellow-500'
                                    : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                    <span className="text-base-content/70">
                        {product.rating} Rating
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-4xl font-bold text-primary flex items-center gap-1">
                        <FaBangladeshiTakaSign />
                        {product.price.toFixed(0)}
                    </span>

                    <span className="text-lg line-through opacity-50 flex items-center gap-1">
                        <FaBangladeshiTakaSign />
                        {product.oldPrice.toFixed(0)}
                    </span>

                    <span className="badge badge-primary">
                        {Math.round(product.discountPercentage)}% OFF
                    </span>
                </div>

                {/* Stock */}
                <p className="text-success font-medium">
                    {product.availabilityStatus} • {product.stock} left
                </p>

                {/* Description */}
                <p className="leading-7 text-base-content/80">
                    {product.description}
                </p>

                {/* Tags */}
                {product.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="badge badge-outline"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Extra Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-base-200 rounded-xl p-4">
                        <h4 className="font-semibold mb-1">
                            Weight
                        </h4>
                        <p>{product.weight}g</p>
                    </div>

                    <div className="bg-base-200 rounded-xl p-4">
                        <h4 className="font-semibold mb-1">
                            Warranty
                        </h4>
                        <p>{product.warrantyInformation}</p>
                    </div>

                    <div className="bg-base-200 rounded-xl p-4">
                        <h4 className="font-semibold mb-1">
                            Return Policy
                        </h4>
                        <p>{product.returnPolicy}</p>
                    </div>

                    <div className="bg-base-200 rounded-xl p-4">
                        <h4 className="font-semibold mb-1">
                            Created At
                        </h4>
                        <p>
                            {new Date(
                                product.createdAt
                            ).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Button */}
                <div className="pt-4">
                    <OrderNowBtn productId={product._id} />
                </div>
            </div>
        </div>
    )
}