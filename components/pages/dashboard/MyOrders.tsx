"use client"
import OrderDetailsModal from '@/components/modal/OrderDetailsModal';
import { getOrders } from '@/lib/api/getOrders';
import { useAuth } from '@/lib/providers/AuthProvider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

export interface IOrder {
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
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

    const { user } = useAuth()

    const modalRef = useRef<HTMLDialogElement | null>(null);

    const queryClient = useQueryClient()

    const { isLoading, error, data: orders = [] } = useQuery<IOrder[]>({
        queryKey: ["my-order", user?._id],
        queryFn: () => getOrders(user!._id),
        enabled: !!user?._id
    })

    // cancel order
    const { mutate: onCancel } = useMutation({
        mutationFn: async (orderId: string) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "cancelled" }),
            });
            return res.json()
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["my-order", user?._id] })
            modalRef?.current?.close()
        },
    })

    // delete order
    const { mutate: onDelete } = useMutation({
        mutationFn: async (orderId: string) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders/${orderId}`, {
                method: "DELETE"
            })
            return res.json()
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["my-order", user?._id] })
            modalRef?.current?.close()
        },
    })


    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>{error.message}</p>;

    //open the order detail modal 
    const handleModal = (order: IOrder) => {
        setSelectedOrder(order)
        modalRef?.current?.showModal()
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
                                <button onClick={() => handleModal(order)}
                                    className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>)}

                    </tbody>
                </table>
            </div>

            <OrderDetailsModal
                modalRef={modalRef}
                order={selectedOrder}
                onCancel={onCancel}
                onDelete={onDelete}
            />
        </div>

    );
};

export default MyOrders;