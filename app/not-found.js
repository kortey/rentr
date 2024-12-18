"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden">
      <motion.div
        className="absolute w-full h-full"
        animate={{
          backgroundPositionX: mousePosition.x / 5,
          backgroundPositionY: mousePosition.y / 5,
        }}
        style={{
          backgroundImage: "url('/images/404-bg.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          opacity: 0.1,
        }}
      />
      <motion.h1
        className="text-9xl font-bold text-white mb-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        404
      </motion.h1>
      <motion.h2
        className="text-4xl font-semibold text-white mb-4"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        Oops! Page Not Found
      </motion.h2>
      <motion.p
        className="text-xl text-white mb-8 text-center max-w-md"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
      >
        Looks like you've wandered into uncharted territory. Let's get you back on track!
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          href="/"
          className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-xl hover:bg-opacity-90 transition-colors shadow-lg"
        >
          Go back home
        </Link>
      </motion.div>
    </div>
  );
}
