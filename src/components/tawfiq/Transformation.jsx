import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Droplet } from "lucide-react";

// Note: Ensure this path matches the location of your QR image
import qrImage from "../../assets/qr code.png";

export default function Transformation({
  showScanner: externalShowScanner,
  setShowScanner: externalSetShowScanner,
} = {}) {
  const [internalShowScanner, setInternalShowScanner] = useState(false);
  const showScanner = externalShowScanner !== undefined ? externalShowScanner : internalShowScanner;
  const setShowScanner = externalSetShowScanner || setInternalShowScanner;
  const isExternal = externalShowScanner !== undefined;

  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (showScanner) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showScanner]);

  const beforePoints = [
    "Prayers slip through your day unnoticed",
    "Missed Salah piles up without clear tracking",
    "Qaza feels confusing and hard to start",
    "Islamic knowledge is scattered everywhere",
    "You can't see your worship consistency clearly",
  ];

  const afterPoints = [
    "Stay connected with your five daily prayers",
    "Recover missed Salah with a clear Qaza journey",
    "Learn Islam through one guided Academy",
    "Understand your worship and see your consistency grow",
    "Ask questions and receive guidance grounded in Islamic knowledge",
  ];

  return (
    <>
      <section className="bg-[#F0FDF4] overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-['Newsreader',serif] font-light text-green-950 tracking-tight leading-tight text-center mb-10">
            See what changes when you have <span className="text-[#16A34A]">Tawfiq</span>
          </h2>
          
          <div className="relative grid lg:grid-cols-2 gap-10 items-stretch">
            {/* Left Panel: Before Tawfiq */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-xl p-8 border border-gray-300 flex flex-col h-full"
            >
              <h2 className="font-['Newsreader',serif] font-light text-3xl md:text-4xl text-green-800 mb-4">
                Before Tawfiq
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                When worship feels scattered.
              </p>
              <div className="space-y-4">
                {beforePoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="ml-3 text-gray-500">
                      • {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Panel: With Tawfiq (After Topic Card) */}
            <motion.div
              data-bg="dark-green"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col h-full group"
            >
              {/* Outer Lightning Aura / Ambient Bloom */}
              <div
                className="absolute -inset-[3px] rounded-2xl bg-gradient-to-r from-emerald-500/30 via-emerald-400/25 to-teal-400/30 blur-lg pointer-events-none transition-opacity duration-500 opacity-80 group-hover:opacity-100"
                style={{
                  animation: "lightningAuraPulse 4s ease-in-out infinite",
                }}
              />

              {/* Main Card with Lightning Border */}
              <div
                className="relative rounded-xl p-[2px] flex flex-col h-full overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(5,150,105,0.25),0_0_40px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_30px_rgba(52,211,153,0.4),0_0_60px_rgba(16,185,129,0.3)]"
                style={{
                  animation: "lightningVoltageCrackle 3.5s ease-in-out infinite",
                }}
              >
                {/* 1. Static base border line for crisp definition */}
                <div className="absolute inset-0 rounded-xl border border-emerald-400/35 pointer-events-none z-10" />

                {/* 2. Primary Fast Electric Lightning Beam */}
                <div
                  className="absolute inset-[-150%] pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 255deg, rgba(5,150,105,0.1) 275deg, rgba(16,185,129,0.35) 300deg, rgba(52,211,153,0.75) 325deg, #34D399 342deg, #6EE7B7 350deg, #A7F3D0 355deg, #FFFFFF 358.5deg, #CFFAFE 359.5deg, transparent 360deg)",
                    animation: "lightningSpin 3.6s linear infinite",
                  }}
                />

                {/* 3. Secondary Electric Counter-Arc / Surge */}
                <div
                  className="absolute inset-[-150%] pointer-events-none mix-blend-screen"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, transparent 0deg, transparent 295deg, rgba(16,185,129,0.2) 320deg, rgba(52,211,153,0.6) 342deg, #6EE7B7 352deg, #A7F3D0 356.5deg, #FFFFFF 358.5deg, transparent 360deg)",
                    animation: "lightningSpinReverse 5.2s linear infinite",
                  }}
                />

                {/* 4. Electric Voltage Crackle & Glow Filter Layer */}
                <div
                  className="absolute inset-[-150%] pointer-events-none blur-[5px]"
                  style={{
                    background:
                      "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 275deg, rgba(16,185,129,0.4) 305deg, #34D399 335deg, #6EE7B7 350deg, #FFFFFF 358deg, transparent 360deg)",
                    animation: "lightningSpin 3.6s linear infinite",
                  }}
                />

                {/* Inner Card Content */}
                <div className="relative z-10 bg-[#064E3B] rounded-[10px] p-8 flex flex-col h-full w-full overflow-hidden">
                  {/* Subtle Top Divine Radiance */}
                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-36 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Corner Lightning Brackets (High-voltage Accent Marks) */}
                  <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-emerald-400/60 rounded-tl-sm pointer-events-none z-10" />
                  <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-emerald-400/60 rounded-tr-sm pointer-events-none z-10" />
                  <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-emerald-400/60 rounded-bl-sm pointer-events-none z-10" />
                  <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-emerald-400/60 rounded-br-sm pointer-events-none z-10" />

                  <h2 className="font-['Newsreader',serif] font-light text-3xl md:text-4xl text-white mb-4 relative z-10">
                    With Tawfiq
                  </h2>
                  <p className="text-white/90 mb-6 leading-relaxed relative z-10">
                    When your faith has a place to grow.
                  </p>
                  <div className="space-y-4 relative z-10">
                    {afterPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-white/20 text-white rounded-full">
                          <Check className="h-5 w-5" />
                        </span>
                        <span className="ml-3 text-white font-medium">
                          {point}
                        </span>
                      </motion.div>
                    ))}
                    <style>
                      {`
                        .space-y-4 > :first-child .ml-3 {
                          font-weight: 600;
                        }
                      `}
                    </style>
                  </div>
                  <div className="absolute top-0 right-0 -mt-12 -mr-12 pointer-events-none">
                    <Droplet className="h-16 w-16 text-white/10" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Big Pearl Button (Tawfiq Themed) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 flex justify-center w-full"
          >
            <style>{`
              @keyframes lightningSpin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
              @keyframes lightningSpinReverse {
                from {
                  transform: rotate(360deg);
                }
                to {
                  transform: rotate(0deg);
                }
              }
              @keyframes lightningAuraPulse {
                0%, 100% {
                  opacity: 0.65;
                  transform: scale(1);
                }
                50% {
                  opacity: 0.95;
                  transform: scale(1.008);
                }
              }
              @keyframes lightningVoltageCrackle {
                0%, 100% {
                  opacity: 0.94;
                  filter: drop-shadow(0 0 10px rgba(52, 211, 153, 0.55)) brightness(1.05);
                }
                14% {
                  opacity: 1;
                  filter: drop-shadow(0 0 16px rgba(110, 231, 183, 0.9)) brightness(1.25);
                }
                28% {
                  opacity: 0.88;
                  filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.45)) brightness(1);
                }
                42% {
                  opacity: 1;
                  filter: drop-shadow(0 0 22px rgba(167, 243, 208, 0.95)) brightness(1.35);
                }
                44% {
                  opacity: 0.9;
                  filter: drop-shadow(0 0 9px rgba(16, 185, 129, 0.5)) brightness(1.05);
                }
                68% {
                  opacity: 1;
                  filter: drop-shadow(0 0 18px rgba(52, 211, 153, 0.85)) brightness(1.28);
                }
                85% {
                  opacity: 0.91;
                  filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5)) brightness(1.02);
                }
              }

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

            <button type="button" aria-label="Try Tawfiq - Open App Scanner" className="tawfiq-pearl group" onClick={() => setShowScanner(true)}>
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
        {!isExternal && showScanner && (
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