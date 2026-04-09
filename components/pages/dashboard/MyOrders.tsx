"use client"
import { getOrders } from '@/lib/api/getOrders';
import { useAuth } from '@/lib/providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

interface IOrder {
    _id: string
    userId: string;
    productId: {
        title: string
        thumbnail: string
    };
    quantity: number;
    price: number;
    totalPrice: number;
    status: "pending" | "confirmed" | "cancelled";
    address: {
        fullName: string;
        phone: string;
        district: string;
        city: string;
        area: string;
        postalCode: string;
    };
}

const MyOrders = () => {

    const { user } = useAuth()

    const { isLoading, error, data: orders } = useQuery({
        queryKey: ["my-order", user?._id],
        queryFn: () => getOrders(user!._id),
        enabled: !!user?._id
    })

    console.log("my orders", orders);

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>{error.message}</p>;


    // cancel order or delte order
    const handleOrder = async (order: IOrder) => {
        if (order.status === "pending") {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders/${order?._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'cancelled',
                }),
            })
            console.log("res", res);
        }

    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-base-content/70">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Total Price</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => <tr key={order?._id}>

                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="rounded-full bg-base-300 border border-base-300 h-12 w-12 p-1">
                                            <img
                                                src={order?.productId?.thumbnail} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="">{order?.productId?.title}</div>

                                    </div>
                                </div>
                            </td>
                            <td className='flex items-center gap-1'><FaBangladeshiTakaSign />{order.totalPrice}</td>
                            <td>Jan 8</td>
                            <td><span className={`badge badge-sm badge-soft ${order.status === 'pending' && "badge-warning"} ${order.status === 'cancelled' && "badge-error"} ${order?.status === "confirmed" && "badge-success"}`}>{order?.status}</span> </td>
                            <th>
                                <button onClick={() => handleOrder(order)}
                                    className="btn btn-ghost btn-xs">{order?.status === 'pending' ? "cancel" : "delete"}</button>
                            </th>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyOrders;