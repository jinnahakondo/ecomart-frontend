"use client"
import React from 'react'

export default function Pagination() {
    return (
        <div className="flex justify-center pt-4">
            <div className="join">
                <button className="join-item btn btn-sm">1</button>
                <button className="join-item btn btn-sm btn-active">2</button>
                <button className="join-item btn btn-sm">3</button>
                <button className="join-item btn btn-sm">Next</button>
            </div>
        </div>
    )
}
