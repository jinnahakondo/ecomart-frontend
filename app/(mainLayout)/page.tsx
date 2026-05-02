
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const FeaturesSection = dynamic(() => import("@/components/pages/home/FeaturesSection"))
const PopularProducts = dynamic(() => import("@/components/pages/home/PopularProducts"))
const LatestProducts = dynamic(() => import("@/components/pages/home/LatestProducts"))
const BlogSection = dynamic(() => import("@/components/pages/home/BlogSection"))

const LoadingFallback = ({ label }: { label: string }) => (
    <div className="py-12 flex items-center justify-center">
        <span className="loading loading-spinner loading-md text-primary" />
    </div>
)

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
            <Suspense fallback={<LoadingFallback label="features" />}>
                <FeaturesSection />
            </Suspense>

            {/* Featured products from inventory */}
            <FeaturedProducts />


            {/* Popular products showcase */}
            <Suspense fallback={<LoadingFallback label="popular products" />}>
                <PopularProducts />
            </Suspense>


            {/* Latest products arriving */}
            <Suspense fallback={<LoadingFallback label="latest products" />}>
                <LatestProducts />
            </Suspense>

            {/* Special promotional offers */}
            {/* <SpecialOffers /> */}


            {/* Latest blog content */}
            <Suspense fallback={<LoadingFallback label="blog posts" />}>
                <BlogSection />
            </Suspense>

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
