import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaLeaf } from "react-icons/fa";

const CtaSection = () => {
    return (
        <section className="relative py-24 bg-base-100 overflow-hidden">
            {/* Minimalist Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`, backgroundSize: '40px 40px' }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-base-200 rounded-[2rem] p-8 md:p-16 border border-base-300 shadow-sm">

                    {/* Left Content: Text focus */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <FaLeaf className="text-xs" />
                            <span>Eco-friendly Initiative</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-base-content mb-6 tracking-tight leading-[1.1]">
                            Join a community <br />
                            <span className="text-primary">that cares.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-base-content/70 leading-relaxed mb-0">
                            Be part of the movement towards sustainable shopping and make a
                            difference with every purchase. Join <span className="font-bold text-base-content">10k+</span> eco-conscious shoppers.
                        </p>
                    </motion.div>

                    {/* Right Content: Action focus */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4 w-full lg:w-auto"
                    >
                        <Link
                            href="/products"
                            className="btn btn-primary btn-lg px-10 rounded-2xl group w-full sm:w-auto"
                        >
                            Start Shopping
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/about"
                            className="btn btn-ghost btn-lg px-10 rounded-2xl border-base-300 hover:bg-base-300 w-full sm:w-auto"
                        >
                            Learn More
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;