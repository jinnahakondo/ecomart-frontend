"use client";

import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaCalendar, FaUser, FaArrowRight } from "react-icons/fa6";

export default function BlogSection() {
    const blogPosts = [
        {
            id: 1,
            title: "Sustainable Shopping Trends 2024",
            excerpt: "Discover the latest trends in eco-friendly shopping and how to make conscious choices.",
            author: "Sarah Anderson",
            date: "Apr 15, 2024",
            image: "/images/blog-1.jpg",
            category: "Lifestyle",
        },
        {
            id: 2,
            title: "How to Care for Your Eco Products",
            excerpt: "Learn expert tips on maintaining and caring for sustainable products to extend their lifespan.",
            author: "John Smith",
            date: "Apr 10, 2024",
            image: "/images/blog-2.jpg",
            category: "Guide",
        },
        {
            id: 3,
            title: "The Impact of Green Choices",
            excerpt: "Understanding how small sustainable choices can make a big difference for our planet.",
            author: "Emma Wilson",
            date: "Apr 5, 2024",
            image: "/images/blog-3.jpg",
            category: "Environmental",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-base-200 to-base-100">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <SectionHeader title="Latest from Our Blog" subtitle="Tips, guides, and stories about sustainable living" />

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            className="card bg-base-100 shadow-lg border border-primary/10 hover:border-primary/30 overflow-hidden transition-all hover:shadow-xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ translateY: -5 }}
                        >
                            {/* Image placeholder */}
                            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-48 flex items-center justify-center">
                                <span className="text-6xl text-primary/20">📰</span>
                            </div>

                            <div className="card-body">
                                <div className="badge badge-primary badge-outline mb-2">
                                    {post.category}
                                </div>
                                <h3 className="card-title text-lg leading-tight hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-base-content/70 text-sm">
                                    {post.excerpt}
                                </p>

                                <div className="divider my-2" />

                                {/* Post metadata */}
                                <div className="flex items-center justify-between text-xs text-base-content/60">
                                    <div className="flex items-center gap-1">
                                        <FaUser className="text-primary" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaCalendar className="text-secondary" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>

                                <div className="card-actions justify-end mt-4">
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
                </div>

                {/* View All Blog Link */}
                <div className="text-center">
                    <Link
                        href="/blog"
                        className="btn btn-lg btn-primary btn-outline"
                    >
                        View All Articles
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}
