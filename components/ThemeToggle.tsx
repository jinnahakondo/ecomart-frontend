"use client";

import { useTheme } from "@/lib/providers/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="btn btn-ghost btn-circle w-10 h-10" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle dark mode"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <FaMoon size={18} className="text-yellow-500" />
      ) : (
        <FaSun size={18} className="text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
