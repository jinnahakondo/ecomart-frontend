"use client";

import NavLink from "@/components/NavLink/NavLink";
import Link from "next/link";
import React from "react";
import {
  FaUser,
  FaBox,
  FaStar,
  FaHeart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function DashboardSidebar() {
  return (
    <aside className="w-full max-w-72 bg-base-200 min-h-screen p-4 pt-0 ">
      {/* Profile Card */}
      <div className="card rounded-xl">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-12">
              <span className="font-semibold">JD</span>
            </div>
          </div>

          {/* User Info */}
          <div>
            <h2 className="font-semibold text-lg">John Doe</h2>
            <p className="text-sm text-gray-500">Premium Member</p>
          </div>
        </div>

        {/* Menu */}
        <ul className="menu mt-4 gap-1 dashboard  w-full ">
          <li>
            <NavLink href="/dashboard/my-profile">
              <FaUser size={16} />
              My Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              href="/dashboard/my-orders"
            >
              <FaBox size={16} />
              My Orders
            </NavLink>
          </li>

          <li>
            <NavLink href="/dashboard/my-reviews">
              <FaStar size={16} />
              My Reviews
            </NavLink>
          </li>

          <li>
            <Link href="/wishlist">
              <FaHeart size={16} />
              Wishlist
            </Link>
          </li>
        </ul>
        {/* Bottom Section */}
        <ul className="menu mt-6 gap-1">
          <li>
            <Link href="/admin">
              <FaCog size={16} />
              Admin Panel
            </Link>
          </li>

          <li>
            <button className="text-error">
              <FaSignOutAlt size={16} />
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}