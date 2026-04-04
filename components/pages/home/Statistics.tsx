"use client";

import { motion } from "framer-motion";
import { FaSmile } from "react-icons/fa";
import { FaBox, FaUsers, FaStore } from "react-icons/fa6";

export default function Statistics() {
    const stats = [
        {
            icon: <FaBox className="text-4xl text-primary" />,
            number: "10K+",
            label: "Products",
        },
        {
            icon: <FaUsers className="text-4xl text-secondary" />,
            number: "50K+",
            label: "Happy Customers",
        },
        {
            icon: <FaSmile className="text-4xl text-accent" />,
            number: "95%",
            label: "Satisfaction Rate",
        },
        {
            icon: <FaStore className="text-4xl text-primary" />,
            number: "24/7",
            label: "Customer Support",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section className="py-20 bg-base-100">
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
                        Our Impact
                    </h2>
                    <p className="text-lg text-base-content/70">
                        Trusted by thousands of customers worldwide
                    </p>
                </motion.div>

                {/* Statistics Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-8 rounded-lg bg-base-200 border border-primary/10 hover:border-primary/30 transition-all"
                            variants={itemVariants}
                        >
                            <div className="flex justify-center mb-4">
                                {stat.icon}
                            </div>
                            <motion.h3
                                className="text-3xl font-bold text-base-content mb-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                {stat.number}
                            </motion.h3>
                            <p className="text-base-content/70 text-lg">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
