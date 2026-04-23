import Link from "next/link";
import { motion } from "framer-motion";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 group">
            {/* The Icon Part */}
            <motion.div
                className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-content shadow-lg shadow-primary/20"
                whileHover={{ rotate: 10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Abstract "S" or "Eco" shape using CSS shapes */}
                <div className="absolute inset-2 border-2 border-primary-content/30 rounded-lg" />
                <span className="text-xl font-black italic">E</span>
            </motion.div>

            {/* The Text Part */}
            <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter text-base-content group-hover:text-primary transition-colors">
                    Eco<span className="text-primary">Mart</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/40">
                    Sustainable
                </span>
            </div>
        </Link>
    );
};

export default Logo;