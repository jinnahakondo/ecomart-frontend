"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaEllipsisV } from "react-icons/fa";

type Order = {
    _id: string;
    address: {
        fullName: string;
    };
    productId: {
        title: string;
        thumbnail: string;
    };
    totalPrice: number;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    createdAt: string;
};

export default function ManageOrders() {
    const [filter, setFilter] = useState("all");
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        district: "",
        city: "",
        area: "",
        postalCode: "",
        productId: "",
        quantity: 1,
        price: 0,
    });

    //  Fetch Orders
    const { data, isLoading, isError } = useQuery({
        queryKey: ["manage-orders"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/orders`
            );
            const result = await res.json();
            return result.data;
        },
    });

    //  Filter logic
    const filteredOrders =
        filter === "all"
            ? data || []
            : data?.filter((order: Order) => order.status === filter) || [];

    const getBadge = (status: Order["status"]) => {
        switch (status) {
            case "pending":
                return "badge-warning";
            case "shipped":
                return "badge-info";
            case "delivered":
                return "badge-success";
            case "cancelled":
                return "badge-error";
        }
    };


    // CREATE ORDER
    const createOrder = useMutation({
        mutationFn: async (newOrder: any) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newOrder),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["manage-orders"] });
        },
    });

    // DELETE ORDER
    const deleteOrder = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`${process.env.NEXT_PUBLIC_API}/orders/${id}`, {
                method: "DELETE",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["manage-orders"] });
        },
    });

    return (
        <div className="p-4 space-y-5">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between gap-3">
                <h1 className="text-2xl font-semibold">Manage Orders</h1>

                <div className="mb-6">

                    <button className="btn btn-primary btn-sm gap-2">
                        <FaPlus />
                        Create Order
                    </button>
                </div>
            </div>

            {/* Filter */}
            <div className="flex justify-between items-center">
                <select
                    className="select select-bordered select-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <button className="btn btn-outline btn-sm">
                    Last 30 Days
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {/* Loading */}
                        {isLoading && (
                            <tr>
                                <td colSpan={7} className="text-center py-10">
                                    <span className="loading loading-spinner loading-md"></span>
                                </td>
                            </tr>
                        )}

                        {/* Error */}
                        {isError && (
                            <tr>
                                <td colSpan={7} className="text-center text-red-500">
                                    Failed to load orders
                                </td>
                            </tr>
                        )}

                        {/* Data */}
                        {filteredOrders.map((order: Order) => (
                            <tr key={order._id} className="hover">

                                {/* Order ID */}
                                <td className="font-medium">
                                    #{order._id.slice(-6)}
                                </td>

                                {/* Customer */}
                                <td>
                                    <div className="font-semibold">
                                        {order.address.fullName}
                                    </div>
                                </td>

                                {/* Product */}
                                <td>
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={order.productId.thumbnail}
                                            alt=""
                                            className="w-10 h-10 rounded"
                                        />
                                        <span>{order.productId.title}</span>
                                    </div>
                                </td>

                                {/* Date */}
                                <td>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>

                                {/* Status */}
                                <td>
                                    <span className={`badge badge-sm badge-soft ${getBadge(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>

                                {/* Total */}
                                <td>৳{order.totalPrice}</td>

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
                                                <button
                                                    className="text-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="text-sm text-gray-500">
                Showing {filteredOrders.length} orders
            </div>
        </div>
    );
}