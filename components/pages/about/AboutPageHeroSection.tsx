import Link from 'next/link'
import React from 'react'
import { motion } from "framer-motion";

export default function AboutPageHeroSection() {
    return (
        <section className="relative min-h-125 flex items-center justify-center overflow-hidden">
            {/* Unsplash Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                {/* Overlay -*/}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Mission Badge */}
                    <span className="inline-block px-5 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase border border-primary text-primary rounded-md">
                        Our Journey
                    </span>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        About <span className="text-primary">Ecomart</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium mb-10">
                        We are building a sustainable future through conscious shopping.
                        Our mission is to bring high-quality, eco-friendly products into every home,
                        making green living a standard, not an option.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href={'/blog'} className="btn btn-primary btn-lg rounded-md px-10 shadow-lg">
                            Our Blog
                        </Link>
                        <Link href={"/contact"} className="btn btn-outline btn-lg rounded-md px-10 text-white border-white hover:bg-white hover:text-black">
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
