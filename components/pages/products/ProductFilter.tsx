"use client"
import React from 'react'
import { FaStar } from 'react-icons/fa'

export default function ProductFilterSidebar() {
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
                    <li className="text-primary font-medium cursor-pointer">
                        All Products
                    </li>
                    <li className="hover:text-primary cursor-pointer">
                        Fresh Produce
                    </li>
                    <li className="hover:text-primary cursor-pointer">
                        Pantry
                    </li>
                    <li className="hover:text-primary cursor-pointer">
                        Health & Wellness
                    </li>
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
