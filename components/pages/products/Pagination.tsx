"use client"
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
    const router = useRouter();
    const params = useSearchParams();

    const handlePageChange = (page: number) => {
        const query = new URLSearchParams(params);
        const limit = 12;
        const skip = (page - 1) * limit;
        query.set('skip', skip.toString());
        router.push(`/products?${query.toString()}`);
    };

    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }

    const pageButtons = Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
        <button
            key={p}
            className={`join-item btn btn-sm ${p === currentPage ? 'btn-active' : ''}`}
            onClick={() => handlePageChange(p)}
        >
            {p}
        </button>
    ));

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center pt-4">
            <div className="join">
                <button
                    className="join-item btn btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {pageButtons}
                <button
                    className="join-item btn btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
