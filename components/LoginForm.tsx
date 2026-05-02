"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle, FaUserShield, FaUser, FaEnvelope, FaLock } from "react-icons/fa6";
import { useAuth } from "@/lib/providers/AuthProvider";
import { toast } from "sonner";

interface Props {
    modalRef: React.RefObject<HTMLDialogElement | null>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Inputs {
    email: string;
    password: string;
}

export default function LoginForm({ modalRef, setIsLogin }: Props) {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Inputs>();

    const fillDemo = (email: string) => {
        setValue("email", email, { shouldValidate: true });
        setValue("password", "Asdf@1234", { shouldValidate: true });
    };

    const handleLogin: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        setServerError("");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Invalid credentials");
            const result = await res.json();
            setUser(result?.data);
            toast.success("Logged in successfully");
            modalRef.current?.close();
        } catch (error: any) {
            setServerError(error.message || "Something went wrong");
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm bg-base-100 rounded-2xl p-6 mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-base-content">Welcome Back</h2>
                <p className="text-xs opacity-60">Sign in to continue</p>
            </div>

            {/* Compact Demo Grid */}
            <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                    type="button"
                    onClick={() => fillDemo("user@gmail.com")}
                    className="btn btn-sm btn-outline border-base-300 normal-case font-medium hover:bg-primary hover:text-white"
                >
                    <FaUser className="text-[10px]" /> User Demo
                </button>
                <button
                    type="button"
                    onClick={() => fillDemo("admin@gmail.com")}
                    className="btn btn-sm btn-outline border-base-300 normal-case font-medium hover:bg-secondary hover:text-white"
                >
                    <FaUserShield className="text-[10px]" /> Admin Demo
                </button>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
                {/* Email Input */}
                <div className="form-control w-full">
                    <label className="input input-bordered flex items-center gap-3 h-11 bg-base-200/50 focus-within:bg-base-100 transition-all border-none ring-1 ring-base-300 focus-within:ring-2 focus-within:ring-primary">
                        <FaEnvelope className="opacity-40 text-sm" />
                        <input
                            {...register("email", { required: "Required" })}
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
                            {...register("password", { required: "Required" })}
                            type="password"
                            placeholder="Password"
                            className="grow text-sm"
                        />
                    </label>
                    {errors.password && <span className="text-[10px] text-error mt-1 ml-1">{errors.password.message}</span>}
                </div>

                {serverError && (
                    <p className="text-error text-center text-[11px] font-semibold bg-error/10 py-2 rounded-lg">
                        {serverError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full h-11 min-h-0 text-white shadow-md shadow-primary/20"
                >
                    {loading ? <span className="loading loading-spinner loading-xs"></span> : "Login"}
                </button>
            </form>

            <div className="divider text-[10px] opacity-40 my-4 uppercase tracking-widest">OR</div>

            <div className="space-y-3">
                <button className="btn btn-sm btn-ghost border-base-300 w-full font-semibold h-10 min-h-0">
                    <FaGoogle className="text-sm" /> Google
                </button>

                <div className="text-center text-xs">
                    <span className="opacity-60">New here? </span>
                    <button
                        onClick={() => setIsLogin(false)}
                        className="text-primary font-bold hover:underline"
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
}