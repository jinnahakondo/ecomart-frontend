"use client";

import { motion } from "framer-motion";
import { FaBell, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 md:p-16 shadow-2xl relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Background decoration */}
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/10 rounded-full" />
                    <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-white/10 rounded-full" />

                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <FaBell className="text-3xl text-white" />
                            <span className="text-white/80 font-semibold">
                                Subscribe to Our Newsletter
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Stay Updated with Latest Offers
                        </h2>

                        <p className="text-white/90 mb-8">
                            Get exclusive deals, new arrivals, and special tips delivered directly to your inbox. No spam, only valuable content.
                        </p>

                        {/* Email Subscribe Form */}
                        <form onSubmit={handleSubscribe} className="flex gap-3 flex-col sm:flex-row">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered input-lg flex-1 bg-white text-base-content"
                                required
                            />
                            <motion.button
                                type="submit"
                                className="btn btn-lg btn-base-100 text-primary font-bold whitespace-nowrap"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Subscribe
                                <FaArrowRight />
                            </motion.button>
                        </form>

                        {/* Success Message */}
                        {subscribed && (
                            <motion.p
                                className="text-white/90 mt-4 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                ✓ Thank you for subscribing!
                            </motion.p>
                        )}

                        {/* Privacy notice */}
                        <p className="text-white/70 text-xs mt-6">
                            We respect your privacy. Unsubscribe anytime.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
