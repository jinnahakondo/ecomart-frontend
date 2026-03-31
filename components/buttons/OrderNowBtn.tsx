"use client"
import { useRouter } from 'next/navigation'
import React from 'react'


export default function OrderNowBtn({ productId }: { productId: string }) {
    const router = useRouter()
    return (
        <button
            onClick={() => router.push(`/book-order?productId=${productId}`)}
            className="btn btn-primary gap-2 mt-4">
            Order Now
        </button>
    )
}
