"use client";

import { motion } from "framer-motion";
import { FaLock, FaHeadset, FaRotateLeft } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";

export default function FeaturesSection() {
    const features = [
        {
            icon: <FaShippingFast className="text-4xl text-primary" />,
            title: "Fast Delivery",
            description: "Quick and reliable shipping to your doorstep",
        },
        {
            icon: <FaLock className="text-4xl text-secondary" />,
            title: "Secure Payment",
            description: "Safe and encrypted transaction processing",
        },
        {
            icon: <FaHeadset className="text-4xl text-accent" />,
            title: "24/7 Support",
            description: "Round-the-clock customer service assistance",
        },
        {
            icon: <FaRotateLeft className="text-4xl text-primary" />,
            title: "Easy Returns",
            description: "Hassle-free return and exchange policy",
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
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
                        Why Choose Ecomart?
                    </h2>
                    <p className="text-lg text-base-content/70">
                        Experience shopping redefined with premium features
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="card bg-base-200 shadow-lg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl"
                            variants={itemVariants}
                        >
                            <div className="card-body text-center">
                                <div className="flex justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="card-title text-lg justify-center text-base-content">
                                    {feature.title}
                                </h3>
                                <p className="text-base-content/70">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
