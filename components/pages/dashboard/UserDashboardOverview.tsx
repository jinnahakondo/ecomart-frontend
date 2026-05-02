"use client";
import React, { useEffect, useState } from "react";

type DashboardStats = {
    totalUsers: number;
    totalOrders: number;
    totalProducts: number;
    totalRevenue: number;
};

type StatCard = {
    title: string;
    count: number;
};

const buildDashboardStats = (statsData: DashboardStats | null): StatCard[] => [
    { title: "Total Users", count: statsData?.totalUsers ?? 0 },
    { title: "Total Orders", count: statsData?.totalOrders ?? 0 },
    { title: "Total Products", count: statsData?.totalProducts ?? 0 },
    { title: "Total Revenue", count: statsData?.totalRevenue ?? 0 },
];

const UserDashboardOverview = () => {
    const [statsData, setStatsData] = useState<DashboardStats | null>(null);

    useEffect(() => {
        const loadDashboardStats = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API}/dashboard/stats`
                );

                if (!response.ok) {
                    throw new Error("Failed to load dashboard stats");
                }

                const json = await response.json();
                setStatsData(json.data);
            } catch (error) {
                console.error("UserDashboardOverview: unable to fetch stats", error);
            }
        };

        loadDashboardStats();
    }, []);

    const stats = buildDashboardStats(statsData);

    return (
        <div className="space-y-6">
            <div className="rounded-3xl bg-base-100 border border-base-200 p-6 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-base-content/40">Hello there</p>
                        <h2 className="text-3xl font-semibold mt-2">Your dashboard</h2>
                    </div>
                    <p className="text-base-content/70">Review your account stats and keep an eye on your recent activity.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.title} className="p-6 shadow-sm rounded-3xl border border-base-200 bg-base-200">
                        <div className="flex flex-col items-center  gap-4">
                            <h2 className="text-lg font-medium text-base-content/70">{stat.title}</h2>
                            <span className="text-3xl font-bold text-primary">{stat.count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboardOverview;
