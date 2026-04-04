"use client"

import React, { useEffect, useState } from 'react'

type StatsType = {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
}

type StatusType = {
  _id: string
  count: number
}

type ChartDataType = {
  statusData: StatusType[]
  monthlyRevenue: Array<{ month: string; total: number }>
  dailyRevenue: Array<{ day: string; total: number }>
}

const API_ROOT = process.env.NEXT_PUBLIC_API ?? 'https://ecomart-backend-mu.vercel.app/api'

export default function AdminDashboard({ content }: { content: React.ReactNode }) {
  const [stats, setStats] = useState<StatsType | null>(null)
  const [chartData, setChartData] = useState<ChartDataType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [statsRes, chartRes] = await Promise.all([
          fetch(`${API_ROOT}/dashboard/stats`),
          fetch(`${API_ROOT}/dashboard/chart-data`),
        ])

        if (!statsRes.ok) throw new Error(`Stats request failed: ${statsRes.status}`)
        if (!chartRes.ok) throw new Error(`Chart-data request failed: ${chartRes.status}`)

        const statsJson = await statsRes.json()
        const chartJson = await chartRes.json()

        if (mounted) {
          setStats(statsJson.data ?? null)
          setChartData(chartJson.data ?? null)
        }
      } catch (err) {
        if (mounted) {
          setError((err as Error).message)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <p className="text-sm text-gray-500">Overview system statistics and order status summary.</p>
      </div>

      {error && <div className="rounded-lg bg-red-100 p-3 text-red-700">Error: {error}</div>}

      {loading && <div className="text-gray-600">Loading stats...</div>}

      {!loading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white p-4 shadow-sm border">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>
      )}

      {!loading && chartData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section className="rounded-xl bg-white p-4 shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">Order Status</h3>
            <div className="space-y-2">
              {(chartData.statusData.length ? chartData.statusData : [{ _id: 'none', count: 0 }]).map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="capitalize">{item._id}</span>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-white p-4 shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">Revenue History</h3>
            <p className="text-sm text-gray-500 mb-2">Monthly (last 12 months)</p>
            {chartData.monthlyRevenue.length ? (
              <ul className="space-y-1 text-sm">
                {chartData.monthlyRevenue.map((m, idx) => (
                  <li key={`${m.month}-${idx}`} className="flex justify-between">
                    <span>{m.month}</span>
                    <span>{formatCurrency(m.total)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No monthly revenue data yet.</p>
            )}

            <p className="text-sm text-gray-500 mt-4 mb-2">Daily (last 30 days)</p>
            {chartData.dailyRevenue.length ? (
              <ul className="space-y-1 text-sm">
                {chartData.dailyRevenue.map((d, idx) => (
                  <li key={`${d.day}-${idx}`} className="flex justify-between">
                    <span>{d.day}</span>
                    <span>{formatCurrency(d.total)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No daily revenue data yet.</p>
            )}
          </section>
        </div>
      )}

      <div className="mt-6">{content}</div>
    </div>
  )
}
