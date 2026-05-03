"use client"
import LoadingScreen from "@/components/LoadingComponent";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FaArrowRightFromBracket, FaGear } from "react-icons/fa6";
import { toast } from "sonner";
import { useAuth } from "@/lib/providers/AuthProvider";
import NavLink from "@/components/NavLink/NavLink";
import React from "react";
import {
    HiOutlineMenuAlt2,
    HiOutlineCog,
} from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegUser, FaRegStar } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";
import Link from "next/link";
import Logo from "@/components/Logo";


export default function DashboardLayout({
    content,
}: {
    content: React.ReactNode;
}) {
    const { user, loading, setUser } = useAuth();

    const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"), {
        ssr: false,
        loading: () => <div className="btn btn-ghost btn-circle w-10 h-10" />,
    });

    const handleLogout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            const result = await res.json();
            if (result.success) {
                setUser?.(null);
                toast.success("Logged out successfully");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout failed", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    // dashboard nav links
    const links = <>
        {/* user links */}
        {user?.role === "user" &&
            <>
                <li className="w-full">
                    <NavLink href={'/dashboard/user'} >
                        <MdOutlineDashboard size={22} />
                        Dashboard
                    </NavLink>
                </li>
                <li><NavLink href="/dashboard/user/my-orders"><HiOutlineShoppingCart size={22} />My Orders</NavLink></li>
                <li><NavLink href="/dashboard/user/my-profile"><FaRegUser size={22} />My Profile</NavLink></li>
                <li><NavLink href="/dashboard/user/my-reviews"><FaRegStar size={22} />My Reviews</NavLink></li>
            </>
        }
        {/* admin links */}
        {user?.role === 'admin' &&
            <>
                <li className="w-full">
                    <NavLink href={'/dashboard/admin'} >
                        <MdOutlineDashboard size={22} />
                        Dashboard
                    </NavLink>
                </li>
                <li><NavLink href="/dashboard/admin/manage-orders"><HiOutlineShoppingCart size={22} />Manage Orders</NavLink></li>
                <li><NavLink href="/dashboard/admin/manage-products"><MdOutlineInventory2 size={22} />Manage Products</NavLink></li>
                <li><NavLink href="/dashboard/admin/manage-users"><LuUsers size={22} />Manage Users</NavLink></li>
                <li><NavLink href="/dashboard/admin/my-profile"><FaRegUser size={22} />My Profile</NavLink></li>
            </>
        }

        <li>
            <a className="text-base-content/70 hover:text-base-content">
                <HiOutlineCog size={18} />
                Settings
            </a>
        </li>
    </>

    return (
        <div className="max-w-7xl mx-auto w-full">
            <div className="drawer lg:drawer-open">

                {/* drawer controller */}
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                {/* content area */}
                <div className="drawer-content flex flex-col min-h-screen bg-base-100">

                    {/* navbar */}
                    <nav className="navbar border-b border-base-200 bg-base-200 px-4 lg:px-6 shadow-sm">
                        <label
                            htmlFor="dashboard-drawer"
                            className="btn btn-ghost btn-square lg:hidden"
                        >
                            <HiOutlineMenuAlt2 size={22} />
                        </label>

                        <div className="flex-1">
                                <h1 className="font-semibold text-xl">Dashboard</h1>
                                <p className="text-sm text-base-content/60">Manage your store, orders, and user activity.</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <ThemeToggle />

                                {user ? (
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
                                ) : (
                                    <button className="btn btn-primary btn-sm px-4 rounded-full">Sign In</button>
                                )}
                            </div>
                    </nav>

                    {/* page content */}
                    <main className="p-4 lg:p-6">{content}</main>
                </div>

                {/* sidebar */}
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                    <aside className="w-72 min-h-screen bg-base-200 border-r border-base-300 shadow-xl flex flex-col">
                        <div className="p-6 border-b border-base-300">
                            <Logo />

                        </div>

                        <ul className="menu menu-compact px-4 py-4 gap-1 flex-1 w-full">
                            {links}
                        </ul>

                        <div className="p-5 border-t border-base-300">
                            <button className="btn btn-primary btn-block normal-case">Support Ticket</button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}