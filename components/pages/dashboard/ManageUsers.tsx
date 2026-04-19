"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import {
  FaUserPlus,
  FaEllipsisV,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import DashboardPageHeader from "./DashboardPageHeader";

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
  const [page, setPage] = useState(1);
  const limit = 10;
  const { user } = useAuth();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["manage-users", search, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        search,
        skip: ((page - 1) * limit).toString(),
        limit: limit.toString()
      });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users?${params}`);
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await res.json();
      return data;
    },
  });

  const users = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); // reset to first page
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  const pageButtons = Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
    <button
      key={p}
      className={`join-item btn btn-sm ${p === page ? 'btn-active' : ''}`}
      onClick={() => handlePageChange(p)}
    >
      {p}
    </button>
  ));

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <DashboardPageHeader
        title="Manage Users"
        subTitle="Directory of enterprise staff, permissions, and access logs.
        "
        headerBtnContent={<>
          <FaUserPlus />
          Add New User
        </>}
      />

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
            onChange={(e) => handleSearch(e.target.value)}
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
            ) : users.length === 0 ? (
              <tr className="text-center">
                <td colSpan={6}>No Users Found</td>
              </tr>
            ) : (
              users.map((u: User) => (
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
                  {/* Action */}
                  <td className="text-right">
                    <div className="dropdown dropdown-left">
                      <button className="btn btn-ghost btn-sm">
                        <FaEllipsisV />
                      </button>

                      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                        <li>
                          <button>Edit</button>
                        </li>
                        <li>
                          <button
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center text-sm">
          <p className="text-gray-500">
            Showing {users.length} of {total} users
          </p>

          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            {pageButtons}
            <button
              className="join-item btn btn-sm"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}