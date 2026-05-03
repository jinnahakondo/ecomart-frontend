"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/providers/AuthProvider";
import LoadingComponent from "@/components/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import {
    FaPlus,
    FaEllipsisV,
    FaSearch,
    FaFilter,
} from "react-icons/fa";
import DashboardPageHeader from "./DashboardPageHeader";
import ProductAddModal from "@/components/modal/ProductAddModal";

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
    const [page, setPage] = useState(1);
    const limit = 10;
    const { user } = useAuth();

    const { isLoading, data, refetch } = useQuery({
        queryKey: ["manage-products", search, page],
        queryFn: async () => {
            const params = new URLSearchParams({
                search,
                skip: ((page - 1) * limit).toString(),
                limit: limit.toString()
            });
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products?${params}`);
            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            const data = await res.json();
            return data;
        },
    });

    const products = data?.data || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit);

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1); // reset to first page
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }
    const pageButtons = Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
        <button
            key={p}
            className={`join-item btn btn-sm ${p === page ? 'btn-active' : ''}`}
            onClick={() => handlePageChange(p)}
        >
            {p}
        </button>
    ));
    const modalRef = React.useRef<HTMLDialogElement>(null);

    return (
        <div className="space-y-6">
            <DashboardPageHeader
                title="Manage Products"
                subTitle="Manage store inventory, pricing, and availability from a clean product grid."
                headerBtnFn={() => modalRef?.current?.showModal()}
                headerBtnContent={
                    <>
                        <FaPlus />
                        Add Product
                    </>
                }
            />

            <div className="rounded-3xl bg-base-100 border border-base-200 p-6 shadow-sm space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <button className="btn btn-outline btn-sm gap-2">
                        <FaFilter />
                        Filter
                    </button>
                    <div className="relative w-full md:w-80">
                        <FaSearch className="absolute top-3 left-3 text-base-content/40" />
                        <input
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            type="text"
                            placeholder="Search products..."
                            className="input input-bordered pl-10 w-full"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-base-200 bg-base-100 shadow-sm">
                    <table className="table w-full text-base-content/80">
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
                                    <td colSpan={6} className="py-10">
                                        <LoadingComponent size="md" fullScreen={false} />
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr className="text-center">
                                    <td colSpan={6} className="py-10">No Products Found</td>
                                </tr>
                            ) : (
                                products.map((p: Product) => (
                                    <tr key={p._id} className="hover:bg-base-200 transition-colors">
                                        <td className="flex items-center gap-3">
                                            <img
                                                src={p.thumbnail}
                                                alt={p.title}
                                                className="w-12 h-12 rounded object-cover"
                                            />
                                            <div>
                                                <p className="font-medium">{p.title}</p>
                                                <p className="text-xs text-base-content/50">{p.rating} ★ rating</p>
                                            </div>
                                        </td>
                                        <td>{p.category}</td>
                                        <td>
                                            <span className="font-semibold">৳ {p.price.toFixed(2)}</span>
                                            <br />
                                            <span className="text-xs line-through text-base-content/40">
                                                ৳ {p.oldPrice.toFixed(2)}
                                            </span>
                                        </td>
                                        <td>{p.stock}</td>
                                        <td>
                                            <span className="badge badge-success badge-sm">
                                                {p.availabilityStatus}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <div className="dropdown dropdown-left">
                                                <button className="btn btn-ghost btn-sm">
                                                    <FaEllipsisV />
                                                </button>
                                                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                                    <li><button>Edit</button></li>
                                                    <li><button className="text-red-500">Delete</button></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-3 justify-between text-sm md:flex-row md:items-center">
                    <p className="text-base-content/60">Showing {products.length} of {total} products</p>
                    <div className="join">
                        <button
                            className="join-item btn btn-sm"
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                        >
                            Previous
                        </button>
                        {pageButtons}
                        <button
                            className="join-item btn btn-sm"
                            disabled={page === totalPages}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <ProductAddModal modalRef={modalRef} />
        </div>
    );
}