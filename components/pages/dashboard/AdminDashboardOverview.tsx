"use client";

import LoadingComponent from "@/components/LoadingComponent";
import { dailyRevenue, monthlyRevenue } from "@/lib/data/dashboard.chartData";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type DashboardStats = {
    totalUsers: number;
    totalOrders: number;
    totalProducts: number;
    totalRevenue: number;
};

type ChartItem = {
    _id: string;
    count: number;
};

type MonthlyRevenueItem = {
    _id: {
        month: string | number;
        year: number;
    };
    revenue: number;
    orders: number;
};

type DailyRevenueItem = {
    _id: string;
    revenue: number;
    orders: number;
};

type DashboardChartData = {
    statusData?: ChartItem[];
    monthlyRevenue?: MonthlyRevenueItem[];
    dailyRevenue?: DailyRevenueItem[];
};

type RevenueChartData = {
    month: string;
    revenue: number;
    orders: number;
};

type DailyRevenueChartData = {
    date: string;
    revenue: number;
    orders: number;
};

type StatCard = {
    title: string;
    count: number;
};

const statusColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7"];

const buildMonthlyRevenueData = (
    items: MonthlyRevenueItem[] = []
): RevenueChartData[] =>
    items.map((item) => ({
        month: `${String(item._id.month)}-${item._id.year}`,
        revenue: Math.round(item.revenue),
        orders: item.orders,
    }));

const buildDailyRevenueData = (
    items: DailyRevenueItem[] = []
): DailyRevenueChartData[] =>
    items.map((item) => ({
        date: item._id,
        revenue: Math.round(item.revenue),
        orders: item.orders,
    }));

const formatStats = (statsData: DashboardStats | null): StatCard[] => [
    { title: "Total Users", count: statsData?.totalUsers ?? 0 },
    { title: "Total Orders", count: statsData?.totalOrders ?? 0 },
    { title: "Total Products", count: statsData?.totalProducts ?? 0 },
    { title: "Total Revenue", count: statsData?.totalRevenue ?? 0 },
];

const AdminDashboardOverview = () => {
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
                console.error("AdminDashboardOverview: unable to fetch stats", error);
            }
        };

        loadDashboardStats();
    }, []);

    const { data, isLoading } = useQuery<DashboardChartData>({
        queryKey: ["dashboard-chart-data"],
        queryFn: async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API}/dashboard/chart-data`
            );

            if (!response.ok) {
                throw new Error("Failed to load dashboard chart data");
            }

            const json = await response.json();
            return json.data;
        },
    });

    const statusData: ChartItem[] = data?.statusData ?? [];
    const monthlyRevenueData = buildMonthlyRevenueData(
        data?.monthlyRevenue ?? monthlyRevenue
    );
    const dailyRevenueData = buildDailyRevenueData(
        data?.dailyRevenue ?? dailyRevenue
    );
    const stats = formatStats(statsData);

    return (
        <div className="space-y-8">
            <div className="rounded-3xl bg-base-100 border border-base-200 p-6 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-base-content/40">Admin Analytics</p>
                        <h2 className="text-3xl font-semibold mt-2">Overview</h2>
                    </div>
                    <p className="text-base-content/70">A quick look at your store performance and order flow.</p>
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

            <div className="grid grid-cols-1 gap-8">
                <div className="bg-base-300 p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Order Status Distribution
                    </h2>

                    {isLoading ? (
                        <LoadingComponent size="md" fullScreen={false} />
                    ) : (
                        <ResponsiveContainer width="100%" height={320}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    dataKey="count"
                                    nameKey="_id"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell
                                            key={`${entry._id}-${index}`}
                                            fill={statusColors[index % statusColors.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div className="bg-base-300 p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>

                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={monthlyRevenueData} barSize={40}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="revenue" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-base-300 p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Daily Revenue</h2>

                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={dailyRevenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#8884d8"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardOverview;
