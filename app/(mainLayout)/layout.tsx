import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className='mx-auto px-2.5'>
                {children}
            </main>
            <Footer />
        </div>
    )
}
