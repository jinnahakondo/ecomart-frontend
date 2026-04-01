"use client"
import AdminDashboard from '@/components/pages/dashboard/AdminDashboard'
import UserDashboard from '@/components/pages/dashboard/UserDashboard'
import { useAuth } from '@/lib/context/AuthProvider'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  if (loading) {
    return <div>Loading...</div>
  }
  if (!user) {
    router.push('/login')
    return
  }
  if (user.role === 'admin') {
    return <AdminDashboard />
  }
  if (user.role === 'user') {
    return <UserDashboard />
  }
}