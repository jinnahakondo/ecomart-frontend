"use client"
import React, { useEffect, useState } from 'react';

type Stats = {
    totalUsers: number
    totalOrders: number
    totalProducts: number
    totalRevenue: number
}

const AdminDashboardOverview = () => {
    const [statsData, setStatsData] = useState<Stats | null>(null)
    useEffect(() => {
        const getStats = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/stats`)
            const data = await res.json()
            setStatsData(data.data)
        }
        getStats()
    }, [])

    //make the dashboard overview stats data 
    const stats = [
        {
            title: "Total Users",
            count: statsData?.totalUsers || 0
        },
        {
            title: "Total Orders",
            count: statsData?.totalOrders || 0
        }, {
            title: "Total Products",
            count: statsData?.totalProducts || 0
        }, {
            title: "Total Revinue",
            count: statsData?.totalRevenue || 0
        },
    ]


    return (
        <div>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {stats.map((stat, i) => <div key={i}>
                    <div className='p-4 shadow bg-base-300 rounded-xl flex flex-col items-center gap-3'>
                        <h2 className='text-xl  font-medium'>{stat.title}</h2>
                        <p className='text-primary font-bold text-4xl'>{stat.count}</p>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default AdminDashboardOverview;