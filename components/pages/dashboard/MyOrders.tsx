"use client"
import OrderDetailsModal from '@/components/modal/OrderDetailsModal';
import LoadingComponent from '@/components/LoadingComponent';
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
    createdAt: string;
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


    if (isLoading) return <LoadingComponent />;
    if (error instanceof Error) return <p>{error.message}</p>;

    //open the order detail modal 
    const handleModal = (order: IOrder) => {
        setSelectedOrder(order)
        modalRef?.current?.showModal()
    }



    return (
        <div className="space-y-6">
            <div className="rounded-3xl bg-base-100 border border-base-200 p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">My Orders</h1>
                        <p className="text-sm text-base-content/60 mt-1">Track recent purchases, order statuses, and details from your account.</p>
                    </div>
                    <div className="inline-flex items-center gap-3 rounded-full bg-base-200 px-4 py-2 text-sm text-base-content/80">
                        <span className="font-medium">Total</span>
                        <span className="badge badge-primary badge-sm">{orders.length}</span>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto bg-base-100 shadow rounded-3xl border border-base-200">
                <table className="table w-full text-base-content/80">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-base-200 transition-colors">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full overflow-hidden bg-base-300 w-12 h-12 flex items-center justify-center">
                                            <img
                                                src={order?.productId?.thumbnail}
                                                alt={order?.productId?.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{order?.productId?.title}</p>
                                            <p className="text-xs text-base-content/50">{order?.address.fullName}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-semibold flex items-center gap-1"><FaBangladeshiTakaSign />{order.totalPrice.toFixed(0)}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <span className={`badge badge-sm ${order.status === 'pending' ? 'badge-warning' : order.status === 'cancelled' ? 'badge-error' : 'badge-success'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <button onClick={() => handleModal(order)} className="btn btn-sm btn-outline">Details</button>
                                </td>
                            </tr>
                        ))}

                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-12 text-base-content/50">
                                    No orders found yet.
                                </td>
                            </tr>
                        )}
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