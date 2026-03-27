"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const categories = [
    "all products", "groceries", "furniture", "fragrances", "beauty"
]
export default function ProductFilterSidebar() {
    const params = useSearchParams()
    const router = useRouter()
    const [isActive, setIsActive] = useState("all products")
    // handle category filter 
    const handleCategory = async (category: string) => {
        setIsActive(category)
        const query = new URLSearchParams(params)
        if (category === 'all products') {
            query.set("category", "")
        }
        else {
            query.set("category", category)
        }
        router.push(`/products?${query.toString()}`)
    }
    return (
        <aside className="bg-base-100 p-5 rounded-xl h-fit space-y-6">

            {/* Filters */}
            <div>
                <h3 className="font-semibold mb-3">Filters</h3>
                <p className="text-sm text-base-content/60">
                    Refine your growth
                </p>
            </div>

            {/* Categories */}
            <div>
                <p className="text-sm font-medium mb-2">Category</p>
                <ul className="space-y-2 text-sm">
                    {
                        categories.map((category, i) => <li key={i} className={`${isActive === category ? "text-primary" : "text-base-content/60"} font-medium cursor-pointer`}>
                            <button
                                onClick={() => handleCategory(category)}
                                className='capitalize'>
                                {category}
                            </button>
                        </li>)
                    }
                </ul>
            </div>

            {/* Ratings */}
            <div>
                <p className="text-sm font-medium mb-2">Rating</p>
                <div className="space-y-2 text-sm">
                    {[5, 4, 3].map((r) => (
                        <label key={r} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                            <span className="flex items-center gap-1">
                                {Array.from({ length: r }).map((_, i) => (
                                    <FaStar key={i} className="text-secondary" size={12} />
                                ))}
                                <span className="text-base-content/60">& up</span>
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Button */}
            <button className="btn btn-primary w-full rounded-full">
                Apply Filters
            </button>
        </aside>
    )
}
