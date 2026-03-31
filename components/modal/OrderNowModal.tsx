import React from 'react'

interface OrderNowModalProps {
    orderNowRef: React.RefObject<HTMLDialogElement | null>;
    closeOrderModal: () => void;
}

export default function OrderNowModal({
    orderNowRef,
    closeOrderModal,
}: OrderNowModalProps) {
    return (
        <dialog ref={orderNowRef} className="modal">
            <div className="modal-box max-w-96 p-4">
                <div className="flex justify-end">
                    <button
                        className="btn btn-sm btn-circle btn-ghost"
                        onClick={closeOrderModal}
                    >
                        ✕
                    </button></div>
                {/* Form */}

            </div>
        </dialog>
    )
}
