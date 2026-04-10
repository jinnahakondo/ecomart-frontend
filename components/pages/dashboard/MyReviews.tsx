"use client";

import { FaStar } from "react-icons/fa";

type Review = {
    id: number;
    title: string;
    rating: number;
    date: string;
    description: string;
    tag?: string;
};

const reviews: Review[] = [
    {
        id: 1,
        title: "Global Infrastructure Overhaul",
        rating: 5,
        date: "2 days ago",
        description:
            "The deployment of the new architecture was seamless. Documentation was exceptionally clear, and the migration team provided top-tier support.",
    },
    {
        id: 2,
        title: "Analytics Engine v4.2",
        rating: 4,
        date: "1 week ago",
        description:
            "Powerful engine, but the UI could be improved for non-technical users. Export features are great.",
        tag: "PRODUCT",
    },
    {
        id: 3,
        title: "Salesforce Connector Pro",
        rating: 3,
        date: "Oct 20, 2025",
        description:
            "Initial setup was complex, but once configured, it works reliably. Recommended for advanced users.",
        tag: "LOGISTICS",
    },
];

export default function MyReviews() {
    return (
        <div className="bg-base-100 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

            <div className="">

                <div className=" space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-md font-semibold">Recent Feedback</h3>
                        <div className="flex gap-2">
                            <button className="btn btn-sm">Filter</button>
                            <button className="btn btn-sm">Sort</button>
                        </div>
                    </div>

                    {/* Reviews */}
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="card bg-base-200 p-4 shadow-sm"
                        >
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold">{review.title}</h4>
                                {review.tag && (
                                    <span className="badge badge-outline">
                                        {review.tag}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                <div className="flex text-yellow-500">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>
                                <span>• {review.date}</span>
                            </div>

                            <p className="text-sm mt-2 text-gray-600">
                                {review.description}
                            </p>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        <div className="join">
                            <button className="join-item btn btn-sm">«</button>
                            <button className="join-item btn btn-sm btn-active">1</button>
                            <button className="join-item btn btn-sm">2</button>
                            <button className="join-item btn btn-sm">3</button>
                            <button className="join-item btn btn-sm">»</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}