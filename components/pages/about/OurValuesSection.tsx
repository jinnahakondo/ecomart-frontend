import React from 'react'
import { motion } from "framer-motion";
import { values } from '@/lib/data/aboutPageData';


export default function OurValuesSection() {
    return (
        <section className="py-24 bg-base-100 relative overflow-hidden">
            {/* Decorative Background Blur */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Header with Motion */}
                <motion.div
                    className="text-center mb-16 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex justify-center">
                        <span className="badge badge-primary badge-outline font-bold uppercase tracking-widest py-3 px-6">
                            Our DNA
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tight">
                        Our Core <span className="text-primary italic">Values</span>
                    </h2>
                    <p className="text-lg text-base-content/60 max-w-2xl mx-auto leading-relaxed">
                        We don't just sell products; we promote a lifestyle guided by these fundamental principles.
                    </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -10 }} // Hover animation
                            className="group relative"
                        >
                            <div className="card h-full bg-base-100 border border-base-200 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 overflow-hidden">
                                {/* Subtle Card Background Pattern */}
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <span className="text-8xl font-black">{index + 1}</span>
                                </div>

                                <div className="card-body items-center text-center p-10 relative z-10">
                                    {/* Icon Container with DaisyUI Dynamic Colors */}
                                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 transition-all duration-500
                                ${value.accent === 'primary' ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white' : ''}
                                ${value.accent === 'secondary' ? 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white' : ''}
                                ${value.accent === 'accent' ? 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white' : ''}
                                ${value.accent === 'neutral' ? 'bg-neutral/10 text-neutral group-hover:bg-neutral group-hover:text-white' : ''}
                            `}>
                                        {value.icon}
                                    </div>

                                    <h3 className="text-2xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">
                                        {value.title}
                                    </h3>
                                    <p className="text-base-content/70 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
