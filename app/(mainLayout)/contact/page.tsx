"use client";

import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapPin, FaClock, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import ContactPageHeroSection from "@/components/pages/contact/ContactPageHeroSection";
import ContactInfoSection from "@/components/pages/contact/ContactInfoSection";
import ContactForm from "@/components/pages/contact/ContactFormSection";

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


    return (
        <main className="min-h-screen bg-base-100">
            {/* Header Section */}
            <ContactPageHeroSection />

            {/* Contact Information Grid */}
            <ContactInfoSection />

            {/* Contact Form and Map Section */}
            <ContactForm />

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
