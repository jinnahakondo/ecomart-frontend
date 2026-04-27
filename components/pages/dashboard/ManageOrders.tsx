"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEllipsisV } from "react-icons/fa";
import DashboardPageHeader from "./DashboardPageHeader";
import Swal from "sweetalert2";
import Image from "next/image";
import { toast } from "sonner";

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
    status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "out for delivery"
    | "delivered"
    | "cancelled";
    createdAt: string;
};

export default function ManageOrders() {
    const [filter, setFilter] = useState("all");
    const queryClient = useQueryClient();

    // FETCH ORDERS
    const {
        data = [],
        isLoading,
        isError,
        refetch: refetchOrders,
    } = useQuery({
        queryKey: ["manage-orders"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders`);
            const result = await res.json();
            return result.data;
        },
        refetchInterval: 5000,
    });

    // FILTER
    const filteredOrders =
        filter === "all"
            ? data
            : data.filter((order: Order) => order.status === filter);

    // NEXT STATUS
    const getNextStatus = (currentStatus: string) => {
        switch (currentStatus) {
            case "pending":
                return ["confirmed", "cancelled"];

            case "confirmed":
                return ["processing", "cancelled"];

            case "processing":
                return ["shipped", "cancelled"];

            case "shipped":
                return ["out for delivery"];

            case "out for delivery":
                return ["delivered"];

            default:
                return [];
        }
    };

    // UPDATE STATUS
    const { mutate: updateStatus, isPending: updating } = useMutation({
        mutationFn: async (data: { id: string; status: string }) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/orders/${data.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: data.status }),
                }
            );

            if (!res.ok) throw new Error("Failed to update");

            return res.json();
        },

        onSuccess: () => {
            refetchOrders();

            toast.success("Status updated");
        },

        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Update failed",
            });
        },
    });

    // DELETE ORDER
    const { mutate: deleteOrder } = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["manage-orders"],
            });

            Swal.fire({
                icon: "success",
                title: "Order deleted",
            });
        },

        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
            });
        },
    });

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Want to delete this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });

        if (result.isConfirmed) {
            deleteOrder(id);
        }
    };

    return (
        <div className="p-4 space-y-5">
            {/* Header */}
            <DashboardPageHeader title="Manage Orders" />

            {/* Filter */}
            <div className="flex justify-between items-center">
                <select
                    className="select select-bordered select-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <button className="btn btn-outline btn-sm">Last 30 Days</button>
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
                            <th>Total</th>
                            <th>Status</th>
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

                        {/* Orders */}
                        {filteredOrders.map((order: Order) => (
                            <tr key={order._id} className="hover">
                                {/* Order ID */}
                                <td className="font-medium">#{order._id.slice(-6)}</td>

                                {/* Customer */}
                                <td>{order.address.fullName}</td>

                                {/* Product */}
                                <td>
                                    <div className="flex items-center gap-2">
                                        <Image
                                            width={50}
                                            height={50}
                                            src={order.productId?.thumbnail}
                                            alt=""
                                            className="w-10 h-10 rounded"
                                        />
                                        <span>{order.productId?.title}</span>
                                    </div>
                                </td>

                                {/* Date */}
                                <td>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>

                                {/* Total */}
                                <td>৳{order.totalPrice}</td>

                                {/* Status */}
                                <td>
                                    <select
                                        value={order.status}
                                        disabled={updating}
                                        onChange={(e) =>
                                            updateStatus({
                                                id: order._id,
                                                status: e.target.value,
                                            })
                                        }
                                        className="select select-bordered select-sm"
                                    >
                                        <option value={order.status}>
                                            {order.status}
                                        </option>

                                        {getNextStatus(order.status).map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                {/* Action */}
                                <td className="text-right">
                                    <div className="dropdown dropdown-left">
                                        <button className="btn btn-ghost btn-sm">
                                            <FaEllipsisV />
                                        </button>

                                        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                            <li>
                                                <button
                                                    onClick={() => handleDelete(order._id)}
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

                        {/* Empty */}
                        {!isLoading && filteredOrders.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-8 text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        )}
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