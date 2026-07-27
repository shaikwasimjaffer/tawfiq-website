import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const verses = [
  {
    id: 1,
    reference: "Al-Baqarah · 2:286",
    arabic: "لَا يُكَلِّفُ ٱللَّٰهُ نَفْسًا إِلَّا وُسْعَهَا",
    english: "“Allah does not burden a soul beyond what it can bear.”",
  },
  {
    id: 2,
    reference: "Ash-Sharh · 94:5",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    english: "“For indeed, with hardship [will be] ease.”",
  },
  {
    id: 3,
    reference: "Ar-Ra'd · 13:28",
    arabic: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
    english:
      "“Unquestionably, by the remembrance of Allah hearts are assured.”",
  },
];

export default function BreathingVerses() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically cycle through the verses every 6 seconds to create the breathing pace
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % verses.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#F7F5F1] py-40 md:py-56 overflow-hidden min-h-[600px] flex items-center justify-center">
      <div className="relative max-w-3xl mx-auto px-6 text-center w-full">
        {/* mode="wait" is crucial here. It forces the current verse to finish blurring OUT before the next blurs IN. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex} // The key tells Framer Motion when the content changes
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            {/* Eyebrow Label */}
            <p className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#A6A6A6] mb-16 md:mb-20">
              {verses[currentIndex].reference}
            </p>

            {/* Arabic Text */}
            <p
              className="font-arabic text-[clamp(2rem,6vw,4.25rem)] leading-[1.9] text-[#1a1a1a]"
              dir="rtl"
            >
              {verses[currentIndex].arabic}
            </p>

            {/* English Translation */}
            <p className="font-serif text-xl md:text-2xl italic font-light text-[#8C8C8C] leading-relaxed mt-16 md:mt-20">
              {verses[currentIndex].english}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
