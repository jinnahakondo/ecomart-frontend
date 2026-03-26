import { Product } from '@/lib/types/product'
import Image from 'next/image'
import React from 'react'
import { FaBangladeshiTakaSign, FaCartShopping, FaStar } from 'react-icons/fa6'

type Props = {
    params: { id: string }
}

const getProduct = async (id: string) => {
    const res = await fetch(`${process.env.API}/products/${id}`)
    const data = await res.json();
    return data?.product
}
export default async function ProductDetails({ params }: Props) {
    const { id } = await params;
    const product: Product = await getProduct(id)

    //price after discount
    const discountprice =
        product.price -
        (product.price * product.discountPercentage) / 100;

    //price in bdt
    const finalPrice = discountprice * 100

    //price before discount in bdt
    const oldPrice = product.price * 100
    return (
        <section className="bg-base-100 py-12">
            <div className="max-w-7xl mx-auto px-2.5">
                <div className="grid md:grid-cols-2 gap-10">

                    {/* Product Image */}
                    <div className="bg-base-200 rounded-2xl p-6">
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="w-full object-contain rounded-xl"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">

                        <p className="text-sm text-primary capitalize">
                            {product.category}
                        </p>

                        <h1 className="text-3xl font-bold text-base-content">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <FaStar className="text-primary" />
                            <span className="text-base-content/70">
                                {product.rating} Rating
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-primary flex items-center gap-1">
                                <FaBangladeshiTakaSign /> {finalPrice.toFixed(0)}
                            </span>

                            <span className="line-through text-base-content/40 flex items-center gap-1">
                                <FaBangladeshiTakaSign /> {oldPrice.toFixed(0)}
                            </span>

                            <span className="badge badge-primary">
                                {product.discountPercentage.toFixed(0)}% OFF
                            </span>
                        </div>

                        {/* Stock */}
                        <p className="text-base-content/70">
                            {product.availabilityStatus} • Stock {product.stock}
                        </p>

                        {/* Description */}
                        <p className="text-base-content/80 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Extra Info */}
                        <div className="space-y-1 text-sm text-base-content/70">
                            <p>Brand: {product.brand}</p>
                            <p>Weight: {product.weight}g</p>
                        </div>

                        {/* Add To Cart */}
                        <button className="btn btn-primary gap-2 mt-4">
                            <FaCartShopping />
                            Add to Cart
                        </button>

                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-14">
                    <h2 className="text-xl font-semibold mb-6">
                        Customer Reviews
                    </h2>

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



            </div>
        </section>
    )
}
