import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className='max-w-7xl mx-auto px-2.5'>
                {children}
            </main>
            <footer className='max-w-7xl mx-auto px-2.5'>
                footer
            </footer>
        </div>
    )
}
