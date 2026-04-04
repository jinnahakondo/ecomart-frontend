"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaTag } from "react-icons/fa6";

export default function SpecialOffers() {
    const offers = [
        {
            id: 1,
            title: "Summer Collection",
            discount: "40% OFF",
            description: "Get up to 40% discount on summer products",
            color: "from-primary to-primary/60",
        },
        {
            id: 2,
            title: "Bundle Deals",
            discount: "Buy 2 Get 1",
            description: "Save more when you buy multiple items",
            color: "from-secondary to-secondary/60",
        },
        {
            id: 3,
            title: "New Arrivals",
            discount: "35% OFF",
            description: "Check out latest products with special pricing",
            color: "from-accent to-accent/60",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-base-200 to-base-100">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold text-base-content mb-4">
                        Special Offers
                    </h2>
                    <p className="text-lg text-base-content/70">
                        Limited time deals that you won't want to miss
                    </p>
                </motion.div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {offers.map((offer, index) => (
                        <motion.div
                            key={offer.id}
                            className={`bg-gradient-to-br ${offer.color} p-8 rounded-lg shadow-lg text-white relative overflow-hidden group cursor-pointer`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Background decoration */}
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
                            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <FaTag className="text-xl" />
                                    <span className="text-sm font-semibold">Limited Offer</span>
                                </div>
                                <h3 className="text-3xl font-bold mb-2">
                                    {offer.discount}
                                </h3>
                                <h4 className="text-xl font-semibold mb-2">
                                    {offer.title}
                                </h4>
                                <p className="text-white/90 mb-4">
                                    {offer.description}
                                </p>
                                <Link
                                    href="/products"
                                    className="btn btn-sm btn-ghost text-white hover:bg-white/20 border-white"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
