import Navbar from '@/components/Navbar'
import {ReactNode} from 'react'

export default function MainLayout({ children}:{children:ReactNode} ) {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
            <footer>
                footer
            </footer>
        </div>
    )
}
