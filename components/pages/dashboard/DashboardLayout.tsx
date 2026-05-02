"use client"
import LoadingScreen from "@/components/LoadingComponent";
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
import { useAuth } from "@/lib/providers/AuthProvider";
import Logo from "@/components/Logo";


export default function DashboardLayout({
    content,
}: {
    content: React.ReactNode;
}) {
    const { user, loading } = useAuth()
    if (loading) {
        return <LoadingScreen />
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
                            <div className="mt-4 p-4 rounded-3xl bg-base-100 shadow-inner">
                                <p className="text-xs uppercase tracking-[0.2em] text-base-content/40">Logged in as</p>
                                <p className="mt-2 font-semibold text-base-content">{user?.name || 'Dashboard User'}</p>
                                <p className="text-sm text-base-content/60">{user?.role?.toUpperCase() || 'Guest'}</p>
                            </div>
                        </div>

                        <ul className="menu menu-compact px-4 py-4 gap-1 flex-1">
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