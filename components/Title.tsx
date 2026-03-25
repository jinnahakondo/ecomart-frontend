import React from 'react'

export default function Title({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-2xl font-bold text-primary">
            {children}
        </h2>
    )
}
