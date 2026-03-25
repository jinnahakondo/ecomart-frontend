"use client"
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import NavLink from "./NavLink/NavLink";
import { signIn } from "next-auth/react";

export default function Navbar() {
    const links = <>
        <li><NavLink href="/">Home</NavLink></li>
        <li>
            <NavLink href="/products">Products</NavLink>
        </li>
        <li><NavLink href="/about">About</NavLink></li>
        <li><NavLink href="/contact">Contact</NavLink></li>
        <li><NavLink href="/blog">Blog</NavLink></li>
        <li><NavLink href="/dashboard">Dashboard</NavLink></li>
    </>
    return (
        <div>
            <div className=" bg-base-100 shadow-sm">
                <div className="navbar max-w-7xl mx-auto">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={-1}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <Link href={'/'} className="btn btn-ghost text-xl text-primary pl-0">Ecomart</Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal  ">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end gap-6">
                        <Link href={'/'}><FaCartShopping size={24} /></Link>
                        <Link href={'/login'}
                        ><FaUser size={24} /></Link>
                    </div>

                </div>
                {/* search bar  */}
                {/* <div className="max-w-7xl mx-auto w-full px-2 pb-4 lg:hidden">
                    <label className="input w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" required placeholder="Search " />
                    </label>
                </div> */}
            </div>
        </div>
    )
}
