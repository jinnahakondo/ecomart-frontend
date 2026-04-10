"use client";
import { useAuth } from "@/lib/providers/AuthProvider";
import Image from "next/image";
import { FaPen } from "react-icons/fa";

export default function Profile() {
    const { user } = useAuth()
    return (
        <div className="bg-base-100 min-h-screen p-6">
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Profile section */}
                <div className="space-y-6">

                    {/* User profile card */}
                    <div className="card bg-base-100 shadow-md p-6 items-center text-center relative">

                        {/* Avatar area */}
                        <div className="relative">
                            <Image
                                src={user?.avatar || ''}
                                alt="avatar"
                                width={90}
                                height={90}
                                className="rounded-full border-4 border-base-200"
                            />

                            {/* Edit avatar button */}
                            <button className="btn btn-primary btn-sm rounded-full absolute -bottom-1 -right-1">
                                <FaPen size={12} />
                            </button>
                        </div>

                        {/* User info */}
                        <h2 className="text-xl font-semibold mt-4">
                            {user?.name || "Jinnah"}
                        </h2>

                        <p className="text-sm text-gray-500">
                            Senior Enterprise Architect
                        </p>

                        {/* Role badges */}
                        <div className="flex gap-2 mt-3">
                            <span className="badge badge-outline">
                                Engineering
                            </span>
                            <span className="badge badge-outline">
                                Admin
                            </span>
                        </div>
                    </div>

                    {/* Performance metrics card */}
                    <div className="card bg-base-100 shadow-md p-5">
                        <h3 className="text-sm font-semibold text-gray-500 mb-4">
                            PERFORMANCE METRICS
                        </h3>

                        <div className="grid grid-cols-2 gap-4">

                            <div className="p-4 rounded-lg bg-base-200 text-center">
                                <h2 className="text-primary text-2xl font-bold">
                                    94%
                                </h2>
                                <p className="text-xs text-gray-500">
                                    Efficiency
                                </p>
                            </div>

                            <div className="p-4 rounded-lg bg-base-200 text-center">
                                <h2 className="text-primary text-2xl font-bold">
                                    128
                                </h2>
                                <p className="text-xs text-gray-500">
                                    Reports
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Account information section */}
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-md p-8">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Account Information
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Update your personal details and system preferences.
                                </p>
                            </div>

                            <button className="btn btn-primary">
                                Save Changes
                            </button>
                        </div>

                        {/* Form fields */}
                        <div className="grid md:grid-cols-2 gap-5">

                            {/* Full name */}
                            <div className="form-control">
                                <label className="label text-xs">
                                    FULL NAME
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.name || 'Jinnah'}
                                    className="input input-bordered"
                                />
                            </div>

                            {/* Email address */}
                            <div className="form-control">
                                <label className="label text-xs">
                                    EMAIL ADDRESS
                                </label>
                                <input
                                    type="email"
                                    defaultValue={user?.email || "example@email.com"}
                                    className="input input-bordered"
                                />
                            </div>

                            {/* Job title */}
                            <div className="form-control">
                                <label className="label text-xs">
                                    JOB TITLE
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Senior Enterprise Architect"
                                    className="input input-bordered"
                                />
                            </div>

                            {/* Timezone */}
                            <div className="form-control">
                                <label className="label text-xs">
                                    TIMEZONE
                                </label>
                                <select className="select select-bordered">
                                    <option>Pacific Standard Time (PST)</option>
                                    <option>GMT +6 (Bangladesh)</option>
                                </select>
                            </div>

                            {/* Bio */}
                            <div className="md:col-span-2 form-control">
                                <label className="label text-xs">
                                    BIO
                                </label>
                                <textarea
                                    className="textarea textarea-bordered"
                                    rows={4}
                                    defaultValue="Leading digital transformation initiatives with scalable cloud infrastructure."
                                />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}