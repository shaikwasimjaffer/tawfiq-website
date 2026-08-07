import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BismillahButton = ({
  onClick,
  className = "",
  iconSize = 18,
  textSize = "text-xl md:text-2xl",
}) => (
  <button
    onClick={onClick}
    type="button"
    className={`group inline-flex items-center gap-3 cursor-pointer outline-none bg-transparent border-none p-0 ${className}`}
  >
    <span className="w-0 group-hover:w-6 h-px bg-green-950 transition-all duration-500" />
    

    <span className="w-0 group-hover:w-6 h-px bg-green-950 transition-all duration-500" />
  </button>
);

export default function Footer({ onOpenScanner }) {
  return (
    <footer className="relative overflow-hidden bg-[#F0FDF4] pt-36 pb-16">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(circle_at_center,#16A34A_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="relative w-full mx-auto px-4 sm:px-6 text-center overflow-hidden">
        {/* Restored: Closer with every sajdah */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-serif italic font-light text-xl md:text-3xl text-green-700"
        >
          Closer with every sajdah.
        </motion.p>

        {/* Moved: Privacy / Terms / Support Links */}
        <div className="mt-10 flex flex-wrap justify-center gap-10 text-[11px] tracking-[0.18em] uppercase text-green-700">
          <Link
            to="/privacy"
            className="transition-all duration-300 hover:text-green-950"
          >
            Privacy
          </Link>

          <Link
            to="/terms"
            className="transition-all duration-300 hover:text-green-950"
          >
            Terms
          </Link>

          <a
            href="mailto:tawfiq.base44@gmail.com"
            className="transition-all duration-300 hover:text-green-950"
          >
            Support
          </a>
        </div>

        {/* Moved: Made with intention */}
        <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-green-600">
          تَوْفِيق · Made with intention
        </p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 w-full flex flex-col items-center justify-center"
        >
          <p
            className="
              font-arabic
              text-[#16A34A]
              text-5xl
              md:text-6xl
              mb-2
              tracking-wide
              translate-x-[2px]
            "
          >
            توفيق
          </p>

          <h2
            className="
              font-serif
              uppercase
              font-normal
              leading-[0.8]
              tracking-[-0.04em]
              text-green-950
              text-[23vw]
              select-none
              whitespace-nowrap
            "
          >
            TAWFIQ
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.15,
          }}
          className="mt-16"
        >
          <BismillahButton onClick={onOpenScanner} />
        </motion.div>
      </div>
    </footer>
  );
}
