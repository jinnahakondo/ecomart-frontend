"use client";

import Link from "next/link";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import NavLink from "./NavLink/NavLink";
import { useAuth } from "@/lib/providers/AuthProvider";
import AuthModal from "./modal/AuthModal";
import { useRef } from "react";

export default function Navbar() {
    // auth state from context
    const { user, loading, setUser } = useAuth();

    const modalRef = useRef<HTMLDialogElement | null>(null)

    // logout user and update UI instantly
    const handleLogout = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const result = await res.json();

            if (result.success) {
                setUser(null);
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // navigation links
    const navLinks = (
        <>
            <li><NavLink href="/">Home</NavLink></li>
            <li><NavLink href="/products">Products</NavLink></li>
            <li><NavLink href="/about">About</NavLink></li>
            <li><NavLink href="/contact">Contact</NavLink></li>
            <li><NavLink href="/blog">Blog</NavLink></li>
            <li><button onClick={() => {
                modalRef.current?.showModal()
            }}>Login</button></li>

            {user && (
                <li>
                    <NavLink href={`/dashboard${user?.role === "admin" && "/admin" || user?.role === "user" && "/user"}`}>Dashboard</NavLink>
                </li>
            )}
        </>
    );

    // right-side auth UI
    const renderAuthSection = () => {
        if (loading) {
            return <span className="loading loading-spinner loading-sm" />;
        }

        if (user) {
            return (
                <div className="flex items-center gap-3">
                    {user.avatar && (
                        <Image
                            src={user.avatar}
                            alt="User avatar"
                            width={36}
                            height={36}
                            className="rounded-full"
                        />
                    )}

                    <button
                        onClick={handleLogout}
                        className="btn btn-ghost"
                    >
                        Logout
                    </button>
                </div>
            );
        }

        return (
            <Link href="/login">
                <FaUser size={22} />
            </Link>
        );
    };

    return (
        <div className="bg-base-100 shadow-sm">
            <div className="navbar max-w-7xl mx-auto">

                {/* mobile menu */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden pl-0"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow main-navbar"
                        >
                            {navLinks}
                        </ul>
                    </div>

                    <Link
                        href="/"
                        className="btn btn-ghost gap-3 text-primary pl-0 normal-case"
                    >
                        <Image
                            src="/logo.svg"
                            alt="Ecomart logo"
                            width={36}
                            height={36}
                            className="rounded-full"
                        />
                        <span className="text-xl font-semibold">Ecomart</span>
                    </Link>
                </div>

                {/* desktop menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal main-navbar">
                        {navLinks}
                    </ul>
                </div>

                {/* right section */}
                <div className="navbar-end gap-6">
                    <Link href="/">
                        <FaCartShopping size={24} />
                    </Link>

                    {renderAuthSection()}
                </div>
            </div>
            {/* modal */}
            <AuthModal modalRef={modalRef} />
        </div>
    );
}