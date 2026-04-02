"use client"
import React from 'react'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthProvider'

export default function DashboardPage({ content }: { content: React.ReactNode }) {
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
    return <AdminDashboard content={content}/>
  }
  if (user.role === 'user') {
    return <UserDashboard content={content}/>
  }
}