import React from "react";
import { IOrder } from "../pages/dashboard/MyOrders";

interface Props {
    modalRef: React.RefObject<HTMLDialogElement | null>;
    order: IOrder | null;
    onCancel?: (orderId: string) => void;
    onDelete?: (orderId: string) => void;
}

export default function OrderDetailsModal({
    modalRef,
    order,
    onCancel,
    onDelete,
}: Props) {

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box w-11/12 max-w-sm">

                {/* Close button */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>

                {!order ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {/* Product info */}
                        <div className="flex gap-4 items-center mb-4">
                            <img
                                src={order.productId.thumbnail}
                                alt={order.productId.title}
                                className="w-20 h-20 rounded border"
                            />
                            <div>
                                <h3 className="text-lg font-bold">{order.productId.title}</h3>
                                <p className="text-sm text-gray-500">
                                    Price: {order.price} × {order.quantity} = {order.totalPrice}
                                </p>
                                <p className="text-sm">
                                    Status:{" "}
                                    <span
                                        className={`${order.status === "pending"
                                            ? "text-warning"
                                            : order.status === "confirmed"
                                                ? "text-success"
                                                : "text-error"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">Shipping Address</h4>
                            <p>{order.address.fullName}</p>
                            <p>{order.address.phone}</p>
                            <p>
                                {order.address.area}, {order.address.city}, {order.address.district} -{" "}
                                {order.address.postalCode}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2">
                            {order.status === "pending" && onCancel && (
                                <button
                                    onClick={() => onCancel(order._id)}
                                    className="btn btn-warning btn-sm"
                                >
                                    Cancel Order
                                </button>
                            )}
                            <button
                                onClick={() => onDelete && onDelete(order._id)}
                                className="btn btn-error btn-sm"
                            >
                                Delete Order
                            </button>
                        </div>
                    </>
                )}
            </div>
        </dialog>
    );
}