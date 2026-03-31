"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { useAuth } from "@/lib/context/AuthProvider";

interface Inputs {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();
    const { setUser } = useAuth();

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    // login handler
    const handleLogin: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        setServerError("");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(data),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                setServerError(result.message || "Login failed");
                return;
            }

            // update global auth state instantly
            setUser(result.user);

            router.push("/");
            router.refresh(); // refresh to update UI based on new auth state
        } catch (error) {
            setServerError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-96 mt-20 bg-base-100 border border-base-300 rounded-2xl mx-auto p-4">
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center py-8">
                        Login
                    </h2>

                    {/* email */}
                    <div>
                        <input
                            {...register("email", {
                                required: "Please enter your email",
                            })}
                            type="email"
                            placeholder="Email"
                            className="input w-full"
                        />
                        {errors.email && (
                            <p className="text-error text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* password */}
                    <div>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters required",
                                },
                            })}
                            type="password"
                            placeholder="Password"
                            className="input w-full"
                        />

                        {errors.password && (
                            <p className="text-error text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* server error */}
                    {serverError && (
                        <p className="text-error text-center text-sm">
                            {serverError}
                        </p>
                    )}
                </div>

                {/* submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary mt-4 w-full"
                >
                    {loading ? "Logging in..." : "Log in"}
                </button>
            </form>

            {/* other login options */}
            <div className="space-y-4 mt-4">
                <p className="text-center">OR</p>

                <button className="btn bg-white text-black border-[#e5e5e5] w-full">
                    <FaGoogle />
                    Login with Google
                </button>

                <div className="flex justify-center gap-2 text-sm">
                    <p>Not a member yet?</p>
                    <Link href="/register" className="link">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}