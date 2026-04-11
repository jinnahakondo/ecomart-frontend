"use client"
import React, { useState } from 'react'
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

interface Props {
    modalRef: React.RefObject<HTMLDialogElement | null>;
}

export default function AuthModal({ modalRef }: Props) {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box max-w-sm">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {/* main contents  */}
                <>
                    {isLogin ?
                        // login 
                        <LoginForm setIsLogin={setIsLogin} modalRef={modalRef} />
                        :
                        //Register
                        <RegisterForm setIsLogin={setIsLogin} modalRef={modalRef} />
                    }

                </>
            </div>
        </dialog>
    )
}
