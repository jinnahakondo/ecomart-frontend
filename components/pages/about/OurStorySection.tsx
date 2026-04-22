import React from 'react'
import { motion } from "framer-motion";

export default function OurStorySection() {
    return (
        <section className="py-24 bg-base-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-[2px] w-8 bg-primary"></div>
                            <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Roots</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-base-content mb-8 leading-tight">
                            Every Great Change <br />
                            <span className="text-primary">Starts with a Story</span>
                        </h2>

                        <div className="space-y-6">
                            <p className="text-base-content/70 text-lg leading-relaxed">
                                <span className="text-base-content font-bold">Ecomart</span> was born from a simple idea: making sustainable shopping accessible to everyone. We believed that conscious consumption shouldn't be a luxury, but a standard practice.
                            </p>

                            <p className="text-base-content/70 text-lg leading-relaxed">
                                Starting as a small initiative in 2020, we've grown into a thriving community of over 50,000 eco-conscious customers. Our mission remains unchanged: to make a positive impact on the planet through every purchase.
                            </p>

                            <p className="text-base-content/70 text-lg leading-relaxed border-l-4 border-primary/20 pl-6 italic">
                                Today, we partner with hundreds of sustainable brands and suppliers worldwide, ensuring that every product in our store meets our strict environmental and ethical standards.
                            </p>
                        </div>

                        {/* Optional Stats for Social Proof */}
                        <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-base-200">
                            <div>
                                <p className="text-3xl font-black text-base-content">2020</p>
                                <p className="text-sm text-base-content/60 uppercase tracking-tighter">Established</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-base-content">50K+</p>
                                <p className="text-sm text-base-content/60 uppercase tracking-tighter">Global Community</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Visual Content */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9, x: 40 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Main Image Layer */}
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-base-200">
                            <img
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200"
                                alt="Sustainable Living"
                                className="w-full h-[500px] object-cover"
                            />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>

                        {/* Floating Experience Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-base-100 p-6 rounded-2xl shadow-xl z-20 border border-base-200 hidden md:block">
                            <p className="text-4xl font-black text-primary leading-none">6+</p>
                            <p className="text-xs font-bold text-base-content/60 uppercase tracking-widest mt-1">Years of <br /> Sustainability</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
