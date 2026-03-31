"use client"
import React from 'react'


export default function OrderNowBtn({ openOrderModal }: { openOrderModal: () => void }) {
    return (
        <button
            onClick={() => openOrderModal()}
            className="btn btn-primary gap-2 mt-4">
            Order Now
        </button>
    )
}
