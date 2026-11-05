import React from "react";
import { motion } from "framer-motion";

const features = [
  "Complete Qaza Prayer Recovery & Pace Calculator",
  "Daily 5 Salah Habit Tracking & Consistency Streaks",
  "Interactive Quran with Tajweed & Audio Recitation",
  "Tawfiq AI Scholarly Multi-Madhhab Guidance",
  "Guided Islamic Academy: Hadith, Tafsir & 99 Names",
  "Accurate Qibla Compass & Prayer Timings",
  "100% Ad-Free Worship — Zero Popups or Banners",
  "Strict Privacy First — No Tracking or Data Selling",
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="w-full bg-[#F0FDF4] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 font-['Geist',sans-serif]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Sleek, understated section header */}
        <div className="text-center max-w-md mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] tracking-[0.25em] uppercase text-emerald-800 font-semibold block mb-2">
            Pricing
          </span>
          <h2 className="font-['Newsreader',serif] font-light text-3xl sm:text-4xl text-green-950 tracking-tight">
            Simple, transparent, <span className="italic text-[#16A34A]">and free.</span>
          </h2>
        </div>

        {/* Compact Single-Column Pricing Card (Inspired by reference) */}
        <div className="w-full max-w-[440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Subtle emerald ambient aura */}
            <div className="absolute -inset-1 rounded-3xl bg-emerald-500/15 blur-lg pointer-events-none" />

            {/* Main Card */}
            <div className="relative z-10 bg-[#064E3B] text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/25 shadow-2xl shadow-green-950/20">
              {/* Top Row: Tier Name & Pill Badge */}
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-xl sm:text-2xl tracking-tight text-white uppercase">
                  LIFETIME
                </span>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-emerald-950 text-xs font-bold shadow-sm">
                  <span>🔥</span>
                  <span>MOST POPULAR</span>
                </div>
              </div>

              {/* Bold Primary Price: ₹0 (No scratch/strikethrough) */}
              <div className="flex items-baseline gap-2.5 mt-4 mb-3">
                <span className="font-extrabold text-6xl sm:text-7xl text-white tracking-tight leading-none">
                  ₹0
                </span>
                <span className="text-emerald-300 text-sm font-semibold uppercase tracking-wider">
                  Free Forever
                </span>
              </div>

              {/* Short, punchy audience sentence */}
              <p className="text-emerald-100/80 text-sm font-light leading-relaxed mb-6">
                For believers seeking consistency in Salah, Qaza recovery, and authentic Islamic learning.
              </p>

              {/* High-Contrast CTA Button */}
              <a
                href="https://originaltawfiq.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-emerald-50 active:scale-[0.99] text-[#064E3B] font-bold text-base tracking-tight transition-all duration-200 shadow-md flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <span>Start Your Journey Free</span>
                <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200 text-lg leading-none">
                  →
                </span>
              </a>

              {/* What's Included Label */}
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-300/90 mt-7 mb-4">
                WHAT'S INCLUDED:
              </p>

              {/* Single-Line Concise Feature Checklist with '+' */}
              <ul className="space-y-3">
                {features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm sm:text-[14.5px] text-white/90 font-normal leading-snug"
                  >
                    <span className="text-emerald-400 font-bold text-base leading-none select-none">
                      +
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
