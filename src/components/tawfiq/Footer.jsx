import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BismillahButton = ({
  onClick,
  className = "",
}) => (
  <button
    onClick={onClick}
    type="button"
    aria-label="Begin journey with Tawfiq"
    className={`group inline-flex items-center gap-3 cursor-pointer outline-none bg-green-950 hover:bg-[#16A34A] text-white px-7 py-3.5 rounded-full text-xs font-['Geist',sans-serif] tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-md ${className}`}
  >
    <span>Begin With Bismillah</span>
    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
  </button>
);

export default function Footer({ onOpenScanner, showContact, setShowContact }) {
  const footerCategories = [
    {
      title: "GET STARTED",
      links: [
        { name: "Open Tawfiq", path: "/" },
        { name: "Prayer Tracker", path: "/#qaza" },
        { name: "Qaza Manager", path: "/#qaza" },
        { name: "Qibla", path: "/#academy" },
        { name: "Download App", path: "https://originaltawfiq.vercel.app" },
      ],
    },
    {
      title: "WORSHIP",
      links: [
        { name: "Salah", path: "/#qaza" },
        { name: "Qaza", path: "/#qaza" },
        { name: "Dhikr", path: "/#academy" },
        { name: "Qur'an", path: "/#quran" },
        { name: "Duas", path: "/#academy" },
      ],
    },
    {
      title: "LEARN",
      links: [
        { name: "Tafsir", path: "/#quran" },
        { name: "Hadith", path: "/#academy" },
        { name: "Tajweed", path: "/#quran" },
        { name: "Islamic History", path: "/#academy" },
        { name: "99 Names of Allah", path: "/#academy" },
      ],
    },
    {
      title: "TAWFIQ",
      links: [
        { name: "About", path: "/about" },
        { name: "Our Mission", path: "/mission" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "GitHub", path: "https://github.com/shaikwasimjaffer/tawfiq-website" },
        { name: "Contact", path: "/contact", onClick: () => setShowContact(true) },
      ],
    },
  ];

  const [isRevealed, setIsRevealed] = useState(false);

  // Scroll to top function identical to the Navbar logo click
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#F0FDF4] pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(circle_at_center,#16A34A_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* 4-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-32 text-left">
          {footerCategories.map((category, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-[13px] font-semibold tracking-[0.15em] text-green-800 uppercase mb-6">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {category.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.onClick ? (
                      <button
                        type="button"
                        onClick={link.onClick}
                        aria-label={`Open ${link.name}`}
                        className="text-[15px] text-green-900 hover:text-green-700 transition-colors duration-300 cursor-pointer text-left"
                      >
                        {link.name}
                      </button>
                    ) : (
                      link.path.startsWith("http") ? (
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[15px] text-green-900 hover:text-green-700 transition-colors duration-300"
                        >
                          {link.name}
                        </a>
                      ) : link.path.startsWith("/#") ? (
                        <a
                          href={link.path}
                          className="text-[15px] text-green-900 hover:text-green-700 transition-colors duration-300"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.path}
                          className="text-[15px] text-green-900 hover:text-green-700 transition-colors duration-300"
                        >
                          {link.name}
                        </Link>
                      )
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center overflow-hidden flex flex-col items-center">
          {/* Editorial Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-8 flex flex-col items-center text-green-800"
          >
          </motion.div>

          {/* Animated 3D Reveal Wordmark - Now Clickable */}
          <motion.div
            viewport={{ once: true, amount: 0.5 }}
            onViewportEnter={() => {
              // Triggers the flip exactly once, 3 seconds after coming into view
              setTimeout(() => setIsRevealed(true), 3000);
            }}
            onClick={handleScrollToTop}
            role="button"
            tabIndex={0}
            aria-label="Back to top of page"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleScrollToTop();
              }
            }}
            className="w-full relative flex flex-col items-center justify-center py-4 cursor-pointer group"
            style={{ perspective: "2000px" }}
          >
            {/* Invisible spacer to maintain layout height while absolute elements animate */}
            <span aria-hidden="true" className="invisible block font-serif uppercase font-normal leading-[0.8] tracking-[-0.04em] text-[21vw] select-none whitespace-nowrap">
              TAWFIQ
            </span>

            <motion.div
              animate={{
                rotateY: isRevealed ? 180 : 0,
                scale: isRevealed ? [1, 0.95, 1] : 1,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02] group-active:scale-95"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Face: English */}
              <span
                className="absolute block font-serif uppercase font-normal leading-[0.8] tracking-[-0.04em] text-green-950 text-[21vw] select-none whitespace-nowrap"
                style={{ backfaceVisibility: "hidden" }}
              >
                TAWFIQ
              </span>

              {/* Back Face: Arabic */}
              <h2
                aria-hidden="true"
                className="absolute font-normal leading-[0.8] text-green-950 text-[21vw] select-none whitespace-nowrap"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
                }}
                dir="rtl"
              >
                توفيق
              </h2>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.35 }}
            className="mt-12"
          >
            <BismillahButton onClick={onOpenScanner} />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}