
import dynamic from 'next/dynamic'

const FeaturesSection = dynamic(() => import("@/components/pages/home/FeaturesSection"), {
    loading: () => <p className="text-center py-12">Loading features...</p>
})
const PopularProducts = dynamic(() => import("@/components/pages/home/PopularProducts"), {
    loading: () => <p className="text-center py-12">Loading popular products...</p>
})

const LatestProducts = dynamic(() => import("@/components/pages/home/LatestProducts"), {
    loading: () => <p className="text-center py-12">Loading latest products...</p>
})
const BlogSection = dynamic(() => import("@/components/pages/home/BlogSection"), {
    loading: () => <p className="text-center py-12">Loading blog posts...</p>
})

import CtaSection from '@/components/CtaSection'
import Categories from '@/components/pages/home/CategorieSection'
import FAQSection from '@/components/pages/home/FAQSection'
import FeaturedProducts from '@/components/pages/home/FeaturedProducts'
import Hero from '@/components/pages/home/Hero'
import SpecialOffers from '@/components/pages/home/SpecialOffers'
import Statistics from '@/components/pages/home/Statistics'
import TestimonialSection from '@/components/pages/home/TestimonialSection'
import React from 'react'

export default function Home() {
    return (
        <div>
            {/* Hero section with main banner */}
            <Hero />

            {/* Categories for easy navigation */}
            <Categories />

            {/* Features highlighting unique selling points */}
            <FeaturesSection />

            {/* Featured products from inventory */}
            <FeaturedProducts />

            {/* Popular products showcase */}
            <PopularProducts />

            {/* Latest products arriving */}
            <LatestProducts />

            {/* Special promotional offers */}
            {/* <SpecialOffers /> */}

            {/* Latest blog content */}
            <BlogSection />

            {/* Statistics building trust */}
            <Statistics />

            {/* Customer testimonials and reviews */}
            <TestimonialSection />

            {/* FAQ answering common questions */}
            <FAQSection />

            {/* call to action section  */}
            <CtaSection />
        </div>
    )
}
