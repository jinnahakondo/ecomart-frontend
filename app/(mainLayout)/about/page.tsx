"use client";

import Link from 'next/link'
import { motion } from "framer-motion";
import { FaLeaf, FaHandshake, FaStar, FaArrowRight } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";


export default function About() {
    const values = [
        {
            icon: <FaLeaf className="text-4xl text-primary" />,
            title: "Sustainability",
            description: "We are committed to eco-friendly practices and sustainable sourcing of all products.",
        },
        {
            icon: <FaHandshake className="text-4xl text-secondary" />,
            title: "Transparency",
            description: "We believe in honest communication and transparent business practices with our customers.",
        },
        {
            icon: <FaGlobeAmericas className="text-4xl text-accent" />,
            title: "Community",
            description: "Building a global community of conscious shoppers who care about the planet.",
        },
        {
            icon: <FaStar className="text-4xl text-primary" />,
            title: "Quality",
            description: "We only offer products that meet our strict quality and ethical standards.",
        },
    ];

    const milestones = [
        { year: "2020", event: "Ecomart founded with vision for sustainable e-commerce" },
        { year: "2021", event: "Reached 10,000 customers and expanded product categories" },
        { year: "2022", event: "Launched carbon-neutral shipping across all regions" },
        { year: "2023", event: "Partnered with 500+ sustainable brands and businesses" },
        { year: "2024", event: "Achieved 50,000 happy customers and growing" },
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
        <main className="min-h-screen bg-base-100">
            {/* Header Section */}
            <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Unsplash Background Image */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    {/* Overlay - ব্লার ছাড়া শুধু ডার্ক লেয়ার যাতে টেক্সট ক্লিয়ার থাকে */}
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

            {/* Our blog Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-bold text-base-content mb-6">
                                Our Blog
                            </h2>
                            <p className="text-base-content/70 text-lg leading-relaxed mb-4">
                                Ecomart was born from a simple idea: making sustainable shopping accessible to everyone. We believed that conscious consumption shouldn't be a luxury, but a standard practice.
                            </p>
                            <p className="text-base-content/70 text-lg leading-relaxed mb-4">
                                Starting as a small initiative in 2020, we've grown into a thriving community of over 50,000 eco-conscious customers. Our mission remains unchanged: to make a positive impact on the planet through every purchase.
                            </p>
                            <p className="text-base-content/70 text-lg leading-relaxed">
                                Today, we partner with hundreds of sustainable brands and suppliers worldwide, ensuring that every product in our store meets our strict environmental and ethical standards.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-8 h-80 flex items-center justify-center"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="text-center">
                                <span className="text-9xl">🌱</span>
                                <p className="text-base-content/70 mt-4">Growing Together</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-20 bg-base-200">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-base-content mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-base-content/70">
                            These principles guide everything we do
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="card bg-base-100 shadow-lg border border-primary/10 p-8 text-center"
                                variants={itemVariants}
                            >
                                <div className="flex justify-center mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-base-content mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-base-content/70">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Milestones Timeline */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-base-content mb-4">
                            Our Journey
                        </h2>
                        <p className="text-lg text-base-content/70">
                            Key milestones in our growth and impact
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                className="flex gap-6 items-start"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className="badge badge-primary badge-lg font-bold whitespace-nowrap">
                                    {milestone.year}
                                </div>
                                <div className="flex-1 pt-2">
                                    <p className="text-lg text-base-content/80">
                                        {milestone.event}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            Join Our Community
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Be part of the movement towards sustainable shopping and make a difference with every purchase.
                        </p>
                        <Link
                            href="/products"
                            className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary hover:border-white"
                        >
                            Start Shopping
                            <FaArrowRight />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
