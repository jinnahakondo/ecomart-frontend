"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { categoryData } from "@/lib/data/categoryData";

export default function ProductFilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Current query values
    const currentSearch = searchParams.get("search") || "";
    const currentCategory = searchParams.get("category") || "All";
    const currentSort = searchParams.get("sort") || "";

    // Local states
    const [searchInput, setSearchInput] = useState(currentSearch);
    const [showAllCategory, setShowAllCategory] = useState(false);

    // Auto expand if selected category is hidden
    const shouldExpand =
        currentCategory !== "All" &&
        !categoryData.slice(0, 6).includes(currentCategory);

    // Visible category list
    const categories =
        showAllCategory || shouldExpand
            ? categoryData
            : categoryData.slice(0, 6);

    // Update query params
    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!value || value === "All") {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        // Reset pagination
        params.delete("skip");

        router.push(`/products?${params.toString()}`);
    };

    // Search submit
    const handleSearch = () => {
        updateQuery("search", searchInput.trim());
    };

    // Reset all filters
    const handleReset = () => {
        setSearchInput("");
        setShowAllCategory(false);
        router.push("/products");
    };

    return (
        <aside className="card bg-base-100 border border-base-300 rounded-2xl">
            <div className="card-body space-y-6">
                {/* Header */}
                <div>
                    <h2 className="card-title text-lg">Filters</h2>
                    <p className="text-sm text-base-content/60">
                        Refine your products
                    </p>
                </div>

                {/* Search */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>

                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <Search size={16} className="text-base-content/50" />

                        <input
                            type="text"
                            className="grow"
                            placeholder="Search products..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                    </label>

                    <button
                        onClick={handleSearch}
                        className="btn btn-primary btn-sm w-full"
                    >
                        Search
                    </button>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Sort By</label>

                    <select
                        value={currentSort}
                        onChange={(e) => updateQuery("sort", e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="">Featured</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_dsc">Price: High to Low</option>
                        <option value="rating_asc">Highest Rated</option>
                    </select>
                </div>

                {/* Categories */}
                <div className="space-y-3 ">
                    <label className="text-sm font-medium">Categories</label>

                    <div className="space-y-2">
                        {/* All Products */}
                        <button
                            onClick={() => updateQuery("category", "All")}
                            className={`btn btn-sm w-full justify-start capitalize ${currentCategory === "All"
                                ? "btn-primary"
                                : "btn-ghost border border-base-300"
                                }`}
                        >
                            All Products
                        </button>

                        {/* Category List */}
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => updateQuery("category", category)}
                                className={`btn btn-sm w-full justify-start capitalize ${currentCategory === category
                                    ? "btn-primary"
                                    : "btn-ghost border border-base-300"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}

                        {/* Show More / Less */}
                        {categoryData.length > 6 && (
                            <button
                                onClick={() =>
                                    setShowAllCategory(!showAllCategory)
                                }
                                className="btn btn-outline border-base-300 btn-sm w-full"
                            >
                                {showAllCategory || shouldExpand
                                    ? "Show Less Categories"
                                    : "Show All Categories"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Reset */}
                <button
                    onClick={handleReset}
                    className="btn btn-outline border-base-300 w-full"
                >
                    Reset Filters
                </button>
            </div>
        </aside>
    );
}