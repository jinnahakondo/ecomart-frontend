"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendar, FaUser } from "react-icons/fa6";

export default function BlogPost({ params }: { params: { id: string } }) {
    // Sample blog post data (in real app, fetch from API based on params.id)
    const post = {
        id: Number(params.id),
        title: "Sustainable Shopping Trends 2024",
        author: "Sarah Anderson",
        date: "Apr 15, 2024",
        category: "Lifestyle",
        readTime: "5 min read",
        image: "🌿",
        content: `
            <h2>Introduction</h2>
            <p>The world of sustainable shopping is evolving rapidly. More and more consumers are becoming conscious of their environmental impact and making choices that align with their values. In 2024, we're seeing some exciting trends emerge in the world of eco-friendly shopping.</p>

            <h2>Trend 1: Local and Ethical Sourcing</h2>
            <p>One of the biggest trends is the shift toward locally sourced and ethically produced products. Consumers are becoming increasingly interested in where their products come from and how they're made. Many brands are now focusing on transparency in their supply chains and highlighting their ethical practices.</p>

            <h2>Trend 2: Circular Economy</h2>
            <p>The circular economy is gaining momentum. Companies are designing products with durability and recyclability in mind. Return programs and product take-back initiatives are becoming more common, allowing customers to participate in the lifecycle of their purchases.</p>

            <h2>Trend 3: Minimal Packaging</h2>
            <p>Packaging waste is a major environmental concern, and brands are responding by minimizing packaging or using sustainable alternatives. Customers are also seeking out brands that offer minimal or zero-waste packaging options.</p>

            <h2>Trend 4: Technology and Transparency</h2>
            <p>Technology is playing an increasing role in sustainable shopping. QR codes, blockchain, and other technologies are being used to provide transparency about product origins, sustainability certifications, and environmental impact.</p>

            <h2>Trend 5: Conscious Consumption</h2>
            <p>Finally, there's a growing movement toward conscious consumption itself. More people are shopping less but buying better quality items that last longer. This shift away from fast fashion and throwaway culture is creating demand for durable, timeless products.</p>

            <h2>Conclusion</h2>
            <p>As we move forward in 2024, the sustainable shopping movement continues to strengthen. Whether you're just starting your sustainability journey or you're already a conscious consumer, there's never been a better time to make choices that benefit both you and the planet.</p>
        `,
        relatedPosts: [
            { id: 2, title: "How to Care for Your Eco Products" },
            { id: 5, title: "Sustainable Fashion Essentials" },
        ],
    };

    return (
        <main className="min-h-screen bg-base-100">
            {/* Header Section */}
            <section className="bg-gradient-to-br from-primary to-primary/60 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                    >
                        <FaArrowLeft />
                        Back to Blog
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="badge badge-lg badge-outline text-white border-white mb-4">
                            {post.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <FaUser />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCalendar />
                                <span>{post.date}</span>
                            </div>
                            <span>{post.readTime}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="bg-gradient-to-br from-primary/20 to-secondary/20 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-base-200 rounded-xl h-96 flex items-center justify-center border border-primary/20">
                        <span className="text-9xl">{post.image}</span>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        className="prose prose-lg max-w-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="space-y-6 text-base-content/80">
                            <p>
                                The world of sustainable shopping is evolving rapidly. More and more consumers are becoming conscious of their environmental impact and making choices that align with their values. In 2024, we're seeing some exciting trends emerge in the world of eco-friendly shopping.
                            </p>

                            <h2 className="text-3xl font-bold text-base-content mt-8 mb-4">
                                Trend 1: Local and Ethical Sourcing
                            </h2>
                            <p>
                                One of the biggest trends is the shift toward locally sourced and ethically produced products. Consumers are becoming increasingly interested in where their products come from and how they're made. Many brands are now focusing on transparency in their supply chains and highlighting their ethical practices.
                            </p>

                            <h2 className="text-3xl font-bold text-base-content mt-8 mb-4">
                                Trend 2: Circular Economy
                            </h2>
                            <p>
                                The circular economy is gaining momentum. Companies are designing products with durability and recyclability in mind. Return programs and product take-back initiatives are becoming more common, allowing customers to participate in the lifecycle of their purchases.
                            </p>

                            <h2 className="text-3xl font-bold text-base-content mt-8 mb-4">
                                Trend 3: Minimal Packaging
                            </h2>
                            <p>
                                Packaging waste is a major environmental concern, and brands are responding by minimizing packaging or using sustainable alternatives. Customers are also seeking out brands that offer minimal or zero-waste packaging options.
                            </p>

                            <h2 className="text-3xl font-bold text-base-content mt-8 mb-4">
                                Trend 4: Technology and Transparency
                            </h2>
                            <p>
                                Technology is playing an increasing role in sustainable shopping. QR codes, blockchain, and other technologies are being used to provide transparency about product origins, sustainability certifications, and environmental impact.
                            </p>

                            <h2 className="text-3xl font-bold text-base-content mt-8 mb-4">
                                Trend 5: Conscious Consumption
                            </h2>
                            <p>
                                Finally, there's a growing movement toward conscious consumption itself. More people are shopping less but buying better quality items that last longer. This shift away from fast fashion and throwaway culture is creating demand for durable, timeless products.
                            </p>

                            <h2 className="text-3xl font-bold text-base-content mt-8 mb-4">
                                Conclusion
                            </h2>
                            <p>
                                As we move forward in 2024, the sustainable shopping movement continues to strengthen. Whether you're just starting your sustainability journey or you're already a conscious consumer, there's never been a better time to make choices that benefit both you and the planet.
                            </p>
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <div className="divider my-12" />

                    {/* Author Bio */}
                    <motion.div
                        className="bg-base-200 rounded-xl p-8 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-base-content mb-3">
                            About the Author
                        </h3>
                        <p className="text-base-content/70">
                            {post.author} is a sustainability expert and passionate advocate for eco-friendly living. With over 10 years of experience in environmental writing, Sarah shares insights about sustainable shopping and green lifestyle choices.
                        </p>
                    </motion.div>

                    {/* Related Posts */}
                    {post.relatedPosts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-3xl font-bold text-base-content mb-8">
                                Related Articles
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {post.relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.id}
                                        href={`/blog/${relatedPost.id}`}
                                        className="card bg-base-200 shadow-lg border border-primary/10 hover:border-primary/30 overflow-hidden transition-all hover:shadow-xl p-6"
                                    >
                                        <h4 className="text-lg font-bold text-base-content hover:text-primary transition-colors">
                                            {relatedPost.title}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Explore our sustainable products and start your eco-friendly journey today.
                        </p>
                        <Link
                            href="/products"
                            className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary hover:border-white"
                        >
                            Shop Now
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
