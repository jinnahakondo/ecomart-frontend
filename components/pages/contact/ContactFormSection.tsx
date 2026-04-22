import { motion } from "framer-motion";
import { FaArrowRight, FaPaperPlane, FaClock, FaShareAlt } from "react-icons/fa";

const ContactForm = () => {
    const handleSubmit = () => { console.log("clicked"); }
    return (
        <section className="py-24 bg-base-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Contact Form - Taking 7 columns */}
                    <motion.div
                        className="lg:col-span-7 bg-base-200/50 rounded-3xl p-6 md:p-8 border border-base-300"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-6">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-base-content">
                                Send a <span className="text-primary">Message</span>
                            </h2>
                            <p className="text-sm text-base-content/60">
                                We'll get back to you shortly.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Compact Full-Width Inputs */}
                            {[
                                { label: "Full Name", type: "text", placeholder: "John Doe" },
                                { label: "Email Address", type: "email", placeholder: "john@example.com" },
                                { label: "Subject", type: "text", placeholder: "How can we help?" }
                            ].map((field, idx) => (
                                <div key={idx} className="form-control w-full">
                                    <label className="label py-1">
                                        <span className="label-text font-bold text-[10px] uppercase tracking-widest opacity-60">
                                            {field.label}
                                        </span>
                                    </label>
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className="input input-sm input-bordered bg-base-100 rounded-xl h-11 w-full focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                            ))}

                            {/* Message Area */}
                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-[10px] uppercase tracking-widest opacity-60">
                                        Message
                                    </span>
                                </label>
                                <textarea
                                    className="textarea textarea-sm textarea-bordered bg-base-100 rounded-xl h-28 w-full focus:border-primary transition-all"
                                    placeholder="Your message..."
                                    required
                                />
                            </div>

                            {/* Action Button */}
                            <div className="pt-2">
                                <motion.button
                                    type="submit"
                                    className="btn btn-primary btn-md w-full rounded-xl group"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Send Message
                                    <FaPaperPlane className="text-xs ml-2 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Side Info Panel - Taking 5 columns */}
                    <motion.div
                        className="lg:col-span-5 space-y-8"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Visual Map/Location Block */}
                        <div className="relative group overflow-hidden rounded-[2.5rem] bg-base-200 border border-base-300 aspect-video flex items-center justify-center">
                            <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt?pb=...')] opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                            <div className="relative z-10 text-center p-6">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                    <div className="w-4 h-4 bg-primary rounded-full" />
                                </div>
                                <p className="font-bold text-base-content">Our Headquarters</p>
                                <p className="text-sm text-base-content/60">Gaibandha, Rangpur, Bangladesh</p>
                            </div>
                        </div>

                        {/* Info Cards */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-6 rounded-3xl bg-base-200 border border-base-300 hover:bg-base-100 transition-colors">
                                <div className="p-3 bg-primary/10 rounded-xl text-primary"><FaClock /></div>
                                <div>
                                    <h4 className="font-bold text-base-content">Response Time</h4>
                                    <p className="text-sm text-base-content/60 leading-relaxed">We typically respond within 24 hours. Our support team is active Mon-Fri, 9am-6pm.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 rounded-3xl bg-base-200 border border-base-300 hover:bg-base-100 transition-colors">
                                <div className="p-3 bg-secondary/10 rounded-xl text-secondary"><FaShareAlt /></div>
                                <div className="w-full">
                                    <h4 className="font-bold text-base-content mb-3">Connect Socially</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Facebook', 'Twitter', 'LinkedIn'].map(social => (
                                            <button key={social} className="btn btn-xs btn-outline border-base-300 rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all">
                                                {social}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;