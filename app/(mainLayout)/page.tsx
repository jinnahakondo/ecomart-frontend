import Categories from '@/components/pages/home/CategorieSection'
import DailyBestDeals from '@/components/pages/home/DailyBestDeals'
import FAQSection from '@/components/pages/home/FAQSection'
import FeaturedProducts from '@/components/pages/home/FeaturedProducts'
import Hero from '@/components/pages/home/Hero'
import LatestProducts from '@/components/pages/home/LatestProducts'
import TestimonialSection from '@/components/pages/home/TestimonialSection'
import React from 'react'

export default function Home() {
    return (
        <div className='space-y-20'>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <LatestProducts />
            <DailyBestDeals />
            <TestimonialSection />
            <FAQSection />
        </div>

    )
}
