"use client"
import React from 'react'
import { motion } from "framer-motion";
type Props = {
    title: React.ReactNode;
    subtitle?: React.ReactNode
}

export default function SectionHeader({ title, subtitle }: Props) {
    return (
        <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-4xl font-bold text-base-content mb-4">
                {title}
            </h2>
            <p className="text-lg text-base-content/70">
                {subtitle}
            </p>
        </motion.div>
    )
}
