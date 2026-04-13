"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import DashboardPageHeader from "./DashboardPageHeader";
import Swal from "sweetalert2";

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



    const getNextStatus = (currentStatus: string) => {
        switch (currentStatus) {
            case "pending":
                return ["shipped", "cancelled"];
            case "shipped":
                return ["delivered"];
            default:
                return [];
        }
    };

    //UPDATE ORDER STATUS
    const { mutate: updateStatus } = useMutation({
        mutationFn: async (data: { id: string, status: string }) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders/${data.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: data.status }),
            });
            if (!res.ok) {
                throw new Error("failed to update status")
            }
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["manage-orders"] });
            Swal.fire({
                icon: "success"
            })
        }
    })

    // DELETE ORDER 
    const { mutate: deleteOrder } = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error("Delete failed")
            }
            return res?.json()

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["manage-orders"] });
            Swal.fire({
                title: "Order is deleted",
                icon: "success"
            })
        },
        onError: () => {
            Swal.fire({
                title: "Something went wrong",
                icon: "error"
            })
        }
    });

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Want to delete this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });

        if (!result.isConfirmed) return;

        deleteOrder(id);
    };

    return (
        <div className="p-4 space-y-5">

            {/* Header */}
            <DashboardPageHeader
                title="Manage Orders"
            />

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

                                {/* Total */}
                                <td>৳{order.totalPrice}</td>
                                {/* Status */}
                                <td>
                                    <select
                                        onChange={(e) => {
                                            updateStatus({
                                                id: order._id,
                                                status: e.target.value,
                                            });
                                        }}
                                        className="select outline-none ">
                                        <option value={order.status}>
                                            {order.status}
                                        </option>
                                        {getNextStatus(order.status).map((status, i) => <option value={status} key={i}>
                                            {status}
                                        </option>)}
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