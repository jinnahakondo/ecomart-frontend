"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
    Pie,
    PieChart,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

type Stats = {
    totalUsers: number;
    totalOrders: number;
    totalProducts: number;
    totalRevenue: number;
};

type ChartItem = {
    _id: string;
    count: number;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7"];

const AdminDashboardOverview = () => {
    const [statsData, setStatsData] = useState<Stats | null>(null);

    useEffect(() => {
        const getStats = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/dashboard/stats`
            );
            const data = await res.json();
            setStatsData(data.data);
        };

        getStats();
    }, []);

    // pie chart data
    const { data, isLoading } = useQuery({
        queryKey: ["charts-data"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/dashboard/chart-data`
            );
            const result = await res.json();
            return result.data;
        },
    });

    const pieChartData: ChartItem[] = data?.statusData || [];

    const stats = [
        {
            title: "Total Users",
            count: statsData?.totalUsers || 0,
        },
        {
            title: "Total Orders",
            count: statsData?.totalOrders || 0,
        },
        {
            title: "Total Products",
            count: statsData?.totalProducts || 0,
        },
        {
            title: "Total Revenue",
            count: statsData?.totalRevenue || 0,
        },
    ];

    return (
        <div className="space-y-8">
            {/* stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="p-4 shadow bg-base-300 rounded-xl">
                        <div className="flex flex-col items-center gap-3">
                            <h2 className="text-xl font-medium">{stat.title}</h2>
                            <p className="text-primary font-bold text-4xl">
                                {stat.count}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* pie chart */}
            <div className="bg-base-300 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">
                    Order Status Distribution
                </h2>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                dataKey="count"
                                nameKey="_id"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default AdminDashboardOverview;