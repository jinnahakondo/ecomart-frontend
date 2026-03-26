"use client";

import Title from "@/components/Title";
import { FaStar } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const products = [
    {
        id: 1,
        name: "Organic Purple Kale",
        price: 195,
        tag: "Top Rated",
        rating: 4.9,
        img: "/images/kale.jpg",
    },
    {
        id: 2,
        name: "Hass Avocado",
        price: 450,
        tag: "Organic",
        rating: 4.7,
        img: "/images/avocado.jpg",
    },
    {
        id: 3,
        name: "Gourmet Mushrooms",
        price: 320,
        tag: "",
        rating: 4.5,
        img: "/images/mushroom.jpg",
    },
    {
        id: 4,
        name: "Farm Fresh Milk",
        price: 144,
        tag: "Sale -20%",
        rating: 4.8,
        img: "/images/milk.jpg",
    },
    {
        id: 5,
        name: "Baby Carrots",
        price: 120,
        tag: "",
        rating: 4.6,
        img: "/images/carrots.jpg",
    },
    {
        id: 6,
        name: "Organic Bananas",
        price: 85,
        tag: "",
        rating: 4.4,
        img: "/images/banana.jpg",
    },
    {
        id: 7,
        name: "Garden Broccoli",
        price: 160,
        tag: "",
        rating: 4.9,
        img: "/images/broccoli.jpg",
    },
    {
        id: 8,
        name: "Celtic Sea Salt",
        price: 210,
        tag: "",
        rating: 5.0,
        img: "/images/salt.jpg",
    },
];

export default function Products() {
    return (
        <section className="bg-base-200 min-h-screen px-6 md:px-16 lg:px-24 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar */}
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

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Header */}
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

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-base-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                            >
                                {/* Image */}
                                <div className="relative h-40 bg-base-200">
                                    {/* Tag */}
                                    {product.tag && (
                                        <span className="absolute top-2 left-2 badge badge-primary">
                                            {product.tag}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4 space-y-2">

                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-medium line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <span className="text-xs flex items-center gap-1">
                                            <FaStar className="text-secondary" size={12} />
                                            {product.rating}
                                        </span>
                                    </div>

                                    <p className="text-primary font-semibold">
                                        BDT {product.price}
                                    </p>

                                    <button className="btn btn-primary btn-sm rounded-full w-full">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center pt-4">
                        <div className="join">
                            <button className="join-item btn btn-sm">1</button>
                            <button className="join-item btn btn-sm btn-active">2</button>
                            <button className="join-item btn btn-sm">3</button>
                            <button className="join-item btn btn-sm">Next</button>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
}