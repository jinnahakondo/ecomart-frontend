"use client";

import { useAuth } from "@/lib/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  FaUserPlus,
  FaEllipsisV,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "lead architect" | "developer" | "designer";
  createdAt: string;
  status: "active" | "suspended";
};

export default function ManageUsers() {
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  const { isLoading, data: users = [] } = useQuery({
    queryKey: ["manage-users", user?._id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users`);
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await res.json();
      return data.data;
    },
  });

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u: User) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Manage Users</h1>
          <p className="text-sm text-gray-500">
            Directory of enterprise staff, permissions, and access logs.
          </p>
        </div>

        <button className="btn btn-primary gap-2">
          <FaUserPlus />
          Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm gap-2">
            <FaFilter />
            Filter by Role
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search users..."
            className="input input-bordered pl-10 w-full md:w-80"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr className="text-center">
                <td colSpan={6}>Loading users...</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr className="text-center">
                <td colSpan={6}>No Users Found</td>
              </tr>
            ) : (
              filteredUsers.map((u: User) => (
                <tr key={u._id} className="hover">
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.createdAt?.split("T")[0]}</td>
                  <td>
                    <span
                      className={`badge badge-soft badge-sm ${(u.status || "active") === "active"
                        ? "badge-success"
                        : "badge-error"
                        }`}
                    >
                      {u.status || "active"}
                    </span>
                  </td>
                  <td className="text-right">
                    <details className="dropdown dropdown-end">
                      <summary className="btn btn-ghost btn-sm">
                        <FaEllipsisV />
                      </summary>
                      <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-32 p-2 shadow">
                        <li>
                          <button className="text-error">Delete</button>
                        </li>
                        <li>
                          <button>Edit</button>
                        </li>
                      </ul>
                    </details>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-500">
          Showing 1 to {filteredUsers.length} of {users.length} users
        </p>

        <div className="join">
          <button className="join-item btn btn-sm">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">3</button>
        </div>
      </div>
    </div>
  );
}