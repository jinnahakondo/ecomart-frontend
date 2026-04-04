"use client";

import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapPin, FaClock, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

export default function Contact() {
    // Contact information
    const contactInfo = [
        {
            icon: <FaPhone className="text-3xl text-primary" />,
            title: "Phone",
            details: "+1 (555) 123-4567",
            link: "tel:+15551234567",
        },
        {
            icon: <FaEnvelope className="text-3xl text-secondary" />,
            title: "Email",
            details: "support@ecomart.com",
            link: "mailto:support@ecomart.com",
        },
        {
            icon: <FaMapPin className="text-3xl text-accent" />,
            title: "Address",
            details: "123 Green Street, Eco City, EC 12345",
            link: "#",
        },
        {
            icon: <FaClock className="text-3xl text-primary" />,
            title: "Business Hours",
            details: "Mon - Fri: 9 AM to 6 PM (UTC)",
            link: "#",
        },
    ];

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    // Handle form input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.subject && formData.message) {
            setSubmitted(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <main className="min-h-screen bg-base-100">
            {/* Header Section */}
            <section className="bg-gradient-to-br from-primary to-primary/60 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            We love hearing from our customers. Reach out anytime with questions or feedback.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Information Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                className="card bg-base-200 shadow-lg border border-primary/10 p-8 text-center hover:border-primary/30 transition-all"
                                variants={itemVariants}
                                whileHover={{ translateY: -5 }}
                            >
                                <div className="flex justify-center mb-4">
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-bold text-base-content mb-2">
                                    {info.title}
                                </h3>
                                {info.link !== "#" ? (
                                    <a
                                        href={info.link}
                                        className="text-primary hover:text-primary/80 transition-colors"
                                    >
                                        {info.details}
                                    </a>
                                ) : (
                                    <p className="text-base-content/70">{info.details}</p>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Form and Map Section */}
            <section className="py-20 bg-base-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold text-base-content mb-6">
                                Send us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Input */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-base-content mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-base-content mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                {/* Subject Input */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-base-content mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                {/* Message Textarea */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-base-content mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Your message here..."
                                        className="textarea textarea-bordered w-full h-32"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Send Message
                                    <FaArrowRight />
                                </motion.button>

                                {/* Success Message */}
                                {submitted && (
                                    <motion.div
                                        className="alert alert-success text-white"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <span>Thank you for your message! We will get back to you soon.</span>
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>

                        {/* Map Section */}
                        <motion.div
                            className="flex flex-col gap-6"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Map Placeholder */}
                            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-96 rounded-xl flex items-center justify-center border border-primary/20">
                                <div className="text-center">
                                    <span className="text-6xl mb-4">🗺️</span>
                                    <p className="text-base-content/70">Map Location Coming Soon</p>
                                </div>
                            </div>

                            {/* Additional Info Card */}
                            <div className="card bg-base-100 shadow-lg border border-primary/10 p-6">
                                <h3 className="text-xl font-bold text-base-content mb-4">
                                    Response Time
                                </h3>
                                <p className="text-base-content/70 mb-4">
                                    We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.
                                </p>
                                <div className="divider my-2" />
                                <h3 className="text-xl font-bold text-base-content mb-4">
                                    Social Media
                                </h3>
                                <div className="flex gap-4">
                                    <a href="#" className="btn btn-sm btn-outline btn-secondary">
                                        Facebook
                                    </a>
                                    <a href="#" className="btn btn-sm btn-outline btn-secondary">
                                        Twitter
                                    </a>
                                    <a href="#" className="btn btn-sm btn-outline btn-secondary">
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Quick Links */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-base-content mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-base-content/70">
                            Find answers to common questions
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {[
                            {
                                q: "What are your shipping times?",
                                a: "We offer standard shipping in 5-7 business days and express shipping in 2-3 business days.",
                            },
                            {
                                q: "What is your return policy?",
                                a: "We offer a 30-day money-back guarantee on all products. No questions asked.",
                            },
                            {
                                q: "Do you offer international shipping?",
                                a: "Yes, we ship to over 50 countries worldwide with carbon-neutral shipping available.",
                            },
                            {
                                q: "How can I track my order?",
                                a: "You will receive a tracking number via email once your order ships.",
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                className="card bg-base-200 shadow-lg border border-primary/10 p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <h3 className="font-bold text-base-content mb-2">
                                    {faq.q}
                                </h3>
                                <p className="text-base-content/70 text-sm">
                                    {faq.a}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
