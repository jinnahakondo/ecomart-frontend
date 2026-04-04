
import DashboardLayout from '@/components/pages/dashboard/DashboardLayout'
import React from 'react'

export default function DashboardLayoutPage({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <DashboardLayout content={children} />
        </div>
    )
}
