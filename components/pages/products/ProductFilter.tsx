"use client"
import { categoryData } from '@/lib/data/categoryData'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function ProductFilterSidebar() {
    const [isActive, setIsActive] = useState<string>("all products")
    const [searchInput, setSearchInput] = useState("")

    const params = useSearchParams()
    const router = useRouter()

    // handle sort product 
    const handleSortProduct = async (sortBy: string) => {
        const query = new URLSearchParams(params);
        if (!sortBy) {
            query.delete('sort')
        }
        else {
            query.set('sort', sortBy)
        }
        router.push(`/products?${query.toString()}`)
    }

    // handle category filter 
    const handleCategory = async (category: string) => {
        setIsActive(category)
        const query = new URLSearchParams(params)
        if (category === 'all products') {
            query.delete("category")
        }
        else {
            query.set("category", category)
        }
        router.push(`/products?${query.toString()}`)
    }

    // handle search
    const handleSearch = () => {
        const query = new URLSearchParams(params)
        if (searchInput.trim()) {
            query.set("search", searchInput.trim())
        } else {
            query.delete("search")
        }
        router.push(`/products?${query.toString()}`)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <aside className="bg-base-100 p-5 rounded-xl h-fit space-y-6">

            {/* Search */}
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Search products..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSearch} className="btn btn-ghost btn-sm">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </label>
            </div>

            {/* Filters */}
            <div>
                <h3 className="font-semibold mb-3">Filters</h3>
                <p className="text-sm text-base-content/60">
                    Refine your growth
                </p>
            </div>
            {/* Sort */}
            <select
                onChange={(e) => handleSortProduct(e.target.value)}
                className="outline-none rounded-full">
                <option value={''}>Sort</option>
                <option value={'rating_asc'}>Top Rated</option>
                <option value={'price_asc'}>Price Low - High</option>
                <option value={'price_dsc'}>Price High - Low</option>
            </select>
            {/* Categories */}
            <div>
                <p className="text-sm font-medium mb-2">Category</p>
                <ul className="space-y-2 text-sm">
                    {
                        categoryData.map((category: string, i) => <li key={i} className={`${isActive === category ? "text-primary" : "text-base-content/60"} font-medium cursor-pointer w-full`}>
                            <button
                                onClick={() => handleCategory(category)}
                                className='capitalize w-full text-left'>
                                {category}
                            </button>
                        </li>)
                    }
                </ul>
            </div>

        </aside>
    )
}
