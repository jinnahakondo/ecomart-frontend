"use client"
import OrderNowBtn from '@/components/buttons/OrderNowBtn'
import OrderNowModal from '@/components/modal/OrderNowModal'
import React from 'react'

export default function OrderNow() {
    const orderNowRef = React.useRef<HTMLDialogElement>(null)

    // Function to open the order modal
    const openOrderModal = () => {
        orderNowRef.current?.showModal()
    }

    // Function to close the order modal    
    const closeOrderModal = () => {
        orderNowRef.current?.close()
    }


    return (
        <>
            <OrderNowBtn
                openOrderModal={openOrderModal}
            />
            {/* Order Now Modal */}
            <OrderNowModal
                orderNowRef={orderNowRef}
                closeOrderModal={closeOrderModal}
            />
        </>
    )
}
