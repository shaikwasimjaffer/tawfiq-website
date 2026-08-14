import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/tawfiq/Footer";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[#F7F5F1] min-h-screen flex flex-col items-center justify-center"
    >
      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8">
        {/* 404 Number */}
        <h1 className="font-['Newsreader',serif] font-light text-9xl font-bold text-green-950 mb-6 leading-none tracking-tight">
          404
        </h1>

        {/* Headline */}
        <h2 className="font-['Newsreader',serif] font-light text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-none">
          This path doesn&rsquo;t lead anywhere.
        </h2>

        {/* Supporting text */}
        <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-md text-center">
          The page you&rsquo;re looking for may have moved, or perhaps it never existed.
        </p>

        {/* Return Home Button */}
        <Link
          to="/"
          className="relative w-fit px-8 py-4 rounded-full font-['Geist',sans-serif] text-base font-medium tracking-tight transition-all duration-500 bg-[#16A34A] text-white hover:bg-green-900"
        >
          Return Home
        </Link>
      </div>

      <Footer
        onOpenScanner={() => {}}
        showContact={false}
        setShowContact={() => {}}
      />
    </motion.main>
  );
}