"use client";

import { useState } from "react";
import {
  FaUserPlus,
  FaEllipsisV,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "lead architect" | "developer" | "designer";
  joinedDate: string;
  status: "active" | "offline" | "suspended";
};

const dummyUsers: User[] = [
  {
    id: "1",
    name: "Alex Bennett",
    email: "a.bennett@enterprise.com",
    role: "admin",
    joinedDate: "Oct 12, 2023",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "s.chen@enterprise.com",
    role: "lead architect",
    joinedDate: "Nov 04, 2023",
    status: "active",
  },
  {
    id: "3",
    name: "James Miller",
    email: "j.miller@enterprise.com",
    role: "developer",
    joinedDate: "Jan 15, 2024",
    status: "offline",
  },
  {
    id: "4",
    name: "Laura Palmer",
    email: "l.palmer@enterprise.com",
    role: "designer",
    joinedDate: "Feb 01, 2024",
    status: "suspended",
  },
];

export default function ManageUsers() {
  const [search, setSearch] = useState("");

  const filteredUsers = dummyUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: dummyUsers.length,
    active: dummyUsers.filter((u) => u.status === "active").length,
    newThisMonth: 2,
    pending: 1,
  };

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "badge-success";
      case "suspended":
        return "badge-error";
    }
  };

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
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover">

                {/* Name */}
                <td>{user.name}</td>
                {/* Email  */}
                <td>{user.email}</td>
                {/* Role */}
                <td>{user.role}</td>

                {/* Date */}
                <td>{user.joinedDate}</td>

                {/* Status */}
                <td>
                  <span className={`badge badge-soft badge-sm ${getStatusBadge(user.status)}`}>
                    {user.status}
                  </span>
                </td>

                {/* Action */}
                <td className="text-right">
                  <button className="btn btn-ghost btn-sm">
                    <FaEllipsisV />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-500">
          Showing 1 to {filteredUsers.length} of {dummyUsers.length} users
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