import Categories from '@/components/sections/home/CategorieSection'
import FeaturedProducts from '@/components/sections/home/FeaturedProducts'
import React from 'react'

export default function Home() {
    return (
        <div className='space-y-20'>
            <Categories />
            <FeaturedProducts />
        </div>

    )
}
