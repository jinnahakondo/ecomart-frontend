"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { blogPosts } from "@/lib/data/blogData";
import BlogCard from "@/components/cards/BlogCard";
import CtaSection from "@/components/CtaSection";

export default function Blogs() {

    const bgImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

    const categories = ["All", "Lifestyle", "Guide", "Environmental", "Fashion", "Business"];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Filter posts based on category and search
    const filteredPosts = blogPosts.filter((post) => {
        const matchCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <main className="min-h-screen bg-base-100">
            {/* Header Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-base-100">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    {/*  Overlay  */}
                    <div className="absolute inset-0 bg-neutral/70 backdrop-blur-[1px]"></div>
                </div>

                {/* Content Section */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Badge Style */}
                        <div className="badge badge-primary badge-outline mb-6 py-4 px-6 text-sm font-bold tracking-widest uppercase">
                            Exploring the Green Life
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-neutral-content mb-6 tracking-tight">
                            Insights for <span className="text-primary italic">Modern</span> Living
                        </h1>

                        <p className="text-lg md:text-xl text-neutral-content/80 max-w-2xl mx-auto leading-relaxed mb-10">
                            Discover practical tips, expert guides, and inspiring stories designed to help you build a more sustainable and eco-friendly home.
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
                            {filteredPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
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

            {/* CTA Buttons */}
            <CtaSection />

        </main>
    );
}
