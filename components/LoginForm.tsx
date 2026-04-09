"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";

interface Inputs {
    email: string;
    password: string;
}

export default function LoginForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const handleLogin: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        setServerError("");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(data),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                setServerError(result.message || "Login failed");
                return;
            }

            //instant global auth update
            queryClient.setQueryData(["auth-user"], result.user);

            router.push("/");
        } catch {
            setServerError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-96 mt-20 bg-base-100 border rounded-2xl mx-auto p-4">
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center py-8">
                        Login
                    </h2>

                    <input
                        {...register("email", { required: "Email required" })}
                        type="email"
                        placeholder="Email"
                        className="input w-full"
                    />
                    {errors.email && (
                        <p className="text-error text-sm">
                            {errors.email.message}
                        </p>
                    )}

                    <input
                        {...register("password", {
                            required: "Password required",
                            minLength: { value: 6, message: "Min 6 characters" },
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

                    {serverError && (
                        <p className="text-error text-center text-sm">
                            {serverError}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary mt-4 w-full"
                >
                    {loading ? "Logging in..." : "Log in"}
                </button>
            </form>

            <div className="space-y-4 mt-4">
                <p className="text-center">OR</p>

                <button className="btn bg-white text-black border w-full">
                    <FaGoogle /> Login with Google
                </button>

                <div className="flex justify-center gap-2 text-sm">
                    <p>Not registered?</p>
                    <Link href="/register" className="link">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}