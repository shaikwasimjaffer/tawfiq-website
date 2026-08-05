import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BismillahButton = ({
  className = "",
  iconSize = 18,
  textSize = "text-xl md:text-2xl",
}) => (
  <a
    href="https://tawfiq-official.github.io/Tawfiq/"
    target="_blank"
    rel="noopener noreferrer"
    className={`group inline-flex items-center gap-3 ${className}`}
  >
    <span className="w-0 group-hover:w-6 h-px bg-green-950 transition-all duration-500" />

    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      className="text-green-950 transition-transform duration-500 group-hover:rotate-12"
    >
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.2" />

      <path d="M12 5 L14.5 12 L12 14.5 L9.5 12 Z" fill="currentColor" />

      <path
        d="M12 19 L14.5 12 L12 14.5 L9.5 12 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      <circle cx="12" cy="12" r="0.7" fill="currentColor" />
    </svg>

    <span className={`font-serif ${textSize} text-green-950 tracking-tight`}>
      Begin with Bismillah
    </span>

    <span className="w-0 group-hover:w-6 h-px bg-green-950 transition-all duration-500" />
  </a>
);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#F0FDF4] pt-36 pb-16">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(circle_at_center,#16A34A_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="relative w-full mx-auto px-4 sm:px-6 text-center overflow-hidden">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-serif italic font-light text-xl md:text-3xl text-green-700"
        >
          Closer with every sajdah.
        </motion.p>

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
          <BismillahButton />
        </motion.div>

        <div className="mt-28 border-t border-green-200/60 pt-8 flex flex-wrap justify-center gap-10 text-[11px] tracking-[0.18em] uppercase text-green-700">
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

        <p className="mt-10 text-[10px] uppercase tracking-[0.22em] text-green-600">
          تَوْفِيق · Made with intention
        </p>
      </div>
    </footer>
  );
}
