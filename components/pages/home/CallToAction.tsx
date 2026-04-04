"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaLeaf, FaHandshake, } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";

export default function CallToAction() {
    const actions = [
        {
            icon: <FaLeaf className="text-4xl text-primary" />,
            title: "Learn More About Sustainability",
            description: "Discover our commitment to environmental responsibility",
            link: "/about",
            btnText: "Read Our Story",
        },
        {
            icon: <FaHandshake className="text-4xl text-secondary" />,
            title: "Get in Touch",
            description: "Have questions? Contact our support team anytime",
            link: "/contact",
            btnText: "Contact Us",
        },
        {
            icon: <FaGlobeAmericas className="text-4xl text-accent" />,
            title: "Join Our Community",
            description: "Be part of the eco-friendly shopping revolution",
            link: "/register",
            btnText: "Get Started",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-base-200 to-base-100">
            <div className="max-w-7xl mx-auto px-4">
                {/* Main CTA Section */}
                <motion.div
                    className="bg-gradient-to-r from-primary via-green-600 to-accent rounded-2xl p-12 md:p-16 text-white text-center mb-12 shadow-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Ready to Make a Difference?
                    </h2>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        Every purchase you make contributes to a more sustainable future. Join thousands of conscious shoppers today.
                    </p>
                    <Link
                        href="/products"
                        className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary hover:border-white"
                    >
                        Shop Now
                        <FaArrowRight />
                    </Link>
                </motion.div>

                {/* Action Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {actions.map((action, index) => (
                        <motion.div
                            key={index}
                            className="card bg-base-100 shadow-lg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl text-center p-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ translateY: -5 }}
                        >
                            <div className="flex justify-center mb-4">
                                {action.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-base-content mb-3">
                                {action.title}
                            </h3>
                            <p className="text-base-content/70 mb-6">
                                {action.description}
                            </p>
                            <Link
                                href={action.link}
                                className="btn btn-primary btn-outline btn-sm group"
                            >
                                {action.btnText}
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
