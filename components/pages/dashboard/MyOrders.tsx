"use client"
import { useAuth } from '@/lib/context/AuthProvider';
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
    const [orders, setOrders] = useState<IOrder[]>([])
    const { user } = useAuth()
    useEffect(() => {
        const getOrders = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders/user/${user?._id}`)
            const data = await res.json()
            setOrders(data.data)
        }
        getOrders()
    }, [user?._id])
    console.log("orders data", orders);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-base-content/70">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Date</th>
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
                            <td><span className='badge badge-sm badge-soft badge-warning'>{order?.status}</span> </td>
                            <th>
                                <button className="btn btn-ghost btn-xs">{order?.status === 'pending' ? "cancel" : "delete"}</button>
                            </th>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;