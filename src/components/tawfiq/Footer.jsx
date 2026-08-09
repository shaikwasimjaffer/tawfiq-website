import React, { useState } from "react";
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
  // Re-implemented functional link objects
  const footerCategories = [
    {
      title: "GET STARTED",
      links: [
        { name: "Open Tawfiq", path: "/" },
        { name: "Prayer Tracker", path: "/prayer-tracker" },
        { name: "Qaza Manager", path: "/qaza-manager" },
        { name: "Qibla", path: "/qibla" },
        { name: "Download App", path: "/download" },
      ],
    },
    {
      title: "WORSHIP",
      links: [
        { name: "Salah", path: "/salah" },
        { name: "Qaza", path: "/qaza" },
        { name: "Dhikr", path: "/dhikr" },
        { name: "Qur'an", path: "/quran" },
        { name: "Duas", path: "/duas" },
      ],
    },
    {
      title: "LEARN",
      links: [
        { name: "Tafsir", path: "/tafsir" },
        { name: "Hadith", path: "/hadith" },
        { name: "Tajweed", path: "/tajweed" },
        { name: "Islamic History", path: "/islamic-history" },
        { name: "99 Names of Allah", path: "/names-of-allah" },
      ],
    },
    {
      title: "TAWFIQ",
      links: [
        { name: "About", path: "/about" },
        { name: "Our Mission", path: "/mission" },
        { name: "Changelog", path: "/changelog" },
        { name: "GitHub", path: "https://github.com" },
        { name: "Contact", path: "/contact" },
      ],
    },
  ];

  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-[#F0FDF4] pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(circle_at_center,#16A34A_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* 4-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-32 text-left">
          {footerCategories.map((category, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-[13px] font-semibold tracking-[0.15em] text-green-700/80 uppercase mb-6">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {category.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.path.startsWith("http") ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
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

          {/* Animated 3D Reveal Wordmark */}
          <motion.div
            viewport={{ once: true, amount: 0.5 }}
            onViewportEnter={() => {
              // Triggers the flip exactly once, 3 seconds after coming into view
              setTimeout(() => setIsRevealed(true), 3000);
            }}
            className="w-full relative flex flex-col items-center justify-center py-4"
            style={{ perspective: "2000px" }}
          >
            {/* Invisible spacer to maintain layout height while absolute elements animate */}
            <h2 className="invisible font-serif uppercase font-normal leading-[0.8] tracking-[-0.04em] text-[21vw] select-none whitespace-nowrap">
              TAWFIQ
            </h2>

            <motion.div
              animate={{
                rotateY: isRevealed ? 180 : 0,
                scale: isRevealed ? [1, 0.95, 1] : 1,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Face: English */}
              <h2
                className="absolute font-serif uppercase font-normal leading-[0.8] tracking-[-0.04em] text-green-950 text-[21vw] select-none whitespace-nowrap"
                style={{ backfaceVisibility: "hidden" }}
              >
                TAWFIQ
              </h2>

              {/* Back Face: Arabic */}
              <h2
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
