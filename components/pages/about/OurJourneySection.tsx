"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { milestones } from '@/lib/data/aboutPageData';

const OurJourneySection=() => {
    return (
        <section className="py-24 bg-base-100 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="badge badge-primary badge-outline mb-4 py-3 px-6 uppercase tracking-widest font-bold">
                        History
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-base-content mb-4 tracking-tight">
                        Our <span className="text-primary italic">Journey</span>
                    </h2>
                    <p className="text-lg text-base-content/60 max-w-xl mx-auto leading-relaxed">
                        From a small dream to a growing community, here are the key moments that shaped Ecomart.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Vertical Line - Hidden on small mobile, visible on tablet/desktop */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-base-300 md:-translate-x-[1px]" />

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                className={`relative flex items-center justify-between w-full mb-8 ${
                                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                                }`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                            >
                                {/* Content Side */}
                                <div className="hidden md:block w-5/12" />

                                {/* Timeline Dot */}
                                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 border-base-100 bg-primary shadow-lg z-10 -translate-x-1/2" />

                                {/* Card Side */}
                                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                                    <div className="card bg-base-200/50 hover:bg-base-200 transition-colors duration-300 border border-base-300 shadow-sm">
                                        <div className="card-body p-6 md:p-8">
                                            <span className="text-primary font-black text-3xl mb-1 italic">
                                                {milestone.year}
                                            </span>
                                            <h3 className="text-xl font-bold text-base-content mb-3 leading-tight">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-base-content/70 text-sm md:text-base leading-relaxed">
                                                {milestone.event}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurJourneySection;