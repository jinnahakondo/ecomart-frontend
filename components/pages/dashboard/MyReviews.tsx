"use client";

import { useAuth } from "@/lib/providers/AuthProvider";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { FaStar, FaTrash, FaEdit } from "react-icons/fa";

type Review = {
    _id: string;
    reviewerName: string;
    email: string;
    rating: number;
    comment: string;
    createdAt: string;
    date: string;
};

export default function MyReviews() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    const {
        data: reviews = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["my-reviews", user?.email],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/reviews/${user?.email}`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch reviews");
            }

            const data = await res.json();
            return data.data;
        },
        enabled: !!user?.email,
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/reviews/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
        },
    });

    const filteredReviews = reviews
        .filter((review: Review) =>
            review.comment.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a: Review, b: Review) => {
            if (sortOrder === "newest") {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

            <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <h3 className="text-md font-semibold">Recent Feedback</h3>

                    <div className="flex gap-2">
                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search review..."
                            className="input input-sm input-bordered"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {/* Sort */}
                        <select
                            className="select select-sm select-bordered"
                            value={sortOrder}
                            onChange={(e) =>
                                setSortOrder(e.target.value as "newest" | "oldest")
                            }
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>
                </div>

                {/* Loading */}
                {isLoading && (
                    <p className="text-center text-sm text-gray-500">Loading...</p>
                )}

                {/* Error */}
                {isError && (
                    <p className="text-center text-red-500">
                        Something went wrong
                    </p>
                )}

                {/* Empty */}
                {!isLoading && filteredReviews.length === 0 && (
                    <p className="text-center text-gray-500">
                        No reviews found
                    </p>
                )}

                {/* Reviews */}
                {filteredReviews.map((review: Review) => (
                    <div
                        key={review._id}
                        className="card bg-base-200 p-4 shadow-sm"
                    >
                        {/* Top */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold">
                                {review.reviewerName}
                            </span>

                            <div className="flex gap-2">
                                {/* Edit */}
                                <button className="btn btn-xs  ">
                                    <FaEdit />
                                </button>

                                {/* Delete */}
                                <button
                                    className="btn btn-xs   "
                                    onClick={() =>
                                        deleteMutation.mutate(review._id)
                                    }
                                >
                                    <FaTrash color="red" />
                                </button>
                            </div>
                        </div>

                        {/* Rating + Date */}
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={
                                            i < review.rating
                                                ? "text-yellow-500"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>

                            <span>
                                •{" "}
                                {new Date(review.date).toLocaleDateString("en-BD", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>

                        {/* Comment */}
                        <p className="text-sm mt-2 text-gray-600">
                            {review.comment}
                        </p>
                    </div>
                ))}

                {/* Pagination (static for now) */}
                <div className="flex justify-center mt-4">
                    <div className="join">
                        <button className="join-item btn btn-sm">«</button>
                        <button className="join-item btn btn-sm btn-active">
                            1
                        </button>
                        <button className="join-item btn btn-sm">2</button>
                        <button className="join-item btn btn-sm">3</button>
                        <button className="join-item btn btn-sm">»</button>
                    </div>
                </div>
            </div>
        </div>
    );
}