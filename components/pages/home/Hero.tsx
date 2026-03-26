"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="hero min-h-[65vh] bg-base-200 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute w-96 h-96 bg-primary/20 blur-3xl rounded-full -top-24 -left-24" />
            <div className="absolute w-80 h-80 bg-secondary/20 blur-3xl rounded-full -bottom-24 -right-24" />

            <div className="hero-content flex-col lg:flex-row-reverse gap-12">

                {/* Product Image Animation */}
                <motion.img
                    src="/heroimage.png"   // put your product banner image here
                    alt="Ecommerce Products"
                    className="max-w-sm md:max-w-md rounded-xl shadow-2xl"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                />

                {/* Text Content */}
                <div className="max-w-xl">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold leading-tight"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Discover Your Perfect Products
                    </motion.h1>

                    <motion.p
                        className="py-6 text-base-content/70"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Shop the latest collections with smart recommendations,
                        fast delivery, and unbeatable prices — all in one place.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <Link href="/explore" className="btn btn-primary">
                            Shop Now
                        </Link>

                        <Link href="/deals" className="btn btn-outline">
                            View Deals
                        </Link>
                    </motion.div>

                    {/* Small Trust Info */}
                    <div className="mt-6 flex gap-6 text-sm opacity-70">
                        <span>🚚 Free Shipping</span>
                        <span>⭐ Top Rated</span>
                        <span>🔒 Secure Payment</span>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce text-sm opacity-70">
                Browse Products ↓
            </div>
        </section>
    );
}