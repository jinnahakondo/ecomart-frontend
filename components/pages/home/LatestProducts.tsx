import Title from '@/components/Title'
import { Product } from '@/lib/types/product'
import React from 'react'
import { getProducts } from './FeaturedProducts'
import ProductCard from '@/components/cards/ProductCard'
import SectionHeader from '@/components/SectionHeader'

export default async function LatestProducts() {
    const products = await getProducts(5)
    return (
        <div>
            <div className='max-w-7xl mx-auto px-2.5'>
                {/* section header  */}
                <SectionHeader title="Latest Products" subtitle="  Shop by your favorite product groups" />
                <div className="flex justify-between items-center mb-8"></div>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {products.map((product: Product) => (
                        <ProductCard
                            key={product?._id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
