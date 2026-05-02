"use client";

import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaArrowRight } from "react-icons/fa";
import { BlogPost } from "@/lib/types/blog";

type Props = {
    post: BlogPost;
};

export default function BlogCard({ post }: Props) {
    return (
        <motion.div
            className="card bg-base-100 shadow-lg border border-primary/10 hover:border-primary/30 overflow-hidden transition-all hover:shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
        >
            {/* Image */}
            <figure className="h-48 overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={192}
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover"
                />
            </figure>

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

                {/* Metadata */}
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
                    <NextLink
                        href={`/blogs/${post.id}`}
                        className="btn btn-sm btn-primary btn-outline group"
                    >
                        Read More
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </NextLink>
                </div>
            </div>
        </motion.div>
    );
}