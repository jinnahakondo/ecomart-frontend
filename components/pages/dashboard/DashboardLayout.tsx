"use client"
import NavLink from "@/components/NavLink/NavLink";
import { useAuth } from "@/lib/context/AuthProvider";
import React from "react";
import {
    HiOutlineMenuAlt2,
    HiOutlineCog,
} from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegUser, FaRegStar } from "react-icons/fa";


export default function DashboardLayout({
    content,
}: {
    content: React.ReactNode;
}) {
    const { user, loading } = useAuth()
    if (loading) {
        return "loading...."
    }

    //dashbaord nav links
    const links = <>
        <li className="w-full">
            <NavLink href={`/dashboard/${user?.role === "user" && "user" || user?.role === "admin" && "admin"}`} >
                <MdOutlineDashboard size={22} />
                Dashboard
            </NavLink>
        </li>
        {/* user links */}
        <li><NavLink href="/dashboard/user/my-order"><HiOutlineShoppingCart size={22} />My Orders</NavLink></li>

        <li><NavLink href="/dashboard/user/my-profile"><FaRegUser size={22} />My Profile</NavLink></li>

        <li><NavLink href="/dashboard/user/my-reviews"><FaRegStar size={22} />My Reviews</NavLink></li>

        <li>
            <a>
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
                <div className="drawer-content flex flex-col">

                    {/* navbar */}
                    <nav className="navbar bg-base-200 px-4">

                        {/* mobile menu button */}
                        <label
                            htmlFor="dashboard-drawer"
                            className="btn btn-ghost btn-square lg:hidden"
                        >
                            <HiOutlineMenuAlt2 size={22} />
                        </label>

                        <h1 className="font-semibold text-lg">Dashboard</h1>
                    </nav>

                    {/* page content */}
                    <main className="p-4">{content}</main>
                </div>

                {/* sidebar */}
                <div className="drawer-side">
                    <label
                        htmlFor="dashboard-drawer"
                        className="drawer-overlay"
                    ></label>

                    <aside className="w-64 min-h-full bg-base-200 flex flex-col">

                        {/* logo / title */}
                        <div className="p-5 font-semibold text-xl">
                            <h2 className="font-bold text-xl"><span className="text-primary">Eco</span>Mart</h2>
                        </div>

                        {/* menu */}
                        <ul className="menu px-3 flex-1 gap-1 dashboard w-full">
                            {links}
                        </ul>

                        {/* bottom section */}
                        <div className="p-4">
                            <button className="btn btn-primary btn-sm w-full">
                                Support Ticket
                            </button>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
}