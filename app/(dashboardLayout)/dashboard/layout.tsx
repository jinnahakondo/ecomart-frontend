import DashboardPage from '@/components/pages/dashboard/DashboardPage'
import DashboardSidebar from '@/components/pages/dashboard/DashboardSidebar'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <div className='flex gap-8 '>
                <div className='col-span-3 '>
                    <DashboardSidebar />
                </div>
                <main className='col-span-9 pt-8'>
                    <DashboardPage content={children} />
                </main>
            </div>
        </div>
    )
}
