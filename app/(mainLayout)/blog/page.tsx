"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Blog() {
    // Blog posts data
    const allPosts = [
        {
            id: 1,
            title: "Sustainable Shopping Trends 2024",
            excerpt: "Discover the latest trends in eco-friendly shopping and how to make conscious choices for a better future.",
            author: "Sarah Anderson",
            date: "Apr 15, 2024",
            category: "Lifestyle",
            readTime: "5 min read",
            image: "🌿",
        },
        {
            id: 2,
            title: "How to Care for Your Eco Products",
            excerpt: "Learn expert tips on maintaining and caring for sustainable products to extend their lifespan and maximize value.",
            author: "John Smith",
            date: "Apr 10, 2024",
            category: "Guide",
            readTime: "8 min read",
            image: "🛠️",
        },
        {
            id: 3,
            title: "The Impact of Green Choices",
            excerpt: "Understanding how small sustainable choices can make a big difference for our planet and future generations.",
            author: "Emma Wilson",
            date: "Apr 5, 2024",
            category: "Environmental",
            readTime: "6 min read",
            image: "🌍",
        },
        {
            id: 4,
            title: "Zero Waste Lifestyle Guide",
            excerpt: "Complete guide to adopting zero waste practices in your daily life and reducing your environmental impact.",
            author: "Michael Green",
            date: "Mar 28, 2024",
            category: "Lifestyle",
            readTime: "10 min read",
            image: "♻️",
        },
        {
            id: 5,
            title: "Sustainable Fashion Essentials",
            excerpt: "Build a sustainable wardrobe with eco-friendly fashion essentials that last longer and look great.",
            author: "Lisa Harper",
            date: "Mar 20, 2024",
            category: "Fashion",
            readTime: "7 min read",
            image: "👕",
        },
        {
            id: 6,
            title: "Organic vs Sustainable Products",
            excerpt: "Understanding the differences between organic and sustainable products and making informed choices.",
            author: "David Miller",
            date: "Mar 15, 2024",
            category: "Guide",
            readTime: "9 min read",
            image: "🔍",
        },
        {
            id: 7,
            title: "Local and Ethical Brands",
            excerpt: "Supporting local and ethical brands and understanding why they matter for global sustainability.",
            author: "Rachel Chen",
            date: "Mar 10, 2024",
            category: "Business",
            readTime: "6 min read",
            image: "🏪",
        },
        {
            id: 8,
            title: "Reducing Plastic in Your Home",
            excerpt: "Practical strategies to reduce plastic consumption and find sustainable alternatives for daily items.",
            author: "Tom Wilson",
            date: "Mar 5, 2024",
            category: "Lifestyle",
            readTime: "8 min read",
            image: "🚫",
        },
    ];

    const categories = ["All", "Lifestyle", "Guide", "Environmental", "Fashion", "Business"];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Filter posts based on category and search
    const filteredPosts = allPosts.filter((post) => {
        const matchCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <main className="min-h-screen bg-base-100">
            {/* Header Section */}
            <section className="bg-gradient-to-br from-primary to-primary/60 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            Our Blog
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Tips, guides, and stories about sustainable living and eco-friendly choices
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-12 bg-base-200">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-4 text-primary text-lg" />
                            <input
                                type="text"
                                placeholder="Search blog posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input input-bordered w-full pl-12 py-3 text-base"
                            />
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`btn btn-sm ${selectedCategory === category
                                        ? "btn-primary"
                                        : "btn-outline btn-primary"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    {filteredPosts.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    className="card bg-base-200 shadow-lg border border-primary/10 hover:border-primary/30 overflow-hidden transition-all hover:shadow-xl"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ translateY: -5 }}
                                >
                                    {/* Image placeholder */}
                                    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-48 flex items-center justify-center">
                                        <span className="text-6xl">{post.image}</span>
                                    </div>

                                    <div className="card-body">
                                        <div className="badge badge-primary badge-outline mb-2">
                                            {post.category}
                                        </div>
                                        <h2 className="card-title text-lg leading-tight hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-base-content/70 text-sm">
                                            {post.excerpt}
                                        </p>

                                        <div className="divider my-2" />

                                        {/* Post metadata */}
                                        <div className="flex items-center justify-between text-xs text-base-content/60 mb-4">
                                            <div className="flex items-center gap-1">
                                                <FaUser className="text-primary" />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaCalendar className="text-secondary" />
                                                <span>{post.date}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-base-content/50">
                                                {post.readTime}
                                            </span>
                                            <Link
                                                href={`/blog/${post.id}`}
                                                className="btn btn-sm btn-primary btn-outline group"
                                            >
                                                Read More
                                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-2xl text-base-content/70 mb-4">
                                No posts found
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSearchTerm("");
                                }}
                                className="btn btn-primary btn-outline"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            Subscribe to Our Newsletter
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Get the latest blog posts and sustainability tips delivered to your inbox
                        </p>
                        <div className="flex gap-3 flex-col sm:flex-row max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered flex-1 bg-white text-base-content"
                            />
                            <button className="btn btn-base-100 text-primary font-bold whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
