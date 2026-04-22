import { contactInfo } from "@/lib/data/contact";
import { motion, Variants } from "framer-motion"; // 1. Import the type

const ContactInfoSection = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="py-24 bg-base-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Optional Header - Increases "User Friendliness" by providing context */}
                <div className="mb-16 text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                        Get in <span className="text-primary">touch</span>
                    </h2>
                    <p className="text-base-content/60 text-lg max-w-xl">
                        Have a question or just want to say hi? We'd love to hear from you.
                        Choose your preferred way to reach out.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className="group relative p-8 rounded-4xl bg-base-200 border border-transparent hover:border-primary/20 hover:bg-base-100 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden"
                        >
                            {/* Subtle Background Glow on Hover */}
                            <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />

                            <div className="relative z-10 flex flex-col items-center lg:items-start">
                                {/* Icon Wrapper */}
                                <div className="mb-6 p-4 rounded-2xl bg-base-100 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300 shadow-inner">
                                    <div className="text-3xl">
                                        {info.icon}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-base-content mb-3">
                                    {info.title}
                                </h3>

                                {info.link !== "#" ? (
                                    <a
                                        href={info.link}
                                        className="text-base-content/70 hover:text-primary font-medium transition-colors break-all leading-tight"
                                    >
                                        {info.details}
                                    </a>
                                ) : (
                                    <p className="text-base-content/60 leading-tight">
                                        {info.details}
                                    </p>
                                )}

                                {/* Visual Footer for the card */}
                                <div className="mt-6 w-8 h-1 bg-primary/20 group-hover:w-full transition-all duration-500 rounded-full" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ContactInfoSection;