"use client";

import Link from 'next/link'
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import AboutPageHeroSection from '@/components/pages/about/AboutPageHeroSection';
import OurStorySection from '@/components/pages/about/OurStorySection';
import OurValuesSection from '@/components/pages/about/OurValuesSection';
import OurJourneySection from '@/components/pages/about/OurJourneySection';
import CtaSection from '@/components/CtaSection';


export default function About() {



    return (
        <main className="min-h-screen bg-base-100">
            {/* Header Section */}
            <AboutPageHeroSection />

            {/* Our Story Section */}
            <OurStorySection />

            {/* Core Values Section */}
            <OurValuesSection />

            {/* Milestones Timeline */}
            <OurJourneySection />

            {/* Call to Action */}
            <CtaSection />
        </main>
    );
}
