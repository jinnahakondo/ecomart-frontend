import { motion } from 'framer-motion'
import React from 'react'

export default function ContactPageHeroSection() {
    return (
        <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Unsplash Background Image - Minimal Contact/Workspace Aesthetic */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=2000')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                {/* Dark Overlay for Text Clarity */}
                <div className="absolute inset-0 bg-neutral/80"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Contact Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest uppercase border border-primary/50 text-primary bg-primary/10 rounded-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Available 24/7
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Get In <span className="text-primary italic">Touch</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium mb-12">
                        Have questions about our eco-friendly products? We love hearing from our customers.
                        Reach out anytime—our team is here to help you live more sustainably.
                    </p>

                    {/* Contact Quick Info / CTA */}
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="group flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                            <div className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-lg text-xl font-bold">
                                @
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email Us</p>
                                <p className="text-white font-semibold">hello@ecomart.com</p>
                            </div>
                        </div>

                        <div className="group flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                            <div className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-lg text-xl font-bold">
                                #
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Call Us</p>
                                <p className="text-white font-semibold">+880 1234 567 890</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
