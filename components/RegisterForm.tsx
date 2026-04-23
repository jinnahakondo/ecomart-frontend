"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle, FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import Swal from "sweetalert2";

interface Inputs {
    name: string;
    email: string;
    password: string;
}

interface Props {
    modalRef: React.RefObject<HTMLDialogElement | null>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterForm({ modalRef, setIsLogin }: Props) {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const handleRegister: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        const uri = `${process.env.NEXT_PUBLIC_API}/auth/register`;

        try {
            const res = await fetch(uri, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Registration failed");

            Swal.fire({
                icon: "success",
                title: "Account Created!",
                text: "Please login to continue.",
                timer: 2000,
                showConfirmButton: false,
            });

            setIsLogin(true); // Switch to login view
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong",
            });
        } finally {
            setLoading(false);
            // Optionally close modal only on success, or keep open to let them login
        }
    };

    return (
        <div className="w-full max-w-sm bg-base-100 rounded-2xl p-6 mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-base-content">Join Us</h2>
                <p className="text-xs opacity-60">Create your account in seconds</p>
            </div>

            <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">
                {/* Name Input */}
                <div className="form-control w-full">
                    <label className="input input-bordered flex items-center gap-3 h-11 bg-base-200/50 focus-within:bg-base-100 transition-all border-none ring-1 ring-base-300 focus-within:ring-2 focus-within:ring-primary">
                        <FaUser className="opacity-40 text-sm" />
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            placeholder="Full Name"
                            className="grow text-sm"
                        />
                    </label>
                    {errors.name && <span className="text-[10px] text-error mt-1 ml-1">{errors.name.message}</span>}
                </div>

                {/* Email Input */}
                <div className="form-control w-full">
                    <label className="input input-bordered flex items-center gap-3 h-11 bg-base-200/50 focus-within:bg-base-100 transition-all border-none ring-1 ring-base-300 focus-within:ring-2 focus-within:ring-primary">
                        <FaEnvelope className="opacity-40 text-sm" />
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            placeholder="Email"
                            className="grow text-sm"
                        />
                    </label>
                    {errors.email && <span className="text-[10px] text-error mt-1 ml-1">{errors.email.message}</span>}
                </div>

                {/* Password Input */}
                <div className="form-control w-full">
                    <label className="input input-bordered flex items-center gap-3 h-11 bg-base-200/50 focus-within:bg-base-100 transition-all border-none ring-1 ring-base-300 focus-within:ring-2 focus-within:ring-primary">
                        <FaLock className="opacity-40 text-sm" />
                        <input
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                    message: "Must include Uppercase, Lowercase, Number & Symbol"
                                }
                            })}
                            type="password"
                            placeholder="Password"
                            className="grow text-sm"
                        />
                    </label>
                    {errors.password && (
                        <span className="text-[10px] text-error mt-1 ml-1 leading-tight inline-block">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full h-11 min-h-0 text-white shadow-md shadow-primary/20 mt-2"
                >
                    {loading ? <span className="loading loading-spinner loading-xs"></span> : "Create Account"}
                </button>
            </form>

            <div className="divider text-[10px] opacity-40 my-4 uppercase tracking-widest">OR</div>

            <div className="space-y-3">
                <button className="btn btn-sm btn-ghost border-base-300 w-full font-semibold h-10 min-h-0">
                    <FaGoogle className="text-sm" /> Google
                </button>

                <div className="text-center text-xs">
                    <span className="opacity-60">Already have an account? </span>
                    <button
                        onClick={() => setIsLogin(true)}
                        className="text-primary font-bold hover:underline"
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
}