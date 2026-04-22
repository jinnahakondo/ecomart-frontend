"use client";

import BlogCard from "@/components/cards/BlogCard";
import SectionHeader from "@/components/SectionHeader";
import { blogPosts } from "@/lib/data/blogData";
import { BlogPost } from "@/lib/types/blog";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaCalendar, FaUser, FaArrowRight } from "react-icons/fa6";

export default function BlogSection() {

    return (
        <section className="py-20 bg-gradient-to-br from-base-200 to-base-100">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <SectionHeader title="Latest from Our Blog" subtitle="Tips, guides, and stories about sustainable living" />

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {blogPosts.slice(0, 3).map((post) => (
                        <BlogCard key={post.id} post={post} />
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
