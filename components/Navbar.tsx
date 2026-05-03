"use client";
import Image from "next/image";
import { FaArrowRightFromBracket, FaGear, } from "react-icons/fa6";
import NavLink from "./NavLink/NavLink";
import { useAuth } from "@/lib/providers/AuthProvider";
import AuthModal from "./modal/AuthModal";
import { useRef } from "react";
import Logo from "./Logo";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle").then(mod => mod.ThemeToggle), {
    ssr: false,
    loading: () => <div className="btn btn-ghost btn-circle w-10 h-10" />,
});

export default function Navbar() {
    const { user, loading, setUser } = useAuth();
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleLogout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            const result = await res.json();
            if (result.success) {
                setUser(null);
                toast.success("Logged out successfully");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout failed", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    const navLinks = (
        <>
            <li><NavLink href="/">Home</NavLink></li>
            <li><NavLink href="/products">Shop</NavLink></li>
            <li><NavLink href="/blogs">Blogs</NavLink></li>
            <li><NavLink href="/about">About</NavLink></li>
            <li><NavLink href="/contact">Contact</NavLink></li>

            {user && (
                <li>
                    <NavLink href={`/dashboard/${user?.role === "admin" ? "admin" : "user"}`}>
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    const renderAuthSection = () => {
        if (loading) return <div className="skeleton w-9 h-9 rounded-full" />;

        if (user) {
            return (
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary/20 p-0.5 hover:border-primary transition-all">
                        <div className="w-9 rounded-full ring ring-offset-base-100 ring-offset-2 ring-primary/10">
                            <Image
                                src={user.avatar || "https://i.ibb.co/v3X7699/user-placeholder.png"}
                                alt="Profile"
                                width={40}
                                height={40}
                                quality={75}
                                sizes="40px"
                            />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[100] mt-3 w-64 p-3 shadow-xl border border-base-200">
                        <li className="px-4 py-3 border-b border-base-200 mb-2">
                            <p className="font-bold text-sm block truncate">{user.name || "User"}</p>
                            <p className="text-[11px] opacity-60 block truncate">{user.email}</p>
                        </li>
                        <li>
                            <button className="py-2.5">
                                <FaGear className="opacity-70" /> Settings
                            </button>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="py-2.5 text-error hover:bg-error/10">
                                <FaArrowRightFromBracket /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            );
        }

        return (
            <button
                onClick={() => modalRef.current?.showModal()}
                className="btn btn-primary btn-sm px-6 rounded-full text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
                Sign In
            </button>
        );
    };

    return (
        <header className="sticky top-0 z-[50] w-full border-b border-base-200 bg-base-100/80 backdrop-blur-md">
            <nav className="navbar max-w-7xl mx-auto px-4 min-h-[4.5rem]">
                <div className="navbar-start">
                    {/* Mobile Menu */}
                    <div className="dropdown lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl border border-base-200">
                            {navLinks}
                        </ul>
                    </div>
                    <Logo />
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2 font-medium">
                        {navLinks}
                    </ul>
                </div>

                <div className="navbar-end gap-2">
                    <ThemeToggle />
                    {renderAuthSection()}
                </div>
            </nav>
            <AuthModal modalRef={modalRef} />
        </header>
    );
}