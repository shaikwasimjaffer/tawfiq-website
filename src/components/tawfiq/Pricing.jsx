import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import qrImage from "../../assets/qr code.png";

const featuresList = [
  { text: "Qaza prayer tracking & recovery planning", inSukoon: false },
  { text: "Daily Salah tracking & habit consistency", inSukoon: true },
  { text: "Quran reading & verse audio with Tajweed guidance", inSukoon: false },
  { text: "Tawfiq AI assistant for contextual Islamic learning", inSukoon: false },
  { text: "Guided Islamic Academy (Hadith, Tafsir & 99 Names)", inSukoon: false },
  { text: "Qibla compass & local prayer calculation", inSukoon: true },
  { text: "Ad-free experience with zero commercial interruptions", inSukoon: true },
  { text: "Privacy-focused data handling — no selling of worship records", inSukoon: true },
];

export default function Pricing() {
  const [showScanner, setShowScanner] = useState(false);

  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (showScanner) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showScanner]);

  return (
    <>
      <section
        id="pricing"
        aria-label="Pricing and Plan"
        className="w-full bg-[#F0FDF4] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-['Geist',sans-serif] overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">
          {/* Section Header: Minimal editorial headline */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 px-2">
            <h2 className="font-['Newsreader',serif] font-light text-2xl sm:text-4xl lg:text-5xl text-green-950 tracking-tight leading-tight">
              <span className="inline-block">Different platforms, different prices.</span>{" "}
              <br />
              <span className="italic text-[#16A34A] inline-block">Tawfiq remains free.</span>
            </h2>
          </div>

          {/* Pricing Cards Grid: 2 Cards (Sukoon in White & Black, and Tawfiq in Brand Green) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-10 max-w-4xl mx-auto items-stretch">
            {/* 1. SUKOON CARD (White & Black combination, ₹149 / month) */}
            <div className="relative w-full max-w-[440px] mx-auto flex flex-col">
              {/* Floating Decorative Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-900 text-white border border-neutral-700 shadow-sm text-[11px] font-['Geist',sans-serif] font-semibold tracking-[0.15em] uppercase whitespace-nowrap">
                  <span className="text-[9px] text-white/70 leading-none" aria-hidden="true">✦</span>
                  <span>SUKOON</span>
                  <span className="text-[9px] text-white/70 leading-none" aria-hidden="true">✦</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white text-neutral-900 rounded-2xl sm:rounded-[1.75rem] p-7 sm:p-9 pt-9 sm:pt-11 pb-9 sm:pb-11 border border-neutral-200/90 shadow-xl shadow-neutral-950/5 flex flex-col text-left h-full"
              >
                {/* Prominent Price Row: ₹149 / month */}
                <div className="mt-1 mb-2.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Geist',sans-serif] font-bold text-5xl sm:text-6xl text-neutral-950 tracking-tight leading-none">
                      ₹149
                    </span>
                    <span className="text-neutral-500 text-sm sm:text-base font-['Geist',sans-serif] font-normal">
                      / month
                    </span>
                  </div>
                </div>

                {/* Subtitle / Description */}
                <p className="text-sm sm:text-[14.5px] font-['Geist',sans-serif] text-neutral-600 font-light leading-relaxed mt-1 mb-8">
                  Build consistency in Salah, manage Qaza prayers, and deepen your Islamic learning with Tawfiq.
                </p>

                {/* Included Features Header */}
                <h4 className="text-xs font-['Geist',sans-serif] font-medium tracking-wider uppercase text-neutral-400 mb-4 sm:mb-5">
                  What’s included
                </h4>

                {/* Feature Checklist */}
                <ul className="space-y-4 sm:space-y-4.5" role="list">
                  {featuresList.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[14.5px] font-['Geist',sans-serif] font-light leading-relaxed ${
                        feature.inSukoon ? "text-neutral-800" : "text-neutral-400"
                      }`}
                    >
                      {feature.inSukoon ? (
                        <Check
                          className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5"
                          strokeWidth={2.2}
                          aria-hidden="true"
                        />
                      ) : (
                        <X
                          className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* 2. TAWFIQ CARD (Original Brand Green, ₹0 / month) */}
            <div className="relative w-full max-w-[440px] mx-auto flex flex-col">
              {/* Floating Decorative Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#DCFCE7] text-[#064E3B] border border-emerald-300 shadow-sm text-[11px] font-['Geist',sans-serif] font-semibold tracking-[0.15em] uppercase whitespace-nowrap">
                  <span className="text-[9px] text-[#064E3B]/80 leading-none" aria-hidden="true">✦</span>
                  <span>TAWFIQ</span>
                  <span className="text-[9px] text-[#064E3B]/80 leading-none" aria-hidden="true">✦</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-[#064E3B] text-white rounded-2xl sm:rounded-[1.75rem] p-7 sm:p-9 pt-9 sm:pt-11 pb-9 sm:pb-11 border border-emerald-400/20 shadow-lg shadow-green-950/10 flex flex-col text-left h-full"
              >
                {/* Prominent Price Row: ₹0 / month */}
                <div className="mt-1 mb-2.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Geist',sans-serif] font-bold text-5xl sm:text-6xl text-white tracking-tight leading-none">
                      ₹0
                    </span>
                    <span className="text-emerald-200/80 text-sm sm:text-base font-['Geist',sans-serif] font-normal">
                      / month
                    </span>
                  </div>
                </div>

                {/* Subtitle / Description */}
                <p className="text-sm sm:text-[14.5px] font-['Geist',sans-serif] text-emerald-100/85 font-light leading-relaxed mt-1 mb-8">
                  Build consistency in Salah, manage Qaza prayers, and deepen your Islamic learning with Tawfiq.
                </p>

                {/* Included Features Header */}
                <h4 className="text-xs font-['Geist',sans-serif] font-medium tracking-wider uppercase text-emerald-300 mb-4 sm:mb-5">
                  What’s included
                </h4>

                {/* Feature Checklist */}
                <ul className="space-y-4 sm:space-y-4.5" role="list">
                  {featuresList.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[14.5px] text-white/90 font-['Geist',sans-serif] font-light leading-relaxed"
                    >
                      <Check
                        className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Big Pearl Button (Tawfiq Themed) - kept right here below the cards where it was before */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 sm:mt-16 flex justify-center w-full"
          >
            <style>{`
              .tawfiq-pearl {
                --bg: #16A34A;
                --radius: 100px;
                outline: none;
                cursor: pointer;
                border: 0;
                position: relative;
                border-radius: var(--radius);
                background-color: var(--bg);
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow:
                  inset 0 0.3rem 0.9rem rgba(255, 255, 255, 0.4),
                  inset 0 -0.1rem 0.3rem rgba(5, 46, 22, 0.7),
                  inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.5),
                  0 1rem 2rem rgba(22, 163, 74, 0.3),
                  0 0.5rem 1rem -0.2rem rgba(5, 46, 22, 0.6);
              }
              .tawfiq-pearl .wrap {
                border-radius: inherit;
                position: relative;
                overflow: hidden;
              }
              .tawfiq-pearl .wrap::before,
              .tawfiq-pearl .wrap::after {
                content: "";
                position: absolute;
                transition: all 0.3s ease;
                pointer-events: none;
              }
              .tawfiq-pearl .wrap::before {
                left: -15%;
                right: -15%;
                bottom: 25%;
                top: -100%;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.12);
                z-index: 10;
              }
              .tawfiq-pearl .wrap::after {
                left: 6%;
                right: 6%;
                top: 10%;
                bottom: 40%;
                border-radius: 22px 22px 0 0;
                box-shadow: inset 0 10px 8px -10px rgba(255, 255, 255, 0.8);
                background: linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 0.35) 0%,
                  rgba(255, 255, 255, 0) 60%,
                  rgba(255, 255, 255, 0) 100%
                );
                z-index: 10;
              }
              .tawfiq-pearl:hover {
                transform: translateY(-2px);
                box-shadow:
                  inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.5),
                  inset 0 -0.1rem 0.3rem rgba(5, 46, 22, 0.7),
                  inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.6),
                  0 1.5rem 2.5rem rgba(22, 163, 74, 0.4),
                  0 0.5rem 1rem -0.2rem rgba(5, 46, 22, 0.6);
              }
              .tawfiq-pearl:hover .wrap::before {
                transform: translateY(-5%);
              }
              .tawfiq-pearl:hover .wrap::after {
                opacity: 0.6;
                transform: translateY(5%);
              }
              .tawfiq-pearl:active {
                transform: translateY(4px);
                box-shadow:
                  inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.6),
                  inset 0 -0.1rem 0.3rem rgba(5, 46, 22, 0.9),
                  inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.4),
                  0 0.5rem 1rem rgba(22, 163, 74, 0.2),
                  0 0.5rem 1rem -0.2rem rgba(5, 46, 22, 0.6);
              }
              .tawfiq-pearl .content-container {
                transition: all 0.3s ease;
                transform: translateY(2%);
              }
              .tawfiq-pearl:hover .content-container {
                transform: translateY(-4%);
              }
            `}</style>

            <button
              type="button"
              aria-label="Try Tawfiq - Open App Scanner"
              className="tawfiq-pearl group"
              onClick={() => setShowScanner(true)}
            >
              <div className="wrap flex items-center justify-center px-10 py-5 sm:px-14 sm:py-6">
                <div className="content-container relative z-20 flex items-center justify-center text-[18px] sm:text-[20px] font-medium tracking-tight whitespace-nowrap text-white font-['Geist',sans-serif]">
                  
                  {/* 1. Mobile State (Always Try Tawfiq) */}
                  <div className="flex sm:hidden items-center gap-2 absolute drop-shadow-md">
                    <span>Try Tawfiq</span>
                    <span>→</span>
                  </div>

                  {/* 2. Desktop Default State (Bismillah) */}
                  <div className="hidden sm:flex items-center gap-4 transition-all duration-300 group-hover:opacity-0 group-hover:scale-95 absolute drop-shadow-md">
                    <span className="font-serif text-[24px] opacity-90 leading-none pt-0.5" dir="rtl">
                      بسم الله
                    </span>
                    <span>Bismillah</span>
                  </div>

                  {/* 3. Desktop Hover State (Try Tawfiq) */}
                  <div className="hidden sm:flex items-center gap-3 transition-all duration-300 opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100 absolute drop-shadow-md">
                    <span>Try Tawfiq</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>

                  {/* Invisible Structural Layer to ensure consistent button sizing */}
                  <div className="flex items-center gap-4 invisible pointer-events-none">
                    <div className="sm:hidden flex gap-2">
                      <span>Try Tawfiq</span>
                      <span>→</span>
                    </div>
                    <div className="hidden sm:flex gap-4">
                      <span className="font-serif text-[24px] opacity-90 leading-none pt-0.5" dir="rtl">
                        بسم الله
                      </span>
                      <span>Bismillah</span>
                    </div>
                  </div>
                  
                </div>
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Embedded Scanner Overlay Modal */}
      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#F0FDF4] overflow-y-auto overflow-x-hidden flex flex-col items-center pt-24 pb-16 px-6 font-['Geist',sans-serif]"
          >
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => setShowScanner(false)}
              aria-label="Close scanner and return to site"
              className="absolute top-8 left-6 sm:top-12 sm:left-12 text-green-800 hover:text-green-950 tracking-[0.2em] uppercase text-[10px] sm:text-xs font-semibold py-2 transition-colors cursor-pointer group flex items-center gap-2"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
                ←
              </span>
              Back to Site
            </motion.button>

            <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-8 sm:mt-12 mb-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                className="font-['Newsreader',serif] font-light text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.05] text-[#052E16] tracking-[-0.01em]"
              >
                Download <span className="italic text-[#16A34A]">Tawfiq</span>
                <br />
                <span className="italic text-[#16A34A]">to begin today.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 font-['Geist',sans-serif] text-[#16A34A] text-[15px] sm:text-[18px] max-w-2xl mx-auto leading-relaxed"
              >
                Begin with one prayer. Leave with a lifetime of consistency.
                Scan the QR code below to download the app for iOS and Android.
              </motion.p>
            </div>

            <div className="w-full max-w-xl mx-auto mt-10 sm:mt-16 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="relative bg-[#16A34A] p-10 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl mb-8 flex flex-col items-center justify-center overflow-hidden"
              >
                {/* Top Text */}
                <div className="absolute top-0 left-0 w-full h-10 sm:h-12 flex items-center justify-center">
                  <span className="text-white/90 text-[10px] sm:text-[11px] font-['Geist',sans-serif] uppercase tracking-[0.4em] font-semibold pl-[0.4em]">Tawfiq</span>
                </div>
                
                {/* Bottom Text */}
                <div className="absolute bottom-0 left-0 w-full h-10 sm:h-12 flex items-center justify-center">
                  <span className="text-white/90 text-[10px] sm:text-[11px] font-['Geist',sans-serif] uppercase tracking-[0.4em] font-semibold pl-[0.4em]">Tawfiq</span>
                </div>
                
                {/* Left Text */}
                <div className="absolute left-0 top-0 h-full w-10 sm:w-12 flex items-center justify-center">
                  <span className="-rotate-90 whitespace-nowrap text-white/90 text-[10px] sm:text-[11px] font-['Geist',sans-serif] uppercase tracking-[0.4em] font-semibold pl-[0.4em]">Tawfiq</span>
                </div>
                
                {/* Right Text */}
                <div className="absolute right-0 top-0 h-full w-10 sm:w-12 flex items-center justify-center">
                  <span className="rotate-90 whitespace-nowrap text-white/90 text-[10px] sm:text-[11px] font-['Geist',sans-serif] uppercase tracking-[0.4em] font-semibold pl-[0.4em]">Tawfiq</span>
                </div>

                <a
                  href="https://originaltawfiq.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl relative z-10 flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 transition-transform duration-300 group/qr"
                  title="Open Tawfiq Web App"
                >
                  <img
                    src={qrImage}
                    alt="Scan to open https://originaltawfiq.vercel.app"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain mix-blend-multiply"
                  />
                </a>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                href="https://originaltawfiq.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-700/10 hover:bg-green-700/20 text-[#052E16] text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105"
              >
                <span>Or open directly in browser</span>
                <span className="text-[#16A34A]">→</span>
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-full mt-10 sm:mt-16 flex flex-col items-center"
            >
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-green-800 font-['Geist',sans-serif] font-medium text-base sm:text-lg px-4 text-center tracking-tight">
                <span>Prayer Tracking</span>
                <span className="text-[#16A34A] opacity-50 hidden sm:block">•</span>
                <span>Qaza Recovery</span>
                <span className="text-[#16A34A] opacity-50 hidden sm:block">•</span>
                <span>Quran</span>
                <span className="text-[#16A34A] opacity-50 hidden sm:block">•</span>
                <span>Dhikr</span>
                <span className="text-[#16A34A] opacity-50 hidden sm:block">•</span>
                <span>Islamic Academy</span>
              </div>

              <div className="mt-12 flex flex-col items-center gap-4">
                <p className="font-['Geist',sans-serif] text-[10px] sm:text-xs tracking-[0.2em] uppercase text-green-600 font-semibold text-center">
                  Built with sincerity for every Muslim.
                </p>
                <div className="flex items-center gap-4 text-[10px] sm:text-xs tracking-widest uppercase text-green-600/70 font-medium">
                  <span>Free Forever</span>
                  <span className="w-1 h-1 rounded-full bg-green-300" />
                  <span>No Ads</span>
                  <span className="w-1 h-1 rounded-full bg-green-300" />
                  <span>Privacy First</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
