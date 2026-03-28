'use client'
import Title from '@/components/Title'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiSearch } from 'react-icons/fi'

export default function ProductPageHeader() {
    
    const router = useRouter()
    const params = useSearchParams()

    //handle search
    const handleSearch = (e) => {
        const searchText: string = e?.target?.value;

        const query = new URLSearchParams(params)
        query.set('search', String(searchText))
        router.push(`/products?${query.toString()}`)
    }
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
                <Title>Our Products</Title>
                <p className="text-base-content/80">Shop smarter with ethically sourced, premium products delivered to you</p>
            </div>

            <div className="flex gap-3 items-center">

                {/* Search */}
                <div className="relative">
                    <input
                        onChange={(e) => handleSearch(e)}
                        type="text"
                        placeholder="Search products..."
                        className="input input-bordered rounded-full pl-10"
                    />
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60" />
                </div>
            </div>
        </div>
    )
}
