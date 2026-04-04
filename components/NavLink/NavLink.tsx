"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface props {
    children: React.ReactNode,
    href: string,
    className?: string
}

export default function NavLink({ children, href, className }: props) {
    const pathName: string | null = usePathname();

    return (
        <Link href={href} className={`${className} ${pathName.endsWith(href) && "active"}`}>
            {children}
        </Link>
    )
}
