"use client";

import { useAuth } from "@/lib/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
    FaPlus,
    FaEllipsisV,
    FaSearch,
    FaFilter,
} from "react-icons/fa";
import DashboardPageHeader from "./DashboardPageHeader";

type Product = {
    _id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    oldPrice: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    thumbnail: string;
    availabilityStatus: string;
    createdAt: string;
};

export default function ManageProducts() {
    const [search, setSearch] = useState("");
    const { user } = useAuth();

    const { isLoading, data: products = [] } = useQuery({
        queryKey: ["manage-products", user?._id],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products`);
            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            const data = await res.json();
            return data.data;
        },
    });

    const filteredProducts = useMemo(() => {
        return products.filter(
            (p: Product) =>
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.category.toLowerCase().includes(search.toLowerCase())
        );
    }, [products, search]);

    return (
        <div className="p-4 space-y-6">
            {/* Header */}
            <DashboardPageHeader
                title="Manage Products"
                subTitle="Manage your store products, pricing, and stock."
                headerBtnContent={
                    <>
                        <FaPlus />
                        Add Product
                    </>
                }
            />

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
                <button className="btn btn-outline btn-sm gap-2">
                    <FaFilter />
                    Filter
                </button>

                {/* Search */}
                <div className="relative">
                    <FaSearch className="absolute top-3 left-3 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search products..."
                        className="input input-bordered pl-10 w-full md:w-80"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr className="text-center">
                                <td colSpan={6}>Loading products...</td>
                            </tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr className="text-center">
                                <td colSpan={6}>No Products Found</td>
                            </tr>
                        ) : (
                            filteredProducts.map((p: Product) => (
                                <tr key={p._id} className="hover">
                                    {/* Product Info */}
                                    <td className="flex items-center gap-3">
                                        <img
                                            src={p.thumbnail}
                                            alt={p.title}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">{p.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {p.rating} ★
                                            </p>
                                        </div>
                                    </td>

                                    <td>{p.category}</td>

                                    {/* Price */}
                                    <td>
                                        <span className="font-semibold">
                                            ${p.price.toFixed(2)}
                                        </span>
                                        <br />
                                        <span className="text-xs line-through text-gray-400">
                                            ${p.oldPrice.toFixed(2)}
                                        </span>
                                    </td>

                                    {/* Stock */}
                                    <td>{p.stock}</td>

                                    {/* Status */}
                                    <td>
                                        <span className="badge badge-soft badge-sm badge-success">
                                            {p.availabilityStatus}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td className="text-right">
                                        <div className="dropdown dropdown-left">
                                            <button className="btn btn-ghost btn-sm">
                                                <FaEllipsisV />
                                            </button>

                                            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                                <li>
                                                    <button>Edit</button>
                                                </li>
                                                <li>
                                                    <button className="text-red-500">
                                                        Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center text-sm">
                <p className="text-gray-500">
                    Showing {filteredProducts.length} of {products.length} products
                </p>

                <div className="join">
                    <button className="join-item btn btn-sm">1</button>
                    <button className="join-item btn btn-sm">2</button>
                    <button className="join-item btn btn-sm">3</button>
                </div>
            </div>
        </div>
    );
}