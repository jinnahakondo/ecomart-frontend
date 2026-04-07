"use client"
import { useAuth } from '@/lib/context/AuthProvider';
import React, { useEffect, useState } from 'react';

const MyOrders = () => {
    const [orders, setOrders] = useState(null)
    const { user } = useAuth()
    useEffect(() => {
        const getOrders = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/user/${user?._id}`)
            const data = await res.json()
            setOrders(data.data)
        }
        getOrders()
    }, [user?._id])
    console.log("orders data", orders);
    return (
        <div>

        </div>
    );
};

export default MyOrders;