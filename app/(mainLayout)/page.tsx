import Categories from '@/components/pages/home/CategorieSection'
import FAQSection from '@/components/pages/home/FAQSection'
import FeaturedProducts from '@/components/pages/home/FeaturedProducts'
import Hero from '@/components/pages/home/Hero'
import LatestProducts from '@/components/pages/home/LatestProducts'
import TestimonialSection from '@/components/pages/home/TestimonialSection'
import FeaturesSection from '@/components/pages/home/FeaturesSection'
import PopularProducts from '@/components/pages/home/PopularProducts'
import SpecialOffers from '@/components/pages/home/SpecialOffers'
import Statistics from '@/components/pages/home/Statistics'
import BlogSection from '@/components/pages/home/BlogSection'
import Newsletter from '@/components/pages/home/Newsletter'
import CallToAction from '@/components/pages/home/CallToAction'
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
            <SpecialOffers />

            {/* Latest blog content */}
            <BlogSection />

            {/* Statistics building trust */}
            <Statistics />

            {/* Customer testimonials and reviews */}
            <TestimonialSection />

            {/* FAQ answering common questions */}
            <FAQSection />
        </div>
    )
}
