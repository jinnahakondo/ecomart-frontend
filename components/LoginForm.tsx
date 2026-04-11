"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { useAuth } from "@/lib/providers/AuthProvider";

interface Props {
    modalRef: React.RefObject<HTMLDialogElement | null>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

interface Inputs {
    email: string;
    password: string;
}

export default function LoginForm({ modalRef, setIsLogin }: Props) {
    const { setUser } = useAuth()

    const router = useRouter();

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


            if (!res.ok) {
                throw new Error("Login failed");
            }

            const result = await res.json();

            //instant global auth update
            setUser(result?.data)

            router.push("/");
        } catch (error: any) {
            setServerError(error.message || "Something went wrong");
        } finally {
            setLoading(false);
            modalRef.current?.close()
        }
    };

    return (
        <div className="max-w-96 bg-base-100 rounded-2xl mx-auto p-4">
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
                    <button
                        onClick={() => {
                            setIsLogin(false)
                        }}
                        className="link">
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}