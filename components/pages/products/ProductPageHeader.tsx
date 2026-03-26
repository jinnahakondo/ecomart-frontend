'use client'
import Title from '@/components/Title'
import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function ProductPageHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
                <Title>Our Products</Title>
                <p className="text-base-content/80">Shop smarter with ethically sourced, premium products delivered to you</p>
            </div>

            <div className="flex gap-3 items-center">

                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="input input-bordered rounded-full pl-10"
                    />
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60" />
                </div>

                {/* Sort */}
                <select className="select select-bordered rounded-full">
                    <option>Newest Arrivals</option>
                    <option>Price Low</option>
                    <option>Price High</option>
                </select>
            </div>
        </div>
    )
}
