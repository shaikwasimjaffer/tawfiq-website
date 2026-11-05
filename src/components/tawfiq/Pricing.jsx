import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const includedFeatures = [
  "Qaza prayer tracking & recovery planning",
  "Daily Salah tracking & habit consistency",
  "Quran reading & verse audio with Tajweed guidance",
  "Tawfiq AI assistant for contextual Islamic learning",
  "Guided Islamic Academy (Hadith, Tafsir & 99 Names)",
  "Qibla compass & local prayer calculation",
  "Ad-free experience with zero commercial interruptions",
  "Privacy-focused data handling — no selling of worship records",
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-label="Pricing and Plan"
      className="w-full bg-[#F0FDF4] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-['Geist',sans-serif]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header: Styled identically to Tawfiq's existing headers */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] font-['Geist',sans-serif] tracking-[0.25em] uppercase text-emerald-800 font-semibold block mb-3">
            Pricing
          </span>
          <h2 className="font-['Newsreader',serif] font-light text-3xl sm:text-5xl text-green-950 tracking-tight leading-tight">
            Simple, transparent, <br />
            <span className="italic text-[#16A34A]">and free for everyone.</span>
          </h2>
        </div>

        {/* Pricing Card: Native to Tawfiq's design system */}
        <div className="w-full max-w-[460px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#064E3B] text-white rounded-[2rem] p-7 sm:p-10 border border-emerald-400/25 shadow-xl shadow-green-950/10 flex flex-col"
          >
            {/* 1. Plan Heading */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-['Geist',sans-serif] font-semibold tracking-[0.25em] uppercase text-emerald-300">
                FREE FOREVER
              </span>
            </div>

            {/* 2. Prominent Price & Clear Hierarchy */}
            <div className="mt-5 mb-2">
              <div className="flex items-baseline">
                <span className="font-['Newsreader',serif] font-light text-6xl sm:text-7xl text-white tracking-tight leading-none">
                  ₹0
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-['Geist',sans-serif] text-emerald-200/80 font-light tracking-wide">
                No subscription. No payment required.
              </p>
            </div>

            {/* 3. Concise Description */}
            <p className="text-sm font-['Geist',sans-serif] text-emerald-100/90 leading-relaxed font-light mt-3 mb-7">
              Build consistency in Salah, manage Qaza prayers, and deepen your Islamic learning with Tawfiq.
            </p>

            {/* 4. Primary CTA Button: Tawfiq's Established Design System */}
            <a
              href="https://originaltawfiq.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Started with Tawfiq - Opens web application in a new tab"
              className="group font-['Geist',sans-serif] inline-flex items-center justify-center gap-2.5 w-full bg-white hover:bg-[#F0FDF4] text-green-950 px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer active:scale-[0.99] outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span>Get Started with Tawfiq</span>
              <span
                aria-hidden="true"
                className="transform group-hover:translate-x-1 transition-transform duration-300 text-sm leading-none"
              >
                →
              </span>
            </a>

            {/* 5. Included Features Section Heading */}
            <h3 className="text-xs font-['Geist',sans-serif] font-semibold tracking-[0.2em] uppercase text-emerald-300 mt-8 mb-4">
              What's included
            </h3>

            {/* 6. Factual, Verified Feature List */}
            <ul className="space-y-3.5 text-left" role="list">
              {includedFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-white/95 font-['Geist',sans-serif] font-light leading-snug"
                >
                  <Check
                    className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
