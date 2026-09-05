import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Droplet } from "lucide-react";

// Note: Ensure this path matches the location of your QR image
import qrImage from "../../assets/qr code.png";

export default function Transformation() {
  const [showScanner, setShowScanner] = useState(false);

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
              className="bg-white rounded-xl p-8 border border-gray-200 flex flex-col h-full"
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

            {/* Right Panel: With Tawfiq */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#064E3B] rounded-xl p-8 flex flex-col h-full relative"
              style={{
                boxShadow: '0 0 8px 1px rgba(5, 150, 105, 0.15), 0 0 15px 2px rgba(5, 150, 105, 0.08)',
              }}
            >
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

            <button className="tawfiq-pearl group" onClick={() => setShowScanner(true)}>
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
              className="absolute top-8 left-6 sm:top-12 sm:left-12 text-green-600 hover:text-green-950 tracking-[0.2em] uppercase text-[10px] sm:text-xs font-semibold py-2 transition-colors cursor-pointer group flex items-center gap-2"
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

                <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl relative z-10 flex items-center justify-center shadow-sm">
                  <img
                    src={qrImage}
                    alt="Scan to download"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain mix-blend-multiply"
                  />
                </div>
              </motion.div>
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